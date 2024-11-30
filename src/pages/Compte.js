import React, { useState } from "react";
import '../pages/Compte.css';
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ConfirmationMessage from '../pages/ConfirmationMessage'; // Import the new component
import ErrorMessage from '../pages/ErrorMessage'; // Import the error message component

const Compte = () => {
  const [formData, setFormData] = useState({
    name: '',
    prenom: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for confirmation
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
  const [showForm, setShowForm] = useState(true); // New state to control form visibility
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
    if (!formData.name || !formData.prenom || !formData.email || !formData.password || !formData.passwordConfirmation) {
      setErrorMessage("Tous les champs sont requis."); // Set error message for empty fields
      setIsSubmitted(false); // Ensure confirmation message is hidden
      setShowForm(false); // Hide the form

      // Redirect to the Compte page after 5 seconds
      setTimeout(() => {
        navigate('/'); // Redirect to the Compte page after 5 seconds
      }, 3000);
      return; // Stop the submission
    }

    if (formData.password !== formData.passwordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas."); // Set error message for password mismatch
      setIsSubmitted(false); // Ensure confirmation message is hidden
      setShowForm(false); // Hide the form

      // Redirect to the Compte page after 5 seconds
      setTimeout(() => {
        navigate('/'); // Redirect to the Compte page after 5 seconds
      }, 3000);
      return; // Stop the submission
    }

    // If validation passes
    setIsSubmitted(true); // Show confirmation message
    setErrorMessage(''); // Clear any previous error messages
    setShowForm(false); // Hide the form

    // Redirect to the Navbar page after 5 seconds
    setTimeout(() => {
      navigate('/'); // Redirect to the Navbar page after 5 seconds
    }, 3000);
  };

  return (
    <div id="root"> {/* Added id for styling */}
      <Header />
      <div className="container-fluid">
        <div id="contact" className="contact-area section-padding">
          <div className="container mt-5">
            <br />
            <br />
            <div className="row">
              <div className="col-lg-7">
                <div className="contact">
                  {errorMessage && <ErrorMessage message={errorMessage} />} {/* Show error message */}
                  {isSubmitted && !errorMessage && <ConfirmationMessage message="Merci, l'inscription a été réussie." />} {/* Show confirmation message only if there's no error */}
                  {showForm && ( // Show form only if showForm is true
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="form-group col-md-6 mb-3">
                          <input type="text" name="name" className="form-control" placeholder="Nom" required onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6 mb-3">
                          <input type="text" name="prenom" className="form-control" placeholder="Prenom" required onChange={handleChange} />
                        </div>
                        <div className ="form-group col-md-12 mb-3">
                          <input type="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-12 mb-3 position-relative">
                          <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Mot de passe" required onChange={handleChange} />
                          <span className="position-absolute" style={{ right: '10px', top: '10px', cursor: 'pointer', marginRight: '10px', marginTop: '10px' }} onClick={() => setShowPassword(!showPassword)}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                          </span>
                        </div>
                        <div className="form-group col-md-12 mb-3 position-relative">
                          <input type={showPasswordConfirmation ? "text" : "password"} name="passwordConfirmation" className="form-control" placeholder="Confirmer le mot de passe" required onChange={handleChange} />
                          <span className="position-absolute" style={{ right: '10px', top: '10px', cursor: 'pointer', marginRight: '10px', marginTop: '10px' }} onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                            <FontAwesomeIcon icon={showPasswordConfirmation ? faEyeSlash : faEye} />
                          </span>
                        </div>
                        <div className="col-md-12 text-center mt-5 mb-5">
                          <button type="submit" value="Send message" name="submit" id="submitButton" className="btn btn-contact-bg" title="Submit Your Message!" style={{
                            backgroundColor: '#20247b',
                            borderRadius: 5,
                            padding: "15px 27px",
                            width: "100%",
                            fontSize: 15,
                            color: "white"
                          }}>
                            Inscrivez Vous
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-block">
                <div className="single_address">
                  <i className="fa fa-map-marker"></i>
                  <h4>Notre adresse</h4>
                  <p>Zone Captage, Dakar</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-envelope"></i>
                  <h4>Envoyez votre message</h4>
                  <p>Info@example.com</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-phone"></i>
                  <h4>Appelez-nous au</h4>
                  <p>(+221) 771001897</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-clock-o"></i>
                  <h4>Temps de travail</h4>
                  <p>Du lundi au vendredi : de 8h00 à 16h00. <br />Samedi : 10h00 - 14h00</p>
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

export default Compte;