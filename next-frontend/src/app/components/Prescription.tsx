'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../prescriptions.module.css';

interface Prescription {
  rxid: number;
  medication_name: string;
  dosage: string;
  expiration_date: string;
  pharmacy_name: string;
}

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {

    const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];
  
    if (!accessToken) {
        console.error('Access token is not available.');
        return;
    }
  
    try {
        const response = await axios.get('http://localhost:8000/api/prescriptions/', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        });

        setPrescriptions(response.data);
    } catch (error) {
        console.error('Failed to fetch prescriptions:', error);
    }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className={styles.prescriptionContainer}>
      <h1>Prescription History</h1>
      <table className={styles.prescriptionTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Expiration Date</th>
            <th>Pharmacy</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.length > 0 ? (
            prescriptions.map(prescription => (
              <tr key={prescription.rxid}>
                <td>{prescription.rxid}</td>
                <td>{prescription.medication_name}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.expiration_date}</td>
                <td>{prescription.pharmacy_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>No prescriptions added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Prescriptions;