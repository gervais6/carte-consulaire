// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Connect from './pages/connect';
import Guide from './pages/Guide';
import Compte from './pages/Compte';
import Mdp from './pages/Mdp';
import Profils from './pages/Profils';
import PrivateRoute from './pages/PrivateRoute';
import { useState } from 'react';



const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Changez ceci selon votre logique d'authentification


  return (

    <Router>


      <Routes>

        <Route path="/connect" element={<Connect setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/guide" element={<Guide />} />

        <Route path="/compte" element={<Compte />} />

        <Route path="/mdp" element={<Mdp />} />

        <Route 

          path="/profils" 

          element={

            <PrivateRoute 

              element={<Profils />} 

              isAuthenticated={isAuthenticated} 

            />

          } 

        />

        <Route path="/" element={<Navbar />} /> {/* Ou tout autre composant que vous souhaitez afficher pour la route principale */}

      </Routes>

    </Router>

  );

};


export default App;

