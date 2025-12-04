// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWalletProvider from "../components/contexts/ClientWalletProvider"; // 👈 Import ini penting

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Bulk Sender",
  description: "Kirim SOL massal dengan mudah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWalletProvider>
            {children}
        </ClientWalletProvider>
      </body>
    </html>
  );
}