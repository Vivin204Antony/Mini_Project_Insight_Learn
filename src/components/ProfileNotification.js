import React from "react";
import { motion } from "framer-motion";

const ProfileNotification = ({ message, onClose }) => {
  return (
    <motion.div
      className="profile-notification"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className="notification-content">
        <span className="notification-icon">✅</span>
        <span className="notification-message">{message}</span>
        <button 
          className="notification-close" 
          onClick={onClose}
          type="button"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileNotification;
