import React, { useState } from "react";
import '../pages/Compte.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import { TextField, Button } from '@mui/material';
import logo from '../pages/Logo Yonnee.png'; // Importez l'image de votre logo


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
      // Send POST request to the API to request password reset
      const response = await axios.post('http://localhost:8000/api/password/email', {
        email: formData.email
      });

      // If the request is successful, show a success message
      toast.success(response.data.message);
      setIsSubmitted(true);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/connect'); // Redirect to the login page
      }, 2000);
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
              <Button type="submit" variant="contained" color="primary" style={{ width: '100%', padding: '10px', background: "#343a40" }}>
                Envoyer votre e-mail
              </Button>
            </form>
            <p className="text-center" style={{ marginTop: '20px', color: "white", fontSize: 18 }}>
              Revenir à la <Link to="/connect" style={{ textDecoration: 'none' }}>connexion</Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MotsDePasseOublier;