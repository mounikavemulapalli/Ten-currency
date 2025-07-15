/** @format */

import express from "express";
import {
  createToken,
  transferToken,
  getAllTokens,
  getAllTransactions,
} from "../controllers/tokenController.js";
import { convertTokenToEth } from "../controllers/tokenController.js";
const router = express.Router();

// POST /api/tokens - Save a new token to DB
router.post("/create", createToken);
router.get("/", getAllTokens);
// Add this route
router.get("/transactions", getAllTransactions);
router.get("/all", getAllTokens);
// POST /api/tokens/transfer - Transfer token (mock or real)
router.post("/transfer", transferToken);
router.post("/convert", convertTokenToEth);
export default router;
