import React from "react";
import { motion } from "framer-motion";
import "./ProfileView.css";

const Card = ({ title, children, className = "" }) => (
  <div className={`profile-card ${className}`}>
    {title && <h2 className="profile-card-title">{title}</h2>}
    <div className="profile-card-content">{children}</div>
  </div>
);

const ProfileView = ({ profile, onEdit }) => {
  return (
    <motion.div
      className="profile-view-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Card */}
      <Card className="profile-header-card">
        <div className="profile-header-row">
          <h1 className="profile-header-title">👤 User Profile</h1>
          <button className="edit-profile-btn" onClick={onEdit}>✏️ Edit Profile</button>
        </div>
      </Card>

      {/* Main Sections */}
      <div className="profile-sections-container">
        <Card title="Identity">
          <div className="profile-list">
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone || "—"}</p>
            <p><strong>Date of Birth:</strong> {profile.dob || "—"}</p>
            <p><strong>Gender:</strong> {profile.gender || "—"}</p>
          </div>
        </Card>

        <Card title="Learning Data">
          <div className="profile-list">
            <p><strong>Education Level:</strong> {profile.educationLevel || "—"}</p>
            <p><strong>Degrees:</strong> {profile.completedDegrees || "—"}</p>
            <p><strong>Courses:</strong> {profile.devCourses || "—"}</p>
            <p><strong>Goals:</strong> {profile.learningGoals || "—"}</p>
          </div>
        </Card>

        {/* ADDED: Achievements Section */}
        <Card title="Achievements">
          <div className="profile-list">
            <p><strong>Badges & Awards:</strong> {profile.badges || "—"}</p>
            <p><strong>Leaderboard:</strong> {profile.leaderboard || "—"}</p>
          </div>
        </Card>

        <Card title="Professional Presence">
          <div className="profile-links-list">
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link-btn">
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="profile-link-btn">
                GitHub
              </a>
            )}
            {profile.leetcode && (
              <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="profile-link-btn">
                LeetCode
              </a>
            )}
            {profile.portfolio && (
              <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="profile-link-btn">
                Portfolio Website
              </a>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProfileView;
