import React, { useState } from "react";
import '../pages/Compte.css';
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

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
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection ```javascript
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifiez si tous les champs sont remplis
    if (!formData.name || !formData.prenom || !formData.email || !formData.password || !formData.passwordConfirmation) {
      toast.error("Tous les champs sont requis.");
      return;
    }

    // Vérifiez si l'email est valide
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("L'adresse e-mail est invalide.");
      return;
    }

    // Vérifiez si le mot de passe contient au moins 6 caractères
    if (formData.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Vérifiez si les mots de passe correspondent
    if (formData.password !== formData.passwordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    // Afficher un message de succès
    toast.success("Inscription réussie !");

    // Rediriger après 2 secondes
    setTimeout(() => {
      navigate('/'); // Remplacez '/nabar' par le chemin de votre page
    }, 2000);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div id="contact" className="contact-area section-padding">
          <div className="container mt-5">
            <br />
            <br />
            <div className="row">
              <div className="col-lg-7">
                <div className="contact">
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6 mb-3">
                        <input type="text" name="name" className="form-control" placeholder="Nom" required onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-6 mb-3">
                        <input type="text" name="prenom" className="form-control" placeholder="Prenom" required onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12 mb-3">
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
      <ToastContainer position="top-center" style={{ marginTop: '50px' }} />
    </div>
  );
};

export default Compte;