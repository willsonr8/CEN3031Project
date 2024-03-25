import React from "react";
import Link from "next/link";
import styles from "./home.module.css";

const HomePage = () => {
    return (
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
        </div>
    );
};

export default HomePage;
