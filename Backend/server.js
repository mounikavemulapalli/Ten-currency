/** @format */

// /** @format */

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import axios from "axios";
// import convertRoute from "./routes/convert.js";
// import authRoutes from "./routes/auth.js";
// import txnRoutes from "./routes/txnRoutes.js";
// import tokenRoutes from "./routes/tokenRoutes.js";
// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));
// app.use("/api/convert", convertRoute);
// app.use("/api/auth", authRoutes);
// app.use("/api/txn", txnRoutes);
// app.use("/api/token", tokenRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import convertTokenRoute from "./routes/convertToken.js";
// Import routes
import convertRoute from "./routes/convert.js";
import authRoutes from "./routes/auth.js";
import txnRoutes from "./routes/txnRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Important for parsing JSON body

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/converts", convertRoute);
app.use("/api/convert", convertTokenRoute);
app.use("/api/auth", authRoutes);
app.use("/api/txn", txnRoutes);
app.use("/api/token", tokenRoutes);

// ✅ Root test route (optional)
app.get("/", (req, res) => {
  res.send("🚀 TEN Currency API is running");
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
