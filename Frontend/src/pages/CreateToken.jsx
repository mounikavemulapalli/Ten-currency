/** @format */

import React, { useState } from "react";

const TokenCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      // Placeholder for real deployment
      console.log("Deploying token with:", formData);
      await new Promise((res) => setTimeout(res, 2000));
      setSubmitted(true);
    } catch (err) {
      setError("❌ Token creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black px-4 py-12 text-white">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-300">
          🚀 Create Your TEN Token
        </h2>
        <p className="text-center text-gray-300">
          Define your token's <span className="text-yellow-300">Name</span>,
          <span className="text-yellow-300"> Symbol</span>, and
          <span className="text-yellow-300"> Initial Supply</span> to mint a custom cryptocurrency on the blockchain.
        </p>

        {submitted ? (
          <div className="text-center space-y-4">
            <p className="text-green-400 text-lg font-semibold">
              ✅ Token created successfully (mock)!
            </p>
            <p className="text-gray-400 text-sm">
              This is a simulation. Smart contract deployment integration will be required for production.
            </p>
            <button
              className="mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
              onClick={() => {
                setFormData({ name: "", symbol: "", supply: "" });
                setSubmitted(false);
              }}
            >
              🔁 Create Another Token
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="🔤 Token Name (e.g., TEN Coin)"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              name="symbol"
              placeholder="🔠 Token Symbol (e.g., TEN)"
              value={formData.symbol}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="number"
              name="supply"
              placeholder="📦 Initial Supply (e.g., 1000000)"
              value={formData.supply}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition"
              disabled={loading}
            >
              {loading ? "🔄 Creating..." : "🪙 Create Token"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-400">
          ⚙️ Tokens you create here can later be consumed by payment gateways and wallet explorers within the TEN ecosystem.
        </div>
      </div>
    </div>
  );
};

export default TokenCreation;
