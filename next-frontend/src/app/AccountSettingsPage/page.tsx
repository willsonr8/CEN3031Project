'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/AccountNavbar';
import DeleteButton from '../components/DeleteButton';
import CheckTokenExpiration from '../components/TokenExpirationCheck';


const SettingsPage: React.FC = () => {

    CheckTokenExpiration();
    return (
        <div style={{ textAlign: "center", fontSize: "24px" }}>
            <NavBar />
            <DeleteButton />

        </div>
    );
};

export default SettingsPage;