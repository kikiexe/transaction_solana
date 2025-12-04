// src/hooks/useSolPrice.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSolPrice = () => {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        setPrice(response.data.solana.usd);
      } catch (error) {
        console.error("Gagal ambil harga SOL, menggunakan harga fallback.");
        setPrice(150); // Fallback aman jika API limit/down
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    // Refresh harga setiap 60 detik
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return { price, loading };
};