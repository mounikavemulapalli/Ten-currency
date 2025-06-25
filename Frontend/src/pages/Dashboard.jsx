/** @format */

// /** @format */

// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SendEth from "../pages/SendEth";
// import { useWallet } from "./WalletConnect";
// import SendToken from "../pages/SendToken";

// const Dashboard = () => {
//   const { walletAddress, balance, tokenBalance, network } = useWallet();
//   return (
//     <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6'>
//       <div className='max-w-6xl mx-auto'>
//         <h1 className='text-4xl font-extrabold mb-4 text-center'>
//           Welcome to TEN Dashboard
//         </h1>
//         <p className='text-lg text-center text-gray-300 mb-10'>
//           Manage your wallet, track transactions, and explore the blockchain
//           network in one place.
//         </p>

//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
//           {/* Wallet Balance & Send ETH */}
//           <div className='bg-white/5 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-purple-600 transition'>
//             <h2 className='text-xl font-semibold text-purple-400 mb-2'>
//               Wallet Balance
//             </h2>
//             <p className='text-3xl font-bold text-green-400 mb-4'>
//               {balance ? parseFloat(balance).toFixed(4) : "--"} ETH
//             </p>
//             <SendEth />
//             <SendToken />
//           </div>

//           {/* Recent Transactions */}
//           <div className='bg-gray-800 p-6 rounded shadow'>
//             <h2 className='text-xl font-semibold mb-2'>Recent Transactions</h2>
//             {transactions.length === 0 ? (
//               <p>No transactions found.</p>
//             ) : (
//               <div className='space-y-3 max-h-64 overflow-y-auto'>
//                 {transactions.map((txn, idx) => (
//                   <div key={idx} className='bg-gray-900 p-3 rounded'>
//                     <p>
//                       <span className='font-bold'>To:</span> {txn.to}
//                     </p>
//                     <p>
//                       <span className='font-bold'>Amount:</span> {txn.amount}
//                     </p>
//                     <p className='truncate text-sm text-gray-400'>
//                       <span className='font-bold'>Hash:</span> {txn.hash}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Network Status */}
//           <div className='bg-white/5 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-purple-600 transition'>
//             <h2 className='text-xl font-semibold text-purple-400 mb-2'>
//               Network Status
//             </h2>
//             <p className='text-green-400 font-medium'>
//               {network ? `Connected to ${network}` : "Not Connected"}
//             </p>
//           </div>

//           {/* Token Holdings */}
//           <div className='bg-white/5 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-purple-600 transition'>
//             <h2 className='text-xl font-semibold text-purple-400 mb-2'>
//               Token Holdings
//             </h2>
//             <p className='text-lg text-gray-300'>
//               USDT: {tokenBalance ? tokenBalance : "--"}
//             </p>
//             <p className='text-lg text-gray-300'>
//               ETH: {balance ? balance : "--"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const walletAddress =
    "0x045ed54d5aeb39bb6b8465038c48768fa8cf8523d06bb1d19526ff4fe89600c9";

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/txn/${walletAddress}`
      );
      setTransactions(res.data);
      console.log("Fetched transactions:", res.data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className='min-h-screen bg-gray-900 text-white px-4 py-10'>
      <h1 className='text-3xl font-bold text-center mb-6'>Dashboard</h1>
      <div className='max-w-4xl mx-auto space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg'>
        {loading ? (
          <p className='text-center'>Loading transactions...</p>
        ) : transactions.length > 0 ? (
          transactions.map((txn, idx) => (
            <div key={idx} className='bg-gray-700 p-4 rounded text-sm'>
              <p>
                <strong>From:</strong> {txn.from}
              </p>
              <p>
                <strong>To:</strong> {txn.to}
              </p>
              <p>
                <strong>Amount:</strong> {txn.amount}
              </p>
              <p className='truncate'>
                <strong>Txn Hash:</strong> {txn.hash || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className='text-center'>No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
