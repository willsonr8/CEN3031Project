import React from "react";
import Image from "next/image";
import NavBar from "../components/AccountNavbar";
import styles from "../home.module.css";
import NameSearch from "../components/NameSearch";
const AccountPage = () => {
    return (
        <div className="red-dark text-foreground bg-background">
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default AccountPage;
