'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../home.module.css';
import Image from "next/image";
import Link from "next/link";
import axios from "axios";


const DeleteAccount: React.FC = (): React.ReactNode => {

    const router = useRouter();
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //Find row in cookies that start with access, if it is not found (not authenticated), redirect user to login page
    //Rerun effect is the router object changes to reevaluate access rights
    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken) {
            router.push('/login');
        }
    }, [router]);

    //Handle account deletion, evaluate current access rights and password
    //If no error is thrown, delete account and redirect to Create Account page
    //If the error is an Axios error and status is 400, set error message to Incorrect Password
    //Otherwise, logs the error to console.
    const handleDelete = async () => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        const tokenValue = accessToken ? accessToken.split('=')[1] : null;
        console.log(tokenValue);
        try {
            await axios.delete("http://localhost:8000/api/users/me/", {
                data: { current_password: password },
                headers: {
                    'Authorization': `Bearer ${tokenValue}`,
                    'Content-Type': 'application/json'
                }
            });
            router.push('/createaccount');

        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
                setErrorMessage("Incorrect password.");
            } else {
                console.error(error);
            }
        }
    };

    //Renders the account deletion page with password input field for verification, navigation and confirmation buttons.
    return (
        <div>
            <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>Medicate</div>
                <div className={styles.text}>Insert Password</div>
                <form className={styles.inputs} onSubmit={(e) => {e.preventDefault(); handleDelete();}}>
                    <div className={styles.input}>
                        <Image src="/icons/password.png" width={19} height={22} alt="password" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    <div className={styles.buttonContainer}>
                        <Link href="/account">
                            <div className={styles.button}>Cancel</div>
                        </Link>
                        <button type="submit" className={styles.button}>Confirm Deletion</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default DeleteAccount;