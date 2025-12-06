// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LayoutGrid, Home, BookOpen, LifeBuoy } from "lucide-react";
import { cn } from "../../lib/utils/cn";

export function Navbar() {
  const pathname = usePathname();

  // Helper untuk mengecek active state
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* 1. LOGO AREA - Gaya Industrial */}
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-lg font-bold font-mono text-xl border-2 border-gray-400">
                B
            </div>
            <div className="hidden md:flex flex-col">
                <span className="font-bold text-lg tracking-tighter leading-none text-white">
                    BULK<span className="text-purple-400">SENDER</span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    Solana Devnet
                </span>
            </div>
        </div>

        {/* 2. NAVIGATION MENU - Gaya 'Pill' seperti referensi TP-7 */}
        <div className="hidden md:flex items-center bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            <NavLink href="/" active={isActive("/")} icon={<Home size={16} />}>
                Home
            </NavLink>
            <NavLink href="/dashboard" active={isActive("/dashboard")} icon={<LayoutGrid size={16} />}>
                Dashboard
            </NavLink>
            <NavLink href="/faq" active={isActive("/faq")} icon={<BookOpen size={16} />}>
                Docs
            </NavLink>
        </div>

        {/* 3. ACTION AREA */}
        <div className="flex items-center gap-4">
            {/* Tombol Wallet Custom Style */}
            <div className="wallet-adapter-button-trigger">
                <WalletMultiButton style={{
                    backgroundColor: '#581c87', // Purple-900
                    height: '44px',
                    borderRadius: '12px',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }} />
            </div>
        </div>

      </div>
    </nav>
  );
}

// Komponen Kecil untuk Link Menu
function NavLink({ href, active, children, icon }: { href: string, active: boolean, children: React.ReactNode, icon: React.ReactNode }) {
    return (
        <Link 
            href={href}
            className={`
                flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${active 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" // Active: Putih Terang (Ala Skot/TP-7)
                    : "text-gray-400 hover:text-white hover:bg-white/10" // Inactive: Abu-abu
                }
            `}
        >
            {icon}
            {children}
        </Link>
    );
}