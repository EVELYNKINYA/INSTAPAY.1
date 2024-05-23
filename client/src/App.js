import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import About from './Components/About';
import Beneficiaries from './Components/Dashboard/User/Beneficiaries';
import SendMoney from './Components/Dashboard/User/SendMoneyForm';
import Navbar from './Components/Shared/Navbar';
import Login from './Components/Auth/Login';
import ForgotPassword from './Components/Auth/Forgot_password';
import Signup from './Components/Auth/Signup';
import Footer from './Components/Shared/Footer';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    // Perform authentication logic (e.g., set token, verify credentials)
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
<Router>
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login handleLogin={handleLogin} />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Protected Routes */}
    <Route
      path="/dashboard/*"
      element={
        isAuthenticated ? (
          <>
            <Navbar />
         {/*    <DashboardLanding /> */}
            <Routes>
              <Route path="beneficiaries" element={<Beneficiaries />} />
              <Route path="send-money" element={<SendMoney />} />
              <Route path="wallet" element={<Wallet />} />
            </Routes>
            <Footer />
            <Modal />
          </>
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />

    {/* Catch-all Route */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</Router>
    </div>
  );
};

export default App;
