import React, { useState } from "react";
import '../pages/Compte.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Import des styles de react-toastify
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Import de l'icône d'ajout d'utilisateur
import Visibility from '@mui/icons-material/Visibility'; // Import de l'icône pour voir le mot de passe
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Import de l'icône pour masquer le mot de passe

const Compte = () => {
  // State to hold form data
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  // Initialize navigate
  const navigate = useNavigate(); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validate password confirmation
    if (password !== passwordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const formData = { name, prenom, email, password, password_confirmation: passwordConfirmation };

    try {
      const response = await axios.post("http://localhost:8000/api/register", formData);
      console.log(response.data); 
      toast.success("Inscription réussie !");

      // Rediriger vers la page de connexion après un délai
      setTimeout(() => {
        navigate('/connect'); 
      }, 2000); 
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer."); 
    }
  };

  return (
    <section className="" style={{ backgroundColor: '#eee' }}>
      <ToastContainer /> {/* Ajoutez le ToastContainer ici */}
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">S'inscrire</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" placeholder="Nom" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" placeholder="Prénom" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        < div className="form-outline flex-fill mb-0">
                          <input type="email" placeholder="Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4 position-relative">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                          <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '5px', cursor: 'pointer' }}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4 position-relative">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type={showPasswordConfirmation ? "text" : "password"} placeholder="Confirmer le mot de passe" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
                          <span onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} style={{ position: 'absolute', right: '10px', top: '5px', cursor: 'pointer' }}>
                            {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                          </span>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label" htmlFor="form2Example3">
                        Vous avez  un compte <Link to="/connect" style={{textDecoration:"none"}}>Connectez-vous</Link>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">S'inscrire</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compte;