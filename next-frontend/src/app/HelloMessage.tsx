'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelloMessage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/data/');
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Hello from Django!</h1>
            <p>{message}</p>
        </div>
    );
};

export default HelloMessage;
