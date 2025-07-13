/** @format */

// /** @format */

// import { Keypair } from "@solana/web3.js";
// import fs from "fs";

// const wallet = Keypair.generate();
// fs.writeFileSync("wallet.json", JSON.stringify([...wallet.secretKey]));
// console.log("🚀 Wallet created:", wallet.publicKey.toBase58());
import { Keypair } from "@solana/web3.js";
import fs from "fs";

const wallet = Keypair.generate();
fs.writeFileSync("wallet.json", JSON.stringify([...wallet.secretKey]));
console.log("Wallet:", wallet.publicKey.toBase58());
