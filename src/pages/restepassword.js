import React, { useState } from "react";
import '../pages/Compte.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 

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
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "black",fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>  

    <div className="container">
      <h2 className="text-center" style={{marginBottom:30,color:"white"}}>Réinitialiser votre mot de passe</h2>
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
            <div className="form-group" style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre nouveau mot de passe"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
              />
              <span 
                onClick={() => setShowPassword(!showPassword)} 
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'black' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span >
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <input 
                type={showPasswordConfirmation ? 'text' : 'password'} 
                id="passwordConfirmation"
                name="passwordConfirmation"
                required
                value={formData.passwordConfirmation}
                onChange={handleChange}
                placeholder="Confirmez votre mot de passe"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
              />
              <span 
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} 
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'black' }}
              >
                {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%' }}>Confirmez</button>
          </form>
          <p className="text-center" style={{ marginTop: '20px' }}>
            Revenir à la <Link to="/connect" style={{ textDecoration: 'none' }}>connexion</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Resetpassword;