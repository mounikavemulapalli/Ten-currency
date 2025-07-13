/** @format */

import React, { useState, useEffect } from "react";

const TokenCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokens, setTokens] = useState([]); // ✅ new state to hold fetched tokens

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, symbol, supply } = formData;

    if (!name || !symbol || !supply) {
      setError("⚠️ All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          symbol,
          supply: Number(supply),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "❌ Token creation failed.");
        setLoading(false);
        return;
      }

      console.log("✅ Token created:", data);
      setSubmitted(true);
      fetchTokens(); // ✅ reload tokens after creation
    } catch (err) {
      console.error("❌ Error creating token:", err);
      setError("❌ Network/server error.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch all tokens from the backend
  const fetchTokens = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/token");
      const data = await res.json();
      setTokens(data);
    } catch (err) {
      console.error("❌ Error fetching tokens:", err);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black px-4 py-12 text-white'>
      <div className='max-w-xl w-full bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl space-y-6'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-center text-purple-300'>
          🚀 Create Your TEN Token
        </h2>
        <p className='text-center text-gray-300'>
          Define your token's <span className='text-yellow-300'>Name</span>,
          <span className='text-yellow-300'> Symbol</span>, and
          <span className='text-yellow-300'> Initial Supply</span> to mint a
          custom cryptocurrency on the blockchain.
        </p>

        {submitted ? (
          <div className='text-center space-y-4'>
            <p className='text-green-400 text-lg font-semibold'>
              ✅ Token created successfully!
            </p>
            <p className='text-gray-400 text-sm'>
              This token has been saved to the backend.
            </p>
            <button
              className='mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md'
              onClick={() => {
                setFormData({ name: "", symbol: "", supply: "" });
                setSubmitted(false);
              }}
            >
              🔁 Create Another Token
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='text'
              name='name'
              placeholder='🔤 Token Name (e.g., TEN Coin)'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
            <input
              type='text'
              name='symbol'
              placeholder='🔠 Token Symbol (e.g., TEN)'
              value={formData.symbol}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
            <input
              type='number'
              name='supply'
              placeholder='📦 Initial Supply (e.g., 1000000)'
              value={formData.supply}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-400'
            />

            {error && <p className='text-red-400 text-sm'>{error}</p>}

            <button
              type='submit'
              className='w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition'
              disabled={loading}
            >
              {loading ? "🔄 Creating..." : "🪙 Create Token"}
            </button>
          </form>
        )}

        <div className='mt-6 text-center text-sm text-gray-400'>
          ⚙️ Tokens you create here are saved in your local backend and can
          later be connected to payment gateways or explorers.
        </div>
      </div>

      {/* ✅ Token List Section */}
      {tokens.length > 0 && (
        <div className='max-w-4xl w-full mt-10'>
          <h3 className='text-xl font-bold text-purple-200 mb-4'>
            🧾 Created Tokens
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {tokens.map((token) => (
              <div
                key={token._id}
                className='bg-white/10 p-4 rounded-lg border border-purple-500'
              >
                <h4 className='text-lg text-yellow-200 font-semibold'>
                  {token.name}
                </h4>
                <p className='text-gray-300'>
                  Symbol: <span className='font-mono'>{token.symbol}</span>
                </p>
                <p className='text-gray-300'>Supply: {token.supply}</p>
                <p className='text-xs text-gray-400'>
                  Created: {new Date(token.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenCreation;
