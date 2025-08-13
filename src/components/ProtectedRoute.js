import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();
  
  // If user is not logged in, redirect to home page
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
