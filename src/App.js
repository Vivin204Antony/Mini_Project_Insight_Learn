import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Dashboard from './pages/Dashboard';
import PDFTutorModule from './pages/dashboard/PDFTutorModule';
import ProgressTracker from './pages/dashboard/ProgressTracker';
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
          {/* Public Routes */}
          <Route path="/" element={<HeroSection />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Main Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* PDF Upload & Tutor Module */}
            <Route path="/dashboard/upload" element={<PDFTutorModule />} />
            
            {/* Progress Tracker Routes */}
            <Route path="/dashboard/progress" element={<ProgressTracker />} />
            
            {/* User Profile & Settings */}
            <Route path="/profile-settings" element={<ProfilePage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            
            {/* Future Dashboard Modules - Add as needed */}
            {/* 
            <Route path="/dashboard/flashcards" element={<FlashcardModule />} />
            <Route path="/dashboard/quizzes" element={<QuizModule />} />
            <Route path="/dashboard/achievements" element={<AchievementsModule />} />
            */}
          </Route>
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageWrapper>
      
      {/* Global Authentication Modal */}
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
