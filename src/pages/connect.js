import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  IconButton, 
  InputAdornment, 
  TextField, 
  Button,
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Fade,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Lock, 
  Email,
  Login,
  Security,
  RocketLaunch,
  LocalShipping,
  Payment,
  People
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import logo from '../pages/Logo Yonnee.png';
import '../pages/navbar.css';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

// Composants stylisés
const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
  borderRadius: 12,
  padding: '14px 32px',
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 30px rgba(33, 203, 243, 0.4)',
  },
  '&.Mui-disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: 24,
  padding: theme.spacing(5),
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
    borderRadius: '24px 24px 0 0',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '-50px',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(33, 203, 243, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(20px)',
  },
}));

const AnimatedInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'rgba(33, 203, 243, 0.4)',
      background: 'rgba(255, 255, 255, 0.08)',
    },
    '&.Mui-focused': {
      borderColor: '#21CBF3',
      boxShadow: '0 0 0 2px rgba(33, 203, 243, 0.15)',
    },
    '& input': {
      color: 'white',
      padding: '14px 16px',
      fontSize: '1rem',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1,
      },
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'rgba(33, 203, 243, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#21CBF3',
}));

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear errors when user starts typing
        if (error) setError('');
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!formData.email || !formData.password) {
            setError("Tous les champs sont requis.");
            return;
        }
        
        setIsSubmitting(true);
    
        try {
            const response = await axios.post("http://localhost:8000/api/login", formData);
            if (response.data.success) {
                login(response.data.token);
                setSuccess("Connexion réussie ! Redirection en cours...");
                setTimeout(() => {
                    navigate('/suivi');
                }, 2000);
            } else {
                setError(response.data.message || "Identifiants incorrects.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erreur lors de la connexion. Veuillez réessayer.";
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(33, 203, 243, 0.1) 0%, transparent 50%)',
        }
      }}>
        {/* Effets décoratifs */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        
        <Container maxWidth="lg">
          <Fade in={true} timeout={800}>
            <Grid container spacing={6} alignItems="center">
              {/* Section de bienvenue */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  textAlign: { xs: 'center', md: 'left' },
                  mb: { xs: 4, md: 0 }
                }}>
                  <Box sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 2,
                    mb: 3
                  }}>
                    <Box sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(33, 203, 243, 0.2) 0%, rgba(25, 118, 210, 0.1) 100%)',
                      border: '1px solid rgba(33, 203, 243, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: 'inset 0 0 20px rgba(33, 203, 243, 0.15), 0 0 30px rgba(33, 203, 243, 0.1)',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        width: '150%',
                        height: '150%',
                        background: 'conic-gradient(transparent, rgba(33, 203, 243, 0.2), transparent 30%)',
                        animation: 'rotate 6s linear infinite',
                      },
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '90%',
                        height: '90%',
                        borderRadius: '50%',
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(33, 203, 243, 0.2)',
                      }
                    }}>
                      <img 
                        src={logo} 
                        alt="Logo yónnee" 
                        style={{ 
                          width: 45, 
                          height: 45,
                          position: 'relative',
                          zIndex: 2,
                          filter: 'brightness(0) invert(1)'
                        }} 
                      />
                    </Box>
                    <Typography variant="h3" sx={{
                      fontWeight: 900,
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundSize: '200% auto',
                      animation: 'textShine 3s ease-in-out infinite alternate',
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}>
                      yónnee
                    </Typography>
                  </Box>
                  
                  <Typography variant="h4" sx={{ 
                    color: 'white',
                    mb: 3,
                    fontWeight: 800,
                    lineHeight: 1.2
                  }}>
                    Reconnectez-vous à<br/>votre compte
                  </Typography>
                  
                  <Typography variant="h6" sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 4,
                    fontWeight: 400,
                    maxWidth: 500
                  }}>
                    Accédez à votre espace personnel pour gérer vos envois de colis et suivre vos transactions en temps réel.
                  </Typography>
                  
                  {/* Avantages avec icônes MUI */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 2,
                    mt: 5
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconContainer>
                        <RocketLaunch fontSize="small" />
                      </IconContainer>
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        Accès instantané à vos voyages
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconContainer>
                        <LocalShipping fontSize="small" />
                      </IconContainer>
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        Suivi en temps réel de vos colis
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconContainer>
                        <Payment fontSize="small" />
                      </IconContainer>
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        Gestion sécurisée de vos paiements
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconContainer>
                        <People fontSize="small" />
                      </IconContainer>
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        Rencontrez des voyageurs vérifiés
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Formulaire de connexion */}
              <Grid item xs={12} md={6}>
                <GlassCard>
                  <Typography variant="h5" sx={{ 
                    color: 'white', 
                    mb: 4,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Login sx={{ color: '#21CBF3' }} />
                    Connexion à votre compte
                  </Typography>
                  
                  {/* Message d'erreur */}
                  {error && (
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        color: '#ff6b6b',
                        border: '1px solid rgba(244, 67, 54, 0.3)',
                        '& .MuiAlert-icon': {
                          color: '#ff6b6b'
                        }
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  {/* Message de succès */}
                  {success && (
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        color: '#4CAF50',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
                        '& .MuiAlert-icon': {
                          color: '#4CAF50'
                        }
                      }}
                    >
                      {success}
                    </Alert>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <Box sx={{ mb: 3 }}>
                      <AnimatedInput
                        fullWidth
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="adresse@email.com"
                        error={!!error && !formData.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email style={{ color: '#21CBF3', fontSize: '1.1rem' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    {/* Mot de passe */}
                    <Box sx={{ mb: 4 }}>
                      <AnimatedInput
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Votre mot de passe"
                        error={!!error && !formData.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock style={{ color: '#21CBF3', fontSize: '1.1rem' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ 
                                  color: '#21CBF3',
                                  '&:hover': {
                                    backgroundColor: 'rgba(33, 203, 243, 0.1)'
                                  }
                                }}
                                size="small"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    {/* Lien mot de passe oublié */}
                    <Box sx={{ textAlign: 'right', mb: 3 }}>
                      <Link 
                        to="/mdp" 
                        style={{ 
                          textDecoration: 'none',
                          color: '#21CBF3',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        Mot de passe oublié ?
                      </Link>
                    </Box>

                    {/* Bouton de connexion */}
                    <GradientButton
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{ 
                        mb: 3,
                        py: 1.5,
                        fontSize: '1.1rem',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                          transition: 'left 0.7s ease',
                        },
                        '&:hover:before': {
                          left: '100%',
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircularProgress 
                            size={20} 
                            thickness={4}
                            sx={{ color: 'white' }}
                          />
                          Connexion en cours...
                        </Box>
                      ) : (
                        'Se connecter'
                      )}
                    </GradientButton>

                    {/* Séparateur */}
                    <Divider sx={{ 
                      my: 3, 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      '&:before, &:after': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', px: 2 }}>
                        Pas encore membre ?
                      </Typography>
                    </Divider>

                    {/* Bouton d'inscription */}
                    <Button
                      component={Link}
                      to="/compte"
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: 12,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#21CBF3',
                          background: 'rgba(33, 203, 243, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Créer un compte
                    </Button>
                  </form>

                  {/* Sécurité */}
                  <Box sx={{ 
                    mt: 4, 
                    pt: 3, 
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Security sx={{ color: '#21CBF3', fontSize: '1.2rem' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Votre connexion est sécurisée et cryptée
                    </Typography>
                  </Box>
                </GlassCard>
              </Grid>
            </Grid>
          </Fade>
        </Container>

        {/* Animations CSS */}
        <style jsx global>{`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes textShine {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </Box>
    );
};

export default LoginForm;