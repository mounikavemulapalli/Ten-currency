/** @format */

// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useWallet } from "../hooks/useWallet";
import avatar from "../assets/avatar.jpg"; // Placeholder for user avatar
const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { walletAddress } = useWallet();

  const navLinks = [
    { name: "Wallet", path: "/wallet" },
    { name: "Exchange", path: "/exchange" },
    { name: "Explorer", path: "/explorer" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Create Token", path: "/create-token" },
    { name: "Token Manager", path: "/token-manager" },
    { name: "Payment Gateway", path: "/payment-gateway" },
  ];

  return (
    <nav className='bg-white text-gray-800 shadow-md sticky top-0 z-50'>
      <div className='flex items-center justify-between max-w-7xl mx-auto px-6 py-4'>
        {/* Logo */}
        <Link
          to='/'
          className='text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
        >
          TEN Currency
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-6 text-sm font-medium'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition hover:text-indigo-600 ${
                location.pathname === link.path
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Wallet / Auth */}
        <div className='hidden md:flex gap-4 items-center'>
          {walletAddress ? (
            <div className='flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full shadow'>
              <img src={avatar} alt='avatar' className='w-6 h-6 rounded-full' />
              <span className='text-sm font-mono text-gray-700'>
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          ) : (
            <>
              <Link
                to='/login'
                className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 text-sm'
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={26} /> : <HiOutlineMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className='md:hidden bg-white border-t border-gray-200 px-6 pb-4'>
          <div className='flex flex-col gap-3'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm ${
                  location.pathname === link.path
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700"
                } hover:text-indigo-500`}
              >
                {link.name}
              </Link>
            ))}

            <hr className='my-2 border-gray-300' />

            {walletAddress ? (
              <div className='text-sm font-mono text-center text-gray-700'>
                Connected: <br />
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            ) : (
              <>
                <Link
                  to='/login'
                  onClick={() => setMenuOpen(false)}
                  className='bg-indigo-600 text-white px-4 py-2 rounded text-center'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  onClick={() => setMenuOpen(false)}
                  className='bg-gray-100 text-gray-800 px-4 py-2 rounded text-center'
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
