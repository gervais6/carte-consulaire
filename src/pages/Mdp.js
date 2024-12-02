import React, { useState } from "react";
import '../pages/Compte.css';
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import ConfirmationMessage from '../pages/ConfirmationMessage'; // Import the new component
import ErrorMessage from '../pages/ErrorMessage'; // Import the error message component

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
      <Header />
      <div className="container-fluid">
        <div id="contact" className="contact-area section-padding">
          <div className="container mt-5">
            <div className="row justify-content-center" style={{ marginBottom: "100px", marginTop: "90px" }}>
              <div className="col-lg-7">
                <div className="contact">
                  <h1 className="text-center mb-4">Réinitialisation du Mot de Passe</h1> {/* Titre ajouté */}
                  {errorMessage && <ErrorMessage message={errorMessage} />}
                  {isSubmitted && !errorMessage && <ConfirmationMessage message="Merci, l'inscription a été réussie." />}
                  {showForm && (
                    <form className="form mt-5 mb-5" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="form-group col-md-12 mb-3 position-relative">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-12 text-center">
                          <button
                            type="submit"
                            className="btn btn-contact-bg"
                            style={{
                              backgroundColor: '#20247b',
                              borderRadius: 5,
                              padding: "15px 27px",
                              width: "100%",
                              fontSize: 15,
                              color: "white"
                            }}
                          >
                            Envoyer
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                  <div className="text-center mt-3">
                    <Link to="/connect" style={{ color: '#20247b', textDecoration: 'none',fontSize:17 }}>
                      Revenir à la connexion
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MotsDePasseOublier;