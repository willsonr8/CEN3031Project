'use client'
import {Button} from '@nextui-org/button';
import React from 'react';
import { useRouter } from 'next/navigation';

const PrescriptionButton = () => {
    const router = useRouter();
    const Add = async () => {
        router.push('/PrescriptionForm');
    };
    return (
        <Button onClick={Add} className="red-dark" 
        radius="full" size="lg" type="submit" color="primary" 
        variant="solid">Add Prescription</Button>
    );
};

export default PrescriptionButton;