import React, { useState } from "react";
import '../pages/Compte.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Import des styles de react-toastify
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons'; // Import de l'icône de cadenas

const Compte = () => {
  // State to hold form data
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  // Initialize navigate
  const navigate = useNavigate(); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validate password confirmation
    if (password !== passwordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const formData = { name, prenom, email, password, password_confirmation: passwordConfirmation };

    try {
      const response = await axios.post("http://localhost:8000/api/register", formData);
      console.log(response.data); 
      toast.success("Inscription réussie !");

      // Rediriger vers la page de connexion après un délai
      setTimeout(() => {
        navigate('/connect'); 
      }, 2000); 
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer."); 
    }
  };

  return (
    <div id="root">
      <ToastContainer /> {/* Ajoutez le ToastContainer ici */}
      <div className="container-fluid">
        <div className="container mt-5">
          <div className="container">
            <div className="illustration text-center mb-3">
              <FontAwesomeIcon icon={faLock} size="2x" className="icon-color" />
            </div>
            <h2 className="text-center">S'inscrire</h2>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Nom</label>
                    <input type="text" id="username" name="username" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" style={{ fontSize: '18px' }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required className="form-control" style={{ fontSize: '18px' }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" style={{ fontSize: '18px' }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" style={{ fontSize: '18px' }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirmation">Confirmer le mot de passe</label>
                    <input type={showPasswordConfirmation ? "text" : "password"} id ="passwordConfirmation" name="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required className="form-control" style={{ fontSize: '18px' }} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block w-100 mb-4">S'inscrire</button>
                </form>
                <p className="text-center mt-3">
                  Vous avez déjà un compte? <Link to="/connect" style={{textDecoration:"none"}}>Se connecter</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compte;