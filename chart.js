const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey } = solanaWeb3;

const connectButton = document.getElementById('connectButton');
const transactionForm = document.getElementById('transactionForm');
const statusText = document.getElementById('status');

let provider = null;
let userPublicKey = null;
const connection = new Connection(clusterApiUrl('mainnet-beta'));
const feeReceiver = new PublicKey('MECBjShk4F5A34568iLhJuMkFbA6aVjcqv5UKKz7VnBqi'); // ganti dengan address walletmu

connectButton.onclick = async () => {
  try {
    const resp = await window.solana.connect();
    userPublicKey = resp.publicKey;
    statusText.textContent = `Connected: ${userPublicKey.toString()}`;
  } catch (err) {
    statusText.textContent = 'Connection failed.';
  }
};

transactionForm.onsubmit = async (e) => {
  e.preventDefault();
  if (!userPublicKey) return alert("Connect wallet first");

  const recipient = new PublicKey(document.getElementById('recipient').value);
  const amount = parseFloat(document.getElementById('amount').value);
  const totalLamports = (amount + 0.01) * LAMPORTS_PER_SOL;

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: userPublicKey,
      toPubkey: recipient,
      lamports: amount * LAMPORTS_PER_SOL,
    }),
    SystemProgram.transfer({
      fromPubkey: userPublicKey,
      toPubkey: feeReceiver,
      lamports: 0.01 * LAMPORTS_PER_SOL,
    })
  );

  try {
    const { signature } = await window.solana.signAndSendTransaction(transaction);
    await connection.confirmTransaction(signature);
    statusText.textContent = `Transaction successful: ${signature}`;
  } catch (err) {
    statusText.textContent = `Transaction failed: ${err.message}`;
  }
};

function isValidSolanaAddress(address) {
  try {
    const pubkey = new PublicKey(address);
    return PublicKey.isOnCurve(pubkey);
  } catch (e) {
    return false;
  }
}

transactionForm.onsubmit = async (e) => {
  e.preventDefault();
  const errorMsg = document.getElementById('errorMsg');
  const spinner = document.getElementById('loadingSpinner');
  errorMsg.textContent = '';
  spinner.style.display = 'block';

  if (!userPublicKey) {
    spinner.style.display = 'none';
    return alert("Connect wallet first");
  }

  const recipientAddress = document.getElementById('recipient').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (!isValidSolanaAddress(recipientAddress)) {
    spinner.style.display = 'none';
    errorMsg.textContent = 'Invalid recipient address.';
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    spinner.style.display = 'none';
    errorMsg.textContent = 'Invalid amount.';
    return;
  }

  const recipient = new PublicKey(recipientAddress);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: userPublicKey,
      toPubkey: recipient,
      lamports: amount * LAMPORTS_PER_SOL,
    }),
    SystemProgram.transfer({
      fromPubkey: userPublicKey,
      toPubkey: feeReceiver,
      lamports: 0.01 * LAMPORTS_PER_SOL,
    })
  );

  try {
    const { signature } = await window.solana.signAndSendTransaction(transaction);
    await connection.confirmTransaction(signature);
    statusText.textContent = `✅ Transaction successful: ${signature}`;
  } catch (err) {
    errorMsg.textContent = `❌ Transaction failed: ${err.message}`;
  } finally {
    spinner.style.display = 'none';
  }
};

