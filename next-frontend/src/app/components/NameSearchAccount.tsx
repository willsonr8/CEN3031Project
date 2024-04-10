"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

import "../NameSearch.css";

const NameSearch = () => {
    const [drug_name, set_drug_name] = useState("");
    const [responseData, setResponseData] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    const parseBrandAndIngredients = (name: string) => {
        const brandMatch = name.match(/\[(.*?)\]/); // Matches text within brackets
        const brand = brandMatch ? brandMatch[1] : "Generic";
        const ingredients = brandMatch ? name.replace(brandMatch[0], "") : name;
        return { brand, ingredients };
    };

    useEffect(() => {
        fetchSearchHistory();
      }, []);
    
    const fetchSearchHistory = async () => {
        
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];
    
        if (!accessToken) {
            console.error('Access token not found.');
            return;
        }
    
        try {
            const response = await axios.get('http://localhost:8000/api/search_history/', {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
            });
            setSearchHistory(response.data.map((item: any) => item.query));
        } catch (error) {
            console.error('Error fetching search history:', error);
            setError(true);
        }
    };
    
    const performSearch = async (query: string) => {
        try {
            const response = await axios.post('http://localhost:8000/api/name_search/', { name: query });
            setResponseData(response.data);
            setError(false);
        } catch (error) {
            console.error('Error performing search:', error);
            setError(true);
            return;
        }
      
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];
      
        if (accessToken) {
            try {
                await axios.post('http://localhost:8000/api/save_search/', { query }, {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
            });
            fetchSearchHistory();
            } catch (saveError) {
                console.error('Error saving search query to history:', saveError);
            }
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(drug_name);
    };
    
    const handleSearchHistoryClick = (query: string) => {
        set_drug_name(query);
        performSearch(query);
    };
    

    const renderTableData = () => {
        if (responseData && responseData.drugGroup) {
            try {
                return responseData.drugGroup.conceptGroup.map((group: any) => {
                    if (group.conceptProperties && group.tty === 'SBD') {
                        return group.conceptProperties.map((concept: any) => {
                            const { brand, ingredients } = parseBrandAndIngredients(concept.name);
                            return (
                                <tr key={concept.rxcui}>
                                    <td>{brand}</td>
                                    <td>{ingredients}</td>
                                </tr>
                            );
                        });
                    }
                    return null;
                });
            } catch (error) {
                console.error('No drug found', error);
            }
        }
        return null;
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form
                onSubmit={handleSubmit}
                className="py-2 w-full space-x-2 max-w-md flex justify-between items-center mb-4"
            >
                <Input
                    value={drug_name}
                    onChange={(e) => set_drug_name(e.target.value)}
                    type="search"
                    size="lg"
                    radius="full"
                    placeholder="Type medication name..."
                    startContent={
                        <SearchIcon className="rounded-s-lg font-2 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Button
                    className="red-dark"
                    radius="full"
                    size="lg"
                    type="submit"
                    color="primary"
                    variant="solid"
                >
                    Search
                </Button>
            </form>
            <div>
                {searchHistory.map((query, index) => (
                <Button key={index} style={{margin: '0 8px 8px 0' }} color="default" onClick={() => handleSearchHistoryClick(query)}>
                    {query}
                </Button>
                ))}
            </div>
            {error ? (
                <div className="text-red-500">
                    Please type in your medication.
                </div>
            ) : null}
            {responseData &&
            responseData.drugGroup &&
            !responseData.drugGroup.conceptGroup &&
            !error ? (
                <div className="text-red-500">
                    No drugs found, please try again.
                </div>
            ) : null}
            {responseData &&
                responseData.drugGroup &&
                responseData.drugGroup.conceptGroup &&
                !error && (
                    <div className="w-full max-w-2xl text-white">
                        <div className="table-container">
                            <table className="center table">
                                <thead>
                                    <tr>
                                        <th>Brand</th>
                                        <th>Ingredients</th>
                                    </tr>
                                </thead>
                                <tbody>{renderTableData()}</tbody>
                            </table>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default NameSearch;