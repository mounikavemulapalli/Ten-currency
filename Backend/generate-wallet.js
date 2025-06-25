/** @format */

// generate-wallet.js
import { AptosAccount } from "aptos";

const account = new AptosAccount();

console.log(
  "Private Key (Hex):",
  Buffer.from(account.signingKey.secretKey).toString("hex")
);
console.log("Public Address:", account.address().hex());
