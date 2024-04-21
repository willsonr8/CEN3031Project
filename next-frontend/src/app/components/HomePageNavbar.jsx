'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import styles from "../home.module.css";

export default function NavBar() {

  const router = useRouter();

  //Login handler, route to login page
  const handleLogin = async () => {
    router.push("../login");
  };

  //Signup handler, route to create account page
  const handleSignUp = async () => {
    router.push("../createaccount");
  };

  //Render home page with login and signup buttons
  return (
    <Navbar isBordered  className="red-dark text-foreground bg-background" >
      <NavbarBrand>
        <p color="#3c009d" className="font-bold text-inherit">Medicate</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link onClick={handleLogin}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" onClick={handleSignUp} variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
