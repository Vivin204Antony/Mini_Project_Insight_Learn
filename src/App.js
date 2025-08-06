import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AuthSection from './components/AuthSection';
import './App.css';

const App = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="app">
      <Navbar isLoginMode={isLoginMode} setIsLoginMode={setIsLoginMode} />
      <HeroSection />
      <AuthSection isLoginMode={isLoginMode} />
    </div>
  );
};

export default App;
