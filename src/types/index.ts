// src/types/index.ts
import { PublicKey } from "@solana/web3.js";

export interface Recipient {
  address: PublicKey;
  amount: number; // Amount in SOL (bukan lamports)
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  recipients?: Recipient[];
}

export type TransactionStatus = 'idle' | 'processing' | 'success' | 'error';