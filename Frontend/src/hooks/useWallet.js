// /** @format */

// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// export const useWallet = () => {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [balance, setBalance] = useState("");
//   const [tokenBalance, setTokenBalance] = useState("");
//   const [network, setNetwork] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const connectWallet = async () => {
//     try {
//       setLoading(true);

//       if (!window.ethereum) {
//         setError("MetaMask not installed");
//         return;
//       }

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();
//       setWalletAddress(address);

//       const net = await provider.getNetwork();
//       setNetwork(net.name); // e.g., "sepolia"

//       // ✅ Fetch balances from backend
//       const res = await fetch(`http://localhost:5000/api/wallet/${address}/full`);
//       const data = await res.json();

//       if (res.ok) {
//         setBalance(data.ethBalance ?? "0");
//         setTokenBalance(data.balance ?? "0");
//       } else {
//         setError(data.error || "Failed to fetch wallet data");
//         setBalance("0");
//         setTokenBalance("0");
//       }
//     } catch (err) {
//       console.error("❌ Wallet connect error:", err);
//       setError("Could not connect wallet");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Token → ETH conversion
//   const handleConvert = async (symbol, amount) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/convert/token", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           address: walletAddress,
//           symbol,
//           amount,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert(`✅ Converted ${amount} ${symbol} → ${data.ethReceived} ETH`);
//         connectWallet(); // refresh balances after conversion
//       } else {
//         alert(`❌ ${data.error}`);
//       }
//     } catch (err) {
//       console.error("❌ Convert Error:", err);
//       alert("❌ Network error");
//     }
//   };

//   // Auto connect and reload on changes
//   useEffect(() => {
//     if (window.ethereum) {
//       connectWallet();
//       window.ethereum.on("accountsChanged", () => window.location.reload());
//       window.ethereum.on("chainChanged", () => window.location.reload());
//     } else {
//       setError("MetaMask not installed");
//     }
//   }, []);

//   return {
//     walletAddress,
//     balance,
//     tokenBalance,
//     network,
//     error,
//     loading,
//     handleConvert,
//     refetchWalletData: connectWallet,
//   };
// };
/** @format */

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [network, setNetwork] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const connectWallet = async () => {
    try {
      setLoading(true);

      if (!window.ethereum) {
        setError("MetaMask not installed");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      const net = await provider.getNetwork();
      setNetwork(net.name); // e.g., "sepolia"

      // ✅ Fetch balances from backend
      const res = await fetch(`http://localhost:5000/api/wallet/${address}/full`);
      const data = await res.json();

      if (res.ok) {
        setBalance(data.ethBalance ?? "0");
        setTokenBalance(data.balance ?? "0");
      } else {
        setError(data.error || "Failed to fetch wallet data");
        setBalance("0");
        setTokenBalance("0");
      }
    } catch (err) {
      console.error("❌ Wallet connect error:", err);
      setError("Could not connect wallet");
    } finally {
      setLoading(false);
    }
  };

  // Token → ETH conversion
  const handleConvert = async (symbol, amount) => {
    try {
      const res = await fetch("http://localhost:5000/api/convert/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: walletAddress,
          symbol,
          amount,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`✅ Converted ${amount} ${symbol} → ${data.ethReceived} ETH`);
        connectWallet(); // refresh balances after conversion
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error("❌ Convert Error:", err);
      alert("❌ Network error");
    }
  };

  // Auto connect and reload on changes
  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
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
    loading,
    handleConvert,
    refetchWalletData: connectWallet,
  };
};
