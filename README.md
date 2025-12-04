# Solana Bulk Sender

A modern, efficient web application for sending SOL (Solana) tokens to multiple addresses simultaneously. Built with Next.js and TypeScript, featuring a sleek UI and seamless wallet integration.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Web3.js-purple?style=flat-square&logo=solana)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)

## Features

- **Bulk Transactions**: Send SOL to multiple recipients in a single transaction
- **Wallet Integration**: Seamless connection with Solana wallet adapters (Phantom, Solflare, etc.)
- **Real-time SOL Price**: Live price tracking for accurate fee calculations
- **Input Validation**: Automatic validation of addresses and amounts before sending
- **Transaction Logging**: Real-time transaction status and confirmation tracking
- **Modern UI**: Beautiful, responsive design with dark theme
- **Fast & Efficient**: Optimized transaction batching for better performance

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Blockchain**: [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- **Wallet**: [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- A Solana wallet extension (Phantom, Solflare, etc.)

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Solana
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Usage Guide

### 1. Connect Your Wallet

Click the "Select Wallet" button and choose your preferred Solana wallet (Phantom, Solflare, etc.).

### 2. Prepare Recipient List

Enter your recipient addresses and amounts in the text area. Use the following format:

```
<SOLANA_ADDRESS> <AMOUNT_IN_SOL>
```

**Example:**

```
8xyt...abcd 0.5
DnKw...99x 1.2
7mNp...xyz 2.5
```

- Each line represents one recipient
- Separate address and amount with a space or comma
- Amount should be in SOL (not lamports)

### 3. Review Transaction

- Check the total amount to be sent
- Verify the platform fee ($1 USD, converted to SOL)
- Ensure you have sufficient balance

### 4. Send Transactions

Click the "Kirim Massal Sekarang" button to execute the bulk transfer. The application will:

1. Validate all addresses and amounts
2. Create a transaction with all recipients
3. Add the platform fee
4. Request wallet confirmation
5. Broadcast to the Solana network
6. Wait for confirmation

### 5. Monitor Status

Watch the transaction log for real-time updates:

- Pending: Transaction submitted
- Success: Transaction confirmed
- Error: Transaction failed (with error details)

## Project Structure

```
Solana/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── layout.tsx      # Root layout with wallet provider
│   │   └── page.tsx        # Main bulk sender page
│   ├── components/
│   │   ├── bulksender/     # Bulk sender components
│   │   │   ├── InputForm.tsx
│   │   │   └── TransactionLog.tsx
│   │   ├── contexts/       # React contexts
│   │   │   └── ClientWalletProvider.tsx
│   │   └── ui/             # UI components
│   │       └── StatusMessage.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useBulkTransaction.ts
│   │   └── useSolPrice.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   └── utils/              # Utility functions
│       ├── parsing.ts      # Input parsing logic
│       └── validation.ts   # Address validation
├── public/                 # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration

### Platform Fee

The platform fee is set to **$1 USD** (converted to SOL based on current market price). To modify this:

1. Open `src/app/page.tsx`
2. Locate the `FEE_USD` constant
3. Update the value as needed

```typescript
const FEE_USD = 1.0; // Change this value
```

### Wallet Address

Update the recipient wallet address for platform fees:

```typescript
const MY_WALLET_ADDRESS = new PublicKey("YOUR_WALLET_ADDRESS_HERE");
```

## Important Notes

- **Transaction Limits**: Currently supports up to ~20 recipients per transaction. For larger batches, consider splitting into multiple transactions.
- **Network Fees**: In addition to the platform fee, Solana network fees will apply.
- **Test First**: Always test with small amounts on devnet before using mainnet.
- **Security**: Never share your private keys. This application uses wallet extensions for secure signing.

## Troubleshooting

### Wallet Not Connecting

- Ensure you have a Solana wallet extension installed
- Check that the extension is unlocked
- Try refreshing the page

### Transaction Fails

- Verify you have sufficient SOL balance (amount + fees)
- Check that all recipient addresses are valid
- Ensure you're connected to the correct network (mainnet/devnet)

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Resources

- [Solana Documentation](https://docs.solana.com/)
- [Solana Web3.js API](https://solana-labs.github.io/solana-web3.js/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wallet Adapter Documentation](https://github.com/solana-labs/wallet-adapter)

## Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Built with ❤️ for the Solana ecosystem**
