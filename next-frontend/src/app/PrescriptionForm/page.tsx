'use client'
import React from 'react';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import styles from "../home.module.css";
import { useRouter } from 'next/navigation';

const PrescriptionForm: React.FC = () => {
    const [rxid, setRxid] = useState("");
    const [medication_name, setMedication_name] = useState("");
    const [dosage, setDosage] = useState("");
    const [expiration_date, setExpiration_date] = useState("");
    const [pharmacy_name, setPharmacy_name] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const isTokenExpired = (token: string) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();
        return now >= exp;
    };
    const router = useRouter();

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken || isTokenExpired(accessToken.split('=')[1])) {
            router.push('/login');
        }
    }, [router]);

    const pharmacies = [
        "CVS",
        "Walgreens",
        "Rite Aid",
        "Walmart",
        "Costco",
        "Publix"
    ];

    const handlePrescription = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];

        // Check if all fields are filled out
        if (!rxid || !medication_name || !dosage || !expiration_date || !pharmacy_name) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/prescriptions/", {
                rxid,
                medication_name,
                dosage,
                expiration_date,
                pharmacy_name,
            }, {headers: { Authorization: `Bearer ${accessToken}` },withCredentials: true,});
            
            window.location.href = "/PrescriptionPage";
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    setErrorMessage("Prescription failed. Please try again.");
                } else {
                    setErrorMessage("Prescription failed. Please try again.");
                }
            } else {
                console.error(error);
            }
        }
    };

    const handleBack = async () => {
        router.push('/PrescriptionPage');
    };

    const today = new Date().toISOString().split('T')[0];
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>Medicate</div>
                <div className={styles.text}>Add Prescription</div>
                <form className={styles.inputs} onSubmit={handlePrescription}>
                    <div className={styles.input}>
                        <Image src="/icons/rx.png" width={20} height={21} alt="user" />
                        <input type="text" pattern="\d*" title="RXID" placeholder="RXID" value={rxid} onChange={(e) => setRxid(e.target.value)} />

                    </div>
                    <div className={styles.input}>
                        <Image src="/icons/pill.png" width={20} height={21} alt="user" />
                        <input type="text" placeholder="Medication Name" value={medication_name} onChange={(e) => setMedication_name(e.target.value)} />
                        
                    </div>
                    <div className={styles.input}>
                        <Image src="/icons/dose.png" width={20} height={21} alt="user" />
                        <input type="text" pattern="^\d+(\.\d+)?$" title="Dosage must be a number." placeholder="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} />
                    </div>
                    <div>Expiration date</div>
                    <div className={styles.input}>
                        <Image src="/icons/calendar.png" width={20} height={21} alt="user" />
                        <input type="date" min={today} title="Expiration date" placeholder="Expiration Date" value={expiration_date} onChange={(e) => setExpiration_date(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <Image src="/icons/pharmacy.png" width={20} height={21} alt="user" />
                        <select value={pharmacy_name} onChange={(e) => setPharmacy_name(e.target.value)}>
                            <option value="">Pharmacy Name</option>
                            {pharmacies.map((pharmacy) => (
                                <option key={pharmacy} value={pharmacy}>{pharmacy}</option>
                            ))}
                        </select>
                    </div>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    <div className={styles.buttonContainer}>
                        <button onClick={handleBack}>
                            <div className={styles.button}>Back</div>
                        </button>
                        <button type="submit" className={styles.button}>Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default PrescriptionForm;