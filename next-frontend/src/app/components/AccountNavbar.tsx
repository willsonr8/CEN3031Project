
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter();
    const [activeNavItem, setActiveNavItem] = useState('');

    useEffect(() => {
        // Load the active nav item from local storage on mount
        const storedNavItem = localStorage.getItem('activeNavItem');
        if (storedNavItem) {
            setActiveNavItem(storedNavItem);
        }
    }, []);

    useEffect(() => {
        // Store the active nav item in local storage on change
        if (activeNavItem) {
            localStorage.setItem('activeNavItem', activeNavItem);
        }
    }, [activeNavItem]);
    
    //Navigation handler, route to correct pages depending on clicked button
    const handleNavItemClick = (navItem: 'search' | 'prescriptions' | 'account') => {
        setActiveNavItem(navItem);
        if (navItem === 'prescriptions') {
            handlePrescriptions();
        } else if (navItem === 'account') {
            handleSettings();
        } else if (navItem === 'search') {
            handleSearch();
        }
    };

    //Logout handler, on success redirect to login page
    const handleLogout = async () => {
      try {
          await axios.post('http://localhost:8000/api/logout/');
          document.cookie = 'access=; Max-Age=0; path=/';
          document.cookie = 'refresh=; Max-Age=0; path=/';
          router.push('/login');
      } catch (error) {
          console.error(error);
      }
    };

    //Redirect to search page
    const handleSearch = async () => {
        router.push('/SearchPage');
    };

    //Redirect to prescription page
    const handlePrescriptions = async () => {
        router.push('/PrescriptionPage');
    };

    //Redirect to account page
    const handleSettings = async () => {
        router.push('/AccountSettingsPage');
    };

    //Render the account navigation bar component with search, prescription, and account page tab buttons
    return (
        <Navbar isBordered className="red-dark text-foreground bg-background">
            <NavbarBrand>
                <p color="#3c009d" className="font-bold text-inherit">Medicate</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={activeNavItem === 'search'}>
                    <Link
                        color={activeNavItem === 'search' ? 'primary' : 'foreground'}
                        onClick={() => handleNavItemClick('search')}
                    >
                        Search
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeNavItem === 'prescriptions'}>
                    <Link
                    color={activeNavItem === 'prescriptions' ? 'primary' : 'foreground'}
                    onClick={() => handleNavItemClick('prescriptions')}>
                        Prescriptions
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeNavItem === 'account'}>
                    <Link
                    color={activeNavItem === 'account' ? 'primary' : 'foreground'}
                    onClick={() => handleNavItemClick('account')}>
                        Account
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link onClick={handleLogout}>Logout</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default NavBar;
