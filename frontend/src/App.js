import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import DistributorLogin from './components/DistributorLoginPage';
import ManufacturerLogin from './components/ManufacturerLoginPage';  // Add Manufacturer Login Page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/distributor-login" element={<DistributorLogin />} />
        <Route path="/manufacturer-login" element={<ManufacturerLogin />} />  {/* Added Manufacturer Login */}
        <Route path="/dashboard" element={<h2>Welcome to Dashboard</h2>} />  {/* Optionally update this route */}
      </Routes>
    </Router>
  );
};

export default App;
