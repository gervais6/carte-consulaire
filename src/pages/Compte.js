import React, { useState } from "react";
import '../pages/Compte.css';
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faUser  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Importer ToastContainer et toast
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles

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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    // Validation logic
    if (!formData.name || !formData.prenom || !formData.email || !formData.password || !formData.passwordConfirmation) {
      toast.error("Tous les champs sont requis."); // Afficher le message d'erreur
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      toast.error("L'inscription a échoué"); // Afficher le message d'erreur
      setIsLoading(false);
      return;
    }

    // If validation passes
    toast.success("Merci, l'inscription a été réussie."); // Afficher le message de succès
    setFormData({
      name: '',
      prenom: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    });

    // Simuler un délai pour la soumission
    setTimeout(() => {
      setIsLoading(false);
      navigate('/connect');
    }, 2000);
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
                  <form className="form mt-5 mb-5" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-5">Créer un Compte</h1>

                    <div className="row">
                      <div className="form-group col-md-6 mb-3 position-relative">
                        <FontAwesomeIcon icon={faUser } className="position-absolute" style={{ right: '10px', top: '10px', cursor: 'pointer', marginRight: "10px", marginTop: "10px" }} />
                        <input type="text" name="name" className="form-control" placeholder="Nom" required value={formData.name} onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-6 mb-3 position-relative">
                        <FontAwesomeIcon icon={faUser } className="position-absolute" style={{ right: '10px', top: '10px', cursor: 'pointer', marginRight: "10px", marginTop: "10px" }} />
                        <input type="text" name="prenom" className="form-control" placeholder="Prénom" required value={formData.prenom} onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12 mb-3 position-relative">
                        <FontAwesomeIcon icon={faEnvelope} className="position-absolute" style={{ right: '10px', top: '10px', cursor: 'pointer', marginRight: "10px", marginTop: "10px" }} />
                        <input type="email" name="email" className="form-control" placeholder="Email" required value={formData.email} onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12 mb-3 position-relative">
                        <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Mot de passe" required value={formData.password} onChange={handleChange} />
                        <span className="position-absolute" style={{ right: '10px', top: '10px', cursor: 'pointer', marginRight: "10px", marginTop: "10px" }} onClick={() => setShowPassword(!showPassword)}>
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                      </div>
                      <div className="form-group col-md-12 mb-3 position-relative">
                        <input type={showPasswordConfirmation ? "text" : "password"} name="passwordConfirmation" className="form-control" placeholder="Confirmer le mot de passe" required value={formData.passwordConfirmation} onChange={handleChange} />
                        <span className="position-absolute" style={{ right: '10px', top: '10px', cursor: 'pointer', marginRight: "10px", marginTop: "10px" }} onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                          <FontAwesomeIcon icon={showPasswordConfirmation ? faEyeSlash : faEye} />
                        </span>
                      </div>
                      <div className="col-md-12 text-center mt-5 mb-5">
                        <button type="submit" className="btn btn-contact-bg" style={{
                          backgroundColor: '#20247b',
                          borderRadius: 5,
                          padding: "15px 27px",
                          width: "100%",
                          fontSize: 15,
                          color: "white"
                        }}>
                          {isLoading ? 'Chargement...' : 'Inscrivez Vous'}
                        </button>
                      </div>
                    </div>
                  </form>
                  <ToastContainer style={{ marginTop: '5rem' }} /> {/* Ajuster la position ici */}
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