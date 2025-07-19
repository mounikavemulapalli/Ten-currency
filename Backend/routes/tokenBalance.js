/** @format */

// routes/tokenBalance.js
import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
import erc20 from "../abi/erc20.js"; // ✅ You'll create this next

dotenv.config();
const router = express.Router();

// Replace with your deployed TEN token address
const tokenAddress = "0xb5E8c560C4B33a0436Ad05820891D32bE88e9417";

// ✅ Setup provider
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // e.g., for Sepolia or other testnet

// ✅ GET: /api/token/balance/:walletAddress
router.get("/balance/:walletAddress", async (req, res) => {
  const wallet = req.params.walletAddress;

  try {
    const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
    const rawBalance = await contract.balanceOf(wallet);
    const decimals = await contract.decimals();
    const balance = ethers.formatUnits(rawBalance, decimals);

    res.json({ wallet, balance });
  } catch (err) {
    console.error("❌ Error fetching balance:", err.message);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
});

export default router;
