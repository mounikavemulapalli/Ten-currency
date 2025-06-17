// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© {new Date().getFullYear()} TEN Blockchain. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-green-400">Privacy Policy</a>
          <a href="#" className="hover:text-green-400">Terms of Service</a>
          <a href="#" className="hover:text-green-400">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
