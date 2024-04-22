'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import styles from "../home.module.css";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Forgot password handler, send email and new password to server to reset password
    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/password/reset/", {
                email,
                new_password: newPassword,
            });
            window.location.href = "/login";
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
                setErrorMessage("email not found.");
            } else {
                console.error(error);
            }
        }
    };

    // Render forgot password page with email and new password input fields
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>Medicate</div>
                <div className={styles.text}>Password Reset</div>
                <form className={styles.inputs} onSubmit={handleForgotPassword}>
                    <div className={styles.input}>
                        <Image src="/icons/user.png" width={20} height={21} alt="user" />
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <Image src="/icons/password.png" width={19} height={22} alt="password" />
                        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} />
                    </div>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    <div className={styles.buttonContainer}>
                        <Link href="/">
                            <div className={styles.button}>Back</div>
                        </Link>
                        <button type="submit" className={styles.button}>Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;