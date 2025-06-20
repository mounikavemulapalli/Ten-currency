/** @format */

// /** @format */

// import { useState, useEffect } from "react";

// export const useWallet = () => {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [error, setError] = useState("");

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       setError("MetaMask is not installed");
//       return;
//     }
//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setWalletAddress(accounts[0]);
//       setError("");
//     } catch (err) {
//       setError("Could not connect wallet");
//     }
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", (accounts) => {
//         setWalletAddress(accounts[0] || "");
//       });
//     }
//   }, []);

//   return { walletAddress, connectWallet, error };
// };
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ERC20_ABI } from "../abi/erc20";

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [network, setNetwork] = useState("");
  const [error, setError] = useState("");

  const USDT_ADDRESS = {
    mainnet: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT on Ethereum Mainnet
    goerli: "0xYourTestUSDTTokenAddressHere",
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      const rawBalance = await provider.getBalance(address);
      setBalance(ethers.formatEther(rawBalance));

      const net = await provider.getNetwork();
      const netName = net.name;
      setNetwork(netName);

      // Fetch token balance (e.g., USDT)
      const tokenAddress = USDT_ADDRESS[netName] || USDT_ADDRESS.mainnet;
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        provider
      );
      const rawTokenBalance = await tokenContract.balanceOf(address);
      const decimals = await tokenContract.decimals();
      const formatted = ethers.formatUnits(rawTokenBalance, decimals);
      setTokenBalance(formatted);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not connect wallet");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  return {
    walletAddress,
    balance,
    tokenBalance,
    network,
    connectWallet,
    error,
  };
};
