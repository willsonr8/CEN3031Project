'use client'
import React from 'react';
import NameSearch from '../components/NameSearch';
import NavBar from '../components/AccountNavbar';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
    const router = useRouter();

    return (
        <div style={{ textAlign: 'center', fontSize: '24px' }}>
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default SearchPage;