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
    <section className="" style={{ backgroundColor: '#eee' }}>
      <ToastContainer /> {/* Ajoutez le ToastContainer ici */}
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Nouveau mot de passe</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        < i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0 position-relative">
                          <input
                            placeholder="Nouveau mot de passe"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-control"
                          />
                          <span 
                            onClick={() => setShowPassword(!showPassword)} 
                            style={{ position: 'absolute', right: '10px', top: '5px', cursor: 'pointer' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0 position-relative">
                          <input
                            placeholder="Confirmer le mot de passe"
                            type={showPasswordConfirmation ? "text" : "password"}
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            value={formData.passwordConfirmation}
                            onChange={handleChange}
                            required
                            className="form-control"
                          />
                          <span 
                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} 
                            style={{ position: 'absolute', right: '10px', top: '5px', cursor: 'pointer' }}
                          >
                            {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Confirmez</button>
                      </div>
                    </form>
                    <p className="text-center">
                      Revenir à la <Link to="/connect" className="text-primary" style={{ textDecoration: 'none' }}>connexion</Link>
                    </p>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resetpassword;