import React from "react";
import Link from "next/link";
import styles from "./home.module.css";
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
        <div className={styles.container}>
            <div>Medicate</div>
            <div className={styles.buttonContainer}>
                <Link key="createaccount" href="/createaccount">
                    <div className={styles.button}>Create an Account</div>
                </Link>
                <Link key="login" href="/login">
                    <div className={styles.button}>Login</div>
                </Link>
            </div>
    );
};

export default HomePage;
