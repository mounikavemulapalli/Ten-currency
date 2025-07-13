/** @format */

import React, { useState } from "react";
import { useWallet } from "../hooks/useWallet";

const ConvertSection = () => {
  const { walletAddress, balance, handleConvert } = useWallet();
  const [symbol, setSymbol] = useState("TEN");
  const [amount, setAmount] = useState(10);

  const handleClick = () => {
    handleConvert(symbol, amount);
  };

  return (
    <div className='p-4 bg-gray-800 rounded-lg text-white'>
      <h3 className='text-xl mb-2'>🔁 Convert Tokens to ETH</h3>

      <input
        type='text'
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder='Token Symbol (e.g., TEN)'
        className='mb-2 p-2 rounded text-black'
      />
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder='Amount'
        className='mb-2 p-2 rounded text-black'
      />

      <button
        className='px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded'
        onClick={handleClick}
      >
        Convert to ETH
      </button>
    </div>
  );
};

export default ConvertSection;
