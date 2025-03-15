// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  // Add scroll detection for background opacity change
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
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
            <Link to="/register-shelter" className="nav-links">
              Register Shelter
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/available-pets" className="nav-links">
              Available Pets
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links login-link">
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;