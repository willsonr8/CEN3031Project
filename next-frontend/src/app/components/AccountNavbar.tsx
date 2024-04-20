import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter();
    const [activeNavItem, setActiveNavItem] = useState('search');
    const [tabColors, setTabColors] = useState({
        search: 'foreground',
        prescriptions: 'foreground',
        account: 'foreground'
    });

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
        const newTabColors = {};
        Object.keys(tabColors).forEach(item => {
            newTabColors[item] = item === navItem ? 'blue' : 'foreground';
        });
        setTabColors(newTabColors);
        if (navItem === 'prescriptions') {
            handlePrescriptions();
        } else if (navItem === 'account') {
            handleSettings();
        }
    };

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

    const handlePrescriptions = async () => {
        router.push('/PrescriptionPage');
    };

    const handleSettings = async () => {
        router.push('/AccountSettingsPage');
    };

    return (
        <Navbar isBordered className="red-dark text-foreground bg-background">
            <NavbarBrand>
                <p color="#3c009d" className="font-bold text-inherit">Medicate</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={activeNavItem === 'search'}>
                    <Link color={tabColors.search} href="../SearchPage" onClick={() => handleNavItemClick('search')}>
                        Search
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeNavItem === 'prescriptions'}>
                    <Link color={tabColors.prescriptions} href="../PrescriptionPage" onClick={() => handleNavItemClick('prescriptions')}>
                        Prescriptions
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeNavItem === 'account'}>
                    <Link color={tabColors.account} onClick={() => handleNavItemClick('account')}>
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
