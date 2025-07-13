/** @format */

// models/TransactionLog.js
import mongoose from "mongoose";

const TransactionLogSchema = new mongoose.Schema({
  mintAddress: { type: String, required: true },
  tokenAccount: { type: String, required: true },
  txHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TransactionLog", TransactionLogSchema);
