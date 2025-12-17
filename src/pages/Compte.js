import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import { 
  IconButton, 
  InputAdornment, 
  TextField, 
  Button,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Fade,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Lock, 
  Person, 
  Email,
  FlightTakeoff,
  Security,
  ArrowBack
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Styles modernes et professionnels avec bordures élégantes
const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  background: '#FFFFFF',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1F2937 0%, #374151 100%)',
    borderRadius: '16px 16px 0 0',
  }
}));

const ResultCard = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  background: '#FFFFFF',
  border: '1px solid rgba(229, 231, 235, 0.5)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.1), rgba(31, 41, 55, 0.05))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  }
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: '#FFFFFF',
    transition: 'all 0.2s ease',
    '& fieldset': {
      border: '1px solid #E5E7EB',
      transition: 'border 0.2s ease',
    },
    '&:hover fieldset': {
      border: '1px solid #1F2937',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #1F2937',
      boxShadow: '0 0 0 3px rgba(31, 41, 55, 0.1)',
    }
  },
  '& .MuiOutlinedInput-input': {
    fontWeight: 500,
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: '#6B7280',
  }
}));

const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  '&:hover::before': {
    opacity: 1,
  }
}));

const PrimaryButton = styled(ModernButton)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1F2937 0%, #374151 100%)',
  color: '#FFFFFF',
  '&:hover': {
    background: 'linear-gradient(90deg, #374151 0%, #4B5563 100%)',
    boxShadow: '0 8px 24px rgba(31, 41, 55, 0.25)',
  },
}));

const ModernChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 600,
  border: 'none',
  '&.MuiChip-outlined': {
    background: 'transparent',
    border: '1px solid rgba(31, 41, 55, 0.1)',
  }
}));

const GlassCard = styled(ModernCard)(({ theme }) => ({
  background: 'linear-gradient(145deg, #FFFFFF 0%, #F9FAFB 100%)',
  border: '1px solid rgba(229, 231, 235, 0.8)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
  maxWidth: 500,
  width: '100%',
  margin: '0 auto',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: 0,
    margin: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    boxShadow: 'none',
    border: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    overflowY: 'auto',
  },
}));

