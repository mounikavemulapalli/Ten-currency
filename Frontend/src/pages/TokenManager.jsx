/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";

const TokenManager = () => {
  const [tokens, setTokens] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddToken = () => {
    setSuccessMessage("");
    setTokens([
      ...tokens,
      {
        name: "",
        symbol: "",
        supply: "",
        id: Date.now(),
      },
    ]);
  };

  const handleChange = (id, key, value) => {
    setTokens(
      tokens.map((token) =>
        token.id === id ? { ...token, [key]: value } : token
      )
    );
  };

  const handleDelete = (id) => {
    setTokens(tokens.filter((token) => token.id !== id));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokens }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("✅ Tokens saved to backend successfully!");
      } else {
        setSuccessMessage("❌ Failed to save tokens: " + data.error);
      }
    } catch (err) {
      console.error("Save failed:", err);
      setSuccessMessage("❌ Network error while saving tokens.");
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 text-white flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-5xl space-y-6'>
        <motion.h1
          className='text-center text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🛠️ Custom Token Generator
        </motion.h1>

        <p className='text-center text-gray-300 max-w-3xl mx-auto'>
          Create, customize, and manage your own tokens with ease. These tokens
          can be used across the TEN platform and integrated into the payment
          gateway.
        </p>

        <div className='grid md:grid-cols-2 gap-6'>
          {tokens.map((token) => (
            <motion.div
              key={token.id}
              className='bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-sm space-y-4 relative'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className='absolute top-3 right-3 text-red-400 hover:text-red-600 text-xl'
                onClick={() => handleDelete(token.id)}
                title='Delete Token'
              >
                🗑️
              </button>

              <input
                type='text'
                placeholder='🔤 Token Name (e.g., AlphaCoin)'
                value={token.name}
                onChange={(e) => handleChange(token.id, "name", e.target.value)}
                className='w-full px-4 py-2 rounded bg-white text-black focus:outline-none'
              />

              <input
                type='text'
                placeholder='🔠 Symbol (e.g., ALP)'
                value={token.symbol}
                onChange={(e) =>
                  handleChange(token.id, "symbol", e.target.value)
                }
                className='w-full px-4 py-2 rounded bg-white text-black focus:outline-none'
              />

              <input
                type='number'
                placeholder='📦 Supply'
                value={token.supply}
                onChange={(e) =>
                  handleChange(token.id, "supply", e.target.value)
                }
                className='w-full px-4 py-2 rounded bg-white text-black focus:outline-none'
              />
            </motion.div>
          ))}
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between gap-4 mt-4'>
          <button
            onClick={handleAddToken}
            className='bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold text-white shadow transition'
          >
            ➕ Add New Token
          </button>

          {tokens.length > 0 && (
            <button
              onClick={handleSave}
              className='bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold text-white shadow transition'
            >
              💾 Save Tokens
            </button>
          )}
        </div>

        {successMessage && (
          <motion.div
            className='text-center text-green-400 font-medium mt-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {successMessage}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TokenManager;
