/** @format */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 * i, duration: 0.8 },
  }),
};

const coinImgs = [
  "https://www.citypng.com/public/uploads/preview/hd-white-round-bitcoin-icon-png-701751695054978wbgddargwg.png",
  "https://png.pngtree.com/png-vector/20210501/ourmid/pngtree-ethereum-cryptocurrency-silver-coin-png-image_3256407.jpg",
  "https://elements-resized.envatousercontent.com/elements-video-cover-images/c98471ce-2159-485a-beff-1e96ed69c716/video_preview/video_preview_0001.jpg?w=500&cf_fit=cover&q=85&format=auto&s=f6cb727e7c1946868f18311830cdc60cd7734257dd3c7f3b07927c31270f652a",
  "https://thumbs.dreamstime.com/b/crypto-currency-golden-coin-black-lackered-dogecoin-symbol-obverse-isolated-black-background-vector-illustration-use-112278849.jpg",
];

const stats = [
  { label: "Active Wallets", value: "1.5M+" },
  { label: "Transactions", value: "12M+" },
  { label: "Tokens Created", value: "3.2K" },
  { label: "Countries Served", value: "80+" },
];

const blogs = [
  {
    title: "How Crypto is Reshaping Global Finance",
    desc: "Explore how decentralized assets are impacting world markets and institutions.",
    image:
      "https://wallpapersok.com/images/hd/transparent-blockchains-usqwfmjbwsjbisfa.jpg",
  },
  {
    title: "Top 5 Wallets in 2025",
    desc: "From MetaMask to TEN Wallet, which one should you choose?",
    image:
      "https://i.insider.com/59e77388ddd0634e008b4c9b?width=800&format=jpeg&auto=webp",
  },
  {
    title: "Understanding Smart Contracts",
    desc: "A beginner’s guide to how smart contracts work and why they matter.",
    image:
      "https://assets.clarisco.com/clarisco+images/nft/nft-services/smart-contract-based-nft-development/smart-contract-based-nft-development-company.webp",
  },
];

