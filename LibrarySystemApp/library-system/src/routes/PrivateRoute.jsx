import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // No está logueado, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Deja pasar
  return <Outlet />;
};
