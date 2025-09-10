import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render nested routes/components
  return <Outlet />;
};

export default ProtectedRoute;
