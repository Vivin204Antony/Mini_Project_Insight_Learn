import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthSection = ({ isLoginMode, onClose }) => {
  return (
    <section className="auth-section">
      <div className="auth-container">
        <AnimatePresence mode="wait">
          {isLoginMode ? (
            <LoginForm key="login" onClose={onClose} />
          ) : (
            <SignupForm key="signup" onClose={onClose} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const LoginForm = ({ onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const mockUser = {
      name: email.split('@')[0],
      email: email,
      avatar: null
    };
    
    login(mockUser);
    onClose();
    navigate('/dashboard', { replace: true });
  };

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
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <motion.div 
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label>Email Address</label>
          <motion.input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
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
            name="password"
            type="password"
            placeholder="Enter your password"
            required
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

const SignupForm = ({ onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    
    const mockUser = {
      name: name,
      email: email,
      avatar: null
    };
    
    login(mockUser);
    onClose();
    navigate('/dashboard', { replace: true });
  };

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
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <motion.div 
          className="form-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label>Full Name</label>
          <motion.input
            name="name"
            type="text"
            placeholder="Enter your full name"
            required
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
            name="email"
            type="email"
            placeholder="Enter your email"
            required
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
            name="password"
            type="password"
            placeholder="Create a strong password"
            required
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
