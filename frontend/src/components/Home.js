import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    // This function navigates to the appropriate login page based on the role
    navigate(`/${role}-login`);
  };

  return (
    <div className="home-container">
      <h2>Welcome to MedVerify</h2>
      <div className="login-options">
        <button onClick={() => handleLoginClick('user')}>User Login</button>
        <button onClick={() => handleLoginClick('manufacturer')}>Manufacturer Login</button>
        <button onClick={() => handleLoginClick('distributor')}>Distributor Login</button>
      </div>
    </div>
  );
};

export default Home;
