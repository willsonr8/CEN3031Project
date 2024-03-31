'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/AccountNavbar';
import NameSearch from '../components/NameSearch';
import PrescriptionPage from '../components/Prescription';
import styles from '../home.module.css';

const AccountPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div>
            <NavBar />
            <NameSearch />
            <main>
                <PrescriptionPage />
            </main>
        </div>
    );
};

export default AccountPage;
