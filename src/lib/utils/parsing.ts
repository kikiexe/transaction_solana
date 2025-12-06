// src/lib/utils/parsing.ts
import { PublicKey } from "@solana/web3.js";
import { Recipient, ValidationResult } from "../../types";
import { isValidSolanaAddress } from "./validation"; // ✅ FIXED

export const parseInputText = (text: string): ValidationResult => {
  if (!text.trim()) {
    return { isValid: false, message: "Input kosong" };
  }

  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const recipients: Recipient[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const parts = line.split(/[\s,]+/);

    if (parts.length < 2) {
      return { 
        isValid: false, 
        message: `Baris ${i + 1} salah format. Gunakan: ALAMAT JUMLAH` 
      };
    }

    const addressStr = parts[0];
    const amountStr = parts[1];
    const amount = parseFloat(amountStr);

    if (!isValidSolanaAddress(addressStr)) {
      return { 
        isValid: false, 
        message: `Baris ${i + 1}: Alamat wallet tidak valid` 
      };
    }

    if (isNaN(amount) || amount <= 0) {
      return { 
        isValid: false, 
        message: `Baris ${i + 1}: Jumlah SOL tidak valid` 
      };
    }

    recipients.push({
      address: new PublicKey(addressStr),
      amount: amount,
    });
  }

  return { isValid: true, recipients };
};