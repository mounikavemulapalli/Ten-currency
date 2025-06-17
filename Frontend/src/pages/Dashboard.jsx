// src/pages/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome to TEN Dashboard</h1>
        <p className="text-lg text-center text-gray-300 mb-10">
          Manage your wallet, track transactions, and explore the blockchain network in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-purple-600 transition">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">Wallet Balance</h2>
            <p className="text-3xl font-bold text-green-400">4.32 ETH</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-purple-600 transition">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">Recent Transactions</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Sent 1 ETH to 0xabc...789</li>
              <li>Received 0.5 ETH from 0xdef...123</li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-purple-600 transition">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">Network Status</h2>
            <p className="text-green-400 font-medium">Connected to Aptos Mainnet</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-purple-600 transition">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">Token Holdings</h2>
            <p className="text-lg text-gray-300">USDT: 230</p>
            <p className="text-lg text-gray-300">ETH: 3.1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
