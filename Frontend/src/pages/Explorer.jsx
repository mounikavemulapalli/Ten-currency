/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Explorer = () => {
  const [coins, setCoins] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error("Error fetching coins", err);
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
          🔍 TEN Currency Explorer
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search a coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 mx-auto block mb-6 px-4 py-2 rounded-lg text-white border bg-white/10 placeholder:text-gray-300"
        />

        {/* Result List */}
        {filteredCoins.length === 0 ? (
          <p className="text-center text-red-400 text-lg mt-6">
            🚫 No results found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCoins.slice(0, visibleCount).map((coin) => (
                <div
                  key={coin.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow hover:shadow-xl transition"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-10 h-10"
                    />
                    <div>
                      <h2 className="text-xl font-bold">{coin.name}</h2>
                      <p className="text-sm text-gray-300">
                        {coin.symbol.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm space-y-1">
                    <p>
                      💵{" "}
                      <span className="text-green-300">
                        ${coin.current_price.toLocaleString()}
                      </span>
                    </p>
                    <p>
                      📈 Market Cap:{" "}
                      <span className="text-yellow-300">
                        ${coin.market_cap.toLocaleString()}
                      </span>
                    </p>
                    <p>
                      🔄 24h Change:{" "}
                      <span
                        className={
                          coin.price_change_percentage_24h >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </p>

                    {/* Buy Button */}
                    <button
                      onClick={() =>
                        navigate("/payment-gateway", { state: { coin } })
                      }
                      className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded text-sm w-full"
                    >
                      Buy with TEN
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {visibleCount < filteredCoins.length ? (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                >
                  Load More
                </button>
              </div>
            ) : (
              <div className="text-center mt-10">
                <button
                  onClick={handleScrollTop}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
                >
                  🔝 Back to Top
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explorer;
