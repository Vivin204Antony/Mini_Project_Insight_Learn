// components/Navbar.js
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ openModal, isLoginMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleTitleClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        <motion.h1 
          className="nav-title"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={handleTitleClick}
          style={{ cursor: 'pointer' }}
        >
          InsightLearn
        </motion.h1>
        
        <div className="nav-buttons">
          {!user ? (
            // Show Login/Signup when user is not logged in
            <>
              <motion.button
                className={`nav-btn ${isLoginMode ? 'active' : ''}`}
                onClick={() => openModal && openModal(true)}  // open login modal
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Login
              </motion.button>
              
              <motion.button
                className={`nav-btn ${!isLoginMode ? 'active' : ''}`}
                onClick={() => openModal && openModal(false)} // open signup modal
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Sign Up
              </motion.button>
            </>
          ) : (
            // Show user info and Logout when user is logged in
            <div className="nav-user-section">
              <span className="nav-user-name">
                Hello, {user.name || 'User'}
              </span>
              <motion.button
                className="nav-btn logout-btn"
                onClick={handleLogout}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Logout
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
