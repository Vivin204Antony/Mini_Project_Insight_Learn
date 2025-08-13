import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {name, email, avatar} or null
  const [loading, setLoading] = useState(false);

  // Persist session in sessionStorage
  useEffect(() => {
    const savedUser = sessionStorage.getItem('insight_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        sessionStorage.removeItem('insight_user');
      }
    }
  }, []);

  // Save user to sessionStorage when user state changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('insight_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('insight_user');
    }
  }, [user]);

  const login = (userProfile) => {
    setUser(userProfile);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
