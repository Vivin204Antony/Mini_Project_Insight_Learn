import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginSocialGoogle } from 'reactjs-social-login';
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
    
    // Get form data
    const formData = new FormData(e.target);
    const email = formData.get('email');
    // eslint-disable-next-line no-unused-vars
    const password = formData.get('password');
    
    // TODO: Replace with your actual authentication logic
    // For now, we'll simulate a successful login
    const mockUser = {
      name: email.split('@')[0], // Use part of email as name for demo
      email: email,
      avatar: null
    };
    
    // Simulate login success
    login(mockUser);
    onClose(); // Close the modal
    navigate('/dashboard', { replace: true }); // Redirect to dashboard
  };

  const handleGoogleSuccess = ({ provider, data }) => {
    console.log('Google login success:', provider, data);
    console.log('Full data object:', JSON.stringify(data, null, 2));
    
    // More comprehensive name extraction with better parsing
    let userName = 'Google User'; // fallback
    let userEmail = null;
    let userAvatar = null;
    
    // Enhanced name extraction logic
    if (data.name) {
      userName = data.name;
    } else if (data.given_name || data.family_name) {
      userName = `${data.given_name || ''} ${data.family_name || ''}`.trim();
    } else if (data.displayName) {
      userName = data.displayName;
    } else if (data.profile && data.profile.name) {
      userName = data.profile.name;
    } else if (data.profile && data.profile.given_name) {
      userName = `${data.profile.given_name} ${data.profile.family_name || ''}`.trim();
    } else if (data.email) {
      // Extract and format name from email as last resort
      const emailName = data.email.split('@')[0];
      userName = emailName.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    // Extract email from different possible locations
    userEmail = data.email || (data.profile && data.profile.email) || null;
    
    // Extract avatar from different possible locations
    userAvatar = data.picture || data.image || (data.profile && data.profile.picture) || null;
    
    const googleUser = {
      name: userName,
      email: userEmail,
      avatar: userAvatar,
      googleId: data.sub || data.id || (data.profile && data.profile.id)
    };
    
    console.log('Final user object:', googleUser);
    
    // Login with Google user data
    login(googleUser);
    onClose(); // Close the modal
    navigate('/dashboard', { replace: true }); // Redirect to dashboard
  };

  const handleGoogleError = (err) => {
    console.error('Google login error:', err);
    // You can add error handling UI here if needed
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

        {/* Google Sign-In Button */}
        <motion.div
          className="google-login-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <LoginSocialGoogle
  client_id='956485276765-p5lb5q12gpfu7f8ih4s56p9e17fvjefc.apps.googleusercontent.com'
  scope="openid profile email"
  discoveryDocs="claims_supported"
  access_type="online"
  onResolve={handleGoogleSuccess}
  onReject={handleGoogleError}
>

            <motion.button
              type="button"
              className="google-btn-inner"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="google-icon">
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
                Sign in with Google
              </span>
            </motion.button>
          </LoginSocialGoogle>
        </motion.div>
      </form>
    </motion.div>
  );
};

const SignupForm = ({ onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    // eslint-disable-next-line no-unused-vars
    const password = formData.get('password');
    
    // TODO: Replace with your actual signup logic
    const mockUser = {
      name: name,
      email: email,
      avatar: null
    };
    
    // Simulate signup success
    login(mockUser);
    onClose(); // Close the modal
    navigate('/dashboard', { replace: true }); // Redirect to dashboard
  };

  const handleGoogleSuccess = ({ provider, data }) => {
    console.log('Google signup success:', provider, data);
    console.log('Full data object:', JSON.stringify(data, null, 2));
    
    // More comprehensive name extraction with better parsing
    let userName = 'Google User'; // fallback
    let userEmail = null;
    let userAvatar = null;
    
    // Enhanced name extraction logic
    if (data.name) {
      userName = data.name;
    } else if (data.given_name || data.family_name) {
      userName = `${data.given_name || ''} ${data.family_name || ''}`.trim();
    } else if (data.displayName) {
      userName = data.displayName;
    } else if (data.profile && data.profile.name) {
      userName = data.profile.name;
    } else if (data.profile && data.profile.given_name) {
      userName = `${data.profile.given_name} ${data.profile.family_name || ''}`.trim();
    } else if (data.email) {
      // Extract and format name from email as last resort
      const emailName = data.email.split('@')[0];
      userName = emailName.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    // Extract email from different possible locations
    userEmail = data.email || (data.profile && data.profile.email) || null;
    
    // Extract avatar from different possible locations
    userAvatar = data.picture || data.image || (data.profile && data.profile.picture) || null;
    
    const googleUser = {
      name: userName,
      email: userEmail,
      avatar: userAvatar,
      googleId: data.sub || data.id || (data.profile && data.profile.id)
    };
    
    console.log('Final user object:', googleUser);
    
    // Login with Google user data
    login(googleUser);
    onClose(); // Close the modal
    navigate('/dashboard', { replace: true }); // Redirect to dashboard
  };

  const handleGoogleError = (err) => {
    console.error('Google signup error:', err);
    // You can add error handling UI here if needed
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

        {/* Google Sign-Up Button */}
        <motion.div
          className="google-login-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <LoginSocialGoogle
            client_id='956485276765-p5lb5q12gpfu7f8ih4s56p9e17fvjefc.apps.googleusercontent.com'
            access_type='offline'
            scope="openid profile email"
            onResolve={handleGoogleSuccess}
            onReject={handleGoogleError}
          >
            <motion.button
              type="button"
              className="google-btn-inner"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="google-icon">
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
                Sign up with Google
              </span>
            </motion.button>
          </LoginSocialGoogle>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AuthSection;
