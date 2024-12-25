import React, { useState } from "react";
import '../pages/Compte.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent'; 
import TextField from '@mui/material/TextField'; 
import FormControl from '@mui/material/FormControl'; 
import InputLabel from '@mui/material/InputLabel'; 
import OutlinedInput from '@mui/material/OutlinedInput'; 
import InputAdornment from '@mui/material/InputAdornment'; 
import IconButton from '@mui/material/IconButton'; 
import Grid from '@mui/material/Grid'; 

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
    <section className="" style={{ backgroundColor: '#eee' }}>
      <ToastContainer />
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <Grid container spacing={4} alignItems="center">
            <Grid item lg={6} md={12}>
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Créez votre compte <br />
                <span className="text-primary">pour vos démarches administratives</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                Inscrivez-vous dès maintenant pour accéder à notre plateforme dédiée à la gestion de vos demandes de documents administratifs. 
                Que vous ayez besoin d'un passeport, d'une carte d'identité, ou d'autres formalités, notre application vous guide à chaque étape du processus.
              </p>
            </Grid>
            <Grid item lg={6} md={12}>
              <Card elevation={3} style={{ borderRadius: '15px' }}>
                <CardContent>
                  <h2 className="text-center">S'inscrire</h2>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      label="Nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      label="Prénom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      required
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="password">Mot de passe</InputLabel>
 <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        label="Mot de passe"
                      />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="passwordConfirmation">Confirmer le mot de passe</InputLabel>
                      <OutlinedInput
                        id="passwordConfirmation"
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                    <div className="form-check d-flex justify-content-center mb-5">
                      <label className="form-check-label" htmlFor="form2Example3">
                        Vous avez un compte <Link to="/connect" style={{ textDecoration: "none" }}>Connectez-vous</Link>
                      </label>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        startIcon={<PersonAddIcon />}
                      >
                        S'inscrire
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Compte;