/** @format */

// models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    hash: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
