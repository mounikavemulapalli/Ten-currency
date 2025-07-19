// src/pages/WalletConnect.jsx
import React from "react";
import { useWallet } from "../hooks/useWallet";

const WalletConnect = () => {
  const {
    walletAddress,
    balance,
    tokenBalance,
    network,
    connectWallet,
    error,
  } = useWallet();

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Connect Wallet</h2>
      <button
        onClick={connectWallet}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Connect Wallet
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {walletAddress && (
        <div className="mt-6 text-gray-700 space-y-2">
          <p><strong>Address:</strong> {walletAddress}</p>
          <p><strong>Network:</strong> {network}</p>
          <p><strong>Native Balance:</strong> {balance} ETH</p>
          <p><strong>USDT Balance:</strong> {tokenBalance}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
