import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";

export const metadata: Metadata = {
    title: "Medicate",
    description: "Team 12",
};

import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const inter = { className: "your-class-name" }; // Replace "your-class-name" with the actual class name
  return (
    <html lang="en" className='light'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
