"use client";

import './globals.css';
import Navbar from './navbar';
import AnalyticsWrapper from './analytics';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <SessionProvider>
          <Navbar />
          {children}
          <AnalyticsWrapper />
        </SessionProvider>
      </body>
    </html>
  );
}
