import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../home.module.css";

const Login = () => {
    return (
        <div className={styles.wrapper}>
        <div className={styles.container}>
            <div>Medicate</div>
            <div className={styles.text}>Login</div>
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <Image
                        src="/icons/user.png"
                        width={20}
                        height={21}
                        alt="user"
                    />
                    <input type="text" placeholder="Username" />
                </div>
                <div className={styles.input}>
                    <Image
                        src="/icons/password.png"
                        width={19}
                        height={22}
                        alt="email"
                    />
                    <input type="password" placeholder="Password" />
                </div>
                <div className={styles.forgotPassword}>Lost Password?</div>
            </div>
            <div className={styles.buttonContainer}>
                <Link key="backButton" href="/">
                    <div className={styles.button}>Back</div>
                </Link>
                <Link key="account" href="/account">
                    <div className={styles.button}>Login</div>
                </Link>
            </div>
        </div>
        </div>
    );
};

export default Login;
