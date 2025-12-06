// src/components/ui/Badge.tsx
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Badge({ 
  children, 
  variant = "default",
  size = "md",
  className = "" 
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-2 border-gray-300",
    success: "bg-green-100 text-green-800 border-2 border-green-500",
    error: "bg-red-100 text-red-800 border-2 border-red-500",
    warning: "bg-yellow-100 text-yellow-800 border-2 border-yellow-500",
    info: "bg-blue-100 text-blue-800 border-2 border-blue-500"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    
      {children}
    
  );
}

// Preset badges untuk status
export function SuccessBadge({ children }: { children: React.ReactNode }) {
  return {children};
}

export function ErrorBadge({ children }: { children: React.ReactNode }) {
  return {children};
}

export function WarningBadge({ children }: { children: React.ReactNode }) {
  return {children};
}

export function InfoBadge({ children }: { children: React.ReactNode }) {
  return {children};
}