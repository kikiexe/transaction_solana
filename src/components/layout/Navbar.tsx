// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import wallet button
const WalletButton = dynamic(
  () => import("../ui/WalletButton").then((mod) => mod.WalletButton),
  { ssr: false }
);

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl hidden md:block">
        <div className="bg-white/80 backdrop-blur-xl rounded-full border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 pl-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Send className="text-orange-500" size={20} />
              </div>
              <span className="text-xl font-black">BULKSEND</span>
            </Link>

            <div className="flex items-center gap-2">
              <NavPill href="/" active={isActive("/")}>
                HOME
              </NavPill>
              <NavPill href="/sender" active={isActive("/sender")}>
                <Zap size={14} className="inline mr-1" />
                SENDER
              </NavPill>
              <NavPill href="#features" active={false}>
                FEATURES
              </NavPill>
              <NavPill href="#docs" active={false}>
                DOCS
              </NavPill>
            </div>

            <div className="flex items-center gap-3">
              <WalletButton
                style={{
                  backgroundColor: "#000",
                  borderRadius: "9999px",
                  fontWeight: "bold",
                  fontSize: "12px",
                  height: "40px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-xl border-b-2 border-black">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Send className="text-orange-500" size={20} />
            </div>
            <span className="text-lg font-black">BULKSEND</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t-2 border-black bg-white p-4 space-y-3">
            <MobileNavLink
              href="/"
              active={isActive("/")}
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </MobileNavLink>
            <MobileNavLink
              href="/sender"
              active={isActive("/sender")}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Zap size={16} className="inline mr-2" />
              SENDER
            </MobileNavLink>
            <MobileNavLink
              href="#features"
              active={false}
              onClick={() => setMobileMenuOpen(false)}
            >
              FEATURES
            </MobileNavLink>
            <MobileNavLink
              href="#docs"
              active={false}
              onClick={() => setMobileMenuOpen(false)}
            >
              DOCS
            </MobileNavLink>

            <div className="pt-4 border-t-2 border-gray-200">
              <WalletButton
                style={{
                  backgroundColor: "#000",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  height: "48px",
                  width: "100%",
                }}
              />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function NavPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-5 py-2 rounded-full font-bold text-xs uppercase transition-all ${
        active
          ? "bg-linear-to-r from-orange-500 to-orange-400 text-white shadow-lg"
          : "bg-white text-black hover:bg-gray-100 border border-gray-200"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 rounded-xl font-bold text-sm uppercase transition-all ${
        active
          ? "bg-linear-to-r from-orange-500 to-orange-400 text-white"
          : "bg-gray-50 text-black hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}