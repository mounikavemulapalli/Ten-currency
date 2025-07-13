/** @format */

// /** @format */

// // // backend/routes/convert.js
// // import express from "express";
// // import axios from "axios";

// // const router = express.Router();

// // router.post("/", async (req, res) => {
// //   const { from, to, amount } = req.body;

// //   if (!from || !to || !amount) {
// //     return res.status(400).json({ error: "Missing parameters" });
// //   }

// //   try {
// //     const response = await axios.get(
// //       `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${from}/${to}`
// //     );

// //     const rate = response.data.conversion_rate;
// //     const result = rate * amount;

// //     res.json({ rate, result });
// //   } catch (error) {
// //     console.error("Conversion error:", error.message);
// //     res.status(500).json({ error: "Currency conversion failed" });
// //   }
// // });

// // export default router;
// // import express from "express";
// // import axios from "axios";
// // import Conversion from "../models/Conversion.js";

// // const router = express.Router();

// // router.post("/", async (req, res) => {
// //   const { from, to, amount } = req.body;
// //   if (!from || !to || !amount) {
// //     return res.status(400).json({ error: "Missing parameters" });
// //   }

// //   try {
// //     const response = await axios.get(
// //       `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${from}/${to}`
// //     );

// //     const rate = response.data.conversion_rate;
// //     const result = rate * amount;

// //     // Save to DB
// //     const newConversion = new Conversion({ from, to, amount, result, rate });
// //     await newConversion.save();

// //     res.json({ rate, result });
// //   } catch (error) {
// //     res.status(500).json({ error: "Currency conversion failed" });
// //   }
// // });

// // // 🆕 Get all history
// // router.get("/history", async (req, res) => {
// //   try {
// //     const history = await Conversion.find().sort({ date: -1 }).limit(20);
// //     res.json(history);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch history" });
// //   }
// // });

// // export default router;
// // routes/convert.js
// import express from "express";
// import axios from "axios";
// // import auth from "../middleware/auth.js"; // optional

// const router = express.Router();

// // Map symbol to CoinGecko IDs
// const coinGeckoMap = {
//   ETH: "ethereum",
//   USDT: "tether",
//   BTC: "bitcoin",
//   BNB: "binancecoin",
//   MATIC: "matic-network",
//   SOL: "solana",
//   ADA: "cardano",
//   DOGE: "dogecoin",
//   XRP: "ripple",
// };

// router.post("/", async (req, res) => {
//   const { from, to, amount } = req.body;
//   console.log("Received payload:", { from, to, amount });

//   const fromId = coinGeckoMap[from.toUpperCase()];
//   // const toSymbol = to.toLowerCase();
// // Treat USDT as USD for CoinGecko
// const toSymbol = to.toUpperCase() === 'USDT' ? 'usd' : to.toLowerCase();

//   if (!fromId || !coinGeckoMap[to.toUpperCase()]) {
//     return res.status(400).json({ error: `Unsupported currency: ${from} or ${to}` });
//   }

//   const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromId}&vs_currencies=${toSymbol}`;
//   console.log("Requesting CoinGecko URL:", url);

//   try {
//     const response = await axios.get(url);
//     console.log("CoinGecko Response:", response.data);

//     const rate = response.data[fromId]?.[toSymbol];
//     if (!rate) {
//       return res.status(400).json({ error: "Conversion rate not found" });
//     }

//     const converted = (parseFloat(amount) * rate).toFixed(4);
//     res.json({ rate, converted });
//   } catch (error) {
//     console.error("Conversion failed:", error.message);
//     res.status(500).json({ error: "Currency conversion failed" });
//   }
// });

// export default router;
/** @format */
import express from "express";
import axios from "axios";
import Token from "../models/token.js"; // ⬅️ Import your custom Token model

const router = express.Router();

// CoinGecko crypto symbol-to-ID map
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

  if (!from || !to || !amount) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  const fromId = coinGeckoMap[fromUpper];
  const toSymbol = toUpper === "USDT" ? "usd" : toLower(toUpper);

  // Case 1: Supported by CoinGecko ✅
  if (fromId && coinGeckoMap[toUpper]) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromId}&vs_currencies=${toSymbol}`;

    try {
      const response = await axios.get(url);
      const rate = response.data[fromId]?.[toSymbol];

      if (!rate) {
        return res.status(400).json({ error: "Conversion rate not found" });
      }

      const converted = (parseFloat(amount) * rate).toFixed(4);
      return res.json({ rate, converted });
    } catch (error) {
      console.error("CoinGecko error:", error.message);
      return res.status(500).json({ error: "Conversion failed" });
    }
  }

  // Case 2: Convert from a custom token (your own off-chain)
  try {
    const customToken = await Token.findOne({ symbol: fromUpper });
    if (!customToken) {
      return res
        .status(400)
        .json({ error: `Unsupported currency: ${from} or ${to}` });
    }

    // Define fixed mock exchange rate (example: 1 TEN = 0.001 ETH)
    const mockRate = 0.001; // 1 token = 0.001 ETH
    const converted = (parseFloat(amount) * mockRate).toFixed(4);

    return res.json({ rate: mockRate, converted });
  } catch (err) {
    console.error("Custom token conversion error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
