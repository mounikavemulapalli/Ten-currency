// src/pages/Explorer.jsx
import React, { useState } from 'react';

const Explorer = () => {
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState(null);

  const handleSearch = async () => {
    if (!address) return;
    // Mock response for now
    setDetails({
      balance: '2.345 ETH',
      txCount: 25,
      latestTx: '0xabc123...ef9'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="bg-gray-800 text-white rounded-2xl shadow-lg p-10 w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Blockchain Explorer</h2>

        <input
          type="text"
          placeholder="Enter wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 transition duration-300 px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Search
          </button>
        </div>

        {details && (
          <div className="mt-8 bg-gray-700 rounded-xl p-6 text-lg text-left">
            <p className="mb-3"><strong className="text-purple-400">Balance:</strong> {details.balance}</p>
            <p className="mb-3"><strong className="text-purple-400">Transaction Count:</strong> {details.txCount}</p>
            <p><strong className="text-purple-400">Latest Transaction:</strong> {details.latestTx}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
