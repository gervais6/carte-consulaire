import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext'; 
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Connect = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
        toast.error("Tous les champs sont requis.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:8000/api/login", formData);
        console.log(response.data);

        // Check if login was successful
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
        // Handle errors appropriately
        if (error.response) {
            const errorMessage = error.response.data.message || "Erreur lors de la connexion. Veuillez réessayer.";
            toast.error(errorMessage);
        } else {
            toast.error("Erreur lors de la connexion. Veuillez réessayer.");
        }
    }
  };

  return (
    <div className="container" style={{marginTop:'100px'}}>
      <h2 className="text-center" style={{marginBottom:30}}>Connexion</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group ">
              <input 
                type="text" 
                id="username" 
                name="username" 
                required 
                value={formData.username} 
                onChange={handleChange} 
                placeholder="Entrez votre email" // Placeholder added
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} // Basic styling
              />
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} // Basic styling
              />
              <InputAdornment position="end" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{ background: 'transparent' }} // Remove background
                >
                  <span style={{ color: 'black' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </IconButton>
              </InputAdornment>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%' }}>Se connecter</button>
          </form>
          <div className="form-check d-flex justify-content-center mb-5" style={{marginTop:20}}>
              <label className="form-check-label" htmlFor="form2Example3">
                Vous  n'avez  pas un compte <Link to="/compte" style={{ textDecoration: "none" }}>Inscrivez-vous</Link>
              </label>
            </div>


            <div className="form-check d-flex justify-content-center mb-5" style={{marginTop:-30}}>
              <label className="form-check-label" htmlFor="form2Example3">
                Vous avez oublier votre  <Link to="/mdp" style={{ textDecoration: "none" }}>mot de passe</Link>
              </label>
            </div>

            

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Connect