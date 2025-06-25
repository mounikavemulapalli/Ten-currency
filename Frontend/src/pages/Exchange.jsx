// // src/pages/Exchange.jsx
// import React, { useState } from 'react';

// const Exchange = () => {
//   const [from, setFrom] = useState('ETH');
//   const [to, setTo] = useState('USDT');
//   const [amount, setAmount] = useState('');
//   const [result, setResult] = useState(null);

//   const handleExchange = () => {
//     if (!amount) return;
//     // Mock conversion rate
//     const rate = from === 'ETH' && to === 'USDT' ? 3000 : 0.00033;
//     setResult((amount * rate).toFixed(4));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
//       <div className="bg-gray-800 text-white rounded-2xl shadow-xl p-10 w-full max-w-2xl text-center">
//         <h2 className="text-4xl font-bold mb-8">Crypto Exchange</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="block text-left mb-2 text-gray-300">From</label>
//             <select
//               value={from}
//               onChange={(e) => setFrom(e.target.value)}
//               className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="ETH">ETH</option>
//               <option value="USDT">USDT</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-left mb-2 text-gray-300">To</label>
//             <select
//               value={to}
//               onChange={(e) => setTo(e.target.value)}
//               className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="USDT">USDT</option>
//               <option value="ETH">ETH</option>
//             </select>
//           </div>
//         </div>

//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//         />

//         <button
//           onClick={handleExchange}
//           className="bg-green-600 hover:bg-green-700 transition duration-300 px-6 py-3 rounded-lg text-lg font-semibold"
//         >
//           Exchange
//         </button>

//         {result && (
//           <p className="mt-8 text-2xl font-semibold text-green-400">
//             Converted Amount: {result} {to}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Exchange;
// src/pages/Exchange.jsx
import React, { useState } from 'react';

const Exchange = () => {
  const [from, setFrom] = useState('ETH');
  const [to, setTo] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const handleExchange = async () => {
    if (!amount) {
      alert('Enter a valid amount');
      return;
    }
    if (from === to) {
      alert('From and To currencies cannot be the same');
      return;
    }
  
    console.log("Sending:", { from, to, amount }); // 🧪 Debug line
  
    try {
      const res = await fetch("http://localhost:5000/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, amount }),
      });
  
      const data = await res.json();
      console.log("Server Response:", data);
  
      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }
  
      setResult(data.converted);
    } catch (error) {
      console.error("Exchange failed:", error);
      alert("Failed to fetch conversion rate");
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="bg-gray-800 text-white rounded-2xl shadow-xl p-10 w-full max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-8">Crypto Exchange</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-left mb-2 text-gray-300">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="BNB">BNB</option>
            </select>
          </div>
          <div>
            <label className="block text-left mb-2 text-gray-300">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USDT">USDT</option>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
              <option value="BNB">BNB</option>
            </select>
          </div>
        </div>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleExchange}
          className="bg-green-600 hover:bg-green-700 transition duration-300 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Exchange
        </button>

        {result && (
          <p className="mt-8 text-2xl font-semibold text-green-400">
            Converted Amount: {result} {to}
          </p>
        )}
      </div>
    </div>
  );
};

export default Exchange;
