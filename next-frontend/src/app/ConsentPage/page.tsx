'use client'
import { Button } from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';

//Page to let user consent to data collection
const ConsentPage = () => {
    const router = useRouter();
    const handleBack = async () => {
        router.back();
    };

    return (
        <div className="bg-gray-900 text-white p-5">
            <h1 className="text-3xl font-bold mb-4">Data Consent Information</h1>
            <div className="text-lg">
                <h2 className="text-2xl font-bold mt-4 mb-2">Introduction</h2>
                <p>Welcome to Medicate! We are dedicated to protecting your privacy and ensuring that your personal information is collected and used in a responsible, transparent, and secure manner. This Data Collection Policy outlines the types of personal information we collect, how we use it, and the safeguards we have in place to protect your privacy.</p>

                <h2 className="text-2xl font-bold mt-4 mb-2">Information We Collect</h2>
                <h3 className="text-xl font-bold mt-3 mb-1">1. Personal Information:</h3>
                <ul className="list-disc pl-5 mb-3">
                    <li><strong>Name, Date of Birth, and Email Address:</strong> We collect your full name, date of birth, and email address during the account registration process. These details are crucial for identifying you as a unique user and for providing a personalized experience on our platform.</li>
                    <li><strong>Prescription Information:</strong> To better assist you, we collect details of the prescriptions you upload or enter on our platform. This information allows you to track your prescriptions easily, including monitoring expiration dates and exploring alternative medications where appropriate.</li>
                </ul>
                <h3 className="text-xl font-bold mt-3 mb-1">2. Search History:</h3>
                <ul className="list-disc pl-5 mb-3">
                    <li>We collect your search history on our platform to enhance your user experience by facilitating easy re-searching of previously looked-up medications.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-4 mb-2">How We Use Your Information</h2>
                <p>- <strong>To Provide Services:</strong> We use your personal and prescription information to deliver personalized health services and support. This includes managing your medication profile and providing timely reminders about medication expiration.</p>
                <p>- <strong>To Enhance User Experience:</strong> By analyzing your search history, we tailor our services to better meet your needs, making it easier for you to find and revisit previously searched medications.</p>
                <p>- <strong>For Communication:</strong> We use your email address to communicate with you about your account and to send important service-related updates.</p>

                <h2 className="text-2xl font-bold mt-4 mb-2">Data Security</h2>
                <p>We employ robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Our comprehensive security strategies are designed to ensure the confidentiality and integrity of your personal information.</p>

                <h2 className="text-2xl font-bold mt-4 mb-2">Sharing of Information</h2>
                <p>- We do not share your personal information with third parties, except as necessary to provide our services or as required by law.</p>

                <h2 className="text-2xl font-bold mt-4 mb-2">Your Rights and Choices</h2>
                <p>- <strong>Account Deletion:</strong> You can delete your account at any time through your account settings. Deleting your account will permanently remove all your personal data from our systems.</p>
                <p>- <strong>Data Access and Corrections:</strong> You have the right to access and update your personal information at any time. You can edit your personal details directly through your profile settings on our platform.</p>

                <h2 className="text-2xl font-bold mt-4 mb-2">Changes to This Policy</h2>
                <p>We may update this Data Collection Policy periodically. If we make significant changes, we will notify you through our platform or by email, ensuring that you are always aware of the information we collect and how we use it.</p>

                <h2 className="text-2xl font-bold mt-4 mb-2">Contact Us</h2>
                <p>If you have any questions about this policy or our data practices, please contact us at <a href="mailto:medicateteam@gmail.com" className="text-blue-300">medicateteam@gmail.com</a>.</p>
            </div>
            <Button onClick={handleBack} className="red-dark" radius="full" size="lg" type="submit" color="primary" variant="solid">Back</Button>
        </div>
    );
};

export default ConsentPage;