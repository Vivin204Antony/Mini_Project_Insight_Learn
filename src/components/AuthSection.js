import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthSection = ({ isLoginMode }) => {
  return (
    <section className="auth-section">
      <div className="auth-container">
        <AnimatePresence mode="wait">
          {isLoginMode ? (
            <LoginForm key="login" />
          ) : (
            <SignupForm key="signup" />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const LoginForm = () => {
  return (
    <motion.div
      className="auth-card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.h3 
        className="auth-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome Back to InsightLearn
      </motion.h3>
      
      <form className="auth-form">
        <motion.div 
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label>Email Address</label>
          <motion.input
            type="email"
            placeholder="Enter your email"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
        <motion.div 
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label>Password</label>
          <motion.input
            type="password"
            placeholder="Enter your password"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
        <motion.button
          type="submit"
          className="auth-submit-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" 
          }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In to InsightLearn
        </motion.button>
      </form>
    </motion.div>
  );
};

const SignupForm = () => {
  return (
    <motion.div
      className="auth-card"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.h3 
        className="auth-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Join InsightLearn Today
      </motion.h3>
      
      <form className="auth-form">
        <motion.div 
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label>Full Name</label>
          <motion.input
            type="text"
            placeholder="Enter your full name"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
        <motion.div 
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label>Email Address</label>
          <motion.input
            type="email"
            placeholder="Enter your email"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
        <motion.div 
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label>Password</label>
          <motion.input
            type="password"
            placeholder="Create a strong password"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
        <motion.button
          type="submit"
          className="auth-submit-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" 
          }}
          whileTap={{ scale: 0.95 }}
        >
          Create Your Account
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AuthSection;
