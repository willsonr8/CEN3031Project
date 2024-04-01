'use client'
import React, { useEffect } from 'react';
import NameSearch from '../components/NameSearch';
import NavBar from '../components/AccountNavbar';
import { useRouter } from 'next/navigation';


const SearchPage = () => {
    const router = useRouter();

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div style={{ textAlign: 'center', fontSize: '24px' }}>
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default SearchPage;