'use client'
import React, { useEffect } from 'react';
import NavBar from '../components/AccountNavbar';
import NameSearch from '../components/NameSearchAccount';
import styles from '../home.module.css';
import CheckTokenExpiration from '../components/TokenExpirationCheck';

const AccountPage: React.FC = () => {
    CheckTokenExpiration();

    return (
        <div>
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default AccountPage;
