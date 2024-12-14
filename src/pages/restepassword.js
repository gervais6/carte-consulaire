import React, { useState } from "react";
import '../pages/Compte.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Importer toast pour les notifications
import KeyIcon from '@mui/icons-material/Key'; // Importer l'icône de clé
import Visibility from '@mui/icons-material/Visibility'; // Importer l'icône pour voir le mot de passe
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Importer l'icône pour masquer le mot de passe
import { Typography } from '@mui/material'; // Importer Typography pour le style
import axios from 'axios'; // Importer axios

const Resetpassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false); // État pour gérer la visibilité du mot de passe de confirmation
  const navigate = useNavigate();
  const location = useLocation();

  // Extraire le token de l'URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.email || !formData.password || !formData.passwordConfirmation) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      // Envoyer la requête POST à l'API pour réinitialiser le mot de passe
      const response = await axios.post('http://localhost:8000/api/password/reset', {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        token: token, // Utilisez le token extrait de l'URL
      });

      // Si la requête réussit, afficher un message de succès
      toast.success(response.data.message);
      setIsSubmitted(true);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/connect'); // Rediriger vers la page d'accueil ou une autre page
      }, 5000);
    } catch (error) {
      // Gérer les erreurs
      if (error.response) {
        // Si le serveur a répondu avec un code d'erreur
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        // Erreur réseau ou autre
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
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
              <div class ="form-group">
                <label htmlFor="email"></label>
                <input
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange} required
                  className="form-control"
                />
              </div>
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
              <div className="form-group position-relative">
                <label htmlFor="passwordConfirmation"></label>
                <input
                  placeholder="Confirmer le mot de passe"
                  type={showPasswordConfirmation ? "text" : "password"} // Changer le type en fonction de l'état
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <span 
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} 
                  style={{ position: 'absolute', right: '10px', top: '35px', cursor: 'pointer' }}
                >
                  {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
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
}

export default Resetpassword;