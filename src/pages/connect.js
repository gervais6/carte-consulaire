import React, { useState } from "react";
import '../pages/Compte.css'; // Assurez-vous que le chemin est correct
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import Confirmationconnexion from "../pages/Confirmationconnexion";
import ErrorMessageconnexion from "../pages/ErrorMessageconnexion";

const Connect = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessageconnexion, setErrorMessageconnexion] = useState('');
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
    if (!formData.email || !formData.password) {
      setErrorMessageconnexion("Tous les champs sont requis.");
      setIsSubmitted(false);
      return;
    }

    // Simulate a successful login (replace this with actual login logic)
    if (formData.email === "test@example.com" && formData.password === "password") {
      setIsSubmitted(true);
      setErrorMessageconnexion('');
      setTimeout(() => {
        navigate('/'); // Rediriger après une connexion réussie
      }, 2000);
    } else {
      setErrorMessageconnexion("Identifiants incorrects.");
      setIsSubmitted(false);
    }
  };

  return (
    <div id="root">
      <Header />
      <div className="container-fluid">
        <div id="contact" className="contact-area section-padding">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="contact">
                  <h1 className="text-center mb-4">Connexion</h1>
                  {errorMessageconnexion && <ErrorMessageconnexion message={errorMessageconnexion} />}
                  {isSubmitted && <Confirmationconnexion message="Connexion réussie." />}
                  {showForm && (
                    <form className="form mt-5 mb-5" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="form-group col-md-12 mb-3 position-relative">
                          <span className="position-absolute" style={{ right: '10px', top: '10px', cursor: 'pointer', marginRight: "10px", marginTop: "10px" }}>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <input type="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} style={{ paddingLeft: '40px' }} />
                        </div>
                        <div className="form-group col-md-12 mb-5 position-relative">
                          <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Mot de passe" required onChange={handleChange} />
                          <span className="position-absolute" style={{ right: '10px', top: '10px ', cursor: 'pointer', marginRight: "10px", marginTop: "10px" }} onClick={() => setShowPassword(!showPassword)}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                          </span>
                        </div>
                        <div className="col-md-12 text-center mb-1">
                          <button type="submit" className="btn btn-contact-bg" style={{
                            backgroundColor: '#20247b',
                            borderRadius: 5,
                            padding: "15px 27px",
                            width: "100%",
                            fontSize: 15,
                            color: "white"
                          }}>
                            Connexion
                          </button>
                        </div>
                      </div>
                      <div className="mb-5" style={{ float: "right" }}>
                        <Link to="/mdp" style={{ color: "black", fontSize: 12 }}>Mots de passe oublié</Link>
                      </div>
                    </form>
                  )}
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

export default Connect;