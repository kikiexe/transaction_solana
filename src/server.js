const express = require('express');
const cors = require('cors');
const bs58 = require('bs58'); // pastikan kamu install ini
const {
  Connection,
  clusterApiUrl,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram
} = require('@solana/web3.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const connection = new Connection(clusterApiUrl('devnet'));

// Load sender wallet from .env
let sender;
try {
  if (!process.env.PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY environment variable is not set');
  }
  sender = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY)));
} catch (error) {
  console.error('❌ Error loading private key:', error.message);
  console.log('📝 Please create a .env file with your Solana private key:');
  console.log('PRIVATE_KEY="[your_private_key_array_here]"');
  console.log('💡 You can generate a new keypair using:');
  console.log('   const { Keypair } = require("@solana/web3.js");');
  console.log('   const keypair = Keypair.generate();');
  console.log('   console.log(JSON.stringify(Array.from(keypair.secretKey)));');
  process.exit(1);
}


// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Solana Transaction API Running...');
});

// Send transaction endpoint
app.post('/send', async (req, res) => {
  const { recipient, amount } = req.body;

  if (!recipient || !amount) {
    return res.status(400).json({ error: 'Recipient and amount are required' });
  }

  try {
    const recipientPubKey = new PublicKey(recipient);
    const feeReceiver = new PublicKey('ECBjShk4F5A34568iLhJuMkFbA6aVjcqv5UKKz7VnBqi');

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: recipientPubKey,
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
      }),
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: feeReceiver,
        lamports: 0.01 * LAMPORTS_PER_SOL,
      })
    );

    const signature = await connection.sendTransaction(transaction, [sender]);
    await connection.confirmTransaction(signature, 'confirmed');

    return res.status(200).json({
      message: '✅ Transaction successful!',
      signature: signature
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: '❌ Transaction failed',
      detail: err.message
    });
  }
});

// Log wallet balance before starting server
connection.getBalance(sender.publicKey).then(balance => {
  console.log(`💰 Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
