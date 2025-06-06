import type { Metadata } from "next";
import { inter } from "../ui/fonts";
import '@/ui/global.css';
import { NavBar } from "@/ui/NavBar/navbar";
import LoginStatus from "@/ui/NavBar/login-status";

export const metadata: Metadata = {
  title: "Loan Management App",
  description: "coding challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full'>
      <body
        className={`${inter.className} h-full antialiased`}
      >
        <div className='min-h-screen flex flex-col'>
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
