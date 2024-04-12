'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/AccountNavbar';
import DeleteButton from '../components/DeleteButton';


const SettingsPage: React.FC = () => {

    const isTokenExpired = (token: string) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();
        return now >= exp;
    };
    const router = useRouter();

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken || isTokenExpired(accessToken.split('=')[1])) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div style={{ textAlign: "center", fontSize: "24px" }}>
            <NavBar />
            <DeleteButton />

        </div>
    );
};

export default SettingsPage;