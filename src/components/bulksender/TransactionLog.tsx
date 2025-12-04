// src/components/BulkSender/TransactionLog.tsx
import React from "react";

interface LogItem {
  id: string;
  message: string;
  signature?: string;
  status: 'pending' | 'success' | 'error';
}

export const TransactionLog: React.FC<{ logs: LogItem[] }> = ({ logs }) => {
  if (logs.length === 0) return null;

  return (
    <div className="mt-6 bg-gray-900 rounded-xl p-4 border border-gray-800 max-h-60 overflow-y-auto">
      <h3 className="text-sm font-bold text-gray-400 mb-3 sticky top-0 bg-gray-900">
        Riwayat Proses:
      </h3>
      <div className="space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 text-xs font-mono border-b border-gray-800 pb-2 last:border-0">
            <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 
              ${log.status === 'success' ? 'bg-green-500' : 
                log.status === 'error' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`} 
            />
            <div className="flex-1">
              <p className="text-gray-300">{log.message}</p>
              {log.signature && (
                <a 
                  href={`https://explorer.solana.com/tx/${log.signature}?cluster=devnet`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline mt-1 block"
                >
                  Lihat di Explorer ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};