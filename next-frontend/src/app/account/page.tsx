import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../home.module.css";
const AccountPage = () => {
    return (
        <div>
            <div className="grid grid-cols-3 divide-x py-4 bg-violet-600">
                <div className="text-4xl flex items-center justify-center font-sans text-white">
                    Medicate
                </div>
                <div className={styles.input}>
                    <Image
                        className=""
                        src="/icons/search.png"
                        width={24}
                        height={24}
                        alt="search"
                    />
                    <input type="text" placeholder="Search prescriptions" />
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
