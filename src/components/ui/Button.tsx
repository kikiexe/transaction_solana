// src/components/ui/Button.tsx
import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "font-bold uppercase transition-all transform active:scale-95 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5",
    secondary: "bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5",
    danger: "bg-red-500 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5",
    ghost: "bg-transparent text-black hover:bg-gray-100 border-2 border-transparent hover:border-black"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-lg",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-xl"
  };

  return (
    
      {isLoading && }
      {children}
    
  );
}