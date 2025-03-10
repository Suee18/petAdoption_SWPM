// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const NotFound = () => {
  return (
    <div className="page-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;