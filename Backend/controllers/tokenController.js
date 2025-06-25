/** @format */

import Wallet from "../models/Wallet.js";

export const transferToken = async (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;

  const from = await Wallet.findOne({ address: fromAddress });
  const to = await Wallet.findOne({ address: toAddress });

  if (!from || !to) return res.status(404).json({ msg: "Wallet not found" });
  if (from.balance < amount)
    return res.status(400).json({ msg: "Insufficient funds" });

  from.balance -= amount;
  to.balance += parseFloat(amount);

  await from.save();
  await to.save();

  res.json({ msg: "Transfer successful" });
};
