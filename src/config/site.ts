// src/config/site.ts
export const siteConfig = {
    name: "Bulksend",
    description: "Lightning-fast bulk transfers on Solana. Send SOL to multiple addresses in one transaction.",
    url: "https://bulksend.app",
    
    links: {
      twitter: "https://twitter.com/bulksend",
      discord: "https://discord.gg/bulksend",
      github: "https://github.com/yourusername/bulksend",
    },
  
    platform: {
      feeUSD: 1.0,
      feeWallet: "ECBjShk4F5A34568iLhJuMkFbA6aVjcqv5UKKz7VnBqi",
      maxRecipients: 500,
      network: "devnet" as const,
    },
  
    features: {
      fileUpload: true,
      csvExport: true,
      transactionHistory: false,
      multiToken: false,
    },
  } as const;
  
  export type SiteConfig = typeof siteConfig;