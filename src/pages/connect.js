import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../pages/Logo Yonnee.png'; // Importez l'image de votre logo
import '../pages/navbar.css';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext'; 


const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' }); // Change 'name' to 'email'
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
      if (!formData.email || !formData.password) { // Change 'username' to 'email'
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
                navigate('/suivi'); 
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
        <>
           

            {/* Formulaire de connexion */}
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "#343a40", fontFamily: 'Poppins, sans-serif', fontWeight: 500}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                                <div className="modal-header" style={{ background: '#212529', color: 'white' }}>
                                    <h5 className="modal-title" id="loginModalLabel">Connexion</h5>
                                </div>
                                <div className="input-group mb-4" style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ flex: 1 }}>
                                        <span style={{ fontWeight: 800, color: 'white' }}></span>
                                    </div>
                                </div>
                                <hr style={{ border: "2px solid white", marginTop: -20, marginBottom: 20 }} />
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        id="email" 
                                        name="email" 
                                        required 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="Entrez votre email" 
                                        className="form-control" 
                                        style={{ borderRadius: '5px' }} 
                                    />
                                </div>
                                <div className="mb-3" style={{ position: 'relative' }}>
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        id="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Entrez votre mot de passe"
                                        className="form-control" 
                                        style={{ borderRadius: '5px' }} 
                                    />
                                    <InputAdornment position="end" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            style={{ background: 'transparent' }} 
                                        >
                                            <span style={{ color: 'black' }}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </span>
                                        </IconButton>
                                    </InputAdornment>
                                </div>
                                <button type="submit" className="btn btn-dark" style={{ width: '100%', padding: '10px',background:"#343a40" }}>
                                    Se connecter
                                </button>
                            </form>
                            <div className="form-check d-flex justify-content-center mb-5 me-3" style={{ marginTop: 20, color: "white", whiteSpace: 'nowrap' }}>
    <label className="form-check-label" htmlFor="form2Example3">
        Vous n'avez pas un compte ? <Link to="/compte" style={{ textDecoration: "none", fontSize: 16 }}>Inscrivez-vous</Link>
    </label>
</div>
                            <div className="form-check d-flex justify-content-center mb-5" style={{ marginTop: -30, color: "white" }}>
                                <label className="form-check-label" htmlFor="form2Example3">
                                    Vous avez oublié votre <Link to="/mdp" style={{ textDecoration: "none" }}>mot de passe</Link> ?
                                </label>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default LoginForm;