/** @format */

import React, { useState } from "react";
import axios from "axios";

const TransferTokenForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
    symbol: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/token/transfer",
        formData
      );
      alert("Transfer successful: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("Transfer failed");
    }
  };

  return (
    <div>
      <h2>Transfer Token</h2>
      <form onSubmit={handleTransfer}>
        <input
          name='from'
          placeholder='From Address'
          onChange={handleChange}
          required
        />
        <input
          name='to'
          placeholder='To Address'
          onChange={handleChange}
          required
        />
        <input
          name='amount'
          type='number'
          placeholder='Amount'
          onChange={handleChange}
          required
        />
        <input
          name='symbol'
          placeholder='Token Symbol (e.g. TEN)'
          onChange={handleChange}
          required
        />
        <button type='submit'>Transfer</button>
      </form>
    </div>
  );
};

export default TransferTokenForm;
