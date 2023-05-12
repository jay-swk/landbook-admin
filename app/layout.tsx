"use client";

import '../styles/globals.css';
import Navbar from './components/navbar';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import Head from './components/head';
interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <Head />
      <body className="h-full">
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
