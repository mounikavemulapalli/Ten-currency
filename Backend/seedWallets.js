/** @format */

// seedWallets.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Wallet from "./models/Wallet.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const wallets = [
      {
        address:
          "0x61d7f23e78e3a29d3d9d7b25cd6a11fe1d47ab25008ef473be6a11f5742cd51d",
        balance: 100,
      },
      {
        address:
          "0x1f16a34a8f16738bb23cc74f2373c8b2c4c83f007f31e09f9bb2a780fa8ed433",
        balance: 0,
      },
    ];

    await Wallet.deleteMany({});
    await Wallet.insertMany(wallets);
    console.log("✅ Wallets seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding wallets:", error);
    process.exit(1);
  }
};

seed();
