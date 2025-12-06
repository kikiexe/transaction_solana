// src/components/ui/StatusMessage.tsx
import React from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Loader2, 
  X 
} from "lucide-react";

interface StatusMessageProps {
  status: {
    type: 'success' | 'error' | 'processing' | 'idle' | 'info' | 'warning';
    message: string;
  } | null;
  onClose?: () => void;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status, onClose }) => {
  if (!status || status.type === 'idle') return null;

  const configs = {
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-700",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-700",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />
    },
    processing: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: <Info className="w-5 h-5 text-blue-600" />
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-700",
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />
    },
    idle: {
      bg: "bg-gray-50",
      border: "border-gray-500",
      text: "text-gray-700",
      icon: <Info className="w-5 h-5 text-gray-600" />
    }
  };

  const config = configs[status.type];

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg border 
        ${config.bg} ${config.border} ${config.text}
      `}
    >
      {/* Icon */}
      <div className="shrink-0">
        {config.icon}
      </div>

      {/* Message */}
      <div className="flex-1 font-medium">
        {status.message}
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
