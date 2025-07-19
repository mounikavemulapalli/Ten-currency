/** @format */

// components/TokenBalance.js
import { useEffect, useState } from "react";
import axios from "axios";

const TokenBalance = ({ wallet }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (!wallet) return;

    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/token/balance/${wallet}`
        );
        setBalance(res.data.balance);
      } catch (err) {
        console.error("Error fetching token balance", err);
      }
    };

    fetchBalance();
  }, [wallet]);

  return (
    <div className='token-balance'>
      <h3>Wallet: {wallet}</h3>
      <h4>Balance: {balance ?? "Loading..."} TEN</h4>
    </div>
  );
};

export default TokenBalance;
