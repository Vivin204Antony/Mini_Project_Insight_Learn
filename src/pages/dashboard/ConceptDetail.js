import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import "./ConceptDetail.css";

const ConceptDetail = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [conceptData, setConceptData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConceptDetail();
  }, [conceptId]);

  const fetchConceptDetail = async () => {
    try {
      // Mock data - replace with actual API call
      const mockData = {
        'linked-lists': {
          name: 'Linked Lists',
          icon: '🔗',
          difficulty: 'Intermediate',
          overallProgress: 100,
          timeSpent: '8.5h',
          averageScore: 87,
          problemsSolved: 15,
          totalProblems: 30,
          description: 'Master the fundamentals of linked data structures and pointer manipulation.',
          subtopics: [
            {
              id: 'intro',
              name: 'Introduction & Theory',
              progress: 100,
              status: 'completed',
              timeSpent: '2.1h',
              score: 95
            },
            {
              id: 'implementation',
              name: 'Node Implementation',
              progress: 100,
              status: 'completed',
              timeSpent: '2.8h',
              score: 88
            },
            {
              id: 'insertion',
              name: 'Insertion Methods',
              progress: 100,
              status: 'completed',
              timeSpent: '1.9h',
              score: 92
            },
            {
              id: 'deletion',
              name: 'Deletion Methods',
              progress: 100,
              status: 'completed',
              timeSpent: '1.7h',
              score: 85
            }
          ],
          achievements: [
            { name: 'First Implementation', icon: '🎯', earned: true },
            { name: 'Problem Solver', icon: '🧠', earned: true },
            { name: 'Speed Demon', icon: '⚡', earned: false }
          ],
          recentActivity: [
            { date: '2025-09-09', activity: 'Completed Deletion Methods', score: 85 },
            { date: '2025-09-08', activity: 'Practice Problems: 5 solved', score: 92 },
            { date: '2025-09-07', activity: 'Insertion Methods Quiz', score: 88 }
          ]
        }
      };

      setConceptData(mockData[conceptId] || null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching concept detail:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="concept-detail-root">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading concept details...</p>
        </div>
      </div>
    );
  }

  if (!conceptData) {
    return (
      <div className="concept-detail-root">
        <div className="error-message">
          <h2>Concept not found</h2>
          <button onClick={() => navigate('/dashboard/progress')} className="back-btn">
            Back to Progress
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="concept-detail-root">
      <div className="concept-detail-container">
        
        {/* Header */}
        <motion.div 
          className="concept-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button onClick={() => navigate('/dashboard/progress')} className="back-button">
            ← Back to Progress
          </button>
          
          <div className="concept-title-section">
            <div className="concept-icon-large">{conceptData.icon}</div>
            <div>
              <h1 className="concept-title">{conceptData.name}</h1>
              <p className="concept-description">{conceptData.description}</p>
              <div className={`concept-difficulty-badge ${conceptData.difficulty.toLowerCase()}`}>
                {conceptData.difficulty}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="concept-stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="concept-stat-card">
            <div className="stat-icon">📊</div>
            <div>
              <div className="stat-value">{conceptData.overallProgress}%</div>
              <div className="stat-label">Overall Progress</div>
            </div>
          </div>
          
          <div className="concept-stat-card">
            <div className="stat-icon">⏱️</div>
            <div>
              <div className="stat-value">{conceptData.timeSpent}</div>
              <div className="stat-label">Time Invested</div>
            </div>
          </div>
          
          <div className="concept-stat-card">
            <div className="stat-icon">🎯</div>
            <div>
              <div className="stat-value">{conceptData.averageScore}%</div>
              <div className="stat-label">Average Score</div>
            </div>
          </div>
          
          <div className="concept-stat-card">
            <div className="stat-icon">🧩</div>
            <div>
              <div className="stat-value">{conceptData.problemsSolved}/{conceptData.totalProblems}</div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>
        </motion.div>

        {/* Subtopics Progress */}
        <motion.div 
          className="subtopics-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="section-title">📚 Sub-Topics Progress</h2>
          <div className="subtopics-list">
            {conceptData.subtopics.map((subtopic, index) => (
              <div key={subtopic.id} className={`subtopic-item ${subtopic.status}`}>
                <div className="subtopic-header">
                  <div className="subtopic-info">
                    <h3 className="subtopic-name">{subtopic.name}</h3>
                    <div className="subtopic-meta">
                      <span>⏱️ {subtopic.timeSpent}</span>
                      <span>🎯 {subtopic.score}%</span>
                    </div>
                  </div>
                  <div className="subtopic-status">
                    {subtopic.status === 'completed' ? '✅' : '🔄'}
                  </div>
                </div>
                
                <div className="subtopic-progress">
                  <div className="subtopic-progress-bar">
                    <div 
                      className="subtopic-progress-fill" 
                      style={{ width: `${subtopic.progress}%` }}
                    ></div>
                  </div>
                  <span className="subtopic-progress-text">{subtopic.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          className="achievements-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="section-title">🏆 Achievements</h2>
          <div className="achievements-grid">
            {conceptData.achievements.map((achievement, index) => (
              <div key={index} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-status">
                  {achievement.earned ? 'Earned' : 'Locked'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="activity-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title">📈 Recent Activity</h2>
          <div className="activity-list">
            {conceptData.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-date">{activity.date}</div>
                <div className="activity-description">{activity.activity}</div>
                <div className="activity-score">{activity.score}%</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConceptDetail;