const testimonials = [
  {
    name: "Ankit R.",
    feedback:
      "🔥 TEN has simplified my crypto experience. The wallet is fast and reliable!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya S.",
    feedback:
      "🚀 The payment gateway helped our startup integrate crypto in minutes!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Dev Y.",
    feedback: "🪙 I launched my own token easily using TEN’s token tool!",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const partners = [
  "https://dailyhodl.com/wp-content/uploads/2025/04/binance_logo_black_background_1745488958Dz3agMEZqC.jpg?w=1024&h=570&crop=1",
  "https://logowik.com/content/uploads/images/ethereum-blue-icon1720895003.logowik.com.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx3aPilukEM7B6RAbWiIZ9KjamxZaYxeArNQ&s",
  "https://forkast.news/wp-content/uploads/2021/12/polygon-1260x709.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c0/Cardano_Logo.jpg",
  "https://www.shutterstock.com/image-vector/dogecoin-cryptocurrency-doge-coin-blockchain-600nw-2190319355.jpg",
];

const faqs = [
  {
    question: "🤔 How do I connect my wallet?",
    answer:
      "Click the 'Connect Wallet' button. MetaMask or other Web3 wallets are supported.",
  },
  {
    question: "🪙 Can I use TEN Coin on other platforms?",
    answer:
      "Yes! Your deployed token can be used on all BSC-compatible networks.",
  },
  {
    question: "💸 What are the platform fees?",
    answer:
      "We currently charge 0% fees for token generation and standard wallet operations.",
  },
  {
    question: "📲 Is TEN Wallet available on mobile?",
    answer:
      "The web app is fully mobile-optimized. A native app is coming soon!",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { walletAddress, connectWallet } = useWallet();
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Place this at the bottom of your Home component before the return ends

  const predefinedQA = [
    {
      question: "How do I connect my wallet?",
      answer:
        "Click 'Connect Wallet' on the homepage. Make sure MetaMask is installed.",
    },
    {
      question: "What is TEN Coin?",
      answer:
        "TEN Coin is a utility token used within the TEN Blockchain Gateway ecosystem.",
    },
    {
      question: "Can I create my own token?",
      answer:
        "Yes! Go to the 'Generate TEN Coin' section and follow the steps.",
    },
  ];

  // Chatbot logic
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const lowerInput = input.toLowerCase();
    const match = predefinedQA.find((qa) =>
      lowerInput.includes(qa.question.toLowerCase())
    );
    const botMsg = {
      from: "bot",
      text: match
        ? match.answer
        : "Sorry, I don't understand. Try asking about wallet, TEN Coin, or token creation.",
    };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  const [randomPositions] = useState(() =>
    Array.from({ length: coinImgs.length }, () => ({
      top: Math.floor(Math.random() * 80),
      left: Math.floor(Math.random() * 90),
    }))
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black font-sans text-white">
      {/* Floating Coins */}
      {coinImgs.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt="coin"
          className="absolute w-12 h-12 opacity-50"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, 30, 0], rotate: [0, 360] }}
          transition={{
            repeat: Infinity,
            duration: 6 + i,
            ease: "easeInOut",
            delay: i * 1.1,
          }}
          style={{
            top: `${randomPositions[i].top}%`,
            left: `${randomPositions[i].left}%`,
          }}
        />
      ))}

      <div className="absolute top-4 right-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
        >
          Toggle {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-28 px-6 md:px-24">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Welcome to TEN Currency
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-300"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Step into the future of digital finance with TEN — Fast, Secure, and
          Truly Decentralized.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email to get updates"
            className="w-full sm:w-3/5 px-4 py-3 rounded-md text-black bg-white shadow"
          />
          <button
            onClick={() => setShowNewsletter(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-md font-medium shadow-lg transition"
          >
            Join TEN Network
          </button>
        </div>

        <div className="mt-6">
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold mt-4"
            >
              Connect Wallet
            </button>
          ) : (
            <p className="text-sm text-green-400 font-mono mt-4">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          )}
        </div>
      </section>

      {/* Animated Stats Section */}
      <section id="stats" className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-center"
            >
              {/* Emoji icon */}
              <span className="text-4xl mb-2">
                {stat.label.includes("Wallet") && "👛"}
                {stat.label.includes("Transaction") && "💸"}
                {stat.label.includes("Token") && "🪙"}
                {stat.label.includes("Country") && "🗺️"}
              </span>
              <h3 className="text-4xl font-extrabold text-blue-400 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-300 uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Flexible Pricing Plans</h2>
          <p className="text-gray-600 mb-10">
            Choose a plan that fits your needs.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$0",
                features: [
                  "Basic Wallet",
                  "Token Creation",
                  "Community Support",
                ],
              },
              {
                name: "Pro",
                price: "$29/mo",
                features: [
                  "Advanced Analytics",
                  "Up to 10 Tokens",
                  "Custom Domains",
                ],
              },
              {
                name: "Enterprise",
                price: "Contact Us",
                features: [
                  "Unlimited Tokens",
                  "Dedicated Manager",
                  "Full API Access",
                ],
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className="border rounded-xl p-6 shadow-lg bg-blue-50"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="text-gray-700 mb-6 space-y-2">
                  {plan.features.map((f, idx) => (
                    <li key={idx}>• {f}</li>
                  ))}
                </ul>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap / Timeline Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Milestone Timeline */}
          <div>
            <h2 className="text-4xl font-bold mb-10">🚀 Platform Roadmap</h2>
            <div className="space-y-8">
              {[
                {
                  quarter: "Q1 2025",
                  event: "🧱 Launch TEN Token Generator & Wallet v2.0",
                },
                {
                  quarter: "Q2 2025",
                  event: "💳 Crypto Payment Gateway SaaS with Live Conversion",
                },
                {
                  quarter: "Q3 2025",
                  event: "🎨 NFT Marketplace with Custom Minting & Collections",
                },
                {
                  quarter: "Q4 2025",
                  event: "🌍 Global Partnerships + Cross-Chain Support",
                },
                {
                  quarter: "Q1 2026",
                  event: "📱 Mobile App Launch with Wallet + DEX Integration",
                },
              ].map((milestone, i) => (
                <motion.div
                  key={i}
                  className="border-l-4 border-blue-300 pl-5"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-semibold">{milestone.quarter}</h4>
                  <p className="text-sm text-gray-200">{milestone.event}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Static Image */}
          <div className="flex justify-center">
            <img
              src="https://www.cohesis.com.au/wp-content/uploads/2023/06/Cohesis-Technology-Roadmap-Diagram-v2.png"
              alt="Roadmap Visual"
              className="rounded-xl shadow-xl w-full max-w-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Video Explainer Section */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Watch How TEN Works</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-96 rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="TEN Explainer Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Newsletter Popup */}
      {showNewsletter && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-xl w-[90%] max-w-md relative">
            <button
              onClick={() => setShowNewsletter(false)}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Stay up to date with latest updates and launches.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded mb-4"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Subscribe Now
            </button>
          </div>
        </div>
      )}

      {/* Blog or News Feed Section */}
      <section id="blog" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            📰 Latest News
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((post, i) => (
              <motion.div
                key={i}
                className="bg-white/10 p-4 rounded shadow hover:shadow-xl transition"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-blue-300">
                  🧠 {post.title}
                </h3>
                <p className="text-gray-300 mb-2 text-sm">{post.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section id="testimonials" className="bg-[#10194f] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">💬 What Our Users Say</h2>
          <div className="flex overflow-x-auto space-x-6 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white/10 min-w-[300px] rounded-lg p-6 shadow-md snap-center flex-shrink-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 mx-auto rounded-full mb-4"
                />
                <p className="text-gray-200 text-sm italic">“{t.feedback}”</p>
                <p className="text-purple-300 mt-2 font-semibold">- {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Slider */}
      <section id="partners" className="bg-[#141e30] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">🤝 Our Trusted Partners</h2>
          <div className="flex overflow-x-auto gap-10 items-center justify-start scrollbar-hide px-4">
            {partners.map((logo, idx) => (
              <motion.img
                key={idx}
                src={logo}
                alt="partner logo"
                className="w-32 h-auto grayscale hover:grayscale-0 transition flex-shrink-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="bg-blue-50 text-black py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            ❓ Frequently Asked Questions
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} className="mb-6 border-b">
              <button
                className="w-full text-left py-4 text-lg font-medium flex justify-between items-center"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                {faq.question}
                <span className="ml-2 text-gray-600">
                  {openFAQ === i ? "−" : "+"}
                </span>
              </button>
              {openFAQ === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-700 pb-4"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Widget */}
      <div className="fixed bottom-5 right-5 z-50">
        {!showChat ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            onClick={() => setShowChat(true)}
          >
            💬 Chat Support
          </button>
        ) : (
          <div className="w-80 h-96 bg-white rounded-lg shadow-lg p-4 flex flex-col">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="text-lg font-semibold text-blue-600">
                🤖 TEN Chatbot
              </h4>
              <button
                onClick={() => setShowChat(false)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mb-2 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm p-2 rounded ${
                    msg.from === "user"
                      ? "bg-blue-100 text-right ml-auto"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-2 border rounded text-black"
                placeholder="Type your question..."
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
