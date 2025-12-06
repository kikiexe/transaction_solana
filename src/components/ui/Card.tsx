// src/components/ui/Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "bordered" | "ghost";
  hover?: boolean;
  className?: string;
}

export function Card({ 
  children, 
  variant = "default", 
  hover = false,
  className = "" 
}: CardProps) {
  const variants = {
    default: "bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    bordered: "bg-white rounded-2xl border-2 border-black",
    ghost: "bg-gray-50 rounded-2xl border-2 border-gray-200"
  };

  const hoverStyles = hover 
    ? "hover:shadow-[12px_12px_0px_0px_rgba(255,107,53,1)] hover:-translate-y-1 transition-all duration-200" 
    : "";

  return (
    
      {children}
    
  );
}

export function CardHeader({ 
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

export function CardBody({ 
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

export function CardFooter({ 
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