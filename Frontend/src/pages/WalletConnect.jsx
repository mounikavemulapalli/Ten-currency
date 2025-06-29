// src/pages/WalletConnect.jsx
import React from "react";
import { useWallet } from "../hooks/useWallet";

<<<<<<< HEAD
const WalletConnect = () => {
  const {
=======
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
>>>>>>> 3db1b97543b6cb6b51f402e31929ac685a68264b
    walletAddress,
    balance,
    tokenBalance,
    network,
    connectWallet,
    error,
  } = useWallet();

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Connect Wallet</h2>
      <button
        onClick={connectWallet}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Connect Wallet
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {walletAddress && (
        <div className="mt-6 text-gray-700 space-y-2">
          <p><strong>Address:</strong> {walletAddress}</p>
          <p><strong>Network:</strong> {network}</p>
          <p><strong>Native Balance:</strong> {balance} ETH</p>
          <p><strong>USDT Balance:</strong> {tokenBalance}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
