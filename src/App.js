// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Connect from './pages/connect';
import Guide from './pages/Guide';
import Compte from './pages/Compte';
import Mdp from './pages/Mdp';
import Profils from './pages/Profils';





const App = () => {
  return (
    <Router>


      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="/mdp" element={<Mdp />} />
        <Route path="/profils" element={<Profils />} />




      </Routes>
    </Router>
  );
};

export default App;
