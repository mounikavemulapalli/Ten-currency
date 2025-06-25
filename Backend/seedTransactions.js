/** @format */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "./models/Transaction.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error("Seeding failed ❌", err);
    process.exit(1);
  }
};

seed();
