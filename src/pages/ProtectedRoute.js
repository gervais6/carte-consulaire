// src/pages/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    console.log("Is Authenticated:", isAuthenticated); // Ajoutez ceci pour déboguer

    return isAuthenticated ? children : <Navigate to="/connect" />;
};

export default ProtectedRoute;