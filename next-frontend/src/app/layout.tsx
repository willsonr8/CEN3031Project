import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Medicate",
    description: "Team 12",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div>{children}</div>
            </body>
        </html>
    );
}
