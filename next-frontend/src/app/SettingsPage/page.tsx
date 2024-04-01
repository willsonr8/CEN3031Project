'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/AccountNavbar';
import DeleteButton from '../components/DeleteButton';


const SettingsPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken) {
            router.push('/login');
        }
    }, [router]);

    const handleDelete = async () => {
        
    };

    return (
        <div>
            <NavBar />
            <DeleteButton />

        </div>
    );
};

export default SettingsPage;