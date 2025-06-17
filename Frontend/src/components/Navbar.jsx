// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-green-400">TEN Currency</Link>

        <div className="flex gap-6 items-center">
          <Link to="/wallet" className="hover:text-green-400">Wallet</Link>
          <Link to="/exchange" className="hover:text-green-400">Exchange</Link>
          <Link to="/explorer" className="hover:text-green-400">Explorer</Link>
          <Link to="/dashboard" className="hover:text-green-400">Dashboard</Link>
        </div>

        <div className="flex gap-4">
          <Link to="/login" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Login</Link>
          <Link to="/signup" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;