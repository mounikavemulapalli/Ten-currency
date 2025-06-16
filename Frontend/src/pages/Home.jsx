import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="text-white bg-gradient-to-b from-[#0d0d0d] via-[#111] to-[#1a1a1a] min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="px-6 py-24 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to TEN Currency
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Build, trade, and explore the most intuitive multichain experience on a secure and scalable infrastructure.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 rounded-lg text-lg font-semibold shadow-lg"
          onClick={() => setShowModal(true)}
        >
          Get Started
        </motion.button>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1e1e1e] py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 text-center">
          <div className="hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-bold text-blue-400">+10K</h2>
            <p className="text-gray-400">Active Wallets</p>
          </div>
          <div className="hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-bold text-green-400">$50M+</h2>
            <p className="text-gray-400">Transaction Volume</p>
          </div>
          <div className="hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-bold text-yellow-400">100+</h2>
            <p className="text-gray-400">Smart Contracts Deployed</p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 p-8 rounded-xl max-w-md w-full shadow-2xl relative border border-gray-200">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m0-4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-2">Welcome to TEN Currency</h2>
            <p className="text-center text-gray-600 mb-6">
              Dive into the future of decentralized finance. Access tools, smart contracts, and secure transactions with ease.
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  // Navigate if needed, e.g., navigate('/signup')
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
