/** @format */

import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  supply: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token; // ✅ ES Module style
