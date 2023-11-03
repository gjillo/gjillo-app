import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeRegistry from "@/app/ThemeRegistry";
import React from "react";
import { ApolloWrapper } from './ApolloWrapper';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
        </ApolloWrapper>
      </body>
    </html>
  )
}