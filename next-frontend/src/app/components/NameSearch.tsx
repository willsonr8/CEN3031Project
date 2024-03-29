'use client'
import React, { useState } from 'react';
import axios from 'axios';
import {Button} from '@nextui-org/button';
import {Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import '../NameSearch.css';

const NameSearch = () => {
    const [drug_name, set_drug_name] = useState('');
    const [responseData, setResponseData] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);

    const parseBrandAndIngredients = (name: string) => {
        const brandMatch = name.match(/\[(.*?)\]/); // Matches text within brackets
        const brand = brandMatch ? brandMatch[1] : "Generic";
        const ingredients = brandMatch ? name.replace(brandMatch[0], "") : name;
        return { brand, ingredients };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/name_search/', { name: drug_name });
            setResponseData(response.data);
            setError(false); // Reset error state on successful response
        } catch (error) {
            console.error('Error', error);
            setError(true); // Set error state to true on error
        }
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
            <form onSubmit={handleSubmit} className="w-full space-x-2 max-w-md flex justify-between items-center mb-4">
                <Input
                    value={drug_name}
                    onChange={(e) => set_drug_name(e.target.value)}
                    isClearable
                    type="search"
                    label="Search"
                    radius="full"
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-white",
                            "text-black",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-white",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-white",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focused=true]:bg-default-200/50",
                            "dark:group-data-[focused=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    placeholder="Type medication name..."
                    startContent={
                        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Button className="red-dark" radius="full" size="lg" type="submit" color="primary" variant="solid">Search</Button>
            </form>
            {error ? (
                <div className="text-red-500">Please type in your medication.</div>
            ) : null}
            {responseData && responseData.drugGroup && !responseData.drugGroup.conceptGroup && !error ? (
                <div className="text-red-500">No drugs found, please try again.</div>
            ) : null}
            {responseData && responseData.drugGroup && responseData.drugGroup.conceptGroup && !error && (
                <div className="w-full max-w-2xl text-white">
                    <div className="table-container">
                        <table className="center table">
                            <thead>
                                <tr>
                                    <th>Brand</th>
                                    <th>Ingredients</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NameSearch;
