'use client'
import React, { useEffect } from 'react';
import NameSearch from '../components/NameSearchAccount';
import NavBar from '../components/AccountNavbar';
import { useRouter } from 'next/navigation';


const SearchPage = () => {    

    //Check if the token has expired
    const isTokenExpired = (token: string) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();
        return now >= exp;
    };
    const router = useRouter();

    //If the token has expired, redirect to login page
    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken || isTokenExpired(accessToken.split('=')[1])) {
            router.push('/login');
        }
    }, [router]);

    //Render the navigation bar and drug search component
    return (
        <div style={{ textAlign: 'center', fontSize: '24px' }}>
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default SearchPage;