// src/pages/Wallet.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white border border-gray-200 shadow-2xl rounded-3xl p-10 max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/premium-vector/bitcoin-wallet-concept-3d-illustration-icon-composition-with-electronic-wallet-credit-card-coins-cryptocurrency-transaction-trade-bitcoin-mining-vector-illustration-modern-web-design_198565-1848.jpg"
            alt="Wallet illustration"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Seamlessly link your MetaMask wallet to the TEN Currency platform to manage your assets,
            execute transactions, and interact with smart contracts in a secure, multichain
            environment.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Your wallet is the gateway to decentralized finance. By connecting, you’ll unlock access
            to powerful tools and real-time data, while keeping full control of your private keys.
          </p>

          {account ? (
            <div>
              <p className="text-green-600 font-medium mb-2">✅ Wallet Connected</p>
              <p className="text-gray-800 font-mono bg-gray-100 rounded-md p-3 break-words">
                {account}
              </p>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition"
            >
              Connect Wallet
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Wallet;
