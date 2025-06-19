// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white text-lg font-semibold mb-2">
            TEN Currency
          </h4>
          <p className="text-sm">
            Empowering the future of decentralized finance.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Links</h4>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Community
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <p className="text-sm">Email: support@tencurrency.com</p>
          <p className="text-sm">Location: India | Global</p>
        </div>
      </div>
      <div className="text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} TEN Currency. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
