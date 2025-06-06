import type { Metadata } from "next";
import { inter } from "./ui/fonts";
import '@/app/ui/global.css';


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
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
