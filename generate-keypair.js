const { Keypair } = require('@solana/web3.js');

// Generate a new keypair
const keypair = Keypair.generate();

console.log('🔑 Generated new Solana keypair:');
console.log('');
console.log('📋 Public Key:');
console.log(keypair.publicKey.toString());
console.log('');
console.log('🔐 Private Key (for .env file):');
console.log('PRIVATE_KEY="' + JSON.stringify(Array.from(keypair.secretKey)) + '"');
console.log('');
console.log('📝 Copy the PRIVATE_KEY line above to your .env file');
console.log('⚠️  Keep your private key secure and never share it!'); 