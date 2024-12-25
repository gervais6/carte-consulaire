import React, { useState } from "react";
import '../pages/Compte.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Importer toast pour les notifications
import Visibility from '@mui/icons-material/Visibility'; // Importer l'icône pour voir le mot de passe
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Importer l'icône pour masquer le mot de passe
import LockResetIcon from '@mui/icons-material/LockReset'; // Importer l'icône de réinitialisation
import KeyIcon from '@mui/icons-material/Key'; // Importer l'icône de clé
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
import axios from 'axios'; // Importer axios

const Resetpassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false); // État pour gérer la visibilité du mot de passe de confirmation
  const navigate = useNavigate();
  const location = useLocation();

  // Extraire le token de l'URL
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
      // Envoyer la requête POST à l'API pour réinitialiser le mot de passe
      const response = await axios.post('http://localhost:8000/api/password/reset', {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        token: token, // Utilisez le token extrait de l'URL
      });

      // Si la requête réussit, afficher un message de succès
      toast.success(response.data.message);
      setIsSubmitted(true);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/connect'); // Rediriger vers la page d'accueil ou une autre page
      }, 5000);
    } catch (error) {
      // Gérer les erreurs
      if (error.response) {
        // Si le serveur a répondu avec un code d'erreur
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        // Erreur réseau ou autre
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <section className="" style={{ backgroundColor: '#eee' }}>
      <ToastContainer /> {/* Ajoutez le ToastContainer ici */}
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <Grid container spacing={4} alignItems="center">
            < Grid item lg={6} md={12}>
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Réinitialiser votre mot de passe <br />
                <span className="text-primary">pour vos démarches administratives</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                Entrez votre adresse e-mail et votre nouveau mot de passe pour réinitialiser votre mot de passe. 
                Assurez-vous d'utiliser l'adresse e-mail associée à votre compte.
              </p>
            </Grid>

            <Grid item lg={6} md={12}>
              <Card elevation={3} style={{ borderRadius: '15px' }}>
                <CardContent>
                  <h2 className="text-center">Nouveau mot de passe</h2>
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
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="password">Nouveau mot de passe</InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Nouveau mot de passe"
                      />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="passwordConfirmation">Confirmer le mot de passe</InputLabel>
                      <OutlinedInput
                        id="passwordConfirmation"
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        required
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password confirmation visibility"
                              onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                              edge="end"
                            >
                              {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirmer le mot de passe"
                      />
                    </FormControl>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        startIcon={<KeyIcon />}
                      >
                        Confirmez
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

export default Resetpassword;