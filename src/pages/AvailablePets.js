// src/pages/AvailablePets.js
import React from 'react';
import ComingSoon from '../components/ComingSoon';
import './Pages.css';

const AvailablePets = () => {
  return (
    <div className="page-container">
      <ComingSoon 
        title="Available Pets Coming Soon"
        message="We're working on bringing you a comprehensive list of pets looking for their forever homes. Soon you'll be able to browse, filter, and connect with shelters to find your perfect companion."
        showTimer={true} 
        emoji="🐱🐶"
      />
    </div>
  );
};

export default AvailablePets;