/** @format */

require("dotenv").config();
const { ethers } = require("ethers");

const TOKEN_ADDRESS = "0xb5E8c560C4B33a0436Ad05820891D32bE88e9417";
const WALLET_ADDRESS = "0x9C439d227fC4524111ED89345c744041f74A0360";

// ERC20 ABI
const abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
  const token = new ethers.Contract(TOKEN_ADDRESS, abi, provider);

  const balance = await token.balanceOf(WALLET_ADDRESS);
  const decimals = await token.decimals();
  const symbol = await token.symbol();

  console.log(`Balance: ${ethers.formatUnits(balance, decimals)} ${symbol}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
