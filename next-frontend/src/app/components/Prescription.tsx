'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../prescriptions.module.css';
import { Button } from '@nextui-org/react';
import { CircularProgress } from "@nextui-org/react";

interface Prescription {
  rxid: number;
  medication_name: string;
  dosage: string;
  expiration_date: string;
  pharmacy_name: string;
}

interface Drug {
  rxtermsProperties: {
    brandName: string;
    displayName: string;
    strength: string;
    rxtermsDoseForm: string;
    route: string;
  };
}

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [responseData, setResponseData] = useState<{ 'all drugs': Drug[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];
      if (!accessToken) {
          console.error('Access token is not available.');
          return;
      }
      try {
          const response = await axios.get('http://localhost:8000/api/prescriptions/', {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true
          });
          setPrescriptions(response.data);
      } catch (error) {
          console.error('Failed to fetch prescriptions:', error);
      }
    };
    fetchPrescriptions();
  }, []);

  const searchAlternatives = async (medication_name: string) => {
    setError(null);
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:8000/api/name_search/', { name: medication_name });
        setResponseData(response.data);
        setLoading(false);
    } catch (error) {
        console.error('Search failed:', error);
        setError('Search failed. Please try again.');
        setLoading(false);
    }
  };

  const deletePrescription = async (rxid: any) => {
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];
    if (!accessToken) {
        console.error('Access token is not available.');
        return;
    }
  
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      try {
          const response = await axios.delete(`http://localhost:8000/api/prescriptions/${rxid}/`, {
              headers: {
                  Authorization: `Bearer ${accessToken}`
              },
              withCredentials: true
          });
          setPrescriptions(prev => prev.filter(p => p.rxid !== rxid));
      } catch (error) {
          console.error('Failed to delete prescription:', error);
      }
    } else {
      console.log('Deletion cancelled.');
    }
  };

  const sortBy = (key: keyof Drug['rxtermsProperties']) => {
    if (responseData && responseData['all drugs']) {
      const sorted = [...responseData['all drugs']].sort((a, b) => {
        const valueA = a.rxtermsProperties[key];
        const valueB = b.rxtermsProperties[key];
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      });
      setResponseData({ 'all drugs': sorted });
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <div className={styles.prescriptionContainer}>
      <h1>Prescription History</h1>
      <table className={styles.prescriptionTable}>
        <thead>
          <tr>
            <th>RXID</th>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Expiration Date</th>
            <th>Pharmacy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.rxid}>
              <td>{prescription.rxid}</td>
              <td>{prescription.medication_name}</td>
              <td>{prescription.dosage} mg</td>
                <td>{formatDate(prescription.expiration_date)}</td>
              <td>{prescription.pharmacy_name}</td>
              <td>
                <Button 
                 onClick={() => deletePrescription(prescription.rxid)}
                 className="px-3 py-1 text-white bg-custom-red rounded hover:bg-red-700 transition duration-300 ease-in-out mr-4"
                 >Delete</Button>
                <Button
                className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                onClick={() => searchAlternatives(prescription.medication_name)}>
                  Search Alternatives</Button>
              </td>
            </tr>
          ))}
          {prescriptions.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No prescriptions added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {loading ? (
        <CircularProgress color="danger" aria-label="Loading..." />
      ) : null}
      {responseData && (
        <div className="results">
          <table className={styles.prescriptionTable}>
            <thead>
              <tr>
                <th onClick={() => sortBy('brandName')}>Brand</th>
                <th onClick={() => sortBy('displayName')}>Display Name</th>
                <th onClick={() => sortBy('strength')}>Strength</th>
                <th onClick={() => sortBy('rxtermsDoseForm')}>Dose Form</th>
                <th onClick={() => sortBy('route')}>Route</th>
              </tr>
            </thead>
            <tbody>
              {responseData['all drugs'].map((drug, index) => (
                <tr key={index}>
                  <td>{drug.rxtermsProperties.brandName}</td>
                  <td>{drug.rxtermsProperties.displayName}</td>
                  <td>{drug.rxtermsProperties.strength}</td>
                  <td>{drug.rxtermsProperties.rxtermsDoseForm}</td>
                  <td>{drug.rxtermsProperties.route}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;


