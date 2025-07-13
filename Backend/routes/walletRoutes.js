/** @format */

// routes/walletRoutes.js

router.get("/:address/full", async (req, res) => {
  const { address } = req.params;

  try {
    const wallet = await Wallet.findOne({ address }).populate("tokens.tokenId");

    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    res.json(wallet);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
});
