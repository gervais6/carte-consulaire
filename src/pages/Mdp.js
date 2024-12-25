import React, { useState } from "react";
import '../pages/Compte.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Import des styles de react-toastify
import Visibility from '@mui/icons-material/Visibility'; // Import de l'icône pour voir le mot de passe
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Import de l'icône pour masquer le mot de passe
import LockResetIcon from '@mui/icons-material/LockReset'; // Import de l'icône de réinitialisation
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent'; 
import TextField from '@mui/material/TextField'; 
import FormControl from '@mui/material/FormControl'; 
import InputLabel from '@mui/material/InputLabel'; 
import OutlinedInput from '@mui/material/OutlinedInput'; 
import InputAdornment from '@mui/material/InputAdornment'; 
import IconButton from '@mui/material/IconButton'; 
import Grid from '@mui/material/Grid'; // Importer le composant Grid

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
      // Envoyer la requête POST à l'API pour demander la réinitialisation du mot de passe
      const response = await axios.post('http://localhost:8000/api/password/email', {
        email: formData.email
      });

      // Si la requête réussit, afficher un message de succès
      toast.success(response.data.message);
      setIsSubmitted(true);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/connect'); // Rediriger vers la page de connexion
      }, 5000);
    } catch (error) {
      // Gérer les erreurs
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
    <section className="" style={{ backgroundColor: '#eee' }}>
      <ToastContainer />
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <Grid container spacing={4} alignItems="center" >
            <Grid item lg={6} md={12}>
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Réinitialiser votre mot de passe <br />
                <span className="text-primary">pour vos démarches administratives</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                Entrez votre adresse e-mail pour recevoir un lien de réinitialisation de mot de passe. 
                Assurez-vous d'utiliser l'adresse e-mail associée à votre compte.
              </p>
            </Grid>

            <Grid item lg={6} md={12}>
              <Card elevation={3} style={{ borderRadius: '15px' }}>
                <CardContent>
                  <h2 className="text-center">Réinitialiser le mot de passe</h2>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <Button
                        variant="contained"
                        color="primary"
                        size ="large"
                        type="submit"
                        startIcon={<LockResetIcon />}
                      >
                        Envoyer votre e-mail
                      </Button>
                    </div>
                  </form>
                  <p className="text-center">
                    Revenir à la <Link to="/connect" className="text-primary" style={{ textDecoration: 'none' }}>connexion</Link>
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default MotsDePasseOublier;