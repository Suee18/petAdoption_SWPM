// src/pages/RegisterShelter.js
import React from 'react';
import ComingSoon from '../components/ComingSoon';
import './Pages.css';

const RegisterShelter = () => {
  return (
    <div className="page-container">
      <ComingSoon 
        title="Shelter Registration Coming Soon"
        message="We're building a platform to connect animal shelters with potential adopters. If you run a shelter and would like to be notified when our registration system is ready, please leave your email below."
        showTimer={true} 
        emoji="🏠🐾"
      />
    </div>
  );
};

export default RegisterShelter;