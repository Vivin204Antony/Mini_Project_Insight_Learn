import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Dashboard from './pages/Dashboard';
import ProfileSettings from './components/ProfileSettings'; // Add this import
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';
import './App.css';

// Page transition wrapper component
const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Main app content component (inside Router)
const AppContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Handler for navbar button clicks
  const openModal = (loginMode) => {
    setIsLoginMode(loginMode);
    setModalOpen(true);
  };

  // Handler to close modal
  const closeModal = () => setModalOpen(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup on unmount in case modal still open
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [modalOpen]);

  return (
    <div className="app">
      <Navbar
        openModal={openModal}
        isLoginMode={isLoginMode}
      />
      
      <PageWrapper>
        <Routes>
          {/* Home page route */}
          <Route 
            path="/" 
            element={<HeroSection />} 
          />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
          </Route>
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageWrapper>
      
      {/* Global modal for authentication */}
      <AuthModal
        isOpen={modalOpen}
        onClose={closeModal}
        isLoginMode={isLoginMode}
      />
    </div>
  );
};

// Main App component with providers
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
