/** @format */

import express from "express";
import { sendCurrency, getTxns } from "../controllers/txnController.js";

const router = express.Router();

router.post("/send", sendCurrency);
router.get("/:address", getTxns);

export default router;
