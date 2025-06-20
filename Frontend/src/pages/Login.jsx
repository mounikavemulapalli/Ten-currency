/** @format */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        alert("Login successful!");
        navigate("/dashboard"); // 👈 Redirect here
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      alert("Something went wrong during login. Check console for details.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-6 rounded shadow-md w-full max-w-sm'
      >
        <h2 className='text-2xl mb-4 text-center'>Login</h2>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 mb-3 border border-gray-300 rounded'
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 mb-3 border border-gray-300 rounded'
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
