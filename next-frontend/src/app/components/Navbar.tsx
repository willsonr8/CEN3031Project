import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../home.module.css";

const Navbar = () => {
    return (
        <>
            <div>
                <div className={styles.input}>
                    <Image
                        src="/icons/search.png"
                        width={24}
                        height={24}
                        alt="search"
                    />
                    <input type="text" placeholder="Search prescriptions" />
                </div>
            </div>
        </>
    );
};

export default Navbar;
