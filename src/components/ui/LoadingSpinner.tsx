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
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 20,
    md: 32,
    lg: 48
  };

  const Spinner = () => (
    
      
      {text && (
        {text}
      )}
    
  );

  if (fullScreen) {
    return (
      
        
      
    );
  }

  return ;
}

// Inline loading untuk buttons
export function InlineLoader({ size = 16 }: { size?: number }) {
  return ;
}