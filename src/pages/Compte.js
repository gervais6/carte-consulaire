import React, { useState } from "react";
import '../pages/Compte.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import { IconButton, InputAdornment, TextField, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import logo from '../pages/Logo Yonnee.png'; // Importez l'image de votre logo


const Compte = () => {
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (password !== passwordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const formData = { name, prenom, email, password, password_confirmation: passwordConfirmation };

    try {
      const response = await axios.post("http://localhost:8000/api/register", formData);
      console.log(response.data); 
      toast.success("Inscription réussie !");
      setTimeout(() => {
        navigate('/connect'); 
      }, 2000); 
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer."); 
    }
  };

  return (
    <>
      {/* Formulaire d'inscription */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "#343a40", fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                <div className="modal-header" style={{ background: '#212529', color: 'white' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '-25px' }} /> {/* Logo Display */}
                </div>
                <hr style={{ border: "2px solid white", marginBottom: 20 }} />
                
                <div className="mb-3">
                  <TextField 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Entrez votre nom" 
                    fullWidth 
                    variant="outlined" 
                    style={{ borderRadius: '5px' }} 
                  />
                </div>
                <div className="mb-3">
                  <TextField 
                    type="text" 
                    id="prenom" 
                    name="prenom" 
                    required 
                    value={prenom} 
                    onChange={(e) => setPrenom(e.target.value)} 
                    placeholder="Entrez votre prénom" 
                    fullWidth 
                    variant="outlined" 
                    style={{ borderRadius: '5px' }} 
                  />
                </div>
                <div className="mb-3">
                  <TextField 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Entrez votre email" 
                    fullWidth 
                    variant="outlined" 
                    style={{ borderRadius: '5px' }} 
                  />
                </div>
                <div className="mb-3" style={{ position: 'relative' }}>
                  <TextField 
                    type={showPassword ? 'text' : 'password'} 
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    fullWidth 
                    variant="outlined" 
                    style={{ borderRadius: '5px' }} 
                  />
                  <InputAdornment position="end" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      style={{ background: 'transparent' }} 
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                </div>
                <div className="mb-3" style={{ position: 'relative' }}>
                  <TextField 
                    type={showPasswordConfirmation ? 'text' : 'password'} 
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirmer le mot de passe"
                    fullWidth 
                    variant="outlined" 
                    style={{ borderRadius: '5px' }} 
                  />
                  <InputAdornment position="end" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                    <IconButton
                      onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                      edge="end"
                      style={{ background: 'transparent' }} 
                    >
                      {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                </div>
                <Button type="submit" variant="contained" color="primary" style={{ width: '100%', padding: '10px', background: "#343a40" }}>
                  S'inscrire
                </Button>
              </form>

              <div className="form-check d-flex justify-content-center mb-5" style={{ marginTop: 20, color: "white", whiteSpace: 'nowrap' }}>
                <label className="form-check-label" htmlFor="form2Example3">
                  Vous avez un compte ? <Link to="/connect" style={{ textDecoration: "none", fontSize: 16 }}>Connectez-vous</Link>
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

export default Compte;