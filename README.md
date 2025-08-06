# Solana Transaction App (Node.js Version)

A simple web-based application for sending SOL (Solana cryptocurrency) transactions via Phantom wallet integration.

This app allows users to:
- Connect their Phantom wallet
- Enter a recipient address and amount
- Send SOL to the recipient
- Automatically send a 0.01 SOL transaction fee to the developer's wallet

>  **This project is still under development.** Some features may not work as expected, and improvements are ongoing.

---

## Technologies Used

- Node.js
- Express.js
- @solana/web3.js
- JavaScript (vanilla)
- Phantom Wallet

---

## How It Works

1. Users connect their Phantom wallet via frontend
2. Enter recipient address and amount of SOL
3. The backend processes the transaction and sends:
   - `amount` to recipient
   - `0.01 SOL` to developer fee address

---
## Status
This project is a work in progress.
Planned features:

Transaction history

Enhanced frontend UI

Error handling improvements

QR code scanning
## Development Setup

```bash
git clone https://github.com/kikiexe/transaction_solana.git
cd transaction_solana
npm install
npm start