// src/components/ui/LoadingSpinner.tsx
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "md",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  const Spinner = (
    <div className="flex flex-col items-center gap-3">
      <Loader2
        size={sizes[size]}
        className="animate-spin text-black"
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
        {Spinner}
      </div>
    );
  }

  return Spinner;
}

// Inline loading untuk buttons
export function InlineLoader({ size = 16 }: { size?: number }) {
  return (
    <Loader2
      size={size}
      className="animate-spin text-white"
    />
  );
}
