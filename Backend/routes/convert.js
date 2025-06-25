/** @format */

// // backend/routes/convert.js
// import express from "express";
// import axios from "axios";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { from, to, amount } = req.body;

//   if (!from || !to || !amount) {
//     return res.status(400).json({ error: "Missing parameters" });
//   }

//   try {
//     const response = await axios.get(
//       `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${from}/${to}`
//     );

//     const rate = response.data.conversion_rate;
//     const result = rate * amount;

//     res.json({ rate, result });
//   } catch (error) {
//     console.error("Conversion error:", error.message);
//     res.status(500).json({ error: "Currency conversion failed" });
//   }
// });

// export default router;
// import express from "express";
// import axios from "axios";
// import Conversion from "../models/Conversion.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { from, to, amount } = req.body;
//   if (!from || !to || !amount) {
//     return res.status(400).json({ error: "Missing parameters" });
//   }

//   try {
//     const response = await axios.get(
//       `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${from}/${to}`
//     );

//     const rate = response.data.conversion_rate;
//     const result = rate * amount;

//     // Save to DB
//     const newConversion = new Conversion({ from, to, amount, result, rate });
//     await newConversion.save();

//     res.json({ rate, result });
//   } catch (error) {
//     res.status(500).json({ error: "Currency conversion failed" });
//   }
// });

// // 🆕 Get all history
// router.get("/history", async (req, res) => {
//   try {
//     const history = await Conversion.find().sort({ date: -1 }).limit(20);
//     res.json(history);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch history" });
//   }
// });

// export default router;
// routes/convert.js
import express from "express";
import axios from "axios";
// import auth from "../middleware/auth.js"; // optional

const router = express.Router();

// Map symbol to CoinGecko IDs
const coinGeckoMap = {
  ETH: "ethereum",
  USDT: "tether",
  BTC: "bitcoin",
  BNB: "binancecoin",
  MATIC: "matic-network",
  SOL: "solana",
  ADA: "cardano",
  DOGE: "dogecoin",
  XRP: "ripple",
};

router.post("/", async (req, res) => {
  const { from, to, amount } = req.body;
  console.log("Received payload:", { from, to, amount });

  const fromId = coinGeckoMap[from.toUpperCase()];
  // const toSymbol = to.toLowerCase();
// Treat USDT as USD for CoinGecko
const toSymbol = to.toUpperCase() === 'USDT' ? 'usd' : to.toLowerCase();

  if (!fromId || !coinGeckoMap[to.toUpperCase()]) {
    return res.status(400).json({ error: `Unsupported currency: ${from} or ${to}` });
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromId}&vs_currencies=${toSymbol}`;
  console.log("Requesting CoinGecko URL:", url);

  try {
    const response = await axios.get(url);
    console.log("CoinGecko Response:", response.data);

    const rate = response.data[fromId]?.[toSymbol];
    if (!rate) {
      return res.status(400).json({ error: "Conversion rate not found" });
    }

    const converted = (parseFloat(amount) * rate).toFixed(4);
    res.json({ rate, converted });
  } catch (error) {
    console.error("Conversion failed:", error.message);
    res.status(500).json({ error: "Currency conversion failed" });
  }
});


export default router;
