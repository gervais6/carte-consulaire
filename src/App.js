// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Connect from './pages/connect';
import Compte from './pages/Compte';
import Mdp from './pages/Mdp';
import Resetpassword from './pages/restepassword';
import Admin from './pages/Admin';
import Suivi from './pages/suivi';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider } from './pages/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/connect" element={<Connect />} />
                    <Route path="/compte" element={<Compte />} />
                    <Route path="/mdp" element={<Mdp />} />
                    <Route path="/resetpassword" element={<Resetpassword />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route 
                        path="/suivi" 
                        element={
                            <ProtectedRoute>
                                <Suivi />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/" element={<Navbar />} /> {/* Redirigez vers la page de connexion par défaut */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;