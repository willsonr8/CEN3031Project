'use client'
import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={drug_name}
                    onChange={(e) => set_drug_name(e.target.value)}
                    placeholder="Enter your drug name"
                    style={{color: 'black'}}
                />
                <button type="submit">Submit</button>
            </form>
            {responseData && (
                <div>
                    <h2>Generic Names:</h2>
                    <ul>
                        {GenericNames()}
                    </ul>
                </div>
                )}
        </div>
    );
};

export default NameSearch;
