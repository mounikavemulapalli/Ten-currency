/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supportedCoins = ["bitcoin", "ethereum", "tether", "binancecoin"];
const symbolsMap = {
  bitcoin: "BTC",
  ethereum: "ETH",
  tether: "USDT",
  binancecoin: "BNB",
};

const Exchange = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("ethereum");
  const [toCurrency, setToCurrency] = useState("tether");
  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [savedPairs, setSavedPairs] = useState([]);
  const [alertCoin, setAlertCoin] = useState("ethereum");
  const [alertValue, setAlertValue] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return toast.error("🦊 MetaMask not detected!");
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      toast.success("✅ Wallet connected!");
    } catch {
      toast.error("❌ Wallet connection failed.");
    }
  };
  
  

  const fetchPrices = async () => {
    try {
      const ids = supportedCoins.join(",");
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      setPrices(res.data);
    } catch {
      toast.error("⚠️ Failed to fetch prices.");
    }
  };

  const fetchChartData = async (coin) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
      );
      const formatted = res.data.prices.map((p) => ({
        time: new Date(p[0]).toLocaleDateString(),
        price: parseFloat(p[1].toFixed(2)),
      }));
      setChartData(formatted);
    } catch (err) {
      console.error("Chart fetch error:", err);
    }
  };

  const convert = () => {
    if (!amount || isNaN(amount)) return toast.warning("Enter a valid amount.");

    const fromPrice = prices[fromCurrency]?.usd;
    const toPrice = prices[toCurrency]?.usd;
    if (fromPrice && toPrice) {
      const result = ((parseFloat(amount) * fromPrice) / toPrice).toFixed(6);
      setConvertedAmount(result);
      setHistory((prev) => [
        ...prev,
        {
          from: fromCurrency,
          to: toCurrency,
          amount,
          result,
          date: new Date().toLocaleString(),
        },
      ]);
      toast.success("✅ Conversion complete!");
    } else {
      toast.error("Price data not available.");
    }
  };

  const savePair = () => {
    const pair = `${symbolsMap[fromCurrency]} → ${symbolsMap[toCurrency]}`;
    if (!savedPairs.includes(pair)) {
      setSavedPairs([...savedPairs, pair]);
      toast.success("💾 Pair saved!");
    } else {
      toast.info("Already saved!");
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const setAlert = () => {
    const current = prices[alertCoin]?.usd;
    if (!alertValue || isNaN(alertValue)) return toast.warning("Enter a valid alert price.");
    if (!current) return toast.error("Live price not available.");

    if (current >= parseFloat(alertValue)) {
      toast.success(`🔔 ${symbolsMap[alertCoin]} already above $${alertValue}`);
    } else {
      toast.info(`⏰ Alert set. Will notify if price goes above $${alertValue}`);
    }
  };

  const exportCSV = () => {
    const csv = [
      ["From", "To", "Amount", "Result", "Date"],
      ...history.map((h) => [
        symbolsMap[h.from],
        symbolsMap[h.to],
        h.amount,
        h.result,
        h.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "conversion-history.csv";
    a.click();
  };

  useEffect(() => {
    fetchPrices();
    fetchChartData(fromCurrency);
  }, []);

  useEffect(() => {
    fetchChartData(fromCurrency);
  }, [fromCurrency]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white px-4 py-10">
      <ToastContainer />
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Wallet + Converter */}
        <motion.div className="bg-white/10 p-6 rounded-xl shadow-lg text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold mb-4">💹 Live Crypto Exchange</h1>

          {walletAddress ? (
            <p className="text-green-400 text-sm mb-4">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          ) : (
            <button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg mb-4">
              🔗 Connect Wallet
            </button>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="px-4 py-2 rounded bg-white text-black">
              {supportedCoins.map((id) => (
                <option key={id} value={id}>
                  {symbolsMap[id]} — {id}
                </option>
              ))}
            </select>

            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="px-4 py-2 rounded bg-white text-black">
              {supportedCoins.map((id) => (
                <option key={id} value={id}>
                  {symbolsMap[id]} — {id}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center gap-2 mb-4">
            <button onClick={swapCurrencies} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
              🔁 Swap
            </button>
            <button onClick={savePair} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              ⭐ Save
            </button>
          </div>

          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded mb-4 bg-white/20 text-white"
          />

          <button onClick={convert} className="bg-green-600 hover:bg-green-700 w-full py-2 rounded font-semibold mb-4">
            🔄 Convert
          </button>

          {convertedAmount && (
            <p className="text-blue-300 text-lg font-semibold">
              ✅ {amount} {symbolsMap[fromCurrency]} ≈ {convertedAmount} {symbolsMap[toCurrency]}
            </p>
          )}
        </motion.div>

        {/* Chart */}
        <motion.div className="bg-white/10 p-6 rounded-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold mb-4">📈 7-Day Trend: {symbolsMap[fromCurrency]}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#00d8ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Alert Setup */}
        <motion.div className="bg-white/10 p-6 rounded-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold mb-4">🔔 Set Price Alert</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-2">
            <select value={alertCoin} onChange={(e) => setAlertCoin(e.target.value)} className="px-4 py-2 rounded bg-white text-black">
              {supportedCoins.map((id) => (
                <option key={id} value={id}>
                  {symbolsMap[id]}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="USD Price"
              value={alertValue}
              onChange={(e) => setAlertValue(e.target.value)}
              className="px-4 py-2 rounded bg-white/20 text-white"
            />
          </div>
          <button onClick={setAlert} className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded">
            ⏰ Set Alert
          </button>
        </motion.div>

        {/* History */}
        <motion.div className="bg-white/10 p-6 rounded-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🕒 Conversion History</h2>
            <button onClick={exportCSV} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-1 rounded text-sm">
              📥 Export CSV
            </button>
          </div>
          {history.length === 0 ? (
            <p className="text-gray-400 italic">No conversions yet.</p>
          ) : (
            <ul className="text-sm space-y-2">
              {history.map((h, i) => (
                <li key={i} className="text-gray-300">
                  {h.amount} {symbolsMap[h.from]} → {h.result} {symbolsMap[h.to]}{" "}
                  <span className="text-gray-500">({h.date})</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Exchange;
