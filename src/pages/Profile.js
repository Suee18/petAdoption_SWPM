// src/pages/Profile.js
import React from 'react';
import ComingSoon from '../components/ComingSoon';
import './Pages.css';

const Profile = () => {
  return (
    <div className="page-container">
      <ComingSoon 
        title="Profile Page Coming Soon"
        message="We're building a comprehensive profile system where you can manage your pet preferences, track adoption applications, and customize your Cairo Paws experience. Check back soon to see your personalized dashboard!"
        emoji="👤"
        showTimer={true}
      />
      
      <div className="profile-preview-section">
        <h3 className="preview-section-title">Preview of Upcoming Features</h3>
        
        <div className="profile-features-grid">
          <div className="profile-feature-card">
            <div className="feature-icon">📋</div>
            <h4>Requests Tracking</h4>
            <p>Monitor the status of your adoption applications in real-time</p>
          </div>
          
          <div className="profile-feature-card">
            <div className="feature-icon">❤️</div>
            <h4>Saved Pets</h4>
            <p>Keep track of your favorite pets and get notified about their status</p>
          </div>
          
          <div className="profile-feature-card">
            <div className="feature-icon">🛠️</div>
            <h4>Profile Settings</h4>
            <p>Update your personal information and preferences anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;