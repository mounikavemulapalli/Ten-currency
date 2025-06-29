/** @format */

import express from "express";
import { transferToken } from "../controllers/tokenController.js";

const router = express.Router();

router.post("/transfer", transferToken);

export default router;
