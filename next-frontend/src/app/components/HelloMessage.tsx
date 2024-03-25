'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelloMessage: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get_data/');
                console.log("Hello World");
                setMessage(response.data.text);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="text-white">
            <p>{message}</p>
        </div>
    );
};

export default HelloMessage;
