// /** @format */

// // routes/walletRoutes.js

// router.get("/:address/full", async (req, res) => {
//   const { address } = req.params;

//   try {
//     const wallet = await Wallet.findOne({ address }).populate("tokens.tokenId");

//     if (!wallet) return res.status(404).json({ error: "Wallet not found" });

//     res.json(wallet);
//   } catch (err) {
//     console.error("Error:", err.message);
//     res.status(500).json({ error: "Failed to fetch wallet" });
//   }
// });
// routes/walletRoutes.js
import express from "express";
import Wallet from "../models/Wallet.js"; // adjust path if needed

const router = express.Router();

router.get("/:address/full", async (req, res) => {
  const { address } = req.params;

  try {
    const wallet = await Wallet.findOne({ address });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.json({
      ethBalance: wallet.ethBalance ?? "0",
      balance: wallet.balance ?? "0",
    });
  } catch (err) {
    console.error("❌ Error fetching wallet:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
