// src/app/sender/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import {
  Send,
  AlertCircle,
  CheckCircle,
  Loader2,
  Trash2,
  Upload,
  Download,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

import { useSolPrice } from "../../hooks/useSolPrice";
import { parseInputText } from "../../lib/utils/parsing";
import { Recipient } from "../../types";

const MY_WALLET_ADDRESS = new PublicKey(
  "ECBjShk4F5A34568iLhJuMkFbA6aVjcqv5UKKz7VnBqi"
);
const FEE_USD = 1.0;

export default function SenderPage() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { price: solPrice, loading: priceLoading } = useSolPrice();

  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const parsedData = useMemo(() => parseInputText(inputText), [inputText]);
  const totalToSend =
    parsedData.isValid && parsedData.recipients
      ? parsedData.recipients.reduce((acc, curr) => acc + curr.amount, 0)
      : 0;

  const feeInSol = solPrice > 0 ? FEE_USD / solPrice : 0;
  const totalWithFee = totalToSend + feeInSol;

  const handleSend = async () => {
    if (!publicKey || !parsedData.isValid || !parsedData.recipients) return;

    setIsProcessing(true);
    setShowSuccess(false);
    setLogs([]);

    try {
      const recipients = parsedData.recipients;
      const transaction = new Transaction();

      // Fee
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: MY_WALLET_ADDRESS,
          lamports: Math.round(feeInSol * LAMPORTS_PER_SOL),
        })
      );

      // Recipients
      recipients.forEach((r: Recipient) => {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: r.address,
            lamports: Math.round(r.amount * LAMPORTS_PER_SOL),
          })
        );
      });

      setLogs((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          message: `Sending to ${recipients.length} addresses...`,
          status: "pending",
        },
      ]);

      const signature = await sendTransaction(transaction, connection);

      setLogs((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-sent",
          message: "Transaction sent! Waiting for confirmation...",
          status: "pending",
          signature,
        },
      ]);

      await connection.confirmTransaction(signature, "confirmed");

      setLogs((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-confirmed",
          message: "✓ All transfers completed successfully!",
          status: "success",
          signature,
        },
      ]);

      setShowSuccess(true);
      setInputText("");
    } catch (error: any) {
      setLogs((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          message: `Error: ${error.message}`,
          status: "error",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputText(text);
    };
    reader.readAsText(file);
  };

  const handleExportTemplate = () => {
    const template =
      "# Bulk Sender Template\n# Format: ADDRESS AMOUNT\n\n# Example:\n# 8xytAbcd1234567890 0.5\n# DnKw99xYz9876543210 1.2\n\n";
    const blob = new Blob([template], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulksend-template.txt";
    a.click();
  };

  return (
    <div className="w-full min-h-screen p-6">
      {/* Back */}
      <Link
        href="/"
        className="flex items-center gap-2 text-orange-500 hover:underline mb-6"
      >
        <ArrowLeft size={16} />
        BACK TO HOME
      </Link>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">BULK SENDER TOOL</h1>
          <p className="text-gray-500 mt-1">
            Send SOL to multiple addresses in one transaction
          </p>
        </div>

        <div className="text-right">
          <p className="font-bold">SOL PRICE</p>
          <p className="text-xl">
            {priceLoading ? "..." : `$${solPrice.toFixed(2)}`}
          </p>
        </div>
      </div>

      {publicKey ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left */}
          <div className="space-y-6">
            <div className="p-6 border-2 border-black rounded-xl bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">RECIPIENT LIST</h2>

                <div className="flex gap-2">
                  <label className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <Upload size={18} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>

                  <button
                    onClick={() => setInputText("")}
                    className="p-2 hover:bg-red-100 rounded-lg text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-gray-500 text-xs mb-2">
                FORMAT: ADDRESS AMOUNT — Example: 8xyt...abcd 0.5
              </p>

              <textarea
                className="w-full h-96 p-4 bg-gray-50 border-2 border-black rounded-xl font-mono text-sm resize-none focus:ring-4 focus:ring-orange-200"
                placeholder="Enter recipient addresses and amounts..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isProcessing}
              />

              {/* Validation */}
              {inputText.trim() !== "" && !parsedData.isValid && (
                <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-300 text-red-600 flex items-start gap-2">
                  <AlertCircle size={18} className="mt-0.5" />
                  <div>
                    <p className="font-semibold">Validation Error</p>
                    <p className="text-sm">{parsedData.message}</p>
                  </div>
                </div>
              )}

              {parsedData.isValid && parsedData.recipients && (
                <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-300 text-green-700 flex items-start gap-2">
                  <CheckCircle size={18} className="mt-0.5" />
                  <div>
                    <p className="font-semibold">Ready to Send</p>
                    <p className="text-sm">
                      {parsedData.recipients.length} addresses validated
                      successfully
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Logs */}
            {logs.length > 0 && (
              <div className="p-6 border-2 border-black rounded-xl bg-white">
                <h3 className="font-bold mb-3">TRANSACTION LOG</h3>

                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 items-start">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${
                          log.status === "success"
                            ? "bg-green-400"
                            : log.status === "error"
                            ? "bg-red-400"
                            : "bg-yellow-400 animate-pulse"
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={
                            log.status === "error" ? "text-red-500" : ""
                          }
                        >
                          {log.message}
                        </p>

                        {log.signature && (
                          <a
                            href={`https://explorer.solana.com/tx/${log.signature}?cluster=devnet`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-orange-500 hover:underline text-xs"
                          >
                            View on Explorer ↗
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="p-6 border-2 border-black rounded-xl bg-white space-y-4">
            <h2 className="font-bold text-lg mb-3">TRANSACTION SUMMARY</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Recipients</span>
                <span>{parsedData.recipients?.length || 0}</span>
              </div>

              <div className="flex justify-between">
                <span>Total to Send</span>
                <span>{totalToSend.toFixed(4)} SOL</span>
              </div>

              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>{feeInSol.toFixed(6)} SOL</span>
              </div>

              <div className="flex justify-between font-semibold">
                <span>TOTAL</span>
                <span>{totalWithFee.toFixed(4)} SOL</span>
              </div>

              <p className="text-right text-xs text-gray-500">
                ≈ ${(totalWithFee * solPrice).toFixed(2)} USD
              </p>
            </div>

            {/* Button */}
            <button
              onClick={handleSend}
              disabled={isProcessing || !parsedData.isValid}
              className={`w-full py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition 
                ${
                  isProcessing
                    ? "bg-gray-400"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> PROCESSING...
                </>
              ) : (
                <>
                  <Send size={18} /> SEND NOW
                </>
              )}
            </button>

            {showSuccess && (
              <div className="p-3 bg-green-50 border border-green-300 rounded-lg text-green-700 flex items-center gap-2">
                <CheckCircle size={18} />
                Success! All transfers completed.
              </div>
            )}

            <div className="p-3 mt-3 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-700 text-sm">
              Note: Transactions are sent to Solana Devnet. Make sure you have
              enough SOL balance including fees.
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 border-2 border-black rounded-xl bg-white text-center">
          <WalletMultiButton />
          <h3 className="mt-4 text-xl font-bold">WALLET NOT CONNECTED</h3>
          <p className="text-gray-500 mt-1">
            Connect your wallet to start sending bulk transactions.
          </p>
        </div>
      )}
    </div>
  );
}
