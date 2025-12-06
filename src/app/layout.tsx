// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientWalletProvider from "../components/providers/WalletProvider";
import { Navbar } from "../components/layout/Navbar";

// Setup Font
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: "Solana Bulk Sender",
  description: "Kirim SOL massal dengan gaya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-black text-white antialiased selection:bg-purple-500 selection:text-white`}>
        <ClientWalletProvider>
            
            {/* Navbar dipasang di sini */}
            <Navbar /> 
            
            {/* Konten halaman dikasih padding-top biar gak ketutupan Navbar */}
            <main className="pt-24 min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-gray-900 via-black to-black">
                {children}
            </main>

        </ClientWalletProvider>
      </body>
    </html>
  );
}