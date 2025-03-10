// src/components/ComingSoon.js
import React from 'react';
import './ComingSoon.css';

const ComingSoon = ({ 
  title,
  message,
  showNotifyForm = false,
  showTimer = false,
  showSocial = false,
  emoji = '🐾' // default emoji for pet-related pages
}) => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-bg"></div>
      
      <div className="coming-soon-emoji">{emoji}</div>
      
      <h1 className="coming-soon-title">{title || 'Coming Soon'}</h1>
      
      <p className="coming-soon-message">
        {message || 'We\'re working hard to bring you this new feature. Stay tuned for updates!'}
      </p>
      
      {showTimer && (
        <div className="coming-soon-timer">
          <div className="timer-item">
            <span className="timer-number">07</span>
            <span className="timer-label">Days</span>
          </div>
          <div className="timer-item">
            <span className="timer-number">24</span>
            <span className="timer-label">Hours</span>
          </div>
          <div className="timer-item">
            <span className="timer-number">13</span>
            <span className="timer-label">Minutes</span>
          </div>
          <div className="timer-item">
            <span className="timer-number">46</span>
            <span className="timer-label">Seconds</span>
          </div>
        </div>
      )}
      

      

    </div>
  );
};

export default ComingSoon;