import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import { 
  TextField, 
  Button,
  Box,
  Container,
  Typography,
  Paper,
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
    padding: '16px 24px',
    fontSize: '1rem',
  },
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: 24,
  padding: theme.spacing(4),
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
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
    borderRadius: 0,
    margin: 0,
    backdropFilter: 'blur(10px)',
    height: '100vh', // Changé à 100vh
    width: '100vw', // Changé à 100vw
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Changé de 'center' à 'flex-start'
    boxShadow: 'none',
    border: 'none',
    overflowY: 'auto', // Permet le défilement si nécessaire
    position: 'fixed', // Changé à fixed pour couvrir tout l'écran
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
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
      padding: '16px',
      fontSize: '1rem',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '16px',
        fontSize: '1rem',
      },
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiInputAdornment-root': {
      marginRight: 12,
    },
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
      padding: { xs: 0, sm: 3 },
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
        [theme.breakpoints.down('sm')]: {
          background: 'radial-gradient(circle at 50% 30%, rgba(33, 203, 243, 0.1) 0%, transparent 70%)',
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
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      }} />
      
      {!isMobile ? (
        // Version Desktop/Tablet
        <Container 
          maxWidth="lg" 
          sx={{ 
            px: { xs: 0, sm: 2, md: 3 },
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Fade in={true} timeout={800}>
            <Box sx={{ 
              width: '100%',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box sx={{ 
                display: 'flex', 
                width: '100%', 
                gap: 6,
                alignItems: 'center'
              }}>
                {/* Section de bienvenue - Desktop */}
                <Box sx={{ 
                  flex: 1,
                  textAlign: 'left',
                  color: 'white'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
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
                    }}>
                      <FlightTakeoff style={{ 
                        position: 'relative',
                        zIndex: 2,
                        color: '#21CBF3',
                        fontSize: 35,
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
                    }}>
                      yónnee
                    </Typography>
                  </Box>
                  
                  <Typography variant="h4" sx={{ 
                    mb: 3,
                    fontWeight: 800,
                    lineHeight: 1.2
                  }}>
                    Mot de passe<br/>oublié ?
                  </Typography>
                  
                  <Typography variant="h6" sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 4,
                    fontWeight: 400,
                    maxWidth: 500
                  }}>
                    Pas d'inquiétude ! Nous vous enverrons un lien de réinitialisation par email pour retrouver l'accès à votre compte.
                  </Typography>
                </Box>

                {/* Formulaire - Desktop */}
                <Box sx={{ flex: 1, maxWidth: 500 }}>
                  <GlassCard>
                    <FormContent 
                      formData={formData}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      error={error}
                      success={success}
                      isMobile={isMobile}
                    />
                  </GlassCard>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Container>
      ) : (
        // Version Mobile - Plein écran
        <Box sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}>
          <GlassCard>
            {/* En-tête mobile */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: 3,
              px: 2,
              pt: 2,
              flexShrink: 0
            }}>
              <Box sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(33, 203, 243, 0.2) 0%, rgba(25, 118, 210, 0.1) 100%)',
                border: '1px solid rgba(33, 203, 243, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'inset 0 0 20px rgba(33, 203, 243, 0.15), 0 0 30px rgba(33, 203, 243, 0.1)',
              }}>
                <FlightTakeoff style={{ 
                  position: 'relative',
                  zIndex: 2,
                  color: '#21CBF3',
                  fontSize: 28,
                  filter: 'drop-shadow(0 0 8px rgba(33, 203, 243, 0.5))'
                }} />
              </Box>
              
              <Typography variant="h5" sx={{ 
                color: 'white',
                mb: 1,
                fontWeight: 800,
                lineHeight: 1.2
              }}>
                Mot de passe oublié ?
              </Typography>
              
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2,
                fontSize: '0.9rem',
                lineHeight: 1.4
              }}>
                Entrez votre email pour recevoir un lien de réinitialisation.
              </Typography>
            </Box>

            {/* Formulaire mobile - prend tout l'espace */}
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              pb: 2
            }}>
              <FormContent 
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                success={success}
                isMobile={isMobile}
              />
            </Box>
          </GlassCard>
        </Box>
      )}

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
          html, body, #root {
            height: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          
          body {
            -webkit-tap-highlight-color: transparent;
            position: fixed;
            width: 100%;
            height: 100%;
          }
          
          /* Empêche le zoom sur les inputs iOS */
          input, select, textarea {
            font-size: 16px !important;
          }
          
          /* Empêche le pull-to-refresh sur mobile */
          * {
            overscroll-behavior: none;
          }
        }
      `}</style>
    </Box>
  );
};

// Composant de contenu du formulaire réutilisable
const FormContent = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  isSubmitting, 
  error, 
  success, 
  isMobile 
}) => {
  const theme = useTheme();

  return (
    <>
      {!isMobile && (
        <Typography variant="h5" sx={{ 
          color: 'white', 
          mb: 4,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <LockReset sx={{ 
            color: '#21CBF3',
            fontSize: 32
          }} />
          Réinitialiser votre mot de passe
        </Typography>
      )}
      
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
            fontSize: isMobile ? '0.9rem' : '0.9rem',
            py: isMobile ? 1 : 1,
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
            fontSize: isMobile ? '0.9rem' : '0.9rem',
            py: isMobile ? 1 : 1,
            '& .MuiAlert-icon': {
              color: '#4CAF50'
            }
          }}
        >
          {success}
        </Alert>
      )}
      
      {!success ? (
        <form onSubmit={handleSubmit} style={{ width: '100%', flex: 1 }}>
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
                      fontSize: isMobile ? '1.2rem' : '1.1rem' 
                    }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: isMobile ? '1rem' : '1rem'
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
              py: isMobile ? 1.5 : 1.5,
              fontSize: isMobile ? '1rem' : '1.1rem',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? 56 : 56,
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
                  size={isMobile ? 20 : 20} 
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
            mt: isMobile ? 3 : 3
          }}>
            <Button
              component={Link}
              to="/connect"
              startIcon={<ArrowBack />}
              sx={{
                color: '#21CBF3',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: isMobile ? '0.9rem' : '0.9rem',
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
            p: isMobile ? 2 : 3,
            borderRadius: 2,
            backgroundColor: 'rgba(33, 203, 243, 0.05)',
            border: '1px solid rgba(33, 203, 243, 0.2)'
          }}>
            <Typography variant="body1" sx={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              mb: 2,
              fontSize: isMobile ? '1rem' : '1rem'
            }}>
              ✅ Vérifiez votre boîte de réception (et vos spams)
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: isMobile ? '0.9rem' : '0.9rem'
            }}>
              Cliquez sur le lien que nous vous avons envoyé pour créer un nouveau mot de passe.
            </Typography>
          </Box>

          {/* Lien de retour */}
          <Box sx={{ 
            textAlign: 'center', 
            mt: isMobile ? 3 : 3
          }}>
            <Button
              component={Link}
              to="/connect"
              startIcon={<ArrowBack />}
              sx={{
                color: '#21CBF3',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: isMobile ? '0.9rem' : '0.9rem',
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
    </>
  );
};

export default MotsDePasseOublier;