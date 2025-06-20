/** @format */

import React, { useState } from "react";
import { ethers } from "ethers";

const SendEth = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const sendEth = async () => {
    if (!window.ethereum) return alert("Install MetaMask");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      setTxHash(tx.hash);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Transaction failed");
    }
  };

  return (
    <div className='p-4 bg-gray-800 text-white rounded-md max-w-md mx-auto mt-6'>
      <h2 className='text-xl font-bold mb-4'>Send ETH</h2>

      <input
        type='text'
        placeholder='Recipient Address'
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className='w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600'
      />
      <input
        type='number'
        placeholder='Amount in ETH'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className='w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600'
      />

      <button
        onClick={sendEth}
        className='bg-green-600 px-4 py-2 rounded hover:bg-green-700'
      >
        Send
      </button>

      {txHash && (
        <p className='mt-4 text-green-400'>
          ✅ Sent! TX:{" "}
          <a
            href={`https://etherscan.io/tx/${txHash}`}
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

export default SendEth;
