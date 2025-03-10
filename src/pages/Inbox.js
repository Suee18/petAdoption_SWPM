// src/pages/Inbox.js
import React from 'react';
import ComingSoon from '../components/ComingSoon';
import './Pages.css';

const Inbox = () => {
  return (
    <div className="page-container">
      <ComingSoon 
        title="Inbox Coming Soon"
        message="Our messaging system is under development. Soon you'll be able to communicate directly with shelters, receive updates about your applications, and get notifications about new pets that match your preferences."
        showTimer={true}
        emoji="📨"
      />
    </div>
  );
};

export default Inbox;