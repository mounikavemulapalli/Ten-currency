/** @format */

const Wallet = require("../models/Wallet");
const { AptosAccount, AptosClient, FaucetClient } = require("aptos");
require("dotenv").config();

const nodeUrl = process.env.APTOS_NODE;
const faucetUrl = process.env.APTOS_FAUCET;

const aptosClient = new AptosClient(nodeUrl);
const faucetClient = new FaucetClient(nodeUrl, faucetUrl);

exports.createWallet = async (req, res) => {
  try {
    const { userId } = req.body;
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to create wallet", err });
  }
};

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ msg: "Wallet not found" });
  } catch (err) {
    res.status(500).json({ msg: "Error retrieving wallet", err });
  }
};
