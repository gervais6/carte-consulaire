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
  Fade,
  Divider,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Lock, 
  Email,
  Login,
  Security,
  FlightTakeoff,
  LocalShipping,
  Payment,
  People
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
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
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    boxShadow: 'none',
    border: 'none',
    overflowY: 'auto',
    position: 'fixed',
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

const IconContainer = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'rgba(33, 203, 243, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#21CBF3',
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },
}));

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            console.log('🔐 Tentative de connexion pour:', formData.email);
            
            // Version simple et optimisée
            const response = await axios.post("http://localhost:8000/api/auth/login", formData);
            
            console.log('✅ Connexion réussie:', response.data);
            
            if (response.data.success) {
                const { token, user } = response.data;
                
                // Stocker dans localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                
                // Utiliser AuthContext
                login(token, user);
                
                // Vérifier le rôle et rediriger
                if (user.role === 'admin') {
                    setSuccess("Connexion admin réussie ! Redirection vers le dashboard...");
                    setTimeout(() => navigate('/admin'), 1500);
                } else {
                    setSuccess("Connexion réussie ! Redirection en cours...");
                    setTimeout(() => navigate('/suivi'), 1500);
                }
            }
            
        } catch (error) {
            console.error('❌ Erreur:', error.response?.data || error.message);
            
            let errorMessage = "Email ou mot de passe incorrect.";
            
            // Si échec connexion standard, essayer connexion admin
            if (error.response?.status === 401) {
                try {
                    console.log('⚠️  Échec connexion standard, tentative admin...');
                    
                    // Essayer la connexion admin
                    const adminResponse = await axios.post("http://localhost:8000/api/auth/admin/login", formData);
                    
                    if (adminResponse.data.success) {
                        const { token, user } = adminResponse.data;
                        
                        // Stocker pour admin
                        localStorage.setItem('adminToken', token);
                        localStorage.setItem('adminUser', JSON.stringify(user));
                        
                        setSuccess("Connexion admin réussie ! Redirection vers le dashboard...");
                        
                        setTimeout(() => {
                            navigate('/admin');
                        }, 1500);
                        return;
                    }
                } catch (adminError) {
                    console.error('❌ Échec connexion admin aussi:', adminError.response?.data?.message);
                    
                    if (adminError.response?.data?.message) {
                        errorMessage = adminError.response.data.message;
                    } else {
                        errorMessage = "Email ou mot de passe incorrect.";
                    }
                }
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.code === 'ERR_NETWORK') {
                errorMessage = "Serveur inaccessible. Vérifiez que le backend est démarré sur le port 8000.";
            }
            
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
                          <FlightTakeoff fontSize="small" />
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
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
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
                  Connexion
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 2,
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  Accédez à votre compte yónnee
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
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
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
  showPassword, 
  setShowPassword,
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
          <Login sx={{ color: '#21CBF3' }} />
          Connexion à votre compte
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
      
      <form onSubmit={handleSubmit} style={{ width: '100%', flex: 1 }}>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ 
                    color: '#21CBF3', 
                    fontSize: isMobile ? '1.2rem' : '1.1rem' 
                  }} />
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
            sx={{
              '& .MuiInputBase-input': {
                fontSize: isMobile ? '1rem' : '1rem'
              }
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
              fontSize: isMobile ? '0.9rem' : '0.9rem',
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
              <span>Connexion en cours...</span>
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
          <Typography variant="body2" sx={{ 
            color: 'rgba(255, 255, 255, 0.5)', 
            px: 2,
            fontSize: isMobile ? '0.85rem' : '0.875rem'
          }}>
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
            py: isMobile ? 1.5 : 1.5,
            fontWeight: 600,
            fontSize: isMobile ? '1rem' : '1rem',
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
      {!isMobile && (
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
      )}
    </>
  );
};

export default LoginForm;