/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import convertRoute from "./routes/convert.js";
import authRoutes from "./routes/auth.js";
import txnRoutes from "./routes/txnRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Currency API route
// app.post("/api/convert", async (req, res) => {
//   const { from, to, amount } = req.body;

//   try {
//     const response = await axios.get(
//       `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${from}/${to}`
//     );

//     const rate = response.data.conversion_rate;
//     const converted = rate * amount;

//     res.json({ rate, converted });
//   } catch (error) {
//     res.status(500).json({ error: "Conversion failed" });
//   }
// });

app.use("/api/convert", convertRoute);
app.use("/api/auth", authRoutes);
app.use("/api/txn", txnRoutes);
app.use("/api/token", tokenRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
