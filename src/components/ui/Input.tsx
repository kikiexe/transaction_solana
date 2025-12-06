// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export function Input({
  label,
  error,
  helper,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <input
        className={`border rounded-lg px-3 py-2 text-sm outline-none transition-all 
        ${error ? "border-red-500" : "border-gray-300"}
        ${className}`}
        {...props}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      {!error && helper && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}
    </div>
  );
}
