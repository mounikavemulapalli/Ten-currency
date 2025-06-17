/** @format */

// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during signup");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4'>
      <div className='w-full max-w-md bg-white/10 border border-gray-700 backdrop-blur-md p-8 rounded-2xl shadow-lg text-white'>
        <h2 className='text-3xl font-bold text-center mb-6'>Sign Up for TEN</h2>
        <form onSubmit={handleSignup}>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-3 mb-4 bg-white/10 border border-gray-600 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
            required
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 mb-4 bg-white/10 border border-gray-600 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 mb-4 bg-white/10 border border-gray-600 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
            required
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full p-3 mb-6 bg-white/10 border border-gray-600 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
            required
          />
          <button
            type='submit'
            className='w-full py-3 bg-green-600 hover:bg-green-700 transition rounded text-white font-semibold'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
