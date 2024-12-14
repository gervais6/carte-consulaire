import React, { useState } from "react";
import '../pages/Compte.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LockResetIcon from '@mui/icons-material/LockReset'; // Import de l'icône de réinitialisation
import axios from 'axios'; // Importer axios

const MotsDePasseOublier = () => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
    if (!formData.email) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    try {
      // Envoyer la requête POST à l'API pour demander la réinitialisation du mot de passe
      const response = await axios.post('http://localhost:8000/api/password/email', {
        email: formData.email
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
          <LockResetIcon style={{ fontSize: 50, color: '#3f51b5' }} /> {/* Icône de réinitialisation */}
        </div>
        <h3 className="text-center mb-4">Réinitialiser le mot de passe</h3>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email"></label>
                <input
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block w-100 mb-5" style={{ fontSize: 18 }}>Envoyer votre adresse e-mail</button>
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

export default MotsDePasseOublier;