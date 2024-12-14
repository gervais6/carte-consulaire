// src/pages/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Supposons que vous ayez un contexte d'authentification

  return isAuthenticated ? element : <Navigate to="/connect" />;

};

export default ProtectedRoute;




