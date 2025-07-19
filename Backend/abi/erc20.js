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

export default [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];
