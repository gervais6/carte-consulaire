import React, { useState } from "react";
import '../pages/Compte.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import KeyIcon from '@mui/icons-material/Key'; // Importer l'icône de clé
import Visibility from '@mui/icons-material/Visibility'; // Importer l'icône pour voir le mot de passe
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Importer l'icône pour masquer le mot de passe
import { Typography } from '@mui/material'; // Importer Typography pour le style

const Resetpassword = () => {
  const [formData, setFormData] = useState({
    name: '',
    prenom: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.email) {
      setErrorMessage("Tous les champs sont requis.");
      setIsSubmitted(false);
      setTimeout(() => {
        navigate('/');
      }, 5000);
      return;
    }

    // If validation passes
    setIsSubmitted(true);
    setErrorMessage('');
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  return (
    <div id="root">
      <div className="container" style={{ marginTop: '10rem' }}>
        <div className="text-center mb-4">
          <KeyIcon style={{ fontSize: 50, color: '#3f51b5' }} /> {/* Icône de clé avec couleur */}
        </div>
        <Typography variant="h5" className="text-center mb-4">Nouveau mot de passe</Typography>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group position-relative">
                <label htmlFor="password"></label>
                <input
                  placeholder="Nouveau mot de passe"
                  type={showPassword ? "text" : "password"} // Changer le type en fonction de l'état
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <span 
                  onClick={() => setShowPassword(!showPassword)} 
                  style={{ position: 'absolute', right: '10px', top: '35px', cursor: 'pointer' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
              <button type="submit" className="btn btn-primary btn-block w-100 mb-5" style={{ fontSize: 18 }}>Confirmer</button>
            </form>
            <p className="text-center">
              Revenir à la <Link to="/connect" className="text-primary" style={{ textDecoration: 'none' }}>connexion</Link>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;