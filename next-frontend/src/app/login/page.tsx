'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import styles from "../home.module.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //Login handler, verify email address and password pair, if correct, redirect to account page
    //Otherwise, throw error
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/jwt/create/", {
                email,
                password,
            });
            document.cookie = `access=${response.data.access}; path=/`;
            document.cookie = `refresh=${response.data.refresh}; path=/`;
            window.location.href = "/account";
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                setErrorMessage("Incorrect email or password.");
            } else {
                console.error(error);
            }
        }
    };

    const handleForgotPassword = async () => {
        window.location.href = "/ForgotPassword";
    };

    //Render login page with login, password reset and other navigation button components
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>Medicate</div>
                <div className={styles.text}>Login</div>
                <form className={styles.inputs} onSubmit={handleLogin}>
                    <div className={styles.input}>
                        <Image src="/icons/user.png" width={20} height={21} alt="user" />
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <Image src="/icons/password.png" width={19} height={22} alt="password" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.forgotPassword} onClick={handleForgotPassword}>Lost Password?</div>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    <div className={styles.buttonContainer}>
                        <Link href="/">
                            <div className={styles.button}>Back</div>
                        </Link>
                        <button type="submit" className={styles.button}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;