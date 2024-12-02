
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Connect from './pages/connect';
import Guide from './pages/Guide';
import Compte from './pages/Compte';
import Mdp from './pages/Mdp';
import Profils from './pages/Profils';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider } from './pages/AuthContext'; // Importer le provider

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/connect" element={<Connect />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="/mdp" element={<Mdp />} />
          <Route path="/profils" element={
              <ProtectedRoute element={<Profils />} />
            } 
          />
          <Route path="/" element={<Navbar />} /> {/* Assurez-vous d'avoir un composant Home */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;