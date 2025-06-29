/** @format */

import React, { useState, useEffect } from "react";

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [network, setNetwork] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("🦊 MetaMask not detected. Please install it.");
      return;
    }

    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      getNetwork();
      setError("");
    } catch (err) {
      setError("⚠️ Failed to connect wallet.");
    } finally {
      setIsLoading(false);
    }
  };

  const getNetwork = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const networks = {
        "0x1": "Ethereum Mainnet",
        "0x5": "Goerli Testnet",
        "0xaa36a7": "Sepolia Testnet",
        "0x38": "Binance Smart Chain",
      };
      setNetwork(networks[chainId] || `Unknown (${chainId})`);
    } catch (err) {
      setNetwork("Unknown");
    }
  };

  const getEthBalance = async (address) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const ethValue = parseFloat(parseInt(balance, 16) / 1e18).toFixed(4);
      setEthBalance(ethValue);
    } catch (err) {
      setError("Error fetching ETH balance.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setEthBalance(null);
    setError("");
    setNetwork("");
  };

  useEffect(() => {
    if (walletAddress) {
      getEthBalance(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white flex flex-col items-center justify-center px-4 py-12 space-y-12">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-xl w-full text-center space-y-6">
        <img
          src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png"
          alt="MetaMask"
          className="w-12 h-12 mx-auto"
        />

        <h1 className="text-3xl font-bold">🦊 Your Ethereum Wallet</h1>

        {walletAddress ? (
          <>
            <p className="text-green-400 text-sm">
              Connected: <span className="font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
            </p>
            <p className="text-blue-300">🌐 Network: {network}</p>
            <p className="text-yellow-400 text-lg font-semibold">💰 Balance: {ethBalance} ETH</p>
            <button
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white mt-2"
            >
              Disconnect
            </button>

            {/* QR Code */}
            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-2">📱 Wallet QR</p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`}
                alt="QR Code"
                className="mx-auto rounded shadow"
              />
            </div>
          </>
        ) : (
          <>
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white disabled:opacity-50"
            >
              {isLoading ? "Connecting..." : "Connect with MetaMask"}
            </button>
            {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white">
          <div className="bg-white/10 rounded-lg p-6 shadow-md hover:shadow-xl transition">
            <img src="https://cdn-icons-png.flaticon.com/512/1490/1490871.png" alt="Secure" className="w-10 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-1">🔐 Secure Connection</h3>
            <p className="text-sm text-gray-300">Built with MetaMask and Web3 standards.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 shadow-md hover:shadow-xl transition">
            <img src="https://cdn-icons-png.flaticon.com/512/2487/2487845.png" alt="Fast" className="w-10 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-1">⚡ Lightning Fast</h3>
            <p className="text-sm text-gray-300">Instant wallet connection and real-time balance.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 shadow-md hover:shadow-xl transition">
            <img src="https://cdn-icons-png.flaticon.com/512/3502/3502641.png" alt="Global" className="w-10 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-1">🌎 Global Support</h3>
            <p className="text-sm text-gray-300">Connect on Ethereum, BSC, Goerli, and more.</p>
          </div>
        </div>

        {/* New Section: Education */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-purple-400 text-center mb-6">📚 Learn Web3</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://ethereum.org/en/developers/docs/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-5 rounded-lg hover:shadow-xl transition">
              <h4 className="text-lg font-semibold mb-2">Ethereum Docs</h4>
              <p className="text-sm text-gray-300">Official documentation for learning smart contracts, DApps, and more.</p>
            </a>
            <a href="https://soliditylang.org/docs/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-5 rounded-lg hover:shadow-xl transition">
              <h4 className="text-lg font-semibold mb-2">Solidity Docs</h4>
              <p className="text-sm text-gray-300">Master Solidity for writing and deploying smart contracts on EVM chains.</p>
            </a>
            <a href="https://web3js.readthedocs.io/en/v1.7.5/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-5 rounded-lg hover:shadow-xl transition">
              <h4 className="text-lg font-semibold mb-2">Web3.js Guide</h4>
              <p className="text-sm text-gray-300">Explore how to interact with the Ethereum blockchain using JavaScript.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;