import React from "react";
import Link from "next/link";
import styles from "./home.module.css";
import HelloMessage from './components/HelloMessage';
import NameSearch from './components/NameSearch';
import NavBar from './components/HomePageNavbar';


const HomePage = () => {
    return (
      <div className="red-dark text-foreground bg-background" style={{ textAlign: 'center', fontSize: '24px' }}>
            <NavBar />
            <HelloMessage />
            <NameSearch />
        </div>
    );
};

export default HomePage;
