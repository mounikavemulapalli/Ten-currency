// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300 py-12 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h4 className="text-white text-xl font-semibold mb-3">TEN Currency</h4>
          <p className="text-sm leading-relaxed">
            Powering the next evolution in decentralized finance. TEN provides fast, secure, and global transactions on the blockchain.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Explore</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-purple-400 transition">About</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Roadmap</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Community</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm mb-2">📧 support@tencurrency.com</p>
          <p className="text-sm mb-4">📍 India | Serving Globally</p>
          <div className="flex space-x-4 text-purple-400">
            <a href="#"><FaFacebookF className="hover:text-white transition" /></a>
            <a href="#"><FaTwitter className="hover:text-white transition" /></a>
            <a href="#"><FaTelegramPlane className="hover:text-white transition" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-white transition" /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} TEN Currency. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
