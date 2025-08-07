// components/Navbar.js
import React from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ openModal, isLoginMode }) => (
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
      >
        InsightLearn
      </motion.h1>
      <div className="nav-buttons">
        <motion.button
          className={`nav-btn ${isLoginMode ? 'active' : ''}`}
          onClick={() => openModal(true)}  // open login modal
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Login
        </motion.button>
        <motion.button
          className={`nav-btn ${!isLoginMode ? 'active' : ''}`}
          onClick={() => openModal(false)} // open signup modal
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Sign Up
        </motion.button>
      </div>
    </div>
  </motion.nav>
);

export default Navbar;
