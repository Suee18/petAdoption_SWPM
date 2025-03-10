// src/components/LoggedInNavbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const LoggedInNavbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = (e) => {
    e.preventDefault();
    
    // Remove the isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to home page
    navigate('/');
    
    // Force page refresh to update the navbar
    window.location.reload();
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Cairo Paws
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/available-pets" className="nav-links">
              Available Pets
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inbox" className="nav-links">
              Inbox
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-links">
              My Profile
            </Link>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-links" onClick={handleLogout}>
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;