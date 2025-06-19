/** @format */

import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  result: { type: Number, required: true },
  rate: { type: Number },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Conversion", conversionSchema);
