// src/app/page.tsx
"use client";

import { useState } from "react";
import { Send, Zap, Shield, Network, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

// Mock reviews
const REVIEWS = [
  { id: 1, name: "Alex M.", avatar: "AM", rating: 5 },
  { id: 2, name: "Sarah K.", avatar: "SK", rating: 5 },
  { id: 3, name: "John D.", avatar: "JD", rating: 5 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("features");

  return (
    <main className="w-full flex flex-col">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full px-8 py-20 flex flex-col lg:flex-row gap-16">
        {/* Left */}
        <div className="flex-1">
          {/* Massive Typography */}
          <div className="text-7xl font-black leading-none mb-6">
            <div>BU</div>
            <div>LK</div>
          </div>

          <div className="text-orange-500 font-mono mb-4"> $1789 • NOW AVAILABLE • DESIGN</div>

          {/* Description */}
          <p className="max-w-lg text-lg mb-6">
            THE ULTRA-FAST SOLANA BULK SENDER. SEND SOL TO HUNDREDS OF ADDRESSES IN
            SECONDS. BUILT FOR SCALE AND SPEED, OPTIMIZED FOR MAXIMUM EFFICIENCY.
          </p>

          {/* Bottom Tags */}
          <div className="flex gap-4 text-sm font-bold">
            <span>ONE OF A KIND</span>
            <span>CRYPTO</span>
            <span>TOOL</span>
          </div>
        </div>

        {/* Right: Terminal Preview */}
        <div className="flex-1">
          <div className="bg-black text-green-400 p-6 rounded-xl font-mono text-sm shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-3 text-white">bulk-sender-v2.0</span>
            </div>

            {/* Terminal Content */}
            <div className="space-y-1">
              <p>$ solana bulk-send _</p>

              <p>→ Initializing connection...</p>
              <p className="text-green-500">✓ Connected to Solana Devnet</p>
              <p>→ Loading recipients (500)...</p>
              <p className="text-green-500">✓ All addresses validated</p>
              <p>→ Creating transaction batch...</p>
              <p>⚡ Processing 500 transfers...</p>
              <p className="text-green-500">✓ Confirmed: 7xF9...a2Bc</p>

              <div className="pt-2 text-white">
                <p>Total: 450.5 SOL</p>
                <p>Fee: 0.005 SOL</p>
                <p>Time: 1.2s</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-700 mt-4 rounded">
              <div className="h-full w-3/4 bg-green-500 rounded"></div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="absolute right-6 top-6 hidden xl:block text-sm">
          <p className="font-bold mb-2">MULTIPLE CONNECTIVITY OPTIONS</p>
          <ul className="space-y-1 opacity-70">
            <li>• SOLANA DEVNET/MAINNET</li>
            <li>• PHANTOM WALLET SUPPORT</li>
            <li>• SOLFLARE INTEGRATION</li>
            <li>• REAL-TIME VALIDATION</li>
            <li>• INSTANT CONFIRMATION</li>
            <li>• 500+ RECIPIENTS SUPPORT</li>
            <li>• SUB-2S PROCESSING TIME</li>
          </ul>
        </aside>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="px-8 py-20">
        <h2 className="text-4xl font-black mb-4">WHY BULK?</h2>
        <p className="text-lg mb-12">BUILT DIFFERENT. WORKS BETTER.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap />}
            title="LIGHTNING SPEED"
            stat="<2s"
            description="Process 500+ transactions in under 2 seconds. Powered by Solana's high-performance blockchain."
          />

          <FeatureCard
            icon={<Shield />}
            title="BULLET-PROOF"
            stat="99.9%"
            description="Real-time validation. Multi-sig support. Your funds are protected at every step."
          />

          <FeatureCard
            icon={<Network />}
            title="INFINITE SCALE"
            stat="10k+"
            description="From 10 to 10,000 recipients. Our infrastructure scales with your ambition."
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-8 py-20 text-center">
        <h2 className="text-4xl font-black mb-4">READY TO SEND?</h2>
        <p className="mb-8">Connect your wallet and start sending in 30 seconds.</p>

        <Link
          href="/sender"
          className="px-8 py-4 bg-black text-white rounded-xl inline-flex items-center gap-2 hover:bg-gray-900 transition"
        >
          LAUNCH APP <ArrowRight />
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="px-8 py-16 border-t text-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="font-black text-xl">BULKSEND</div>

          <div className="flex gap-6">
            <Link href="#">TWITTER</Link>
            <Link href="#">DISCORD</Link>
            <Link href="#">DOCS</Link>
            <Link href="#">GITHUB</Link>
          </div>
        </div>

        <div className="mt-6 opacity-60">
          © 2024 BULKSEND. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  stat,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  stat: string;
  description: string;
}) {
  return (
    <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-lg">
          {icon}
        </div>
        <div className="text-2xl font-bold">{stat}</div>
      </div>

      <h3 className="font-black text-xl mb-2">{title}</h3>
      <p className="opacity-70">{description}</p>
    </div>
  );
}
