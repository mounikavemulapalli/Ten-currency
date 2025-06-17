// src/pages/Wallet.jsx
import React, { useState, useEffect } from 'react';

const Wallet = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
        <h2 className="text-4xl font-extrabold mb-6">Wallet Connection</h2>
        {account ? (
          <div>
            <p className="text-lg mb-2">✅ Wallet Connected</p>
            <p className="text-green-400 font-mono break-words">{account}</p>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Wallet;
