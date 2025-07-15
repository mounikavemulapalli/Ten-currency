/** @format */

// src/pages/Dashboard.jsx
import React from "react";
import { useWallet } from "../hooks/useWallet";
import SendEth from "../pages/SendEth";
import SendToken from "../pages/SendToken";
import { FaEthereum, FaNetworkWired, FaCoins, FaHistory, FaUserShield, FaGlobe } from "react-icons/fa";
import Convertsection from "../pages/Convertsection";

const Dashboard = () => {
  const { walletAddress, balance, tokenBalance, network } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-purple-400 tracking-tight">
          Welcome to TEN Dashboard
        </h1>
        <p className="text-lg text-center text-gray-400 mb-12">
          Manage your wallet, track transactions, and explore the blockchain in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Wallet Balance + Send ETH & Tokens */}
          <div className="bg-white/5 p-6 rounded-2xl border border-purple-600 shadow-lg hover:shadow-purple-800 transition-all duration-300">
            <h2 className="flex items-center text-xl font-semibold text-purple-300 mb-2">
              <FaEthereum className="mr-2" /> Wallet Balance
            </h2>
            <p className="text-3xl font-bold text-green-400 mb-4">
              {balance ? parseFloat(balance).toFixed(4) : "--"} ETH
            </p>
            <SendEth />
            <SendToken />
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/5 p-6 rounded-2xl border border-purple-600 shadow-lg hover:shadow-purple-800 transition-all duration-300">
            <h2 className="flex items-center text-xl font-semibold text-purple-300 mb-2">
              <FaHistory className="mr-2" /> Recent Transactions
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>✅ Sent 1 ETH to <span className="text-green-300">0xabc...789</span></li>
              <li>📥 Received 0.5 ETH from <span className="text-blue-300">0xdef...123</span></li>
              {/* You can replace these with dynamic transaction history */}
            </ul>
          </div>

          {/* Network Status */}
          <div className="bg-white/5 p-6 rounded-2xl border border-purple-600 shadow-lg hover:shadow-purple-800 transition-all duration-300">
            <h2 className="flex items-center text-xl font-semibold text-purple-300 mb-2">
              <FaNetworkWired className="mr-2" /> Network Status
            </h2>
            <p className="text-green-400 text-lg">
              {network ? `🟢 Connected to ${network}` : "🔴 Not Connected"}
            </p>
          </div>

          {/* Token Holdings */}
        
<div className="bg-white/5 p-6 rounded-2xl border border-purple-600 shadow-lg hover:shadow-purple-800 transition-all duration-300">
  <h2 className="flex items-center text-xl font-semibold text-purple-300 mb-2">
    <FaCoins className="mr-2" /> Token Holdings
  </h2>
  <div className="text-gray-300 space-y-2 text-md">
    <p>🪙 TEN Token: <span className="text-yellow-400">{tokenBalance ?? "--"}</span></p>
    <p>💎 ETH: <span className="text-blue-400">{balance ?? "--"}</span></p>
  </div>
  {/* Add token conversion form here */}
  {walletAddress && <Convertsection address={walletAddress} />}
</div>


          {/* Wallet Info */}
          <div className="bg-white/5 p-6 rounded-2xl border border-purple-600 shadow-lg hover:shadow-purple-800 transition-all duration-300">
            <h2 className="flex items-center text-xl font-semibold text-purple-300 mb-2">
              <FaUserShield className="mr-2" /> Wallet Info
            </h2>
            <p className="text-sm text-gray-300 break-words">
              <strong className="text-purple-400">Address:</strong> {walletAddress || "Not Connected"}
            </p>
          </div>

          {/* Blockchain Info */}
          <div className="bg-white/5 p-6 rounded-2xl border border-purple-600 shadow-lg hover:shadow-purple-800 transition-all duration-300">
            <h2 className="flex items-center text-xl font-semibold text-purple-300 mb-2">
              <FaGlobe className="mr-2" /> Blockchain Explorer
            </h2>
            <p className="text-gray-400 text-sm">
              Visit Etherscan or any blockchain explorer to track your wallet and smart contracts. Stay updated with network gas fees and latest blocks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;