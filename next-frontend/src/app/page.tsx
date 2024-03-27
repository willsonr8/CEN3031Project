import React from "react";
import Link from "next/link";
import styles from "./home.module.css";
import HelloMessage from './components/HelloMessage';
import NameSearch from './components/NameSearch';
import NavBar from './components/HomePageNavbar';
import NormalizedNameSearch from "./components/NormalizedNameSearch";


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
