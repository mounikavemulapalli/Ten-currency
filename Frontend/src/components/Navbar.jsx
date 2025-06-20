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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
