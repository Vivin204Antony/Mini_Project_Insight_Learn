import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProfileView from "./ProfileView";
import ProfileSettings from "./ProfileSettings";
import ProfileNotification from "./ProfileNotification";
import './ProfilePage.css';

// Default (empty) profile structure - ALWAYS START EMPTY FOR EDITING
const emptyProfile = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  educationLevel: "",
  completedDegrees: "",
  devCourses: "",
  learningGoals: "",
  badges: "",
  leaderboard: "",
  linkedin: "",
  leetcode: "",
  github: "",
  portfolio: ""
};

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [notification, setNotification] = useState(null);

  // On mount: check if profile exists
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
        setIsEditMode(false);        // Show View for returning users
      } catch (error) {
        console.error("Error parsing stored profile:", error);
        localStorage.removeItem("userProfile");
        setIsEditMode(true);
      }
    } else {
      setIsEditMode(true);         // New user → Edit first
    }
  }, []);

  // Save profile: update state, persist, switch to View, show notification
  const handleProfileUpdate = (newProfile) => {
    const profileToSave = { ...newProfile };
    setProfile(profileToSave);
    localStorage.setItem("userProfile", JSON.stringify(profileToSave));
    setIsEditMode(false);
    setNotification("Profile updated successfully!");
    
    // Auto-clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  // Switch to Edit page - ALWAYS use empty profile
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // Handle Cancel: for new user, prevent cancel; for others, go back to view
  const handleCancel = () => {
    if (profile) {
      setIsEditMode(false);
    } else {
      setNotification("Please complete your profile to continue.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Clear notification manually
  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <div className="profile-page-wrapper">
      <AnimatePresence mode="wait">
        {isEditMode || !profile ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
          >
            <ProfileSettings
              key={isEditMode ? 'edit' : 'view'} // Force remount on mode change
              initialProfile={emptyProfile}
              onSave={handleProfileUpdate}
              onCancel={handleCancel}
           />

          </motion.div>
        ) : (
          <motion.div
            key="view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
          >
            <ProfileView
              profile={profile}
              onEdit={handleEdit}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Fixed Notification with proper close handler */}
      {notification && (
        <ProfileNotification 
          message={notification} 
          onClose={clearNotification} // This will properly clear the notification
        />
      )}
    </div>
  );
};

export default ProfilePage;
