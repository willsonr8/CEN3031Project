import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../home.module.css";

const CreateAccountPage = () => {
    return (
        <div className={styles.wrapper}>
        <div className={styles.container}>
            <div>Medicate</div>
            <div className={styles.text}>Create an Account</div>
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <Image
                        src="/icons/user.png"
                        width={22}
                        height={22}
                        alt="user"
                    />
                    <input type="text" placeholder="Name" />
                </div>
                <div className={styles.input}>
                    <Image
                        src="/icons/calendar.png"
                        width={22}
                        height={22}
                        alt="calendar"
                    />
                    <input type="date" />
                </div>
                <div className={styles.input}>
                    <Image
                        src="/icons/email.png"
                        width={22}
                        height={22}
                        alt="email"
                    />
                    <input type="email" placeholder="Email" />
                </div>
                <div className={styles.input}>
                    <Image
                        src="/icons/password.png"
                        width={19}
                        height={22}
                        alt="password"
                    />
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Link key="backButton" href="/">
                    <div className={styles.button}>Back</div>
                </Link>
                <Link key="createAccountButton" href="/account">
                    <div className={styles.button}>Create Account</div>
                </Link>
            </div>
        </div>
        </div>
    );
};

export default CreateAccountPage;
