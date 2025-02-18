import React, { useState } from "react";
import '../pages/Compte.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import logo from '../pages/Logo Yonnee.png'; // Importez l'image de votre logo

const Resetpassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL
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
      // Send POST request to the API to reset the password
      const response = await axios.post('http://localhost:8000/api/password/reset', {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        token: token, // Use the token extracted from the URL
      });

      // If the request is successful, show a success message
      toast.success(response.data.message);
      setIsSubmitted(true);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/connect'); // Redirect to the login page
      }, 5000);
    } catch (error) {
      // Handle errors
      if (error.response) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
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
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Entrez votre nouveau mot de passe"
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
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
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
                Confirmez
              </Button>
            </form>
            <p className="text-center" style={{ marginTop: '20px', color: "white" }}>
              Revenir à la <Link to="/connect" style={{ textDecoration: 'none', fontSize: 18 }}>connexion</Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Resetpassword;