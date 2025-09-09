import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // If user is not logged in, redirect to home page
  if (!user) {
    return <Navigate to="/" replace />;
  }
  // If authenticated, render nested routes/components
  return <Outlet />;
};

export default ProtectedRoute;
