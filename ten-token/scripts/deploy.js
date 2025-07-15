/** @format */

// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const TEN = await hre.ethers.getContractFactory("TEN");
  const ten = await TEN.deploy(1000000); // 1,000,000 TEN tokens
  await ten.waitForDeployment();

  console.log("TEN deployed to:", await ten.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
