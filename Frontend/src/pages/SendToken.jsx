/** @format */

import React, { useState } from "react";
import { ethers } from "ethers";

const SendToken = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  // Replace with any ERC20 contract on Goerli or Sepolia
  const tokenAddress = "0x509Ee0d083DdF8AC028f2a56731412EDD63223B9";
  const tokenABI = [
    "function transfer(address to, uint256 amount) public returns (bool)",
    "function decimals() view returns (uint8)",
  ];

  const handleSend = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const token = new ethers.Contract(tokenAddress, tokenABI, signer);

      const decimals = await token.decimals();
      const parsedAmount = ethers.parseUnits(amount, decimals);

      const tx = await token.transfer(to, parsedAmount);
      await tx.wait();

      setTxHash(tx.hash);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Transaction failed");
    }
  };

  return (
    <div className='p-4 bg-gray-800 text-white rounded-md max-w-md mx-auto mt-6'>
      <h2 className='text-xl font-bold mb-4'>Send Test USDT</h2>
      <input
        type='text'
        placeholder='Recipient Address'
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className='w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600'
      />
      <input
        type='number'
        placeholder='Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className='w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600'
      />
      <button
        onClick={handleSend}
        className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'
      >
        Send USDT
      </button>
      {txHash && (
        <p className='mt-4 text-green-400'>
          ✅ Sent! TX:{" "}
          <a
            href={`https://goerli.etherscan.io/tx/${txHash}`}
            target='_blank'
            rel='noreferrer'
            className='underline'
          >
            {txHash.slice(0, 10)}...
          </a>
        </p>
      )}
      {error && <p className='text-red-400 mt-2'>{error}</p>}
    </div>
  );
};

export default SendToken;
