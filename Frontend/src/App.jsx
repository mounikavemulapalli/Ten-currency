// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Exchange from "./pages/Exchange";
import Explorer from "./pages/Explorer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PaymentGateway from "./pages/PaymentGateway";
import TokenCreation from "./pages/TokenCreation";
import TokenManager from "./pages/TokenManager";
import Convertsection from "./pages/Convertsection";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/payment-gateway" element={<PaymentGateway />} />
            <Route path="/create-token" element={<TokenCreation />} />
            <Route path="/token-manager" element={<TokenManager />} />
            <Route path="/convert" element={<Convertsection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
