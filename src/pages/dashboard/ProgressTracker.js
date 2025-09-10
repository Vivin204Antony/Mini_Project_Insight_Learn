import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ProgressTracker.css";

const ProgressTracker = () => {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get('/api/progress/overview');
      // setProgressData(response.data);
      
      // Mock data for demonstration
      setProgressData({
        overallProgress: 68,
        totalHours: 45.5,
        completedConcepts: 12,
        totalConcepts: 18,
        weeklyHours: 12,
        achievements: 8,
        streak: 7,
        concepts: [
          {
            id: 'linked-lists',
            name: 'Linked Lists',
            icon: '🔗',
            progress: 100,
            status: 'completed',
            timeSpent: '8.5h',
            topics: 6,
            completedTopics: 6,
            difficulty: 'Intermediate'
          },
          {
            id: 'arrays',
            name: 'Arrays & Strings',
            icon: '📚',
            progress: 75,
            status: 'in-progress',
            timeSpent: '6.2h',
            topics: 8,
            completedTopics: 6,
            difficulty: 'Beginner'
          },
          {
            id: 'trees',
            name: 'Trees & Graphs',
            icon: '🌳',
            progress: 45,
            status: 'in-progress',
            timeSpent: '4.1h',
            topics: 10,
            completedTopics: 4,
            difficulty: 'Advanced'
          },
          {
            id: 'sorting',
            name: 'Sorting Algorithms',
            icon: '📊',
            progress: 0,
            status: 'locked',
            timeSpent: '0h',
            topics: 7,
            completedTopics: 0,
            difficulty: 'Intermediate'
          },
          {
            id: 'dynamic-programming',
            name: 'Dynamic Programming',
            icon: '⚡',
            progress: 0,
            status: 'locked',
            timeSpent: '0h',
            topics: 12,
            completedTopics: 0,
            difficulty: 'Advanced'
          },
          {
            id: 'system-design',
            name: 'System Design',
            icon: '🏗️',
            progress: 0,
            status: 'locked',
            timeSpent: '0h',
            topics: 15,
            completedTopics: 0,
            difficulty: 'Expert'
          }
        ]
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress data:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#3b82f6';
      case 'locked': return '#9ca3af';
      default: return '#6b7280';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      case 'Expert': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const handleConceptClick = (conceptId) => {
    if (progressData.concepts.find(c => c.id === conceptId).status !== 'locked') {
      navigate(`/dashboard/progress/${conceptId}`);
    }
  };

  if (loading) {
    return (
      <div className="progress-tracker-root">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-tracker-root">
      <div className="progress-container">
        
        {/* Header Section */}
        <motion.div 
          className="progress-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="progress-title">📊 Learning Progress Dashboard</h1>
          <p className="progress-subtitle">Track your journey through computer science concepts</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-value">{progressData.overallProgress}%</div>
              <div className="stat-label">Overall Progress</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-value">{progressData.totalHours}h</div>
              <div className="stat-label">Total Study Time</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{progressData.completedConcepts}/{progressData.totalConcepts}</div>
              <div className="stat-label">Concepts Completed</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-value">{progressData.streak} days</div>
              <div className="stat-label">Learning Streak</div>
            </div>
          </div>
        </motion.div>

        {/* Overall Progress Bar */}
        <motion.div 
          className="overall-progress-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Computer Science Fundamentals Track</h3>
          <div className="progress-bar-container">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressData.overallProgress}%` }}
              ></div>
            </div>
            <span className="progress-percentage">{progressData.overallProgress}% Complete</span>
          </div>
          <div className="progress-stats">
            <span>📅 This Week: {progressData.weeklyHours} hours studied</span>
            <span>🏆 Achievements: {progressData.achievements} badges earned</span>
          </div>
        </motion.div>

        {/* Concepts Grid */}
        <motion.div 
          className="concepts-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="section-title">📚 Data Structures & Algorithms Track</h2>
          <div className="concepts-grid">
            {progressData.concepts.map((concept, index) => (
              <motion.div
                key={concept.id}
                className={`concept-card ${concept.status}`}
                onClick={() => handleConceptClick(concept.id)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className="concept-header">
                  <div className="concept-icon">{concept.icon}</div>
                  <div className={`concept-status ${concept.status}`}>
                    {concept.status === 'completed' && '✅'}
                    {concept.status === 'in-progress' && '🔄'}
                    {concept.status === 'locked' && '🔒'}
                  </div>
                </div>
                
                <h3 className="concept-name">{concept.name}</h3>
                
                <div className="concept-progress">
                  <div className="concept-progress-bar">
                    <div 
                      className="concept-progress-fill" 
                      style={{ 
                        width: `${concept.progress}%`,
                        backgroundColor: getStatusColor(concept.status)
                      }}
                    ></div>
                  </div>
                  <span className="concept-progress-text">{concept.progress}%</span>
                </div>
                
                <div className="concept-meta">
                  <span className="concept-time">⏱️ {concept.timeSpent}</span>
                  <span className="concept-topics">📝 {concept.completedTopics}/{concept.topics} topics</span>
                </div>
                
                <div className={`concept-difficulty ${concept.difficulty.toLowerCase()}`}>
                  {concept.difficulty}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressTracker;
