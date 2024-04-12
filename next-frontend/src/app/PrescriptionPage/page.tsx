'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/AccountNavbar';
import NameSearch from '../components/NameSearch';
import PrescriptionPage from '../components/Prescription';
import styles from '../home.module.css';

const AccountPage: React.FC = () => {
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
        <div>
            <NavBar />
            <PrescriptionPage />
        </div>
    );
};

export default AccountPage;