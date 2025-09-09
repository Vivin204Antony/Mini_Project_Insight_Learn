import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Dashboard from './pages/Dashboard';
import PDFTutorModule from './pages/dashboard/PDFTutorModule'; // <-- Import your upload module
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';
import './App.css';

// Page transition wrapper
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

const AppContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const openModal = (loginMode) => {
    setIsLoginMode(loginMode);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [modalOpen]);

  return (
    <div className="app">
      <Navbar openModal={openModal} isLoginMode={isLoginMode} />
      <PageWrapper>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HeroSection />} />
          {/* Protected (logged-in) routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/upload" element={<PDFTutorModule />} /> {/* <-- Upload PDF module */}
            <Route path="/profile-settings" element={<ProfilePage />} />
            {/* Add more dashboard subpages here if needed */}
          </Route>
          {/* Redirect unknown routes */}
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

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
