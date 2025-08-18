import React, { useState, useEffect } from 'react';
import './ProfileSettings.css';

// Reusable card component for consistent styling
const ProfileCard = ({ title, children }) => (
  <div className="profile-card">
    <h2 className="profile-card-title">{title}</h2>
    <div className="profile-card-content">{children}</div>
  </div>
);

const ProfileSettings = ({ initialProfile, onSave, onCancel }) => {
  const [profileData, setProfileData] = useState(initialProfile);

  useEffect(() => {
    setProfileData(initialProfile);
  }, [initialProfile]);

  // Only handle text fields now
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...profileData });
  };

  return (
    <div className="profile-settings-container">
      <div className="profile-settings-header">
        <h1>User Profile & Settings</h1>
        <p>Manage your professional learning profile</p>
      </div>
      <form onSubmit={handleSubmit} className="profile-settings-vertical-flow">
        {/* Section 1: Identity */}
        <ProfileCard title="Identity">
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Username / Display Name *</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
              placeholder="Choose your display name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profileData.dob}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Gender (optional)</label>
            <select name="gender" value={profileData.gender} onChange={handleInputChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="preferNotToSay">Prefer not to say</option>
            </select>
          </div>
        </ProfileCard>
        {/* Section 2: Learning Data */}
        <ProfileCard title="Learning Data">
          <div className="form-group">
            <label>Maximum Education Level *</label>
            <select 
              name="educationLevel" 
              value={profileData.educationLevel} 
              onChange={handleInputChange}
              required
            >
              <option value="">Select Education Level</option>
              <option value="high-school">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Completed Degrees</label>
            <textarea
              name="completedDegrees"
              value={profileData.completedDegrees}
              onChange={handleInputChange}
              placeholder="e.g., B.S. Computer Science, MIT, 2023"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Professional Development Courses</label>
            <textarea
              name="devCourses"
              value={profileData.devCourses}
              onChange={handleInputChange}
              placeholder="List workshops, bootcamps, online courses, etc."
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Custom Learning Goals</label>
            <textarea
              name="learningGoals"
              value={profileData.learningGoals}
              onChange={handleInputChange}
              placeholder="e.g., Master React by Dec 2025, Complete AWS Certification"
              rows="3"
            />
          </div>
        </ProfileCard>
        {/* Section 3: Achievements */}
        <ProfileCard title="Achievements">
          <div className="form-group">
            <label>Badges & Awards</label>
            <textarea
              name="badges"
              value={profileData.badges}
              onChange={handleInputChange}
              placeholder="List your earned badges, awards, and recognitions"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Leaderboard Rankings</label>
            <textarea
              name="leaderboard"
              value={profileData.leaderboard}
              onChange={handleInputChange}
              placeholder="e.g., Top 10% in React Bootcamp, Rank #50 on LeetCode"
              rows="3"
            />
          </div>
        </ProfileCard>
        {/* Section 4: Professional Presence */}
        <ProfileCard title="Professional Presence">
          <div className="form-group">
            <label>LinkedIn Profile</label>
            <input
              type="url"
              name="linkedin"
              value={profileData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div className="form-group">
            <label>LeetCode / Coding Profile</label>
            <input
              type="url"
              name="leetcode"
              value={profileData.leetcode}
              onChange={handleInputChange}
              placeholder="https://leetcode.com/yourprofile"
            />
          </div>
          <div className="form-group">
            <label>GitHub Repository</label>
            <input
              type="url"
              name="github"
              value={profileData.github}
              onChange={handleInputChange}
              placeholder="https://github.com/yourprofile"
            />
          </div>
          <div className="form-group">
            <label>Personal Portfolio / Website</label>
            <input
              type="url"
              name="portfolio"
              value={profileData.portfolio}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </ProfileCard>
        <div className="profile-settings-actions">
          <button type="submit" className="save-profile-btn">Save Profile Changes</button>
          {onCancel && (
            <button
              type="button"
              className="cancel-profile-btn"
              style={{marginLeft: '12px'}}
              onClick={onCancel}
            >Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
