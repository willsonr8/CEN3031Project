'use client'
import React, { useEffect } from 'react';
import NameSearch from '../components/NameSearchAccount';
import NavBar from '../components/AccountNavbar';
import { useRouter } from 'next/navigation';
import CheckTokenExpiration from '../components/TokenExpirationCheck';


const SearchPage = () => {
    CheckTokenExpiration();
    return (
        <div style={{ textAlign: 'center', fontSize: '24px' }}>
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default SearchPage;