// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientWalletProvider from "../components/providers/WalletProvider";
import { Navbar } from "../components/layout/Navbar"; // ✅ Direct import (bukan dynamic)

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap'
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Bulksend - Solana Bulk Transfer Tool",
  description: "Send SOL to multiple addresses in one transaction. Fast, secure, and efficient.",
  keywords: ["solana", "bulk sender", "crypto", "transfer", "blockchain"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased bg-white text-black">
        <ClientWalletProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </ClientWalletProvider>
      </body>
    </html>
  );
}