<<<<<<< HEAD
/** @format */

// /** @format */

// import React from "react";
// import { Link } from "react-router-dom";
// import { useWallet } from "../pages/WalletConnect";

// const Navbar = () => {
//   const { walletAddress, connectWallet } = useWallet();

//   return (
//     <nav className='flex items-center justify-between px-6 py-4 bg-gray-900 text-white'>
//       <div className='text-xl font-bold'>
//         <Link to='/'>TEN Currency</Link>
//       </div>

//       <div className='flex items-center gap-4'>
//         <Link to='/'>Home</Link>
//         <Link to='/wallet'>Wallet</Link>
//         <Link to='/exchange'>Exchange</Link>
//         <Link to='/explorer'>Explorer</Link>
//         {!walletAddress && (
//           <>
//             <Link to='/login'>Login</Link>
//             <Link to='/signup'>Signup</Link>
//           </>
//         )}
//         <button
//           onClick={connectWallet}
//           className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
//         >
//           {walletAddress
//             ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
//             : "Connect Wallet"}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../pages/WalletConnect";

const Navbar = () => {
  const { walletAddress, balance, tokenBalance, network, connectWallet } =
    useWallet();

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-gray-900 text-white'>
      <div className='text-xl font-bold'>
        <Link to='/'>TEN Currency</Link>
      </div>
      <div className='flex items-center gap-4'>
        <Link to='/'>Home</Link>
        <Link to='/wallet'>Wallet</Link>
        <Link to='/exchange'>Exchange</Link>
        <Link to='/explorer'>Explorer</Link>
        <Link to='/dashboard'>Dashboard</Link>
        {!walletAddress && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}

        <div className='flex items-center gap-2'>
          <button
            onClick={connectWallet}
            className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
          >
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </button>

          {walletAddress && (
            <div className='text-sm text-gray-300'>
              {parseFloat(balance).toFixed(4)} ETH |
              {parseFloat(tokenBalance).toFixed(2)} USDT |{network}
            </div>
          )}
=======
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
>>>>>>> 6f4e641f45204e27802c32da8c987ee1de9c6366
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
