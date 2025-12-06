// src/components/ui/WalletButton.tsx
"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletButton({ style }: { style?: React.CSSProperties }) {
  return <WalletMultiButton style={style} />;
}   