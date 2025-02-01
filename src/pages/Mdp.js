import React, { useState } from "react";
import '../pages/Compte.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 

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
<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "black",fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>   
<div className="container">
      <h3 className="text-center" style={{marginBottom:30,color:"white"}}>Réinitialiser votre mot de passe</h3>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Entrez votre email" 
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%' }}>Envoyer votre e-mail</button>
          </form>
          <p className="text-center" style={{ marginTop: '20px',color:"white" }}>
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