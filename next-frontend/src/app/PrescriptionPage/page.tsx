'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/AccountNavbar';
import NameSearch from '../components/NameSearch';
import PrescriptionPage from '../components/Prescription';
import styles from '../home.module.css';
import CheckTokenExpiration from '../components/TokenExpirationCheck';

const AccountPage: React.FC = () => {
    CheckTokenExpiration();

    return (
        <div>
            <NavBar />
            <PrescriptionPage />
        </div>
    );
};

export default AccountPage;