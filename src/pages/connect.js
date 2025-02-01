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
<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "#212529",fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>    <div className="container" style={{}}>
      <h2 className="text-center" style={{marginBottom:30,color:"white"}}>Connexion</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group ">
              <input 
                type="text" 
                id="email" // Change id to 'email'
                name="email" // Change name to 'email'
                required 
                value={formData.email} // Change 'username' to 'email'
                onChange={handleChange} 
                placeholder="Entrez votre email" 
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
              />
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
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
            <button type="submit" className="btn btn-primary btn-block " style={{ width: '100%' }}>Se connecter</button>
          </form>
          <div className="form-check d-flex justify-content-center mb-5" style={{marginTop:20,color:"white"}}>
              <label className="form-check-label " htmlFor="form2Example3">
                Vous n'avez pas un compte <Link to="/compte" style={{ textDecoration: "none" ,fontSize:14 }}>Inscrivez-vous</Link>
              </label>
            </div>
            <div className="form-check d-flex justify-content-center mb-5" style={{marginTop:-30,color:"white"}}>
              <label className="form-check-label" htmlFor="form2Example3">
                Vous avez oublié votre <Link to="/mdp" style={{ textDecoration: "none" }}>mot de passe</Link>
              </label>
            </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Connect;