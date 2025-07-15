/** @format */

// src/pages/Convertsection.jsx
import React, { useState } from "react";

const Convertsection = ({ address }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) {
      setMessage("❌ Enter a valid token amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/token/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, tokenAmount: Number(amount) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.msg || "Conversion failed"}`);
      } else {
        setMessage(`✅ ${data.converted}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleConvert} className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="Enter token amount to convert"
          className="w-full p-2 rounded-md text-black"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          disabled={loading}
        >
          {loading ? "🔄 Converting..." : "🔁 Convert Token to ETH"}
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-yellow-300">{message}</p>}
    </div>
  );
};

export default Convertsection;
