// src/components/ui/StatusMessage.tsx
import React from "react";

interface StatusMessageProps {
  status: {
    type: 'success' | 'error' | 'processing' | 'idle';
    message: string;
  } | null;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (!status || status.type === 'idle') return null;

  const getStyles = () => {
    switch (status.type) {
      case 'error':
        return "bg-red-900/50 text-red-200 border-red-700";
      case 'success':
        return "bg-green-900/50 text-green-200 border-green-700";
      case 'processing':
        return "bg-blue-900/50 text-blue-200 border-blue-700 animate-pulse";
      default:
        return "bg-gray-800 text-gray-200";
    }
  };

  return (
    <div className={`p-4 rounded-lg border text-center font-medium mt-4 ${getStyles()}`}>
      {status.message}
    </div>
  );
};