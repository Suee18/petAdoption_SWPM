// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoggedInNavbar from './components/LoggedInNavbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/signUp';
import AvailablePets from './pages/AvailablePets';
import Profile from './pages/Profile';
import Inbox from './pages/Inbox';
import RegisterShelter from './pages/RegisterShelter';
import ShelterDashboard from './pages/ShelterDashboard';
import NotFound from './pages/NotFound';
import './App.css';

// Wrapper to decide which component to render based on authentication and user role
const AuthRoute = ({ element: Element, requiresAuth, requiresShelterRole }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  if (requiresAuth) {
    // Not logged in - redirect to login
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    
    // Requires shelter role but user doesn't have it
    if (requiresShelterRole && userRole !== 'shelter') {
      return <Navigate to="/profile" replace />;
    }
    
    // User is authenticated and has required role
    return Element;
  } else {
    // Page doesn't require authentication
    return Element;
  }
};

// Separate logout component
const LogoutComponent = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    navigate('/', { replace: true });
  }, [navigate]);
  
  return <div>Logging out...</div>;
};

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  
  // Function to handle login
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  
  return (
    <div className="App">
      {isLoggedIn ? <LoggedInNavbar onLogout={handleLogout} /> : <Navbar />}
      
      <div className="container">
        <Routes>
          <Route path="/" element={<AuthRoute element={<Landing />} requiresAuth={false} />} />
          <Route 
            path="/login" 
            element={<AuthRoute element={<Login onLogin={handleLogin} />} requiresAuth={false} />} 
          />
          <Route path="/register-shelter" element={<AuthRoute element={<RegisterShelter />} requiresAuth={false} />} />
          <Route path="/shelter-dashboard" element={<AuthRoute element={<ShelterDashboard />} requiresAuth={true} requiresShelterRole={true} />} />
          
          <Route path="/available-pets" element={<AuthRoute element={<AvailablePets />} requiresAuth={false} />} />
          <Route path="/signUp" element={<AuthRoute element={<SignUp />} requiresAuth={false} />} />
          <Route path="/profile" element={<AuthRoute element={<Profile />} requiresAuth={true} />} />
          <Route path="/inbox" element={<AuthRoute element={<Inbox />} requiresAuth={true} />} />
          <Route path="/logout" element={<LogoutComponent />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;