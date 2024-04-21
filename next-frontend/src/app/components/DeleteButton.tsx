'use client'
import {Button} from '@nextui-org/button';
import React from 'react';
import { useRouter } from 'next/navigation';

const DeleteButton = () => {
    const router = useRouter();
    
    //Delete account handler, route to account delete page
    const handleDelete = async () => {
        router.push('/AccountDeletion');
    };

    //Render the delete account button
    return (
        <Button onClick={handleDelete} className="red-dark" 
        radius="full" size="lg" type="submit" color="primary" 
        variant="solid">Delete Account</Button>
    );
};

export default DeleteButton;
