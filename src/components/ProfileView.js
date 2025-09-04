import React from "react";
import { motion } from "framer-motion";
import "./ProfileView.css";

const ProfileView = ({ profile, onEdit }) => {
  return (
    <motion.div
      className="profile-view-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Container Card */}
      <div className="profile-main-card">
        
        {/* Header Section */}
        <div className="profile-header">
          <h1 className="profile-title">👤 User Profile</h1>
          <button className="edit-profile-btn" onClick={onEdit}>
            ✏️ Edit Profile
          </button>
        </div>

        {/* Individual Section Cards */}
        <div className="profile-sections">
          
          {/* Identity Card */}
          <div className="profile-section-card">
            <h2 className="section-title">Identity</h2>
            <div className="section-content">
              <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone || "—"}</p>
              <p><strong>Date of Birth:</strong> {profile.dob || "—"}</p>
              <p><strong>Gender:</strong> {profile.gender || "—"}</p>
            </div>
          </div>

          {/* Learning Data Card */}
          <div className="profile-section-card">
            <h2 className="section-title">Learning Data</h2>
            <div className="section-content">
              <p><strong>Education Level:</strong> {profile.educationLevel || "—"}</p>
              <p><strong>Degrees:</strong> {profile.completedDegrees || "—"}</p>
              <p><strong>Courses:</strong> {profile.devCourses || "—"}</p>
              <p><strong>Goals:</strong> {profile.learningGoals || "—"}</p>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="profile-section-card">
            <h2 className="section-title">Achievements</h2>
            <div className="section-content">
              <p><strong>Badges & Awards:</strong> {profile.badges || "—"}</p>
              <p><strong>Leaderboard:</strong> {profile.leaderboard || "—"}</p>
            </div>
          </div>

          {/* Professional Presence Card */}
          <div className="profile-section-card">
            <h2 className="section-title">Professional Presence</h2>
            <div className="section-content">
              <div className="profile-links">
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
                    LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="profile-link">
                    GitHub
                  </a>
                )}
                {profile.leetcode && (
                  <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="profile-link">
                    LeetCode
                  </a>
                )}
                {profile.portfolio && (
                  <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="profile-link">
                    Portfolio Website
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProfileView;
