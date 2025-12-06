// src/components/ui/StatusMessage.tsx
import React from "react";
import { CheckCircle, AlertCircle, Info, Loader2 } from "lucide-react";

interface StatusMessageProps {
  status: {
    type: 'success' | 'error' | 'processing' | 'idle' | 'info' | 'warning';
    message: string;
  } | null;
  onClose?: () => void;
}

export const StatusMessage: React.FC = ({ status, onClose }) => {
  if (!status || status.type === 'idle') return null;

  const configs = {
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-700",
      icon: 
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-700",
      icon: 
    },
    processing: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: 
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: 
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-700",
      icon: 
    },
    idle: {
      bg: "bg-gray-50",
      border: "border-gray-500",
      text: "text-gray-700",
      icon: 
    }
  };

  const config = configs[status.type];

  return (
    
      
        {config.icon}
      
      
        
          {status.message}
        
      
      {onClose && (
        
          
        
      )}
    
  );
};