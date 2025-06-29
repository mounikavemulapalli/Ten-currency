import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Exchange from './pages/Exchange';
import Explorer from './pages/Explorer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateToken from './pages/CreateToken';
import TokenManager from './pages/TokenManager';
import PaymentGateway from './pages/PaymentGateway'; 

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-token" element={<CreateToken />} />
            <Route path="/token-manager" element={<TokenManager />} />
            <Route path="/payment-gateway" element={<PaymentGateway />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