const AnimatedInput = styled(ModernTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: '#FFFFFF',
    borderRadius: 12,
    border: '1px solid #E5E7EB',
    color: '#1F2937',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#1F2937',
      background: '#FFFFFF',
    },
    '&.Mui-focused': {
      borderColor: '#1F2937',
      boxShadow: '0 0 0 3px rgba(31, 41, 55, 0.1)',
    },
    '& input': {
      color: '#1F2937',
      padding: '16px 14px',
      fontSize: '16px',
      '&::placeholder': {
        color: '#9CA3AF',
        opacity: 1,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '14px',
        fontSize: '16px',
        height: 'auto',
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

const Compte = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    prenom: '', 
    email: '', 
    password: '', 
    passwordConfirmation: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
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

    if (formData.password !== formData.passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!formData.name || !formData.prenom || !formData.email || !formData.password || !formData.passwordConfirmation) {
      setError("Tous les champs sont requis.");
      return;
    }

    const postData = { 
      name: formData.name, 
      prenom: formData.prenom, 
      email: formData.email, 
      password: formData.password, 
      password_confirmation: formData.passwordConfirmation 
    };

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", postData);
      console.log(response.data);
      setSuccess("Inscription réussie ! Redirection en cours...");
      setTimeout(() => {
        navigate('/connect');
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      const errorMessage = error.response?.data?.message || "Erreur lors de l'inscription. Veuillez réessayer.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
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
        background: 'radial-gradient(circle at 50% 50%, rgba(31, 41, 55, 0.05) 0%, transparent 70%)',
        [theme.breakpoints.down('sm')]: {
          background: 'radial-gradient(circle at 50% 30%, rgba(31, 41, 55, 0.05) 0%, transparent 70%)',
        },
      }
    }}>
      {/* Effets décoratifs */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(31, 41, 55, 0.05) 0%, transparent 70%)',
        filter: 'blur(30px)',
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      }} />
      
      {!isMobile ? (
        // Version Desktop/Tablet - Formulaire centré seul
        <Container 
          maxWidth="sm" 
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
                width: '100%',
                maxWidth: 500
              }}>
                <GlassCard>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    {/* En-tête avec logo seulement */}
                    <Box sx={{ 
                      textAlign: 'center', 
                      mb: 4,
                      pt: 2
                    }}>
                      <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(31, 41, 55, 0.2)',
                      }}>
                        <FlightTakeoff style={{ 
                          color: '#FFFFFF',
                          fontSize: 40,
                        }} />
                      </Box>
                      
                      <Typography variant="h4" sx={{
                        fontWeight: 900,
                        color: '#1F2937',
                        mb: 1,
                        background: 'linear-gradient(90deg, #1F2937 0%, #4B5563 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        Yónnee
                      </Typography>
                      
                      <Typography variant="h6" sx={{ 
                        color: '#6B7280',
                        fontWeight: 500,
                        mb: 3
                      }}>
                        Créer votre compte
                      </Typography>
                    </Box>

                    {/* Formulaire */}
                    <FormContent 
                      formData={formData}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      error={error}
                      success={success}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      showPasswordConfirmation={showPasswordConfirmation}
                      setShowPasswordConfirmation={setShowPasswordConfirmation}
                      isMobile={isMobile}
                    />
                  </CardContent>
                </GlassCard>
              </Box>
            </Box>
          </Fade>
        </Container>
      ) : (
        // Version Mobile - Plein écran simplifié
        <GlassCard>
          {/* En-tête mobile avec bouton retour */}
          <Box sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            p: 2,
            background: '#FFFFFF',
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <IconButton
              onClick={handleBackToHome}
              sx={{
                color: '#1F2937',
                background: '#FFFFFF',
                border: '1px solid rgba(31, 41, 55, 0.1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  background: '#F9FAFB',
                }
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="body1" sx={{ color: '#1F2937', fontWeight: 600 }}>
              Retour
            </Typography>
          </Box>

          <CardContent sx={{ 
            p: 3,
            height: 'calc(100vh - 73px)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* En-tête mobile */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: 3,
              flexShrink: 0
            }}>
              <Box sx={{
                width: 60,
                height: 60,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(31, 41, 55, 0.2)',
              }}>
                <FlightTakeoff style={{ 
                  color: '#FFFFFF',
                  fontSize: 28,
                }} />
              </Box>
              
              <Typography variant="h6" sx={{ 
                color: '#1F2937',
                mb: 0.5,
                fontWeight: 900,
                background: 'linear-gradient(90deg, #1F2937 0%, #4B5563 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Yónnee
              </Typography>
              
              <Typography variant="body2" sx={{ 
                color: '#6B7280',
                fontSize: '0.875rem'
              }}>
                Créer votre compte
              </Typography>
            </Box>

            {/* Formulaire mobile simplifié */}
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
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
                showPasswordConfirmation={showPasswordConfirmation}
                setShowPasswordConfirmation={setShowPasswordConfirmation}
                isMobile={isMobile}
              />
            </Box>
          </CardContent>
        </GlassCard>
      )}
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
  showPasswordConfirmation,
  setShowPasswordConfirmation,
  isMobile 
}) => {
  const theme = useTheme();

  return (
    <>
      {/* Message d'erreur */}
      {error && (
        <ResultCard sx={{ 
          mb: 3,
          p: 2,
          border: '1px solid rgba(220, 38, 38, 0.2)',
          background: 'rgba(254, 242, 242, 0.5)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Typography sx={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                !
              </Typography>
            </Box>
            <Typography sx={{ color: '#DC2626', fontSize: '0.9rem', fontWeight: 500 }}>
              {error}
            </Typography>
          </Box>
        </ResultCard>
      )}

      {/* Message de succès */}
      {success && (
        <ResultCard sx={{ 
          mb: 3,
          p: 2,
          border: '1px solid rgba(5, 150, 105, 0.2)',
          background: 'rgba(236, 253, 245, 0.5)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Typography sx={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                ✓
              </Typography>
            </Box>
            <Typography sx={{ color: '#059669', fontSize: '0.9rem', fontWeight: 500 }}>
              {success}
            </Typography>
          </Box>
        </ResultCard>
      )}
      
      <form onSubmit={handleSubmit} style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Nom et Prénom */}
        <Grid container spacing={2} sx={{ mb: 2, flexShrink: 0 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ 
              mb: 1, 
              color: '#374151',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              Nom
            </Typography>
            <AnimatedInput
              fullWidth
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '16px',
                  padding: isMobile ? '12px 14px' : '16px 14px',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ 
              mb: 1, 
              color: '#374151',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              Prénom
            </Typography>
            <AnimatedInput
              fullWidth
              type="text"
              id="prenom"
              name="prenom"
              required
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '16px',
                  padding: isMobile ? '12px 14px' : '16px 14px',
                }
              }}
            />
          </Grid>
        </Grid>

        {/* Email */}
        <Box sx={{ mb: 2, flexShrink: 0 }}>
          <Typography variant="body2" sx={{ 
            mb: 1, 
            color: '#374151',
            fontWeight: 600,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Email sx={{ fontSize: 16, color: '#1F2937' }} />
            Adresse email
          </Typography>
          <AnimatedInput
            fullWidth
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@email.com"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '16px',
                padding: isMobile ? '12px 14px' : '16px 14px',
              }
            }}
          />
        </Box>

        {/* Mot de passe */}
        <Box sx={{ mb: 2, flexShrink: 0 }}>
          <Typography variant="body2" sx={{ 
            mb: 1, 
            color: '#374151',
            fontWeight: 600,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Lock sx={{ fontSize: 16, color: '#1F2937' }} />
            Mot de passe
          </Typography>
          <AnimatedInput
            fullWidth
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Créez un mot de passe"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ 
                      color: '#6B7280',
                      '&:hover': {
                        backgroundColor: 'rgba(31, 41, 55, 0.05)'
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
                fontSize: '16px',
                padding: isMobile ? '12px 14px' : '16px 14px',
              }
            }}
          />
        </Box>

        {/* Confirmation mot de passe */}
        <Box sx={{ mb: 3, flexShrink: 0 }}>
          <Typography variant="body2" sx={{ 
            mb: 1, 
            color: '#374151',
            fontWeight: 600,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Lock sx={{ fontSize: 16, color: '#1F2937' }} />
            Confirmer le mot de passe
          </Typography>
          <AnimatedInput
            fullWidth
            type={showPasswordConfirmation ? 'text' : 'password'}
            id="passwordConfirmation"
            name="passwordConfirmation"
            required
            value={formData.passwordConfirmation}
            onChange={handleChange}
            placeholder="Confirmez votre mot de passe"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    edge="end"
                    sx={{ 
                      color: '#6B7280',
                      '&:hover': {
                        backgroundColor: 'rgba(31, 41, 55, 0.05)'
                      }
                    }}
                    size="small"
                  >
                    {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '16px',
                padding: isMobile ? '12px 14px' : '16px 14px',
              }
            }}
          />
        </Box>

        {/* Bouton d'inscription */}
        <Box sx={{ flexShrink: 0, mb: 2 }}>
          <PrimaryButton
            type="submit"
            fullWidth
            disabled={isSubmitting}
            sx={{ 
              py: isMobile ? 1.25 : 1.5,
              fontSize: isMobile ? '0.95rem' : '1rem',
              minHeight: isMobile ? 48 : 56,
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
                  size={20} 
                  thickness={4}
                  sx={{ color: 'white' }}
                />
                Inscription en cours...
              </Box>
            ) : (
              "S'inscrire"
            )}
          </PrimaryButton>
        </Box>

        {/* Séparateur */}
        <Divider sx={{ 
          my: 2, 
          borderColor: 'rgba(229, 231, 235, 0.8)',
          '&:before, &:after': {
            borderColor: 'rgba(229, 231, 235, 0.8)',
          },
          flexShrink: 0
        }}>
          <Typography variant="body2" sx={{ 
            color: '#9CA3AF', 
            px: 2,
            fontSize: '0.875rem',
            backgroundColor: '#F9FAFB'
          }}>
            Déjà membre ?
          </Typography>
        </Divider>

        {/* Bouton de connexion */}
        <Box sx={{ flexShrink: 0, mb: 2 }}>
          <Button
            component={Link}
            to="/connect"
            variant="outlined"
            fullWidth
            sx={{
              color: '#1F2937',
              border: '1px solid rgba(31, 41, 55, 0.2)',
              borderRadius: 12,
              py: isMobile ? 1.25 : 1.5,
              fontWeight: 600,
              fontSize: isMobile ? '0.95rem' : '1rem',
              background: '#FFFFFF',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#1F2937',
                background: '#F9FAFB',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
            startIcon={<Person />}
          >
            Se connecter
          </Button>
        </Box>

        {/* Sécurité */}
        <Box sx={{ 
          mt: 'auto',
          pt: 2, 
          borderTop: '1px solid rgba(229, 231, 235, 0.8)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'center',
          flexShrink: 0
        }}>
        
        
        </Box>
      </form>
    </>
  );
};

export default Compte;