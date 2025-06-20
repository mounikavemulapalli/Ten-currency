import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 * i, duration: 0.8 },
  }),
};

const HomePage = () => {
  return (
    <div className="bg-white font-sans text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 text-white py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Be early to the future of finance
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Buy Bitcoin, Ethereum, and other leading cryptocurrencies on a platform trusted by millions.
          </motion.p>
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-lg text-black"
            />
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Sign Up
            </button>
          </div>

          {/* Crypto prices */}
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Bitcoin BTC", price: "$104,323.36", change: "-0.33%", color: "text-red-500" },
              { name: "Ethereum ETH", price: "$2,510.42", change: "+0.10%", color: "text-green-500" },
              { name: "Dogecoin DOGE", price: "$0.17", change: "+0.60%", color: "text-green-500" },
              { name: "Solana SOL", price: "$143.91", change: "-1.00%", color: "text-red-500" },
            ].map((coin, i) => (
              <motion.div
                key={i}
                className="bg-white text-black rounded-lg p-4 shadow-lg text-left"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 2}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{coin.name}</h3>
                    <p className="text-sm mt-1">{coin.price}</p>
                  </div>
                  <p className={`text-sm font-medium ${coin.color}`}>{coin.change}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet Section */}
      <section className="bg-purple-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
              The only crypto wallet you’ll ever need
            </h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>🔄 Buy, sell, and swap with ease</li>
              <li>💳 Use a card or bank account for purchases</li>
              <li>🎁 Earn rewards on your crypto</li>
              <li>🔐 Self-custody and security</li>
              <li>🌐 Connect to DeFi protocols</li>
            </ul>
            <button className="mt-6 bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium hover:bg-indigo-800">
              Get Started
            </button>
          </motion.div>
          <motion.img
            src="https://miro.medium.com/v2/resize:fit:1400/0*apBACOBeBmxmrP6U.gif"
            alt="Wallet App"
            className="w-full h-auto rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          />
        </div>
      </section>

      {/* Exchange Section */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/4407/4407408.png"
            alt="Exchange"
            className="w-full h-auto rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              Lightning-fast crypto trading
            </h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>💵 Trade in 3 fiat currencies (USD, EUR, GBP)</li>
              <li>⚙️ High-speed matching engine</li>
              <li>🕐 24/7 live chat support</li>
              <li>📈 Margin Trading available</li>
            </ul>
            <button className="mt-6 bg-blue-700 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-800">
              Trade Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
