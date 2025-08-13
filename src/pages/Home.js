import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AuthModal from '../components/AuthModal';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [modalOpen]);

  const openModal = (loginMode) => {
    setIsLoginMode(loginMode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <HeroSection />
      <AuthModal
        isOpen={modalOpen}
        onClose={closeModal}
        isLoginMode={isLoginMode}
      />
    </>
  );
};

export default Home;
