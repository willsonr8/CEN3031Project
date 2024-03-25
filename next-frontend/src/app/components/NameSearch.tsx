'use client'
import React, { useState } from 'react';
import axios from 'axios';
import {Button} from '@nextui-org/button';
import {Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";

const NameSearch = () => {
    const [drug_name, set_drug_name] = useState('');
    const [responseData, setResponseData] = useState<any>(null)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(drug_name)
            const response = await axios.post('http://localhost:8000/api/name_search/', { name: drug_name });
            console.log("Post response:" + response.data)
            setResponseData(response.data);
        } catch (error) {
            console.error('Error', error);
        }
    };

    function GenericNames() {
        if (responseData && responseData.drugGroup) {

            let listItems = [];
          
            for (let group of responseData.drugGroup.conceptGroup) {
                if (group.conceptProperties) {
                    for (let concept of group.conceptProperties) {
                        listItems.push(
                        <li key={concept.rxcui}>{concept.name}</li>
                        );
                    }
                }
            }
          
            return listItems;
        } else {
            return null;
        }
    }
    return (
        <div className="flex flex-col  items-center w-full">
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
                            "text-black/90 dark:text-white/90",
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
                <Button radius="full" size="lg" type="submit" color="primary" variant="solid">Search</Button>
            </form>
            {responseData && (
                <div className="w-full max-w-2xl text-white">
                    <h2 className="text-xl mb-2">Generic Names:</h2>
                    <ul>{GenericNames()}</ul>
                </div>
            )}
        </div>
    );
};

export default NameSearch;
