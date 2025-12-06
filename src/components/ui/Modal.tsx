// src/components/ui/Modal.tsx
"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = "md" 
}: ModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };

  return (
    
      {/* Backdrop */}
      
      
      {/* Modal Content */}
      
        
        {/* Header */}
        {title && (
          
            {title}
            
              
            
          
        )}

        {/* Body */}
        
          {children}
        
      
    
  );
}

// Modal Footer component
export function ModalFooter({ 
  children,
  className = ""
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    
      {children}
    
  );
}