import React from "react";

export default function HomePage() {
  return (
    <div className="relative bg-gradient-to-b from-[#0B0F24] to-[#111936] text-white font-sans overflow-hidden z-0">
      {/* Floating Coins Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 30 + 20; // 20px - 50px
          const duration = Math.random() * 10 + 5; // 5s - 15s
          const delay = Math.random() * 5;
          const left = Math.random() * 100;
          const top = -(Math.random() * 20 + 5);
          const opacity = Math.random() * 0.5 + 0.5;
          const rotate = Math.random() > 0.5 ? "rotate-slow" : "";

          return (
            <img
              key={i}
              src="https://cdn-icons-png.flaticon.com/512/138/138292.png" 
              alt="coin"
              className={`animate-floatingCoin ${rotate}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                opacity: opacity,
                zIndex: 25,
              }}
            />
          );
        })}
      </div>

      {/* Hero Section */}
      <section className="relative text-center py-20 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Be early to the future of finance
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Buy Bitcoin, Ethereum, and other leading cryptocurrencies <br />
          on a platform trusted by millions:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="rounded-lg px-4 py-2 text-white w-72 bg-transparent border border-gray-400 focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white">
            Sign Up
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col md:flex-row justify-center items-stretch gap-6 px-4 py-10 z-10 relative">
        {/* Wallet Card */}
        <div className="bg-white text-black p-6 rounded-xl w-full md:w-1/3 shadow-md flex flex-col justify-between">
          <span className="text-lg bg-purple-100 text-purple-800 px-3 py-1 rounded-full mb-2 inline-block">
            📲 Buy, sell
          </span>
          <h3 className="text-2xl font-semibold mb-4">
            The only crypto wallet you’ll ever need
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
            <li>Buy, sell, and swap with ease</li>
            <li>Use a card or bank account for purchases</li>
            <li>Earn rewards on your crypto</li>
            <li>Connect to DeFi protocols</li>
          </ul>
        </div>

        {/* Trade Card */}
        <div className="bg-white text-black p-6 rounded-xl w-full md:w-1/3 shadow-md flex flex-col justify-between">
          <span className="text-lg bg-blue-100 text-blue-800 px-3 py-1 rounded-full mb-2 inline-block">
            📊📈 Trade
          </span>
          <img
            src="https://i.pinimg.com/736x/60/d5/04/60d5042b0a6dbc5d301cd820c4c5c7cd.jpg"
            alt="App UI"
            className="h-48 object-cover rounded-lg"
          />
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Get started</h3>
          </div>
        </div>
      </section>

      {/* Institutional Sections */}
      <section className="bg-orange-50 text-black px-4 py-12 space-y-12 z-10 relative">
        <div className="bg-white rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <span className="text-lg bg-orange-200 text-orange-700 px-3 py-1 rounded-full inline-block mb-2">
              🏦 Institutional
            </span>
            <h3 className="text-2xl font-bold mb-4">
              Tailored crypto solutions for institutions
            </h3>
            <p className="text-gray-700 text-lg mb-3">
              Access premium tools and expert support designed for hedge funds,
              banks, and trading desks. We provide secure APIs, compliance-ready
              infrastructure, and white-glove onboarding.
            </p>
            <ul className="list-disc pl-5 text-gray-700 text-base space-y-1">
              <li>Enterprise-level security & custody</li>
              <li>Custom trading & execution solutions</li>
              <li>Regulatory reporting & compliance assistance</li>
              <li>Dedicated account management</li>
            </ul>
          </div>
          <img
            src="https://www.arabianbusiness.com/wp-content/uploads/sites/3/cloud/2024/11/08/vJmOGuFu-bitcoin-stock-chart-800x600.jpg"
            alt="Analytics dashboard"
            className="w-full md:w-80 h-48 object-cover rounded-lg"
          />
        </div>

        {/* Explore section */}
        <div className="bg-white rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <span className="text-lg bg-orange-200 text-orange-700 px-3 py-1 rounded-full inline-block mb-2">
              🔍 Explore
            </span>
            <h3 className="text-2xl font-bold mb-4">
              Discover deeper crypto opportunities
            </h3>
            <p className="text-gray-700 text-lg mb-3">
              Get access to real-time analytics, market insights, and on-chain
              data visualizations. Build strategies with institutional-grade
              intelligence.
            </p>
            <ul className="list-disc pl-5 text-gray-700 text-base space-y-1">
              <li>DeFi trends and yield opportunities</li>
              <li>Token performance analysis and forecasts</li>
              <li>Global liquidity heatmaps and data</li>
              <li>Custom dashboards and reports</li>
            </ul>
          </div>
          <img
            src="https://images.pexels.com/photos/6771672/pexels-photo-6771672.jpeg"
            alt="Crypto research tools"
            className="w-full md:w-80 h-48 object-cover rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}
