/** @format */

import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  address: String,
  balance: {
    type: Number,
    default: 1000, // give initial balance
  },
});

export default mongoose.model("Wallet", walletSchema);
