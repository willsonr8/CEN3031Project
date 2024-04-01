import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter();

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
                <NavbarItem>
                    <Link color="foreground" href="../SearchPage">
                        Search
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" onClick={handlePrescriptions}>
                        Prescriptions
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link onClick={handleSettings} aria-current="page">
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
