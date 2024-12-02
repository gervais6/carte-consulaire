import React, { useState } from "react";
import '../pages/Compte.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const MotsDePasseOublier = () => {
  const [formData, setFormData] = useState({
    name: '',
    prenom: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.email) {
      setErrorMessage("Tous les champs sont requis.");
      setIsSubmitted(false);
      setShowForm(false);
      setTimeout(() => {
        navigate('/');
      }, 5000);
      return;
    }

    // If validation passes
    setIsSubmitted(true);
    setErrorMessage('');
    setShowForm(false);
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  return (
    <div id="root">
      <div className="container" style={{ marginTop: '10rem' }}>
        <h2 className="text-center mb-4">Réinitialiser le mot de passe</h2>
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
              <button type="submit" className="btn btn-primary btn-block w-100 mb-5" style={{ fontSize: 18 }}>Envoyer votre adresse e-mail</button>
            </form>
            <p className="text-center">
              Revenir à la <Link to="/connect" className="text-primary" style={{textDecoration:'none'}}>connexion</Link>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotsDePasseOublier;