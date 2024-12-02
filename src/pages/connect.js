import React, { useState } from "react";
import '../pages/connect.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

const Connect = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation basique
    if (!formData.email || !formData.password) {
        toast.error("Tous les champs sont requis.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:8000/api/login", formData);
        console.log(response.data);

        // Vérifiez si la connexion a réussi
        if (response.data.success) {
          localStorage.setItem('token', response.data.token); 
          login(); 
          toast.success("Connexion réussie.");
          setTimeout(() => {
              navigate('/profils'); 
          }, 2000);
        } else {
            toast.error(response.data.message || "Identifiants incorrects.");
        }
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        // Gérer les erreurs de manière appropriée
        if (error.response) {
            const errorMessage = error.response.data.message || "Erreur lors de la connexion. Veuillez réessayer.";
            toast.error(errorMessage);
        } else {
            toast.error("Erreur lors de la connexion. Veuillez réessayer.");
        }
    }
};

  return (
    <div>
      <div className="container" style={{ marginTop: '7rem' }}>
        <div className="illustration text-center mb-1">
          <FontAwesomeIcon icon={faLock} fontSize="25px" className="icon-color" />
        </div>
        <h3 className="text-center mb-4">Connexion</h3>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block w-100 mb-5" style={{ fontSize: 18 }}>Connexion</button>
            </form>
            <p className="text-center">
              <Link to="/forgot-password" style={{textDecoration:"none"}}>Mot de passe oublié?</Link>
            </p>
            <p className="text-center">
              Vous n'avez pas de compte? <Link to="/compte" style={{textDecoration:"none"}}>S'inscrire</Link>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;