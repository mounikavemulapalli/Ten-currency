// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Wallet', path: '/wallet' },
    { name: 'Exchange', path: '/exchange' },
    { name: 'Explorer', path: '/explorer' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="bg-white text-gray-800 px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TEN Currency
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 items-center text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-indigo-600 transition ${
                location.pathname === link.path ? 'text-indigo-600 font-medium' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition text-sm"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
