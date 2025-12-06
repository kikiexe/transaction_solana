// src/lib/constants.ts
import { PublicKey } from "@solana/web3.js";

// Platform Configuration
export const PLATFORM_FEE_USD = 1.0;
export const PLATFORM_WALLET = new PublicKey("ECBjShk4F5A34568iLhJuMkFbA6aVjcqv5UKKz7VnBqi");

// Transaction Limits
export const MAX_RECIPIENTS_PER_TX = 20;
export const MAX_RECIPIENTS_TOTAL = 1000;

// Price API
export const SOL_PRICE_API = "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd";
export const PRICE_REFRESH_INTERVAL = 60000;

// Network
export const NETWORK = "devnet";
export const EXPLORER_URL = "https://explorer.solana.com";

// Format helpers
export const formatAddress = (address: string, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const formatSOL = (lamports: number) => {
  return (lamports / 1_000_000_000).toFixed(4);
};

export const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};