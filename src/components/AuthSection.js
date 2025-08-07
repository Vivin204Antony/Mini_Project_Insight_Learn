import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {LoginSocialGoogle} from 'reactjs-social-login'

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

        {/* Google Sign-In Button */}
        <motion.button
          type="button"
          className="google-login-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="google-icon">
            {/* Google SVG icon (no external dependency) */}
            <svg width="22" height="22" viewBox="0 0 533.5 544.3">
              <g>
                <path fill="#4285F4" d="M533.5 278.4c0-17.1-1.6-33.7-4.7-49.6H272.1v94.2h146.4c-6.3 34.4-25.1 63.5-53.4 83.2v68.9h85.8c50.3-46.4 79.6-114.8 79.6-196.7z"/>
                <path fill="#34A853" d="M272.1 544.3c72.2 0 132.7-23.8 177-65.2l-85.8-68.9c-23.8 15.9-54.3 25.3-91.2 25.3-69.9 0-129.1-47.2-150.2-110.7H35.5v69.6c44.4 87.9 135.5 150.1 236.6 150.1z"/>
                <path fill="#FBBC05" d="M121.9 325.1c-10.7-32.2-10.7-66.9 0-99.1V156.4H35.5c-32.4 63.5-32.4 137.5 0 201z"/>
                <path fill="#EA4335" d="M272.1 107.1c39.4 0 74.7 13.6 102.5 40.3l76.9-76.9C404.8 24.7 344.3 0 272.1 0 171 0 79.9 62.2 35.5 156.4l86.4 69.6c21.1-63.5 80.3-118.9 150.2-118.9z"/>
              </g>
            </svg>
          </span>
          <span className="google-btn-text">
            <LoginSocialGoogle
            client_id = '956485276765-p5lb5q12gpfu7f8ih4s56p9e17fvjefc.apps.googleusercontent.com'
            access_type = 'offline'
            onResolve = {({provider,data})=>{
                console.log(provider,data)
            }}
            onReject = {(err)=>{
                console.log(err)
            }}>
                Sign in with Google
            </LoginSocialGoogle>
            
          </span>
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
