"use client";

import { useState, useMemo } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// Hooks & Utils
import { useSolPrice } from "../hooks/useSolPrice";
import { parseInputText } from "../utils/parsing";
import { Recipient } from "../types";

// Components
import { InputForm } from "../components/bulksender/InputForm";
import { StatusMessage } from "../components/ui/StatusMessage";
import { TransactionLog } from "../components/bulksender/TransactionLog";

// --- CONFIG ---
const MY_WALLET_ADDRESS = new PublicKey("ECBjShk4F5A34568iLhJuMkFbA6aVjcqv5UKKz7VnBqi"); 
const FEE_USD = 1.0;
// --------------

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { price: solPrice, loading: priceLoading } = useSolPrice();

  // State UI
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success'|'error'|'processing'|'idle', message: string } | null>(null);
  const [logs, setLogs] = useState<any[]>([]);

  // Computed Values (Hitung otomatis saat input berubah)
  const parsedData = useMemo(() => parseInputText(inputText), [inputText]);
  
  const totalToSend = parsedData.isValid && parsedData.recipients 
    ? parsedData.recipients.reduce((acc, curr) => acc + curr.amount, 0)
    : 0;

  const feeInSol = solPrice > 0 ? FEE_USD / solPrice : 0;

  // --- FUNGSI UTAMA: KIRIM ---
  const handleSend = async () => {
    if (!publicKey || !parsedData.isValid || !parsedData.recipients) return;

    setIsProcessing(true);
    setStatus({ type: 'processing', message: 'Memulai proses transaksi...' });
    setLogs([]);

    try {
      // 1. Persiapan Data
      const recipients = parsedData.recipients;
      const transaction = new Transaction();

      // 2. Masukkan Fee Platform ($1)
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: MY_WALLET_ADDRESS,
          lamports: Math.round(feeInSol * LAMPORTS_PER_SOL),
        })
      );

      // 3. Masukkan Semua Penerima (Batching sederhana < 20 orang)
      // TODO: Nanti kita upgrade ke "Chunking" loop jika > 20
      recipients.forEach((r: Recipient) => {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: r.address,
            lamports: Math.round(r.amount * LAMPORTS_PER_SOL),
          })
        );
      });

      // 4. Kirim ke Network
      const signature = await sendTransaction(transaction, connection);
      
      // Log UI
      setLogs(prev => [...prev, { 
        id: Date.now().toString(), 
        message: `Transaksi dikirim! Menunggu konfirmasi...`, 
        status: 'pending',
        signature 
      }]);

      // 5. Konfirmasi
      await connection.confirmTransaction(signature, "confirmed");

      setStatus({ type: 'success', message: 'Semua pengiriman berhasil!' });
      setLogs(prev => [...prev, { 
        id: Date.now().toString() + 'done', 
        message: `Sukses! Transaksi confirmed.`, 
        status: 'success' 
      }]);

      setInputText(""); // Reset form

    } catch (error: any) {
      console.error(error);
      setStatus({ type: 'error', message: error.message || "Terjadi kesalahan saat mengirim." });
      setLogs(prev => [...prev, { 
        id: Date.now().toString(), 
        message: `Gagal: ${error.message}`, 
        status: 'error' 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl space-y-6">
        
        {/* Header Card */}
        <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700 shadow-2xl text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600 mb-2">
            Solana Bulk Sender
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Kirim SOL ke banyak alamat sekaligus. Hemat waktu & tenaga.
          </p>
          
          <div className="flex justify-center">
            <WalletMultiButton style={{ background: '#4f46e5', borderRadius: '12px' }} />
          </div>
        </div>

        {/* Main App Logic */}
        {publicKey ? (
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 shadow-xl">
            
            {/* Info Bar */}
            <div className="flex flex-wrap justify-between items-center bg-[#0f172a] p-4 rounded-xl mb-6 border border-gray-800">
              <div className="text-sm">
                <p className="text-gray-400">Harga SOL</p>
                <p className="font-bold text-green-400">
                  {priceLoading ? "..." : `$${solPrice.toFixed(2)}`}
                </p>
              </div>
              <div className="text-sm text-right">
                <p className="text-gray-400">Estimasi Total Kirim</p>
                <p className="font-bold text-white">{totalToSend.toFixed(4)} SOL</p>
              </div>
            </div>

            {/* Input Form */}
            <InputForm 
              value={inputText} 
              onChange={setInputText} 
              disabled={isProcessing} 
            />

            {/* Validation Error (Realtime) */}
            {!parsedData.isValid && inputText.trim() !== "" && (
              <p className="text-red-400 text-sm mt-2">⚠️ {parsedData.message}</p>
            )}

            {/* Summary & Action Button */}
            <div className="mt-6 border-t border-gray-700 pt-6">
              <div className="flex justify-between text-sm mb-4 text-gray-400">
                <span>Penerima: {parsedData.recipients?.length || 0} alamat</span>
                <span>Platform Fee: {feeInSol.toFixed(6)} SOL ($1)</span>
              </div>

              <button
                onClick={handleSend}
                disabled={isProcessing || !parsedData.isValid || !parsedData.recipients?.length || priceLoading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95
                  ${isProcessing || !parsedData.isValid 
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                    : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 text-white"
                  }`}
              >
                {isProcessing ? "Sedang Memproses..." : "🚀 Kirim Massal Sekarang"}
              </button>
            </div>

            {/* Status & Logs */}
            <StatusMessage status={status} />
            <TransactionLog logs={logs} />

          </div>
        ) : (
          <div className="text-center p-10 text-gray-500">
            👆 Hubungkan wallet di atas untuk memulai.
          </div>
        )}
      </div>
    </main>
  );
}