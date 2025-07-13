/** @format */

// /** @format */

// // models/Transaction.js
// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema(
//   {
//     from: { type: String, required: true },
//     to: { type: String, required: true },
//     amount: { type: Number, required: true },
//     hash: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Transaction", transactionSchema);
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: "success" },
  txId: { type: String, unique: true }, // Unique transaction ID
});

export default mongoose.model("Transaction", transactionSchema);
