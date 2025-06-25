/** @format */

import React, { useState } from "react";
import axios from "axios";

const Transaction = () => {
  const [fromAddress, setFromAddress] = useState("");
  const [privateKey, setprivatekey] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTransfer = async () => {
    const trimmedPrivateKey = privateKey.trim();
    const trimmedFromAddress = fromAddress.trim();
    const trimmedToAddress = toAddress.trim();

    if (
      !trimmedFromAddress ||
      !trimmedPrivateKey ||
      !trimmedToAddress ||
      !amount
    ) {
      alert("All fields are required");
      return;
    }
    if (!/^([0-9a-fA-F]{128})$/.test(trimmedPrivateKey)) {
      alert("Private key must be 128 hex characters");
      return;
    }

    // Validate address format
    if (
      !/^0x[0-9a-fA-F]{64}$/.test(trimmedFromAddress) ||
      !/^0x[0-9a-fA-F]{64}$/.test(trimmedToAddress)
    ) {
      alert("Address must start with 0x followed by 64 hex characters");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/txn/send",
        {
          fromAddress: trimmedFromAddress,
          privateKey: trimmedPrivateKey,
          toAddress: trimmedToAddress,
          amount: Math.floor(parseFloat(amount)),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      setMessage("✅ Transfer successful. Hash: " + res.data.hash);
    } catch (error) {
      console.error("Transfer error:", error.response?.data || error.message);
      setMessage(
        "❌ Transfer failed: " + (error.response?.data?.msg || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white px-4 py-10'>
      <h1 className='text-3xl font-bold text-center mb-6'>Transfer TEN Coin</h1>
      <div className='max-w-md mx-auto space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg'>
        <input
          className='w-full p-2 rounded bg-gray-700 text-white'
          placeholder='Sender Wallet Address'
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
        />
        <input
          className='w-full p-2 rounded bg-gray-700 text-white'
          placeholder='Private Key'
          value={privateKey}
          onChange={(e) => setprivatekey(e.target.value)}
        />

        <input
          className='w-full p-2 rounded bg-gray-700 text-white'
          placeholder='Recipient Wallet Address'
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          className='w-full p-2 rounded bg-gray-700 text-white'
          placeholder='Amount'
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleTransfer}
          className='w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded'
          disabled={loading}
        >
          {loading ? "Transferring..." : "Send Tokens"}
        </button>
        {!loading && message.includes("Transfer successful") && (
          <button
            className='w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded'
            onClick={() => {
              setFromAddress("");
              setprivatekey("");
              setToAddress("");
              setAmount("");
              setMessage("");
            }}
          >
            Clear Form
          </button>
        )}

        {message && (
          <div
            className={`text-center font-medium ${
              message.includes("failed") ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
