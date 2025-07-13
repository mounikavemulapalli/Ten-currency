/** @format */
import React, { useState, useEffect } from "react";

const TokenCreation = () => {
  const [formData, setFormData] = useState({
    supply: "",
  });

  const [submittedData, setSubmittedData] = useState(null); // 🆕 holds tokenData returned
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokens, setTokens] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { supply } = formData;
    if (!supply) {
      setError("⚠️ Supply is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/token/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decimals: 9,
          amount: Number(supply),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "❌ Token creation failed.");
        return;
      }

      setSubmittedData(data.data); // 🆕 Store the returned mint info
      fetchTokens(); // reload tokens
    } catch (err) {
      console.error("❌ Error creating token:", err);
      setError("❌ Network/server error.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTokens = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/token/all");
      const data = await res.json();
      setTokens(data.tokens);
    } catch (err) {
      console.error("❌ Error fetching tokens:", err);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black px-4 py-12 text-white'>
      <div className='max-w-xl w-full bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl space-y-6'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-center text-purple-300'>
          🚀 Create Your TEN Token
        </h2>
        <p className='text-center text-gray-300'>
          Provide an <span className='text-yellow-300'>Initial Supply</span> to
          deploy a custom token on Solana Devnet.
        </p>

        {submittedData ? (
          <div className='text-center space-y-4'>
            <p className='text-green-400 text-lg font-semibold'>
              ✅ Token created successfully!
            </p>
            <div className='text-sm text-left break-words'>
              <p>
                <strong className='text-purple-300'>Mint Address:</strong>{" "}
                {submittedData.mintAddress}
              </p>
              <p>
                <strong className='text-purple-300'>Token Account:</strong>{" "}
                {submittedData.tokenAccount}
              </p>
              <p>
                <strong className='text-purple-300'>Tx Hash:</strong>{" "}
                <a
                  href={`https://explorer.solana.com/tx/${submittedData.txId}?cluster=devnet`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-blue-400 underline'
                >
                  View on Explorer
                </a>
              </p>
            </div>
            <button
              className='mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md'
              onClick={() => {
                setFormData({ supply: "" });
                setSubmittedData(null);
              }}
            >
              🔁 Create Another Token
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='number'
              name='supply'
              placeholder='📦 Initial Supply (e.g., 1000000)'
              value={formData.supply}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-400'
            />

            {error && <p className='text-red-400 text-sm'>{error}</p>}

            <button
              type='submit'
              className='w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition'
              disabled={loading}
            >
              {loading ? "🔄 Creating..." : "🪙 Create Token"}
            </button>
          </form>
        )}

        <div className='mt-6 text-center text-sm text-gray-400'>
          ⚙️ Tokens you create here are stored in MongoDB and deployed on Solana
          Devnet.
        </div>
      </div>

      {/* ✅ Token List Section */}
      {tokens.length > 0 && (
        <div className='max-w-4xl w-full mt-10'>
          <h3 className='text-xl font-bold text-purple-200 mb-4'>
            🧾 Created Tokens
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {tokens.map((token) => (
              <div
                key={token._id}
                className='bg-white/10 p-4 rounded-lg border border-purple-500 break-words'
              >
                <p className='text-yellow-200 font-semibold'>Mint Address:</p>
                <p className='text-gray-300 mb-2 font-mono'>
                  {token.mintAddress}
                </p>
                <p className='text-yellow-200 font-semibold'>Token Account:</p>
                <p className='text-gray-300 mb-2 font-mono'>
                  {token.tokenAccount}
                </p>
                <p className='text-yellow-200 font-semibold'>Tx Hash:</p>
                <a
                  href={`https://explorer.solana.com/tx/${token.txHash}?cluster=devnet`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-blue-400 underline break-all'
                >
                  {token.txHash}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenCreation;
