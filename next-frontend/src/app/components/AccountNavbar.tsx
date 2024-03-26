import React from "react";
import Image from "next/image";
import styles from "../home.module.css";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const NavBar = () => {
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
          <Link color="foreground" href="#">
            Prescriptions
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Account
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/">Logout</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    );
};

export default NavBar;
