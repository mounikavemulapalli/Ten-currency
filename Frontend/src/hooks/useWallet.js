// src/hooks/useWallet.js
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

      const tokenAddress = USDT_ADDRESS[netName] || USDT_ADDRESS.mainnet;
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const rawTokenBalance = await tokenContract.balanceOf(address);
      const decimals = await tokenContract.decimals();
      const formatted = ethers.formatUnits(rawTokenBalance, decimals);
      setTokenBalance(formatted);
    } catch (err) {
      console.error("Wallet connect error", err);
      setError("Could not connect wallet");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      connectWallet(); // Only trigger on mount
      window.ethereum.on("accountsChanged", () => window.location.reload());
      window.ethereum.on("chainChanged", () => window.location.reload());
    } else {
      setError("MetaMask not installed");
    }
  }, []);

  return {
    walletAddress,
    balance,
    tokenBalance,
    network,
    error,
  };
};
