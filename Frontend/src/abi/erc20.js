/** @format */

// /** @format */

// export const ERC20_ABI = [
//   // balanceOf
//   {
//     constant: true,
//     inputs: [{ name: "_owner", type: "address" }],
//     name: "balanceOf",
//     outputs: [{ name: "balance", type: "uint256" }],
//     type: "function",
//   },
//   // decimals
//   {
//     constant: true,
//     inputs: [],
//     name: "decimals",
//     outputs: [{ name: "", type: "uint8" }],
//     type: "function",
//   },
//   // name
//   {
//     constant: true,
//     inputs: [],
//     name: "name",
//     outputs: [{ name: "", type: "string" }],
//     type: "function",
//   },
// ];

// export const ERC20_ABI = [
//   "function balanceOf(address owner) view returns (uint256)",
//   "function decimals() view returns (uint8)"
// ];
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const tokenAddress = "YOUR_ERC20_TOKEN_ADDRESS";
const walletAddress = await signer.getAddress();

// ERC20 ABI: Minimal version with just balanceOf and decimals
const abi = [
  "function balanceOf(address) view returns (uint)",
  "function decimals() view returns (uint8)",
];

const contract = new ethers.Contract(tokenAddress, abi, provider);
const balance = await contract.balanceOf(walletAddress);
const decimals = await contract.decimals();
const formatted = ethers.utils.formatUnits(balance, decimals);

console.log("Token balance:", formatted);
