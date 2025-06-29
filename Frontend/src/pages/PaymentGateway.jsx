// src/pages/PaymentGateway.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const coin = location.state?.coin;

  const [amountUSD, setAmountUSD] = useState("");
  const [status, setStatus] = useState("");
  const rate = 1; // 1 TEN = 1 USD
  const tenAmount = amountUSD ? (parseFloat(amountUSD) / rate).toFixed(2) : 0;

  const handlePayment = (e) => {
    e.preventDefault();
    if (!amountUSD || isNaN(amountUSD)) {
      setStatus("❌ Please enter a valid amount.");
      return;
    }

    setStatus("⏳ Processing your payment...");
    setTimeout(() => {
      setStatus(`✅ You purchased ${coin.name} worth $${amountUSD} using ${tenAmount} TEN`);
    }, 1500);
  };

  if (!coin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-br from-gray-900 via-blue-900 to-black px-4">
        <p className="text-xl text-red-400 mb-4">🚫 No coin data provided.</p>
        <button
          onClick={() => navigate("/explorer")}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white"
        >
          🔙 Go Back to Explorer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-10">
      <div className="max-w-md mx-auto bg-white/10 p-6 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-16 h-16 mx-auto mb-2"
          />
          <h2 className="text-2xl font-extrabold text-purple-400">💳 Payment Gateway</h2>
          <p className="text-sm uppercase tracking-wide text-gray-400 mt-1">{coin.symbol}</p>
          <p className="mt-2 text-green-400 font-medium text-lg">
            Current Price: ${coin.current_price}
          </p>
        </div>

        {/* Intro Paragraphs */}
        <div className="mb-6 text-sm text-gray-300 space-y-3">
          <p>
            TEN Currency empowers fast and secure crypto transactions using our native token, <strong>TEN</strong>. You can easily convert USD to TEN and complete your purchase of any listed cryptocurrency.
          </p>
          <p>
            This gateway allows direct payments using TEN, offering lower gas fees, quick confirmation, and smooth checkout. No intermediaries — just decentralized power.
          </p>
          <p>
            Enter your USD amount, and the system will calculate the TEN equivalent automatically. Once confirmed, click on “Pay with TEN” to simulate the transaction.
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <label className="block text-sm font-medium">💵 Enter Amount in USD</label>
          <input
            type="number"
            placeholder="e.g. 100"
            value={amountUSD}
            onChange={(e) => setAmountUSD(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-sm text-gray-300">
            🔁 You’ll pay: <span className="text-yellow-400 font-semibold">{tenAmount} TEN</span>
          </p>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded text-white font-semibold"
          >
            🪙 Pay with TEN
          </button>
        </form>

        {status && (
          <div className="mt-4 text-center text-sm font-medium text-blue-300">
            {status}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <img
            src="https://cryptologos.cc/logos/tenx-pay-logo.png?v=026"
            alt="TEN Logo"
            className="w-16 h-16 opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
