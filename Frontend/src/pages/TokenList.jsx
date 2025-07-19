/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const TokenList = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/token")
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) {
          setTokens(res.data);
        } else {
          setTokens([]); // fallback to empty array
        }
      })
      .catch((err) => {
        console.error("Error fetching tokens:", err);
        setTokens([]);
      });
  }, []);

  return (
    <div>
      <h2>All Tokens</h2>
      {tokens.length === 0 ? (
        <p>No tokens found.</p>
      ) : (
        <ul>
          {tokens.map((token) => (
            <li key={token._id}>
              <strong>
                {token.name} ({token.symbol})
              </strong>{" "}
              — Supply: {token.supply}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;
