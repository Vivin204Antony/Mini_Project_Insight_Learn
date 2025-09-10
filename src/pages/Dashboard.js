import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.45, ease: 'easeOut' } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const modules = [
    {
      key: 'upload',
      title: 'Upload PDF Documents',
      description: 'Upload and manage your study PDFs securely.',
      icon: '📄',
      color: '#3b82f6'
    },
    {
      key: 'progress',
      title: 'Progress Tracker',
      description: 'Visualize your learning journey with charts.',
      icon: '📊',
      color: '#10b981'
    },
    {
      key: 'profile',
      title: 'User Profile & Settings',
      description: 'View and edit your profile information.',
      icon: '👤',
      color: '#8b5cf6'
    }
  ];

  const handleModuleClick = (moduleKey) => {
  if (moduleKey === 'profile') {
    navigate('/profile-settings');
  } else if (moduleKey === 'upload') {
    navigate('/dashboard/upload');
  } else if (moduleKey === 'progress') {
    navigate('/dashboard/progress'); 
  }
};

  return (
    <section className="dashboard-wrapper">
      <div className="dashboard-container">
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="dashboard-title">
            Welcome{user?.name ? `, ${user.name}` : ' to InsightLearn'}! 🎓
          </h1>
          <p className="dashboard-subtitle">
            Choose a module below to enhance your learning experience
          </p>
        </motion.div>

        <motion.div 
          className="dashboard-grid single-row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {modules.map((module) => (
            <motion.button
              key={module.key}
              className="dashboard-card"
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                scale: 1.02, 
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)" 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModuleClick(module.key)}
              style={{ '--accent-color': module.color }}
            >
              <div className="card-icon">{module.icon}</div>
              <h3 className="card-title">{module.title}</h3>
              <p className="card-description">{module.description}</p>
              <div className="card-arrow">→</div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
