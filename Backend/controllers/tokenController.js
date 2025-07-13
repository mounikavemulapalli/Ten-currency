/** @format */

// /** @format */

// import Wallet from "../models/Wallet.js";

// export const transferToken = async (req, res) => {
//   const { fromAddress, toAddress, amount } = req.body;

//   const from = await Wallet.findOne({ address: fromAddress });
//   const to = await Wallet.findOne({ address: toAddress });

//   if (!from || !to) return res.status(404).json({ msg: "Wallet not found" });
//   if (from.balance < amount)
//     return res.status(400).json({ msg: "Insufficient funds" });

//   from.balance -= amount;
//   to.balance += parseFloat(amount);

//   await from.save();
//   await to.save();

//   res.json({ msg: "Transfer successful" });
// };
/** @format */
import { deployToken } from "../utils/solanaUtils.js";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import { v4 as uuidv4 } from "uuid"; // Install with: npm i uuid
import Token from "../models/token.js"; // ✅ Default import

// export const createToken = async (req, res) => {
//   try {
//     const { name, symbol, supply } = req.body;

//     if (!name || !symbol || !supply) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     const newToken = new Token({ name, symbol, supply });
//     await newToken.save();

//     res
//       .status(201)
//       .json({ message: "Token created successfully!", token: newToken });
//   } catch (err) {
//     console.error("Error creating token:", err);
//     res.status(500).json({ error: "Server error." });
//   }
// };
export const createToken = async (req, res) => {
  try {
    const { decimals, amount } = req.body;
    const tokenData = await deployToken({ decimals, amount });

    res.status(200).json({
      success: true,
      message: "Token created successfully",
      data: tokenData,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
export const transferToken = async (req, res) => {
  try {
    const { fromAddress, toAddress, amount } = req.body;

    if (!fromAddress || !toAddress || !amount) {
      return res.status(400).json({ msg: "⚠️ Missing transfer fields." });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ msg: "⚠️ Invalid amount specified." });
    }

    const from = await Wallet.findOne({ address: fromAddress });
    const to = await Wallet.findOne({ address: toAddress });

    if (!from || !to) {
      return res.status(404).json({ msg: "❌ One or both wallets not found." });
    }

    if (parseFloat(from.balance) < parsedAmount) {
      return res.status(400).json({ msg: "❌ Insufficient funds." });
    }

    // Update balances
    from.balance = parseFloat(from.balance) - parsedAmount;
    to.balance = parseFloat(to.balance) + parsedAmount;

    await from.save();
    await to.save();

    // Create transaction log
    const txId = uuidv4();
    const transaction = new Transaction({
      fromAddress,
      toAddress,
      amount: parsedAmount,
      txId,
      status: "success",
    });

    await transaction.save();

    return res.status(200).json({
      msg: "✅ Transfer successful.",
      txId,
      from: { address: from.address, balance: from.balance },
      to: { address: to.address, balance: to.balance },
    });
  } catch (error) {
    console.error("💥 Transfer error:", error);
    return res.status(500).json({ msg: "❌ Server error during transfer." });
  }
};
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ timestamp: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch transactions." });
  }
};
export const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.find().sort({ createdAt: -1 }); // newest first
    res.json(tokens);
  } catch (err) {
    console.error("❌ Error fetching tokens:", err);
    res.status(500).json({ error: "Failed to fetch tokens" });
  }
};
