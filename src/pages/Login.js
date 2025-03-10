// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComingSoon from '../components/ComingSoon';
import './Pages.css';

const Login = () => {
  const navigate = useNavigate();

  const handleQuickLogin = () => {
    // Store login state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirect to profile
    navigate('/profile');
  };

  return (
    <div className="page-container">
      <ComingSoon 
        title="Advanced Login Coming Soon"
        message="We're enhancing our authentication system with features like social login, password recovery, and improved security. In the meantime, you can use the quick login button below to access your profile."
        emoji="🔐"
      />
      
      <div className="quick-login-section">
        <button 
          className="quick-login-button"
          onClick={handleQuickLogin}
        >
          Static Login to Profile
        </button>
        </div>
         </div>
  );
};

export default Login;