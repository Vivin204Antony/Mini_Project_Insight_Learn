import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="hero-section">
      <motion.div 
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="hero-card"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)" 
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h2 
            className="hero-title"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            "Insight Learn" - AI Powered Study Companion
          </motion.h2>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            In the fast-evolving world of education, students and professionals alike face 
            challenges in processing large volumes of study material, maintaining consistent 
            learning, and staying motivated in self-paced environments. "Insight Learn – An 
            AI-Powered Study Companion" addresses these challenges by offering an intelligent 
            platform designed to simplify and enhance independent learning.
          </motion.p>
          
          <motion.div 
            className="hero-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="feature-grid">
              <motion.div 
                className="feature-item"
                whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
              >
                📚 Smart PDF Processing
              </motion.div>
              <motion.div 
                className="feature-item"
                whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
              >
                🤖 AI Summarization
              </motion.div>
              <motion.div 
                className="feature-item"
                whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
              >
                🎯 Progress Tracking
              </motion.div>
              <motion.div 
                className="feature-item"
                whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
              >
                💡 Smart Flashcards
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
