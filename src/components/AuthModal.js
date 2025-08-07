import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import AuthSection from './AuthSection';

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};
const modalVariant = {
  hidden: { opacity: 0, scale: 0.85, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 18 } }
};

const AuthModal = ({ isOpen, onClose, isLoginMode }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="modal-backdrop"
        variants={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={e => e.stopPropagation()} // Prevent modal close on content click
        >
          <button className="modal-close-btn" onClick={onClose} title="Close">&times;</button>
          <AuthSection isLoginMode={isLoginMode} />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AuthModal;
