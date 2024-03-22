import React from 'react';
import HelloMessage from './components/HelloMessage';
import NameSearch from './components/NameSearch';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', fontSize: '24px' }}>
            <h1>Welcome to My Next.js App</h1>
            <HelloMessage />
            <NameSearch />
        </div>
    );
};

export default HomePage;
