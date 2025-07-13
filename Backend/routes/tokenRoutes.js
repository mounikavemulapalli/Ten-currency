/** @format */

import express from "express";
import {
  createToken,
  transferToken,
  getAllTokens,
  getAllTransactions,
} from "../controllers/tokenController.js";

const router = express.Router();

// POST /api/tokens - Save a new token to DB
router.post("/", createToken);
router.get("/", getAllTokens); 
// Add this route
router.get("/transactions", getAllTransactions);

// POST /api/tokens/transfer - Transfer token (mock or real)
router.post("/transfer", transferToken);

export default router;
