// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes {
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
    
      {label && (
        
          {label}
        
      )}
      
      
      
      {error && (
        {error}
      )}
      
      {helper && !error && (
        {helper}
      )}
    
  );
}

// Textarea variant
export function Textarea({ 
  label, 
  error, 
  helper,
  className = "",
  ...props 
}: React.TextareaHTMLAttributes & {
  label?: string;
  error?: string;
  helper?: string;
}) {
  return (
    
      {label && (
        
          {label}
        
      )}
      
      
      
      {error && (
        {error}
      )}
      
      {helper && !error && (
        {helper}
      )}
    
  );
}
```

---

# ✅ USAGE EXAMPLES

## Button
```typescript
import { Button } from "@/components/ui/Button";


  Click Me



  Loading...

```

## Card
```typescript
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";


  
    Title
  
  
    Content here
  
  
    Footer
  

```

## Badge
```typescript
import { Badge, SuccessBadge } from "@/components/ui/Badge";

Active
Completed
```

## Modal
```typescript
import { Modal, ModalFooter } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";


  Are you sure?
  
    Cancel
    Confirm
  

```

## LoadingSpinner
```typescript
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";