import { useState, useEffect } from 'react';
import styles from '../prescriptions.module.css';

interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  date: string;
}

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const dummyPrescriptions: Prescription[] = [ //Replace this with an API fetch from database.
        { id: 1, medication: 'Medication A', dosage: '10mg', date: '2023-01-15' },
        { id: 2, medication: 'Medication B', dosage: '20mg', date: '2023-02-20' },
        { id: 3, medication: 'Medication C', dosage: '15mg', date: '2023-03-10' },
      ];
      setPrescriptions(dummyPrescriptions);
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
          </tr>
        </thead>
        <tbody>
          {prescriptions.map(prescription => (
            <tr key={prescription.id}>
              <td>{prescription.id}</td>
              <td>{prescription.medication}</td>
              <td>{prescription.dosage}</td>
              <td>{prescription.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prescriptions;
