import React from 'react';
import HelloMessage from './components/HelloMessage';
import NameSearch from './components/NameSearch';
import NavBar from './components/NavBar';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', fontSize: '24px' }}>
            <NavBar />
            <HelloMessage />
            <NameSearch />
        </div>
    );
};

export default HomePage;
