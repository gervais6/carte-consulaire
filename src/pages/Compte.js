import React, { useState } from "react";
import '../pages/Compte.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 

const Compte = () => {
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (password !== passwordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const formData = { name, prenom, email, password, password_confirmation: passwordConfirmation };

    try {
      const response = await axios.post("http://localhost:8000/api/register", formData);
      console.log(response.data); 
      toast.success("Inscription réussie !");
      setTimeout(() => {
        navigate('/connect'); 
      }, 2000); 
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer."); 
    }
  };

  return (
    <>
      {/* Formulaire d'inscription */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "#343a40", fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                <div className="modal-header" style={{ background: '#212529', color: 'white' }}>
                  <h5 className="modal-title" id="loginModalLabel">Créer un compte</h5>
                </div>
                <hr style={{ border: "2px solid white", marginBottom: 20 }} />
                <div className="mb-3">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Entrez votre nom" 
                    className="form-control" 
                    style={{ borderRadius: '5px' }} 
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    id="prenom" 
                    name="prenom" 
                    required 
                    value={prenom} 
                    onChange={(e) => setPrenom(e.target.value)} 
                    placeholder="Entrez votre prénom" 
                    className="form-control" 
                    style={{ borderRadius: '5px' }} 
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Entrez votre email" 
                    className="form-control" 
                    style={{ borderRadius: '5px' }} 
                  />
                </div>
                <div className="mb-3" style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="form-control" 
                    style={{ borderRadius: '5px' }} 
                  />
                  <span 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'black' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </div>
                <div className="mb-3" style={{ position: 'relative' }}>
                  <input 
                    type={showPasswordConfirmation ? 'text' : 'password'} 
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirmer le mot de passe"
                    className="form-control" 
                    style={{ borderRadius: '5px' }} 
                  />
                  <span 
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} 
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'black' }}
                  >
                    {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                  </span>
                </div>
                <button type="submit" className="btn btn-dark" style={{ width: '100%', padding: '10px',background:"#343a40" }}>S'inscrire</button>
              </form>
              <div className="form-check d-flex justify-content-center mb-5" style={{ marginTop: 20, color: "white" }}>
                <label className="form-check-label" htmlFor="form2Example3">
                  Vous avez un compte ? <Link to="/connect" style={{ textDecoration: "none", fontSize: 18 }}>Connectez-vous</Link>
                </label>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Compte;