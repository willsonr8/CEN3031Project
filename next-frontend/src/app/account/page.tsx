'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/AccountNavbar';
import NameSearch from '../components/NameSearchAccount';

const AccountPage: React.FC = () => {
    const isTokenExpired = (token: string) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();
        return now >= exp;
    };
    const router = useRouter();

    //Find row in cookies that start with access, if it is not found (not authenticated), redirect user to login page
    //Rerun effect is the router object changes to reevaluate access rights
    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken || isTokenExpired(accessToken.split('=')[1])) {
            router.push('/login');
        }
    }, [router]);

    //Render Navigation Bar and Drug Searching
    return (
        <div>
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default AccountPage;
