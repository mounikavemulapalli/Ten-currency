/** @format */

// routes/convertToken.js
import express from "express";
import axios from "axios";
import Wallet from "../models/Wallet.js";
import Token from "../models/token.js";

const router = express.Router();
router.post("/bulk", async (req, res) => {
  try {
    const { tokens } = req.body;
    if (!Array.isArray(tokens)) {
      return res.status(400).json({ error: "Tokens should be an array" });
    }

    const saved = await Token.insertMany(
      tokens.map((t) => ({
        name: t.name,
        symbol: t.symbol,
        supply: Number(t.supply),
      }))
    );

    res.status(201).json({ message: "Tokens saved", saved });
  } catch (err) {
    console.error("Bulk save error:", err);
    res.status(500).json({ error: "Failed to save tokens" });
  }
});

router.post("/token-to-eth", async (req, res) => {
  const { address, symbol, amount } = req.body;

  try {
    const wallet = await Wallet.findOne({ address }).populate("tokens.tokenId");
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    // Find token in wallet
    const tokenEntry = wallet.tokens.find(
      (t) => t.tokenId.symbol.toUpperCase() === symbol.toUpperCase()
    );

    if (!tokenEntry || tokenEntry.amount < amount) {
      return res.status(400).json({ error: "Insufficient token balance" });
    }

    // Mock conversion rate or fetch from API (CoinGecko not useful for custom tokens)
    const mockRate = 0.00005; // 1 TOKEN = 0.00005 ETH (example)

    const ethReceived = amount * mockRate;

    // Deduct token & add ETH
    tokenEntry.amount -= amount;
    wallet.ethBalance += ethReceived;

    await wallet.save();

    res.json({
      message: "Converted successfully",
      ethReceived,
      ethBalance: wallet.ethBalance,
      tokenSymbol: symbol,
      tokenRemaining: tokenEntry.amount,
    });
  } catch (err) {
    console.error("Conversion error:", err);
    res.status(500).json({ error: "Conversion failed" });
  }
});

export default router;
