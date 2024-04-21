"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { Input, Tab, Tabs } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import DrugStoresMap from "@/app/components/DrugStoresMap";
import { CircularProgress } from "@nextui-org/react";
import { Key } from "@react-types/shared";
import "../NameSearch.css";

const NameSearch = () => {
    let chosen_prescriptions = [];
    const [selected, setSelected] = useState("search");
    const [drug_name, set_drug_name] = useState("");
    const [responseData, setResponseData] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/name_search/', { name: drug_name });
            setResponseData(response.data);
            setError(false); // Reset error state on successful response
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setError(true); // Set error state to true on error
            setLoading(false);
        }
    };

    const sortByBrandName = () => {
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.brandName.localeCompare(b.rxtermsProperties.brandName);
            } else {
                return b.rxtermsProperties.brandName.localeCompare(a.rxtermsProperties.brandName);
            }
        });
        setResponseData({ 'all drugs': sorted });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortByDisplayName = () => {
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.displayName.localeCompare(b.rxtermsProperties.displayName);
            } else {
                return b.rxtermsProperties.displayName.localeCompare(a.rxtermsProperties.displayName);
            }
        });
        setResponseData({ 'all drugs': sorted });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortByStrength = () => {
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.strength.localeCompare(b.rxtermsProperties.strength);
            } else {
                return b.rxtermsProperties.strength.localeCompare(a.rxtermsProperties.strength);
            }
        });
        setResponseData({ 'all drugs': sorted });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortByDoseForm = () => {
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.rxtermsDoseForm.localeCompare(b.rxtermsProperties.rxtermsDoseForm);
            } else {
                return b.rxtermsProperties.rxtermsDoseForm.localeCompare(a.rxtermsProperties.rxtermsDoseForm);
            }
        });
        setResponseData({ 'all drugs': sorted });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortByRoute = () => {
        const sorted = [...responseData['all drugs']].sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a.rxtermsProperties.route.localeCompare(b.rxtermsProperties.route);
            } else {
                return b.rxtermsProperties.route.localeCompare(a.rxtermsProperties.route);
            }
        });
        setResponseData({ 'all drugs': sorted });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    const renderTableData = () => {
        if (responseData && responseData["all drugs"]) {
            try {
                return responseData['all drugs'].map((drug: any, index: number) => (
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


    // @ts-ignore
    // @ts-ignore
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
                    {loading ? (
                        <CircularProgress color="danger" aria-label="Loading..." />
                    ) : null}
                    {error ? (
                        <div className="text-red-500">
                            Please type in your medication.
                        </div>
                    ) : null}
                    {responseData && responseData['all drugs'].length === 0 && !error ? (
                         <div className="text-red-500">
                              No drugs found, please try again.
                         </div>
                    ) : null}
                    {responseData && responseData['all drugs'].length > 0 && !error && (
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

