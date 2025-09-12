import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProgressTracker.css";

// This mock data simulates uploaded PDFs and corresponding Q&A/chat statuses.
// Replace with actual state/lifting or a context if integrating with your app.
const MOCK_PDFS = [
  {
    id: "session-1",
    title: "Data Structures - Linked Lists.pdf",
    uploadDate: "2025-09-03",
    status: "completed", // "completed" | "paused" | "not-started"
    lastQuestionIndex: null,
    totalQuestions: 8,
    lastInteraction: "2025-09-04 16:24",
  },
  {
    id: "session-2",
    title: "Operating Systems Notes.pdf",
    uploadDate: "2025-09-08",
    status: "paused",
    lastQuestionIndex: 3,
    totalQuestions: 12,
    lastInteraction: "2025-09-09 18:19",
  },
  {
    id: "session-3",
    title: "Machine Learning Overview.pdf",
    uploadDate: "2025-09-10",
    status: "not-started",
    lastQuestionIndex: null,
    totalQuestions: 6,
    lastInteraction: null,
  },
];

const ProgressTracker = ({ onResume }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading: Fetch from localStorage or mock API.
  useEffect(() => {
    console.log("ProgressTracker: Starting loading animation");
    setTimeout(() => {
      console.log("ProgressTracker: Loading complete, triggering animations");
      setSessions(MOCK_PDFS);
      setLoading(false);
    }, 700);
  }, []);

  // Handler for Resume button click.
  const handleResume = (session) => {
    // In real app, forward to chatbot module and restore session.questionIndex.
    if (onResume) {
      onResume(session);
    } else {
      // Default behavior: show alert with session info
      if (session.status === 'paused') {
        alert(
          `Resuming: ${session.title}\nContinuing from Q${session.lastQuestionIndex + 1} of ${session.totalQuestions}`
        );
      } else if (session.status === 'not-started') {
        alert(
          `Starting: ${session.title}\nBeginning Q&A session with ${session.totalQuestions} questions`
        );
      }
      
      // TODO: Navigate to your chatbot/Q&A module with session data
      // Example: navigate(`/dashboard/chat/${session.id}`, { state: { session } });
    }
  };

  return (
    <div className="progress-tracker-root">
      <motion.div
        className="progress-container"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <header className="progress-header">
          <motion.h1
            className="progress-title"
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            📚 Learning History
          </motion.h1>
          <motion.p
            className="progress-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.75 }}
          >
            All your study uploads with chatbot Q&amp;A status
          </motion.p>
        </header>
        <section>
          {loading ? (
            <div className="loading-spinner" style={{ marginTop: 40 }}>
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : (
            <AnimatePresence>
              {sessions.length === 0 ? (
                <motion.div
                  className="empty-state"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  No sessions yet. Upload a PDF to begin tracking your learning.
                </motion.div>
              ) : (
                <motion.div 
                  className="session-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="session-list-header">
                    <h3 className="session-list-title">
                      📊 Your Learning Sessions ({sessions.length})
                    </h3>
                  </div>
                  <div className="session-list-body">
                    {sessions.map((s, i) => {
                      return (
                        <motion.div
                        className="pdf-session-card"
                        key={s.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ 
                          delay: i * 0.1, 
                          duration: 0.6, 
                          type: "spring",
                          bounce: 0.3
                        }}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="pdf-session-header">
                          <span className="session-date">
                            Uploaded: {s.uploadDate}
                          </span>
                        </div>
                        <div className="pdf-session-title">{s.title}</div>
                        {s.status === "paused" && (
                          <div className="session-progress-details">
                            Last seen: Q{(s.lastQuestionIndex || 0) + 1} / {s.totalQuestions}
                            <span className="dot-sep">•</span>
                            <span>
                              <b>Last interaction:</b>{" "}
                              {s.lastInteraction
                                ? s.lastInteraction
                                : "Session started"}
                            </span>
                          </div>
                        )}
                        {s.status === "completed" && (
                          <div className="session-progress-details">Q&A finished!</div>
                        )}
                        {s.status === "not-started" && (
                          <div className="session-progress-details">
                            Ready to begin Q&A
                          </div>
                        )}
                        <div className="pdf-session-actions">
                          {s.status === "paused" && (
                            <motion.button
                              whileTap={{ scale: 0.96 }}
                              className="resume-btn"
                              onClick={() => handleResume(s)}
                            >
                              Resume Session
                            </motion.button>
                          )}
                          {s.status === "not-started" && (
                            <motion.button
                              whileTap={{ scale: 0.96 }}
                              className="resume-btn"
                              onClick={() => handleResume(s)}
                            >
                              Start Q&amp;A
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;
