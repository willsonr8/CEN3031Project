import React from "react";
import Image from "next/image";
import NavBar from "../components/AccountNavbar";
import styles from "../home.module.css";
import NameSearch from "../components/NameSearch";
import Navbar from "./navbar";

const AccountPage = () => {
    return (
        <div>
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default AccountPage;
