import React, { useState, useEffect } from 'react'; // Add useEffect here
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AuthModal from './components/AuthModal';
import './App.css';

const App = () => {
  // Controls if modal is visible and which form is shown
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Handler for navbar button clicks
  const openModal = (loginMode) => {
    setIsLoginMode(loginMode);
    setModalOpen(true);
  };

  // Handler to close modal
  const closeModal = () => setModalOpen(false);

  // Optional: to prevent body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    // OPTIONAL clean up on unmount in case modal still open
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
      <HeroSection />
      <AuthModal
        isOpen={modalOpen}
        onClose={closeModal}
        isLoginMode={isLoginMode}
      />
    </div>
  );
};

export default App;
