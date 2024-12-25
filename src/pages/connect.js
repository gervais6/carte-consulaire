import React, { useState } from "react";
import '../pages/connect.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext'; 
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent'; 
import TextField from '@mui/material/TextField'; 
import FormControl from '@mui/material/FormControl'; 
import InputLabel from '@mui/material/InputLabel'; 
import OutlinedInput from '@mui/material/OutlinedInput'; 
import InputAdornment from '@mui/material/InputAdornment'; 
import IconButton from '@mui/material/IconButton'; 
import SheepIcon from '@mui/icons-material/Pets'; 
import Grid from '@mui/material/Grid'; // Importer le composant Grid

const Connect = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation basique
    if (!formData.email || !formData.password) {
        toast.error("Tous les champs sont requis.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:8000/api/login", formData);
        console.log(response.data);

        // Vérifiez si la connexion a réussi
        if (response.data.success) {
          localStorage.setItem('token', response.data.token); 
          login(); 
          toast.success("Connexion réussie.");
          setTimeout(() => {
              navigate('/profils'); 
          }, 2000);
        } else {
            toast.error(response.data.message || "Identifiants incorrects.");
        }
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        // Gérer les erreurs de manière appropriée
        if (error.response) {
            const errorMessage = error.response.data.message || "Erreur lors de la connexion. Veuillez réessayer.";
            toast.error(errorMessage);
        } else {
            toast.error("Erreur lors de la connexion. Veuillez réessayer.");
        }
    }
};

  return (
    <section className="" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
      <ToastContainer />
      
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
        <div className="container">
          <Grid container spacing={4} alignItems="center">
            <Grid item lg={6} md={12}>
            <h1 className="my-5 display-3 fw-bold ls-tight">
  Accédez à vos demandes <br />
  <span className="text-primary"> administratifs</span>
</h1>
<p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
  Connectez-vous à votre compte pour gérer vos demandes de documents administratifs en toute simplicité. 
  Que ce soit pour un passeport, une carte d'identité ou d'autres formalités, notre plateforme vous 
  permet de suivre l'état de vos demandes et d'accéder à toutes les informations nécessaires. 
  Ne perdez plus de temps, connectez-vous dès maintenant !
</p>            </Grid>

<Grid item lg={6} md={12}>
  <Card elevation={3} style={{ borderRadius: '15px' }}>
    <CardContent>
      <h2 className="text-uppercase text-center mb-5">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-outline mb-4">
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
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
              label="Password"
            />
          </FormControl>
        </div>

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Se connecter
          </Button>
        </div>

        <div className="d-flex flex-column align-items-center mb-5 mt-3">
          <p className="text-center">
            <span>Vous n'avez pas de compte ? </span>
            <Link to="/compte" style={{ textDecoration: "none", fontWeight: 'bold', color: '#007bff' }}>
              Inscrivez-vous ici
            </Link>
          </p>
          <p className="text-center">
            <span>Vous avez oublié votre </span>
            <Link to="/mdp" style={{ textDecoration: "none", fontWeight: 'bold', color: '#007bff' }}>
              mot de passe ?
            </Link>
          </p>
        </div>
      </form>
    </CardContent>
  </Card>
</Grid>          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Connect;