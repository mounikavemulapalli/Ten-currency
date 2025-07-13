/** @format */
import Wallet from "../models/Wallet.js";
import Token from "../models/token.js";

// Conversion rate: 1 token = 0.001 ETH (example)
const CONVERSION_RATE = 0.001;

export const convertTokenToETH = async (req, res) => {
  const { address, tokenId, tokenAmount } = req.body;

  if (!address || !tokenId || !tokenAmount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const wallet = await Wallet.findOne({ address });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    // Find token entry
    const tokenIndex = wallet.tokens.findIndex(
      (t) => t.tokenId.toString() === tokenId
    );

    if (tokenIndex === -1) {
      return res.status(400).json({ error: "Token not found in wallet" });
    }

    if (wallet.tokens[tokenIndex].amount < tokenAmount) {
      return res.status(400).json({ error: "Insufficient token balance" });
    }

    const ethToAdd = tokenAmount * CONVERSION_RATE;

    // Update balances
    wallet.tokens[tokenIndex].amount -= tokenAmount;
    wallet.ethBalance += ethToAdd;

    await wallet.save();

    res.json({
      message: "Conversion successful",
      ethReceived: ethToAdd,
      updatedWallet: wallet,
    });
  } catch (err) {
    console.error("Conversion error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
