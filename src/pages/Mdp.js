import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import { 
  TextField, 
  Button,
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Fade,
  Alert,
  InputAdornment,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Email,
  ArrowBack,
  LockReset,
  FlightTakeoff
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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
  [theme.breakpoints.down('sm')]: {
    padding: '12px 24px',
    fontSize: '0.95rem',
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: 20,
    margin: theme.spacing(1),
    backdropFilter: 'blur(10px)',
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(2.5),
    borderRadius: 16,
    margin: 0,
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
      [theme.breakpoints.down('sm')]: {
        padding: '12px 14px',
        fontSize: '0.95rem',
      },
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiInputAdornment-root': {
      marginRight: 8,
    },
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
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },
  [theme.breakpoints.down('xs')]: {
    width: 32,
    height: 32,
  },
}));

const MotsDePasseOublier = () => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email) {
      setError("Veuillez saisir votre adresse email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/api/password/email', {
        email: formData.email
      });

      setSuccess(response.data.message || "Un lien de réinitialisation a été envoyé à votre adresse email.");
      setTimeout(() => {
        navigate('/connect');
      }, 3000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Cette adresse email n'existe pas dans notre système.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
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
      padding: { xs: 2, sm: 3 },
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
        [theme.breakpoints.down('md')]: {
          background: 'radial-gradient(circle at 50% 20%, rgba(33, 203, 243, 0.1) 0%, transparent 60%)',
        },
      }
    }}>
      {/* Effets décoratifs - masqués sur mobile */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, transparent 70%)',
        filter: 'blur(40px)',
        [theme.breakpoints.down('md')]: {
          width: '200px',
          height: '200px',
          top: '10%',
          left: '-10%',
        },
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      }} />
      
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Fade in={true} timeout={800}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" justifyContent="center">
            {/* Section de bienvenue */}
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                mb: { xs: 4, md: 0 }
              }}>
                <Box sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 2,
                  mb: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}>
                  <Box sx={{
                    width: { xs: 60, sm: 70 },
                    height: { xs: 60, sm: 70 },
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
                    <FlightTakeoff style={{ 
                      position: 'relative',
                      zIndex: 2,
                      color: '#21CBF3',
                      fontSize: isMobile ? 30 : 35,
                      filter: 'drop-shadow(0 0 8px rgba(33, 203, 243, 0.5))'
                    }} />
                  </Box>
                  <Typography variant="h3" sx={{
                    fontWeight: 900,
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% auto',
                    animation: 'textShine 3s ease-in-out infinite alternate',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    mt: { xs: 1, sm: 0 }
                  }}>
                    yónnee
                  </Typography>
                </Box>
                
                <Typography variant="h4" sx={{ 
                  color: 'white',
                  mb: 3,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                }}>
                  {isMobile ? (
                    <>Mot de passe oublié ?</>
                  ) : (
                    <>Mot de passe<br/>oublié ?</>
                  )}
                </Typography>
                
                <Typography variant="h6" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 4,
                  fontWeight: 400,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  px: { xs: 1, sm: 0 }
                }}>
                  Pas d'inquiétude ! Nous vous enverrons un lien de réinitialisation par email pour retrouver l'accès à votre compte.
                </Typography>
                
                {/* Instructions */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 2,
                  mt: { xs: 4, sm: 5 },
                  px: { xs: 1, sm: 0 }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconContainer>
                      <Typography sx={{ 
                        fontWeight: 'bold', 
                        fontSize: { xs: '0.9rem', sm: '1.1rem' } 
                      }}>
                        1
                      </Typography>
                    </IconContainer>
                    <Typography variant="body1" sx={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}>
                      Saisissez votre adresse email
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconContainer>
                      <Typography sx={{ 
                        fontWeight: 'bold', 
                        fontSize: { xs: '0.9rem', sm: '1.1rem' } 
                      }}>
                        2
                      </Typography>
                    </IconContainer>
                    <Typography variant="body1" sx={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}>
                      Recevez le lien de réinitialisation
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconContainer>
                      <Typography sx={{ 
                        fontWeight: 'bold', 
                        fontSize: { xs: '0.9rem', sm: '1.1rem' } 
                      }}>
                        3
                      </Typography>
                    </IconContainer>
                    <Typography variant="body1" sx={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}>
                      Créez un nouveau mot de passe
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Formulaire de réinitialisation */}
            <Grid item xs={12} md={6} sx={{ 
              order: { xs: 1, md: 2 },
              width: '100%'
            }}>
              <GlassCard>
                <Typography variant="h5" sx={{ 
                  color: 'white', 
                  mb: 4,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  gap: 2,
                  fontSize: { xs: '1.3rem', sm: '1.5rem' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}>
                  <LockReset sx={{ 
                    color: '#21CBF3',
                    fontSize: { xs: 28, sm: 32 }
                  }} />
                  Réinitialiser votre mot de passe
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
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      py: { xs: 0.5, sm: 1 },
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
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      py: { xs: 0.5, sm: 1 },
                      '& .MuiAlert-icon': {
                        color: '#4CAF50'
                      }
                    }}
                  >
                    {success}
                  </Alert>
                )}
                
                {!success ? (
                  <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <Box sx={{ mb: 4 }}>
                      <AnimatedInput
                        fullWidth
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="adresse@email.com"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email style={{ 
                                color: '#21CBF3', 
                                fontSize: isMobile ? '1rem' : '1.1rem' 
                              }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: { xs: '0.95rem', sm: '1rem' }
                          }
                        }}
                      />
                    </Box>

                    {/* Bouton d'envoi */}
                    <GradientButton
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{ 
                        mb: 3,
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.95rem', sm: '1.1rem' },
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: { xs: 48, sm: 56 },
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
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          gap: 1 
                        }}>
                          <CircularProgress 
                            size={isMobile ? 18 : 20} 
                            thickness={4}
                            sx={{ color: 'white' }}
                          />
                          <span>Envoi en cours...</span>
                        </Box>
                      ) : (
                        isMobile ? 'Envoyer le lien' : 'Envoyer le lien de réinitialisation'
                      )}
                    </GradientButton>

                    {/* Lien de retour */}
                    <Box sx={{ 
                      textAlign: 'center', 
                      mt: { xs: 2, sm: 3 }
                    }}>
                      <Button
                        component={Link}
                        to="/connect"
                        startIcon={<ArrowBack />}
                        sx={{
                          color: '#21CBF3',
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          '&:hover': {
                            backgroundColor: 'rgba(33, 203, 243, 0.1)',
                          },
                        }}
                      >
                        Retour à la connexion
                      </Button>
                    </Box>
                  </form>
                ) : (
                  /* Message de succès avec instructions */
                  <Box>
                    <Box sx={{ 
                      textAlign: 'center', 
                      mb: 3,
                      p: { xs: 2, sm: 3 },
                      borderRadius: 2,
                      backgroundColor: 'rgba(33, 203, 243, 0.05)',
                      border: '1px solid rgba(33, 203, 243, 0.2)'
                    }}>
                      <Typography variant="body1" sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)', 
                        mb: 2,
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}>
                        ✅ Vérifiez votre boîte de réception (et vos spams)
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                      }}>
                        Cliquez sur le lien que nous vous avons envoyé pour créer un nouveau mot de passe.
                      </Typography>
                    </Box>

                    {/* Lien de retour */}
                    <Box sx={{ 
                      textAlign: 'center', 
                      mt: { xs: 2, sm: 3 }
                    }}>
                      <Button
                        component={Link}
                        to="/connect"
                        startIcon={<ArrowBack />}
                        sx={{
                          color: '#21CBF3',
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          '&:hover': {
                            backgroundColor: 'rgba(33, 203, 243, 0.1)',
                          },
                        }}
                      >
                        Retour à la connexion
                      </Button>
                    </Box>
                  </Box>
                )}
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

        /* Optimisations pour mobile */
        @media (max-width: 600px) {
          html {
            font-size: 14px;
          }
          
          body {
            -webkit-tap-highlight-color: transparent;
          }
        }

        @media (max-width: 400px) {
          html {
            font-size: 13px;
          }
        }
      `}</style>
    </Box>
  );
};

export default MotsDePasseOublier;