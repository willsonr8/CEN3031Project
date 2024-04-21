"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";
import {Input, Tab, Tabs} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { CircularProgress } from "@nextui-org/react";
import { Key } from "@react-types/shared";

import "../NameSearch.css";
import DrugStoresMap from "@/app/components/DrugStoresMap";

const NameSearch = () => {
    const [selected, setSelected] = useState("search");
    const [drug_name, set_drug_name] = useState("");
    const [responseData, setResponseData] = useState<any>(null);
    const [error, setError] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSearchHistory();
    }, []);

    //Function to fetch user's search history
    //Verify access token in cookie, if not found then throws error
    //Otherwise, set user's search history to reponse if no futher error is thrown, gives an error if one is thrown
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

    //Function to save user's search history
    //Verify access token in cookie, if not found then throws error
    //Otherwise, fetch and save user's search history if no futher error is thrown, gives an error if one is thrown
    const saveSearchHistory = async (query: string) => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];
        if (!accessToken) {
            console.error('Access token not found.');
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/save_search/', { query }, {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
            });
            fetchSearchHistory();
        } catch (error) {
            console.error('Error saving search query to history:', error);
        }
    };

    //Function to perform a search with name query, if no error is thrown, set response data to response
    //Else set error
    const performSearch = async (query: string) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/name_search/', { name: query });
            setResponseData(response.data);
            setError(false);
            setLoading(false);
        } catch (error) {
            console.error('Error performing search:', error);
            setError(true);
            setLoading(false);
            return;
        }
    };

    //Submit handler to save search history of drug name to user's search history
    //If no error is thrown, set response data to response and save new search query to user's search history
    //Else set error
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/name_search/', { name: drug_name });
            setResponseData(response.data);
            setError(false);
            saveSearchHistory(drug_name);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setError(true);
            setLoading(false);
        }
    };

    //Drug sorter based on brand name, sort by alphabetical ascending or descending depending on user choice
    const sortByBrandName = () => {
        if (responseData === null) {
            return;
        }
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.brandName.localeCompare(b.rxtermsProperties.brandName);
            } else {
                return b.rxtermsProperties.brandName.localeCompare(a.rxtermsProperties.brandName);
            }
        });
        setResponseData({ 'all drugs': sorted } as any); // Fix: Update type of responseData and initialize as empty array
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    //Drug sorter based on name, sort by alphabetical ascending or descending depending on user choice
    const sortByDisplayName = () => {
        if (responseData === null) {
            return;
        }
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.displayName.localeCompare(b.rxtermsProperties.displayName);
            } else {
                return b.rxtermsProperties.displayName.localeCompare(a.rxtermsProperties.displayName);
            }
        });
        setResponseData({ 'all drugs': sorted } as any); // Fix: Update type of responseData and initialize as empty array
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    //Drug sorter based on strength, sort by numerical ascending or descending depending on user choice
    const sortByStrength = () => {
        if (responseData === null) {
            return;
        }
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.strength.localeCompare(b.rxtermsProperties.strength);
            } else {
                return b.rxtermsProperties.strength.localeCompare(a.rxtermsProperties.strength);
            }
        });
        setResponseData({ 'all drugs': sorted } as any); // Fix: Update type of responseData and initialize as empty array
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    //Drug sorter based on dosage form, sort by alphabetical ascending or descending depending on user choice
    const sortByDoseForm = () => {
        if (responseData === null) {
            return;
        }
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.rxtermsDoseForm.localeCompare(b.rxtermsProperties.rxtermsDoseForm);
            } else {
                return b.rxtermsProperties.rxtermsDoseForm.localeCompare(a.rxtermsProperties.rxtermsDoseForm);
            }
        });
        setResponseData({ 'all drugs': sorted } as any); // Fix: Update type of responseData and initialize as empty array
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    //Drug sorter based on route of administration, sort by alphabetical ascending or descending depending on user choice
    const sortByRoute = () => {
        if (responseData === null) {
            return;
        }
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.route.localeCompare(b.rxtermsProperties.route);
            } else {
                return b.rxtermsProperties.route.localeCompare(a.rxtermsProperties.route);
            }
        });
        setResponseData({ 'all drugs': sorted } as any); // Fix: Update type of responseData and initialize as empty array
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    //Drug properties table renderer
    //If reponse data is valid (a drug is found), render table with drugs' brand name, name, strength, dosage form and route of administration
    //Otherwise, log no drug found to console
    const renderTableData = () => {
        if (responseData && responseData["all drugs"]) {
            try {
                return (responseData['all drugs'] as any[]).map((drug: any, index: number) => (
                    <tr key={index}>
                        <td>{drug.rxtermsProperties.brandName}</td>
                        <td className="display-name">{drug.rxtermsProperties.displayName}</td>
                        <td>{drug.rxtermsProperties.strength}</td>
                        <td>{drug.rxtermsProperties.rxtermsDoseForm}</td>
                        <td>{drug.rxtermsProperties.route}</td>
                    </tr>
                ));
            } catch (error) {
                console.error('No drug found', error);
            }
        }
        return null;
    };

    //Render the search page with search bar, navigation buttons, drugs' properties table, map of nearby pharmacies with specified drug in stock
    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={handleSubmit} className="py-2 w-full space-x-2 max-w-md flex justify-between items-center mb-4">
                <Input
                    value={drug_name}
                    onChange={(e) => set_drug_name(e.target.value)}
                    type="search"
                    size="lg"
                    radius="full"
                    placeholder="Type medication name..."
                    startContent={<SearchIcon className="rounded-s-lg font-2 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
                />
                <Button className="red-dark" radius="full" size="lg" type="submit" color="primary" variant="solid">
                    Search
                </Button>
            </form>
            <Tabs
                selectedKey={selected}
                onSelectionChange={(value: Key) => setSelected(value.toString())}
            >
                <Tab key="search" title="Search"></Tab>
                <Tab key="map" title="Map"></Tab>
            </Tabs>
            <br />
            {selected === 'search' && (
                <>
            <div>
                {searchHistory.map((query, index) => (
                    <Button key={index} style={{margin: '0 8px 8px 0'}} color="default" onClick={() => performSearch(query)}>
                        {query}
                    </Button>
                ))}
            </div>
            {loading ? (
            <CircularProgress color="danger" aria-label="Loading..." />
            ) : null}
            {error ? (
                <div className="text-red-500">
                    Please type in your medication.
                </div>
            ) : null}
            {responseData &&
            responseData['all drugs'].length === 0 &&
            !error ? (
                <div className="text-red-500">
                    No drugs found, please try again.
                </div>
            ) : null}
            {responseData &&
                responseData['all drugs'].length > 0 &&
                !error && (
                    <div className="w-full max-w-2xl text-white">
                        <div className="table-container">
                            <table className="center table">
                                <thead>
                                <tr>
                                    <th onClick={sortByBrandName}>Brand</th>
                                    <th onClick={sortByDisplayName}>Display Name</th>
                                    <th onClick={sortByStrength}>Strength</th>
                                    <th onClick={sortByDoseForm}>Dose Form</th>
                                    <th onClick={sortByRoute}>Route</th>
                                </tr>
                                </thead>
                                <tbody>{renderTableData()}</tbody>
                            </table>
                        </div>
                    </div>
                )}
                </>
            )}
            {selected === 'map' && (
                <div>
                    <DrugStoresMap googleApiKey={googleApiKey} />
                </div>
            )}
        </div>
    );
};

export default NameSearch;