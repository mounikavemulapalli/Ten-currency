/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/token/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div>
      <h2>All Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx._id}>
              From: {tx.from} → To: {tx.to} | Amount: {tx.amount} {tx.symbol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
