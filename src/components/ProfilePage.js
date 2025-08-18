import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProfileView from "./ProfileView";
import ProfileSettings from "./ProfileSettings";
import ProfileNotification from "./ProfileNotification";
import './ProfilePage.css'; // For custom styles

// Default (empty) profile structure
const emptyProfile = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  profilePicture: null,
  educationLevel: "",
  completedDegrees: "",
  certificates: [],
  devCourses: "",
  learningGoals: "",
  badges: "",
  leaderboard: "",
  hackathonProofs: [],
  additionalCertificates: [],
  linkedin: "",
  leetcode: "",
  github: "",
  portfolio: ""
};

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [notification, setNotification] = useState(null);

  // On mount: check if profile data saved in localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      setIsEditMode(false);        // Show View for returning users
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
    setTimeout(() => setNotification(null), 3000);
  };

  // Switch to Edit page
  const handleEdit = () => setIsEditMode(true);

  // Handle Cancel: for new user, disallow cancel until save; for others, go back to view
  const handleCancel = () => {
    if (profile) {
      setIsEditMode(false);
    } else {
      setNotification("Please complete your profile to continue.");
      setTimeout(() => setNotification(null), 3000);
    }
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
              initialProfile={profile || emptyProfile}
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
      {notification && (
        <ProfileNotification 
          message={notification} 
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
