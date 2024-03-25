import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";

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
    <html lang="en" className='light'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
