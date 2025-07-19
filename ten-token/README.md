<!-- @format -->

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

Token address
0xb5E8c560C4B33a0436Ad05820891D32bE88e9417
Wallet address
0x9C439d227fC4524111ED89345c744041f74A0360

for view balance
npx hardhat run scripts/checkbal.js --network sepolia

for deploying coins
npx hardhat run scripts/deploy.js --network sepolia
