import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Connect from './pages/connect';
import Compte from './pages/Compte';
import Mdp from './pages/Mdp';
import Profils from './pages/Profils';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider } from './pages/AuthContext';
import Resetpassword from './pages/restepassword';
import Admin from'./pages/Admin'
import Suivi from'./pages/suivi'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/connect" element={<Connect />} />
                    <Route path="/compte" element={<Compte />} />
                    <Route path="/mdp" element={<Mdp />} />
                    <Route path="/resetpassword" element={<Resetpassword />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/suivi" element={<Suivi/>} />

                

                              <Route path="/suivi" element={
              <ProtectedRoute element={<Suivi/>} />
              
              
            } 
          />
          
          

                    <Route path="/" element={<Navbar />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;