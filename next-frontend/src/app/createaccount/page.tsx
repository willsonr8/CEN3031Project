'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import styles from "../home.module.css";

const CreateAccountPage: React.FC = () => {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if all fields are filled out
        if (!name || !dateOfBirth || !email || !password) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/users/", {
                first_name: name,  // Use "first_name" instead of "name"
                email,
                date_of_birth: dateOfBirth,  // Use "date_of_birth" for the field name
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            window.location.href = "/login";
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400 && error.response.data.email) {
                    setErrorMessage("A user with this email already exists.");
                } else {
                    setErrorMessage("Registration failed. Please try again.");
                }
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>Medicate</div>
                <div className={styles.text}>Create an Account</div>
                <form className={styles.inputs} onSubmit={handleRegister}>
                    <div className={styles.input}>
                        <Image src="/icons/user.png" width={22} height={22} alt="user" />
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <Image src="/icons/calendar.png" width={22} height={22} alt="calendar" />
                        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <Image src="/icons/email.png" width={22} height={22} alt="email" />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <Image src="/icons/password.png" width={19} height={22} alt="password" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    <div className={styles.buttonContainer}>
                        <Link href="/">
                            <div className={styles.button}>Back</div>
                        </Link>
                        <button type="submit" className={styles.button}>Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountPage;