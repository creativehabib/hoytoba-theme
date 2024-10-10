import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React, {Suspense} from "react";
import Loading from "@/app/loading";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recipe Next js App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
       suppressHydrationWarning={true}>
      <Navbar/>
      <main className="container max-w-7xl mx-auto px-6 lg:px-10 sm:px-6 md:px-8">
        <Suspense fallback={<Loading/>}>{children}</Suspense>
      </main>
      </body>
    </html>
  );
}
