import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Container, Box, Typography, Grid, Card, CardContent, Avatar, Chip, IconButton, Modal, Fade, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../pages/Logo Yonnee.png';
import { FaUser, FaRegCalendar, FaSearch, FaPaperPlane, FaShieldAlt, FaMoneyBillWave, FaMapMarkerAlt, FaWeightHanging } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoAirplaneSharp, IoClose } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePhone, MdLocationOn, MdAccessTime } from "react-icons/md";
// Ajoutez ces imports avec les autres
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { TbUserCircle } from "react-icons/tb";
import cover from '../pages/portrait_black(1).png';
import { FaSignInAlt } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
// Styles modernes avec styled-components
const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: 16,
    margin: '0 8px',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
  borderRadius: 12,
  padding: '12px 32px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(25, 118, 210, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 20px',
    fontSize: '0.9rem',
  },
}));

const GlassContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(16, 20, 24, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: 24,
  border: '1px solid rgba(255,255,255,0.1)',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: 16,
    margin: '0 8px',
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: 16,
  background: 'rgba(25, 118, 210, 0.1)',
  border: '1px solid rgba(25, 118, 210, 0.2)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [localSelectedSubmission, setLocalSelectedSubmission] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [num, setNum] = useState('');
    const [kilos, setKilos] = useState('');
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        const handlePopState = (event) => {
            window.history.pushState(null, '', window.location.href);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
 
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/submissions');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setSubmissions(data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };
        fetchSubmissions();
    }, []);

    const filteredSubmissions = submissions.filter(submission =>
        submission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.to.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nom,
            prenom,
            email,
            num,
            kilos,
            company: localSelectedSubmission.company,
            from: localSelectedSubmission.from,
            to: localSelectedSubmission.to,
            price: localSelectedSubmission.price,
            departure_date: localSelectedSubmission.departure_date,
        };

        try {
            const response = await fetch('http://localhost:8000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Réservation réussie:', result);
                setNom('');
                setPrenom('');
                setEmail('');
                setNum('');
                setKilos('');
                setLocalSelectedSubmission(null);
                setReservationSuccess(true);
                setModalOpen(false);
            } else {
                console.error('Erreur lors de la réservation:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur de réseau:', error);
        }
    };

    const handleOpenModal = (submission) => {
        setLocalSelectedSubmission(submission);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setLocalSelectedSubmission(null);
    };

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
            color: 'white',
            minHeight: '100vh',
            fontFamily: '"Inter", "Roboto", sans-serif',
            overflowX: 'hidden'
        }}>
            {/* Navigation Bar */}
       <Box sx={{
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.92) 100%)',
    backdropFilter: 'blur(25px) saturate(180%)',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    py: { xs: 1.5, md: 2 },
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(33, 203, 243, 0.5), transparent)',
        opacity: 0.6
    }
}}>
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item xs={6} md="auto">
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 1, md: 2 },
                    position: 'relative',
                    '&:hover .logo-sparkle': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1.2)'
                    }
                }}>
                    {/* Logo avec effet de brillance */}
                    <Box sx={{
                        position: 'relative',
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 },
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(33, 203, 243, 0.15) 0%, rgba(25, 118, 210, 0.1) 100%)',
                        border: '1px solid rgba(33, 203, 243, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 0 20px rgba(33, 203, 243, 0.1), 0 0 30px rgba(33, 203, 243, 0.1)',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            width: '200%',
                            height: '200%',
                            background: 'conic-gradient(transparent, rgba(33, 203, 243, 0.3), transparent 30%)',
                            animation: 'rotate 4s linear infinite'
                        },
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: '90%',
                            height: '90%',
                            borderRadius: '50%',
                            background: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(33, 203, 243, 0.1)'
                        }
                    }}>
                        <IoAirplaneSharp style={{ 
                            position: 'relative', 
                            zIndex: 2, 
                            color: '#21CBF3',
                            fontSize: { xs: 16, md: 20 },
                            filter: 'drop-shadow(0 0 8px rgba(33, 203, 243, 0.5))'
                        }} />
                    </Box>
                    
                    {/* Brillance au survol */}
                    <Box className="logo-sparkle" sx={{
                        position: 'absolute',
                        top: '50%',
                        left: { xs: 16, md: 20 },
                        width: { xs: 48, md: 60 },
                        height: { xs: 48, md: 60 },
                        background: 'radial-gradient(circle, rgba(33, 203, 243, 0.3) 0%, transparent 70%)',
                        opacity: 0,
                        transform: 'translate(-50%, -50%) scale(0.8)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        pointerEvents: 'none',
                        zIndex: 1
                    }} />
                    
                    <Typography variant="h6" sx={{ 
                        fontWeight: 900,
                        background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.7rem' },
                        letterSpacing: '-0.5px',
                        textShadow: '0 0 30px rgba(33, 203, 243, 0.3)',
                        backgroundSize: '200% auto',
                        animation: 'textShine 3s ease-in-out infinite alternate',
                        position: 'relative',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            bottom: -4,
                            left: 0,
                            width: '100%',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, rgba(33, 203, 243, 0.5), transparent)',
                            opacity: 0.6
                        },
                        display: { xs: 'none', sm: 'block' }
                    }}>
                        yónnee
                    </Typography>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 900,
                        background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.2rem',
                        display: { xs: 'block', sm: 'none' }
                    }}>
                        y
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6} md="auto">
                <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1, md: 3 }, 
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'flex-end'
                }}>
                    {/* Bouton Connexion Premium */}
                    <Link to="connect" style={{ textDecoration: 'none' }}>
                        <Button 
                            variant="outlined"
                            sx={{
                                border: '2px solid transparent',
                                color: '#21CBF3',
                                borderRadius: 12,
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' },
                                px: { xs: 2, sm: 3, md: 5 },
                                py: { xs: 0.75, sm: 1, md: 1.5 },
                                background: 'linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)) padding-box, linear-gradient(135deg, rgba(33, 203, 243, 0.4) 0%, rgba(25, 118, 210, 0.2) 100%) border-box',
                                backdropFilter: 'blur(15px)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                minWidth: { xs: 'auto', md: '120px' },
                                '&:before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: '-100%',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(33, 203, 243, 0.15), transparent)',
                                    transition: 'left 0.8s ease'
                                },
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: 10,
                                    padding: '2px',
                                    background: 'linear-gradient(135deg, rgba(33, 203, 243, 0.6), rgba(25, 118, 210, 0.3))',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                    opacity: 0,
                                    transition: 'opacity 0.4s ease'
                                },
                                '&:hover': {
                                    transform: 'translateY(-3px) scale(1.05)',
                                    boxShadow: '0 15px 40px rgba(33, 203, 243, 0.3), inset 0 0 20px rgba(33, 203, 243, 0.1)',
                                    '&:before': {
                                        left: '100%'
                                    },
                                    '&:after': {
                                        opacity: 1
                                    },
                                    '& .login-icon': {
                                        transform: 'translateX(3px) rotate(10deg)',
                                        filter: 'drop-shadow(0 0 12px rgba(33, 203, 243, 0.8))'
                                    }
                                },
                                '&:active': {
                                    transform: 'translateY(-1px) scale(1.02)',
                                    transition: 'transform 0.1s ease'
                                }
                            }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: { xs: 0.5, md: 2 },
                                position: 'relative',
                                zIndex: 2
                            }}>
                                <FaSignInAlt className="login-icon" style={{ 
                                    fontSize: { xs: '0.9rem', md: '1.2rem' },
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    filter: 'drop-shadow(0 0 5px rgba(33, 203, 243, 0.5))'
                                }} />
                                <Typography sx={{
                                    fontWeight: 700,
                                    letterSpacing: '0.5px',
                                    background: 'linear-gradient(90deg, #21CBF3 0%, #FFFFFF 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: { xs: 'none', sm: 'block' }
                                }}>
                                    Connexion
                                </Typography>
                            </Box>
                        </Button>
                    </Link>
                    
                    {/* Bouton Proposer un voyage Premium */}
                    <GradientButton
                        sx={{
                            px: { xs: 2, sm: 4, md: 6 },
                            py: { xs: 0.75, sm: 1.2, md: 1.8 },
                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                            borderRadius: 12,
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 50%, #1976d2 100%)',
                            backgroundSize: '200% auto',
                            boxShadow: '0 10px 40px rgba(25, 118, 210, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            minWidth: { xs: 'auto', md: '200px' },
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                transition: 'left 0.8s ease'
                            },
                            '&:hover': {
                                transform: 'translateY(-4px) scale(1.05)',
                                boxShadow: '0 20px 50px rgba(25, 118, 210, 0.6), inset 0 0 30px rgba(255,255,255,0.1)',
                                backgroundPosition: '100% 0',
                                '&:before': {
                                    left: '100%'
                                },
                                '& .plane-icon': {
                                    transform: 'translateX(5px) rotate(45deg)',
                                    filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.8))'
                                }
                            },
                            '&:active': {
                                transform: 'translateY(-1px) scale(1.02)'
                            }
                        }}
                    >
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: { xs: 1, md: 3 },
                            position: 'relative',
                            zIndex: 2
                        }}>
                            <IoAirplaneSharp className="plane-icon" style={{ 
                                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.4rem' },
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
                            }} />
                            <Typography sx={{
                                fontWeight: 800,
                                letterSpacing: { xs: '0.2px', md: '0.8px' },
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                display: { xs: 'none', sm: 'block' }
                            }}>
                                Proposer un voyage
                            </Typography>
                            <Typography sx={{
                                fontWeight: 800,
                                letterSpacing: '0.2px',
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                display: { xs: 'block', sm: 'none' }
                            }}>
                                Proposer
                            </Typography>
                        </Box>
                    </GradientButton>
                    
                    {/* Indicateur de notification - Masqué sur mobile */}
                    <Box sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF4081 0%, #F50057 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'pulse 2s infinite',
                        boxShadow: '0 0 20px rgba(245, 0, 87, 0.5)',
                        border: '2px solid rgba(255,255,255,0.9)',
                        display: { xs: 'none', md: 'flex' }
                    }}>
                        <Typography variant="caption" sx={{ 
                            color: 'white', 
                            fontWeight: 900,
                            fontSize: '0.7rem'
                        }}>
                            3
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Container>
    
    {/* Animations CSS Globales */}
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
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 20px rgba(245, 0, 87, 0.5);
            }
            50% {
                transform: scale(1.1);
                boxShadow: 0 0 30px rgba(245, 0, 87, 0.7);
            }
        }
    `}</style>
</Box>

        {/* Hero Section */}
<Box sx={{ 
    pt: { xs: 12, md: 15 }, 
    pb: { xs: 6, md: 10 },
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(33, 203, 243, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)',
        zIndex: 0
    }
}}>
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Hero Content avec animation */}
        <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 4, md: 8 },
            opacity: 0,
            animation: 'fadeInUp 0.8s ease forwards 0.3s'
        }}>
            <Typography variant="h1" sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 900,
                mb: { xs: 2, md: 4 },
                background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'textShine 3s ease-in-out infinite alternate',
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
                px: { xs: 1, sm: 0 }
            }}>
                Voyagez utile,
                <Box component="span" sx={{ 
                    display: 'block',
                    background: 'linear-gradient(90deg, #21CBF3 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '4rem' }
                }}>
                    envoyez malin
                </Box>
            </Typography>
            
            <Typography variant="h5" sx={{
                color: 'rgba(255,255,255,0.85)',
                mb: { xs: 4, md: 6 },
                maxWidth: 800,
                mx: 'auto',
                fontWeight: 400,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.4rem' },
                lineHeight: { xs: 1.5, md: 1.6 },
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                px: { xs: 1, sm: 0 }
            }}>
                Connectez directement avec des voyageurs vérifiés pour envoyer vos colis 
                <Box component="span" sx={{ 
                    color: '#21CBF3', 
                    fontWeight: 600,
                    display: 'inline'
                }}>
                    {' '}jusqu'à 70% moins cher
                </Box>
                {' '}que les services traditionnels
            </Typography>
        </Box>

        {/* Section Search avec effets avancés */}
        <Box sx={{ 
            opacity: 0,
            animation: 'fadeInUp 0.8s ease forwards 1s',
            mb: { xs: 4, md: 8 }
        }}>
            <GlassContainer sx={{ 
                mb: { xs: 4, md: 6 }, 
                position: 'relative',
                overflow: 'hidden',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(33, 203, 243, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                    zIndex: -1
                }
            }}>
                <Box sx={{ 
                    position: 'relative',
                    mb: { xs: 4, md: 6 }
                }}>
                    <Box sx={{
                        position: 'absolute',
                        left: { xs: 16, md: 24 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1, md: 2 }
                    }}>
                        <FaSearch style={{
                            color: '#21CBF3',
                            fontSize: { xs: 18, md: 22 },
                            filter: 'drop-shadow(0 0 8px rgba(33, 203, 243, 0.5))'
                        }} />
                        <Box sx={{
                            width: 2,
                            height: { xs: 16, md: 20 },
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: 1,
                            display: { xs: 'none', sm: 'block' }
                        }} />
                    </Box>
                    
                    <TextField
                        fullWidth
                        placeholder={window.innerWidth < 600 ? "Rechercher un trajet..." : "Où envoyez-vous ? Paris → Dakar, Lyon → Abidjan..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                background: 'rgba(15, 23, 42, 0.7)',
                                border: '2px solid rgba(33, 203, 243, 0.3)',
                                color: 'white',
                                pl: { xs: 12, md: 14 },
                                py: { xs: 1.5, md: 2 },
                                fontSize: { xs: '0.9rem', md: '1.1rem' },
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    borderColor: '#21CBF3',
                                    boxShadow: '0 0 30px rgba(33, 203, 243, 0.2)'
                                },
                                '&.Mui-focused': {
                                    borderColor: '#21CBF3',
                                    boxShadow: '0 0 40px rgba(33, 203, 243, 0.3)',
                                    '& fieldset': {
                                        borderColor: '#21CBF3'
                                    }
                                }
                            }
                        }}
                    />
                    
                    <Box sx={{
                        position: 'absolute',
                        right: { xs: 12, md: 16 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Chip 
                            label="Rapide" 
                            size="small"
                            sx={{ 
                                bgcolor: 'rgba(76, 175, 80, 0.2)',
                                color: '#4CAF50',
                                fontWeight: 600,
                                fontSize: { xs: '0.6rem', md: '0.7rem' },
                                height: { xs: 20, md: 24 }
                            }} 
                        />
                        <Chip 
                            label="Économique" 
                            size="small"
                            sx={{ 
                                bgcolor: 'rgba(33, 203, 243, 0.2)',
                                color: '#21CBF3',
                                fontWeight: 600,
                                fontSize: { xs: '0.6rem', md: '0.7rem' },
                                height: { xs: 20, md: 24 },
                                display: { xs: 'none', sm: 'flex' }
                            }} 
                        />
                    </Box>
                </Box>

                {/* Cards de voyage premium */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        mb: { xs: 3, md: 4 },
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 0 }
                    }}>
                        <Typography variant="h4" sx={{ 
                            fontWeight: 800,
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.125rem' }
                        }}>
                            <Box sx={{
                                width: { xs: 32, md: 40 },
                                height: { xs: 32, md: 40 },
                                borderRadius: '50%',
                                background: 'rgba(33, 203, 243, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <IoRocketSharp style={{ color: '#21CBF3', fontSize: { xs: 16, md: 20 } }} />
                            </Box>
                            Trajets disponibles
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                            <Chip 
                                label="Tous" 
                                sx={{ 
                                    bgcolor: 'rgba(33, 203, 243, 0.2)',
                                    color: '#21CBF3',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: { xs: '0.7rem', md: '0.8rem' },
                                    height: { xs: 24, md: 32 }
                                }} 
                            />
                            <Chip 
                                label="Prochain départ" 
                                sx={{ 
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    color: 'rgba(255,255,255,0.7)',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: 'rgba(33, 203, 243, 0.1)'
                                    },
                                    fontSize: { xs: '0.7rem', md: '0.8rem' },
                                    height: { xs: 24, md: 32 },
                                    display: { xs: 'none', sm: 'flex' }
                                }} 
                            />
                            <Chip 
                                label="Popularité" 
                                sx={{ 
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    color: 'rgba(255,255,255,0.7)',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: 'rgba(33, 203, 243, 0.1)'
                                    },
                                    fontSize: { xs: '0.7rem', md: '0.8rem' },
                                    height: { xs: 24, md: 32 },
                                    display: { xs: 'none', md: 'flex' }
                                }} 
                            />
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {filteredSubmissions.slice(0, window.innerWidth < 600 ? 3 : filteredSubmissions.length).map((submission, index) => (
                            <Box 
                                key={index}
                                sx={{
                                    opacity: 0,
                                    animation: `fadeInUp 0.5s ease forwards ${0.5 + (index * 0.1)}s`
                                }}
                            >
                                <ModernCard 
                                    onClick={() => handleOpenModal(submission)}
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '1px',
                                            background: 'linear-gradient(90deg, transparent, #21CBF3, transparent)'
                                        },
                                        '&:hover': {
                                            transform: { xs: 'translateY(-4px)', md: 'translateY(-8px) scale(1.01)' },
                                            boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(33, 203, 243, 0.3)',
                                            '& .destination-icon': {
                                                transform: 'rotate(45deg) translateX(10px)',
                                                filter: 'drop-shadow(0 0 10px rgba(33, 203, 243, 0.7))'
                                            }
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                                        <Grid container alignItems="center" spacing={{ xs: 2, md: 3 }}>
                                            {/* Colonne Voyageur */}
                                            <Grid item xs={12} md={3}>
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: { xs: 1.5, md: 3 },
                                                    p: { xs: 1.5, md: 2 },
                                                    borderRadius: { xs: 2, md: 3 },
                                                    background: 'rgba(33, 203, 243, 0.05)'
                                                }}>
                                                    <Avatar sx={{ 
                                                        bgcolor: 'rgba(33, 203, 243, 0.1)',
                                                        width: { xs: 40, md: 56 },
                                                        height: { xs: 40, md: 56 },
                                                        border: '2px solid rgba(33, 203, 243, 0.3)'
                                                    }}>
                                                        <TbUserCircle style={{ 
                                                            color: '#21CBF3', 
                                                            fontSize: { xs: 20, md: 30 },
                                                            filter: 'drop-shadow(0 0 5px rgba(33, 203, 243, 0.5))'
                                                        }} />
                                                    </Avatar>
                                                    <Box sx={{ overflow: 'hidden' }}>
                                                        <Typography variant="h6" sx={{ 
                                                            fontWeight: 700,
                                                            color: 'white',
                                                            mb: { xs: 0.5, md: 1 },
                                                            fontSize: { xs: '0.9rem', md: '1rem' },
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}>
                                                            {submission.company}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, flexWrap: 'wrap' }}>
                                                            <Chip 
                                                                label="Voyageur vérifié" 
                                                                size="small" 
                                                                sx={{ 
                                                                    bgcolor: 'rgba(76, 175, 80, 0.15)',
                                                                    color: '#4CAF50',
                                                                    fontWeight: 600,
                                                                    border: '1px solid rgba(76, 175, 80, 0.3)',
                                                                    fontSize: { xs: '0.6rem', md: '0.7rem' },
                                                                    height: { xs: 20, md: 24 }
                                                                }} 
                                                            />
                                                            <Chip 
                                                                label="⭐ 4.8" 
                                                                size="small" 
                                                                sx={{ 
                                                                    bgcolor: 'rgba(255, 193, 7, 0.15)',
                                                                    color: '#FFC107',
                                                                    fontWeight: 600,
                                                                    border: '1px solid rgba(255, 193, 7, 0.3)',
                                                                    fontSize: { xs: '0.6rem', md: '0.7rem' },
                                                                    height: { xs: 20, md: 24 },
                                                                    display: { xs: 'none', sm: 'flex' }
                                                                }} 
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            
                                            {/* Colonne Trajet */}
                                            <Grid item xs={12} md={5}>
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'space-between',
                                                    px: { xs: 1, md: 4 },
                                                    py: { xs: 1, md: 2 },
                                                    position: 'relative'
                                                }}>
                                                    {/* Ligne de trajet */}
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: 0,
                                                        right: 0,
                                                        height: 2,
                                                        background: 'linear-gradient(90deg, rgba(33, 203, 243, 0.3) 0%, rgba(33, 203, 243, 0.1) 100%)',
                                                        transform: 'translateY(-50%)',
                                                        zIndex: 0,
                                                        display: { xs: 'none', md: 'block' }
                                                    }} />
                                                    
                                                    <Box sx={{ 
                                                        textAlign: 'center', 
                                                        position: 'relative', 
                                                        zIndex: 1,
                                                        p: { xs: 1.5, md: 3 },
                                                        borderRadius: { xs: 2, md: 3 },
                                                        background: 'rgba(15, 23, 42, 0.7)',
                                                        backdropFilter: 'blur(10px)',
                                                        border: '1px solid rgba(33, 203, 243, 0.2)',
                                                        flex: 1
                                                    }}>
                                                        <Typography variant="caption" sx={{ 
                                                            color: '#21CBF3', 
                                                            fontWeight: 600,
                                                            letterSpacing: { xs: '1px', md: '2px' },
                                                            textTransform: 'uppercase',
                                                            fontSize: { xs: '0.55rem', md: '0.7rem' },
                                                            mb: { xs: 0.5, md: 1 },
                                                            display: 'block'
                                                        }}>
                                                            Départ
                                                        </Typography>
                                                        <Typography variant="h5" sx={{ 
                                                            fontWeight: 800,
                                                            color: 'white',
                                                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.5rem' }
                                                        }}>
                                                            {submission.from}
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <IoAirplaneSharp className="destination-icon" style={{ 
                                                        fontSize: { xs: 20, md: 32 }, 
                                                        color: '#21CBF3',
                                                        position: 'relative',
                                                        zIndex: 2,
                                                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        filter: 'drop-shadow(0 0 8px rgba(33, 203, 243, 0.4))',
                                                        margin: { xs: '0 8px', md: '0 16px' }
                                                    }} />
                                                    
                                                    <Box sx={{ 
                                                        textAlign: 'center', 
                                                        position: 'relative', 
                                                        zIndex: 1,
                                                        p: { xs: 1.5, md: 3 },
                                                        borderRadius: { xs: 2, md: 3 },
                                                        background: 'rgba(15, 23, 42, 0.7)',
                                                        backdropFilter: 'blur(10px)',
                                                        border: '1px solid rgba(33, 203, 243, 0.2)',
                                                        flex: 1
                                                    }}>
                                                        <Typography variant="caption" sx={{ 
                                                            color: '#21CBF3', 
                                                            fontWeight: 600,
                                                            letterSpacing: { xs: '1px', md: '2px' },
                                                            textTransform: 'uppercase',
                                                            fontSize: { xs: '0.55rem', md: '0.7rem' },
                                                            mb: { xs: 0.5, md: 1 },
                                                            display: 'block'
                                                        }}>
                                                            Destination
                                                        </Typography>
                                                        <Typography variant="h5" sx={{ 
                                                            fontWeight: 800,
                                                            color: 'white',
                                                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.5rem' }
                                                        }}>
                                                            {submission.to}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            
                                            {/* Colonne Prix et Action */}
                                            <Grid item xs={12} md={4}>
                                                <Box sx={{ 
                                                    textAlign: { xs: 'left', md: 'right' },
                                                    p: { xs: 1.5, md: 3 },
                                                    borderRadius: { xs: 2, md: 3 },
                                                    background: 'linear-gradient(135deg, rgba(33, 203, 243, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                                                    border: '1px solid rgba(33, 203, 243, 0.2)'
                                                }}>
                                                    <Box sx={{ 
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: { xs: 1, md: 2 },
                                                        mb: { xs: 2, md: 3 },
                                                        p: { xs: '4px 12px', md: '8px 16px' },
                                                        borderRadius: 20,
                                                        background: 'rgba(33, 203, 243, 0.15)',
                                                        border: '1px solid rgba(33, 203, 243, 0.3)'
                                                    }}>
                                                        <FaWeightHanging style={{ 
                                                            color: '#21CBF3',
                                                            filter: 'drop-shadow(0 0 5px rgba(33, 203, 243, 0.5))',
                                                            fontSize: { xs: 12, md: 16 }
                                                        }} />
                                                        <Typography variant="h5" sx={{ 
                                                            fontWeight: 800,
                                                            color: 'white',
                                                            textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                                            fontSize: { xs: '0.9rem', md: '1rem' }
                                                        }}>
                                                            {submission.kilos} kg
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Box sx={{ mb: { xs: 2, md: 3 } }}>
                                                        <Typography variant="h3" sx={{ 
                                                            fontWeight: 900,
                                                            background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            lineHeight: 1,
                                                            mb: 1,
                                                            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.5rem' }
                                                        }}>
                                                            {submission.price} F CFA
                                                            <Typography component="span" sx={{ 
                                                                fontSize: { xs: '0.7rem', md: '1rem' }, 
                                                                ml: 0.5,
                                                                color: 'rgba(255,255,255,0.7)'
                                                            }}>
                                                                /kg
                                                            </Typography>
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ 
                                                            color: 'rgba(255,255,255,0.5)',
                                                            display: 'block',
                                                            fontSize: { xs: '0.7rem', md: '0.8rem' }
                                                        }}>
                                                            Prix total: {submission.price * submission.kilos} F CFA
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                                            borderRadius: 3,
                                                            py: { xs: 1, md: 1.5 },
                                                            px: { xs: 2, md: 4 },
                                                            fontWeight: 700,
                                                            fontSize: { xs: '0.8rem', md: '1rem' },
                                                            textTransform: 'none',
                                                            boxShadow: '0 8px 25px rgba(33, 203, 243, 0.4)',
                                                            transition: 'all 0.3s ease',
                                                            width: { xs: '100%', md: 'auto' },
                                                            '&:hover': {
                                                                transform: 'translateY(-2px)',
                                                                boxShadow: '0 15px 35px rgba(33, 203, 243, 0.6)'
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
                                                            <FaRegCalendar style={{ fontSize: { xs: '0.9rem', md: '1.2rem' } }} />
                                                            Réserver maintenant
                                                        </Box>
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        
                                        {/* Footer de la carte */}
                                        <Grid container spacing={2} sx={{ 
                                            mt: { xs: 2, md: 4 }, 
                                            pt: { xs: 2, md: 3 }, 
                                            borderTop: '1px solid rgba(255,255,255,0.1)',
                                            alignItems: 'center'
                                        }}>
                                            <Grid item xs={12} md={8}>
                                                <Box sx={{ display: 'flex', gap: { xs: 1, md: 4 }, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        gap: { xs: 1, md: 1.5 },
                                                        p: { xs: 1, md: 1.5 },
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.03)'
                                                    }}>
                                                        <MdAccessTime style={{ 
                                                            color: '#21CBF3',
                                                            fontSize: { xs: 14, md: 20 } 
                                                        }} />
                                                        <Box>
                                                            <Typography variant="caption" sx={{ 
                                                                color: 'rgba(255,255,255,0.5)',
                                                                display: 'block',
                                                                fontSize: { xs: '0.6rem', md: '0.7rem' }
                                                            }}>
                                                                Départ
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ 
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: { xs: '0.7rem', md: '0.8rem' }
                                                            }}>
                                                                {submission.departure_date}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        gap: { xs: 1, md: 1.5 },
                                                        p: { xs: 1, md: 1.5 },
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.03)',
                                                        display: { xs: 'none', sm: 'flex' }
                                                    }}>
                                                        <FaShieldAlt style={{ 
                                                            color: '#21CBF3',
                                                            fontSize: { xs: 12, md: 18 } 
                                                        }} />
                                                        <Box>
                                                            <Typography variant="caption" sx={{ 
                                                                color: 'rgba(255,255,255,0.5)',
                                                                display: 'block',
                                                                fontSize: { xs: '0.6rem', md: '0.7rem' }
                                                            }}>
                                                                Assurance
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ 
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: { xs: '0.7rem', md: '0.8rem' }
                                                            }}>
                                                                Jusqu'à 500k F CFA
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        gap: { xs: 1, md: 1.5 },
                                                        p: { xs: 1, md: 1.5 },
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.03)',
                                                        display: { xs: 'none', md: 'flex' }
                                                    }}>
                                                        <MdLocationOn style={{ 
                                                            color: '#21CBF3',
                                                            fontSize: { xs: 14, md: 20 } 
                                                        }} />
                                                        <Box>
                                                            <Typography variant="caption" sx={{ 
                                                                color: 'rgba(255,255,255,0.5)',
                                                                display: 'block',
                                                                fontSize: { xs: '0.6rem', md: '0.7rem' }
                                                            }}>
                                                                Livraison
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ 
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: { xs: '0.7rem', md: '0.8rem' }
                                                            }}>
                                                                Main à main
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            
                                            <Grid item xs={12} md={4}>
                                                <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                                    <Chip 
                                                        label={window.innerWidth < 600 ? "🕒 Derniers !" : "🕒 Dernières places !"} 
                                                        sx={{ 
                                                            bgcolor: 'rgba(244, 67, 54, 0.15)',
                                                            color: '#F44336',
                                                            fontWeight: 700,
                                                            fontSize: { xs: '0.7rem', md: '0.9rem' },
                                                            py: { xs: 1, md: 2 },
                                                            border: '1px solid rgba(244, 67, 54, 0.3)',
                                                            animation: 'pulse 2s infinite'
                                                        }} 
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </ModernCard>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </GlassContainer>
        </Box>
    </Container>
    
    {/* Animations CSS */}
    <style jsx global>{`
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
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
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
        }
    `}</style>
</Box>
{/* Bouton WhatsApp flottant */}
<Box
  component="a"
  href="https://wa.me/+221778599418?text=Bonjour%20yónnee,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services"
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    position: 'fixed',
    bottom: 30,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'float 3s ease-in-out infinite',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease'
    },
    '&:hover': {
      transform: 'scale(1.15) rotate(10deg)',
      boxShadow: '0 15px 40px rgba(37, 211, 102, 0.6)',
      '&:before': {
        opacity: 1
      },
      '& .whatsapp-icon': {
        transform: 'scale(1.2)'
      },
      '& .notification-badge': {
        transform: 'scale(1.2) translate(5px, -5px)',
        opacity: 1
      }
    },
    '&:active': {
      transform: 'scale(1.05)'
    }
  }}
>
  

  {/* Icone WhatsApp */}
  <Box className="whatsapp-icon" sx={{
    position: 'relative',
    zIndex: 1,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
  }}>
    <svg 
      width="34" 
      height="34" 
      viewBox="0 0 24 24" 
      fill="white"
    >
      <path d="M20.52 3.49C18.18 1.13 15.19 0 12 0 5.48 0 0 5.48 0 12c0 2.13.55 4.16 1.58 5.97L0 24l6.24-1.63c1.75 1 3.77 1.55 5.86 1.55 6.52 0 12-5.48 12-12 0-3.19-1.13-6.18-3.49-8.52zM12 21.75c-1.82 0-3.58-.5-5.12-1.43l-.36-.21-3.74.98.99-3.65-.21-.36C2.75 15.58 2.25 13.82 2.25 12c0-5.38 4.37-9.75 9.75-9.75 2.6 0 5.04 1.01 6.88 2.86 1.84 1.84 2.86 4.28 2.86 6.89 0 5.38-4.37 9.75-9.75 9.75z"/>
      <path d="M17.5 14.21c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.36.22-.67.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.61-.92-2.2-.24-.59-.49-.51-.67-.51-.18 0-.38-.01-.58-.01-.2 0-.51.07-.78.35-.27.28-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.51.71.3 1.26.48 1.69.61.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.3-.2-.6-.35z" fill="white"/>
    </svg>
  </Box>

  {/* Tooltip au survol */}
  <Box sx={{
    position: 'absolute',
    right: 85,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(33, 203, 243, 0.3)',
    borderRadius: 3,
    padding: '10px 15px',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: -6,
      transform: 'translateY(-50%)',
      width: 0,
      height: 0,
      borderLeft: '6px solid rgba(33, 203, 243, 0.3)',
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent'
    }
  }}>
    <Typography sx={{ 
      color: 'white',
      fontWeight: 600,
      fontSize: '0.9rem'
    }}>
      Contactez-nous sur WhatsApp
    </Typography>
  </Box>

  {/* Animation de pulse */}
  <Box sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    border: '2px solid rgba(37, 211, 102, 0.4)',
    animation: 'pulse 2s infinite'
  }} />
</Box>

{/* Ajoutez cette animation CSS dans votre style global */}
<style jsx global>{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  /* Pour afficher le tooltip au survol */
  a:hover > div:last-of-type {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(-10px);
  }
`}</style>

        {/* À propos Section */}
<Box sx={{ py: { xs: 6, md: 10 }, background: 'rgba(0,0,0,0.3)' }}>
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
                <Typography variant="h2" sx={{ 
                    fontWeight: 800,
                    mb: { xs: 3, md: 4 },
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}>
                    Pourquoi<br/>choisir yónnee ?
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 2, md: 3 },
                        p: { xs: 2, md: 3 },
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateX(8px)',
                            background: 'rgba(33, 203, 243, 0.1)',
                        }
                    }}>
                        <Box sx={{
                            width: { xs: 40, md: 50 },
                            height: { xs: 40, md: 50 },
                            borderRadius: { xs: 8, md: 12 },
                            background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 8px 20px rgba(33, 203, 243, 0.3)'
                        }}>
                            <FaMoneyBillWave style={{ fontSize: { xs: 18, md: 24 }, color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: { xs: 0.5, md: 1 }, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                Économisez jusqu'à 70%
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                                Moins cher que les transporteurs traditionnels
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 2, md: 3 },
                        p: { xs: 2, md: 3 },
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateX(8px)',
                            background: 'rgba(33, 203, 243, 0.1)',
                        }
                    }}>
                        <Box sx={{
                            width: { xs: 40, md: 50 },
                            height: { xs: 40, md: 50 },
                            borderRadius: { xs: 8, md: 12 },
                            background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 8px 20px rgba(33, 203, 243, 0.3)'
                        }}>
                            <FaShieldAlt style={{ fontSize: { xs: 18, md: 24 }, color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: { xs: 0.5, md: 1 }, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                Sécurité garantie
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                                Profils vérifiés et suivi en temps réel
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 2, md: 3 },
                        p: { xs: 2, md: 3 },
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateX(8px)',
                            background: 'rgba(33, 203, 243, 0.1)',
                        }
                    }}>
                        <Box sx={{
                            width: { xs: 40, md: 50 },
                            height: { xs: 40, md: 50 },
                            borderRadius: { xs: 8, md: 12 },
                            background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 8px 20px rgba(33, 203, 243, 0.3)'
                        }}>
                            <IoAirplaneSharp style={{ fontSize: { xs: 18, md: 24 }, color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: { xs: 0.5, md: 1 }, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                Flexibilité totale
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                                Des départs quotidiens vers toutes destinations
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Bouton Call to Action */}
                <Box sx={{ mt: { xs: 4, md: 6 }, display: 'flex', gap: 2, flexWrap: 'wrap' ,display: { xs: 'none', md: 'flex' } // ← AJOUTÉ CETTE LIGNE
 }}>
                    <GradientButton 
                        sx={{ 
                            mr: { xs: 0, md: 3 },
                            mb: { xs: 2, sm: 0 },
                            width: { xs: '100%', sm: 'auto' }
                        }}
                    >
                        Commencer maintenant
                    </GradientButton>
                    <Button 
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(90deg, #64748B 0%, #94A3B8 100%)',
                            borderRadius: 3,
                            padding: { xs: '10px 20px', md: '12px 32px' },
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 20px rgba(100, 116, 139, 0.3)',
                                background: 'linear-gradient(90deg, #475569 0%, #64748B 100%)',
                            },
                            color: 'white',
                            width: { xs: '100%', sm: 'auto' }
                        }}
                    >
                        En savoir plus
                    </Button>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box sx={{ 
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {/* Mockup de téléphone */}
                    <Box sx={{
                        position: 'relative',
                        width: { xs: '240px', sm: '280px', md: '320px', lg: '360px' },
                        height: { xs: '480px', sm: '560px', md: '640px', lg: '720px' },
                        borderRadius: { xs: '30px', md: '40px' },
                        background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                        boxShadow: `
                            0 0 0 1px rgba(255,255,255,0.1),
                            0 20px 60px rgba(0,0,0,0.5),
                            inset 0 0 0 1px rgba(255,255,255,0.05)
                        `,
                        overflow: 'hidden',
                        border: 'none'
                    }}>
                        {/* Écran du téléphone avec l'image */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: 'hidden',
                            background: '#0F172A'
                        }}>
                            <img
                                src={cover}
                                alt="yónnee"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                            {/* Overlay avec stats */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)',
                                p: { xs: 2, md: 3 },
                                pt: { xs: 4, md: 6 }
                            }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    gap: 1,
                                    mb: 2 
                                }}>
                                  
                                  
                                </Box>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-around',
                                    textAlign: 'center'
                                }}>
                                    
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Éléments décoratifs flottants */}
                    <Box sx={{
                        position: 'absolute',
                        top: { xs: '-20px', md: '-40px' },
                        right: { xs: '-15px', md: '-30px' },
                        width: { xs: '60px', md: '120px' },
                        height: { xs: '60px', md: '120px' },
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(33,203,243,0.2) 0%, rgba(33,203,243,0) 70%)',
                        zIndex: -1
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        bottom: { xs: '-10px', md: '-20px' },
                        left: { xs: '-10px', md: '-20px' },
                        width: { xs: '40px', md: '80px' },
                        height: { xs: '40px', md: '80px' },
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(25,118,210,0.2) 0%, rgba(25,118,210,0) 70%)',
                        zIndex: -1
                    }} />
                </Box>
            </Grid>
        </Grid>

        {/* Section supplémentaire - Processus */}
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
            <Typography variant="h3" sx={{ 
                textAlign: 'center',
                fontWeight: 800,
                mb: { xs: 4, md: 6 },
                background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' }
            }}>
                Comment ça marche ?
            </Typography>
            
            <Grid container spacing={{ xs: 2, md: 4 }}>
                {[
                    { 
                        icon: <FaSearch style={{ fontSize: 28, color: 'white' }} />, 
                        title: 'Recherchez', 
                        desc: 'Trouvez un voyageur vers votre destination' 
                    },
                    { 
                        icon: <GiCardboardBoxClosed style={{ fontSize: 28, color: 'white' }} />, 
                        title: 'Réservez', 
                        desc: 'Choisissez le nombre de kilos nécessaires' 
                    },
                    { 
                        icon: <FaUser style={{ fontSize: 28, color: 'white' }} />, 
                        title: 'Rencontrez', 
                        desc: 'Organisez la remise du colis en personne' 
                    },
                    { 
                        icon: <IoAirplaneSharp style={{ fontSize: 28, color: 'white' }} />, 
                        title: 'Suivez', 
                        desc: 'Suivez votre colis en temps réel' 
                    }
                ].map((step, index) => (
                    <Grid item xs={6} sm={6} md={3} key={index}>
                        <Box sx={{
                            textAlign: 'center',
                            p: { xs: 2, md: 4 },
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.03)',
                            height: '100%',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                background: 'rgba(33, 203, 243, 0.1)',
                            }
                        }}>
                            <Box sx={{
                                width: { xs: 50, md: 70 },
                                height: { xs: 50, md: 70 },
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: { xs: 2, md: 3 },
                                boxShadow: '0 8px 25px rgba(33, 203, 243, 0.4)'
                            }}>
                                {React.cloneElement(step.icon, { 
                                    style: { fontSize: { xs: 20, md: 28 }, color: 'white' } 
                                })}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: { xs: 1, md: 2 }, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                {step.title}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                                {step.desc}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    </Container>
</Box>
            {/* Modal de réservation moderne */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '95%', md: 600 },
                        maxHeight: { xs: '90vh', md: 'auto' },
                        overflow: 'auto',
                        bgcolor: 'rgba(15, 23, 42, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: 4,
                        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        p: { xs: 2, sm: 3, md: 4 },
                        outline: 'none'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 4 } }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                                📦 Réserver des kilos
                            </Typography>
                            <IconButton onClick={handleCloseModal} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                <IoClose />
                            </IconButton>
                        </Box>

                        {localSelectedSubmission && (
                            <>
                                {/* Détails du voyage */}
                                <Box sx={{ 
                                    mb: { xs: 3, md: 4 },
                                    p: { xs: 2, md: 3 },
                                    borderRadius: 3,
                                    background: 'rgba(33, 203, 243, 0.1)',
                                    border: '1px solid rgba(33, 203, 243, 0.2)'
                                }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} md={8}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                                {localSelectedSubmission.from} → {localSelectedSubmission.to}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: { xs: 1, md: 3 }, alignItems: 'center', flexWrap: 'wrap' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <MdAccessTime style={{ color: '#21CBF3', fontSize: { xs: 14, md: 16 } }} />
                                                    <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                                                        {localSelectedSubmission.departure_date}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <FaWeightHanging style={{ color: '#21CBF3', fontSize: { xs: 12, md: 14 } }} />
                                                    <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                                                        {localSelectedSubmission.kilos} kg disponibles
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                                            <Typography variant="h4" sx={{ 
                                                fontWeight: 700,
                                                background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                fontSize: { xs: '1.5rem', md: '2rem' }
                                            }}>
                                                {localSelectedSubmission.price} F CFA
                                                <Typography component="span" sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' }, ml: 0.5 }}>
                                                    /kg
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Formulaire */}
                                <form onSubmit={handleSubmit}>
                                    <Typography variant="subtitle1" sx={{ mb: { xs: 2, md: 3 }, display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                        <FaUser style={{ color: '#21CBF3', fontSize: { xs: 14, md: 16 } }} />
                                        Vos coordonnées
                                    </Typography>

                                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Nom"
                                                variant="outlined"
                                                value={nom}
                                                onChange={(e) => setNom(e.target.value)}
                                                required
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            borderColor: '#21CBF3',
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Prénom"
                                                variant="outlined"
                                                value={prenom}
                                                onChange={(e) => setPrenom(e.target.value)}
                                                required
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            borderColor: '#21CBF3',
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                type="email"
                                                variant="outlined"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            borderColor: '#21CBF3',
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Téléphone"
                                                type="tel"
                                                variant="outlined"
                                                value={num}
                                                onChange={(e) => setNum(e.target.value)}
                                                required
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            borderColor: '#21CBF3',
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Nombre de kilos requis"
                                                type="number"
                                                variant="outlined"
                                                value={kilos}
                                                onChange={(e) => setKilos(e.target.value)}
                                                required
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            borderColor: '#21CBF3',
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <GradientButton
                                        type="submit"
                                        fullWidth
                                        startIcon={<FaRegCalendar />}
                                        sx={{ py: { xs: 1, md: 1.5 } }}
                                    >
                                        Réserver maintenant
                                    </GradientButton>
                                </form>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>

            {/* Footer */}
          {/* Footer */}
<Box sx={{ 
    py: { xs: 6, md: 10 },
    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 30, 0.95) 100%)',
    borderTop: '1px solid rgba(255,255,255,0.12)',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(33, 203, 243, 0.5), transparent)'
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(33, 203, 243, 0.3), transparent)'
    }
}}>
    {/* Effets de fond subtils */}
    <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: { xs: '100px', md: '200px' },
        height: { xs: '100px', md: '200px' },
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(33, 203, 243, 0.05) 0%, transparent 70%)',
        filter: 'blur(30px)',
        opacity: 0.4,
        zIndex: 0
    }} />
    
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Colonne Logo & Description - Version profonde */}
            <Grid item xs={12} md={4}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: { xs: 3, md: 4 },
                    position: 'relative'
                }}>
                    <Box sx={{
                        position: 'relative',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: '-5px',
                            left: '-5px',
                            right: '-5px',
                            bottom: '-5px',
                            background: 'linear-gradient(45deg, #21CBF3, #1976d2, #21CBF3)',
                            borderRadius: '50%',
                            zIndex: 0,
                            opacity: 0.3,
                            filter: 'blur(8px)'
                        }
                    }}>
                        <Box sx={{
                            width: { xs: 40, md: 50 },
                            height: { xs: 40, md: 50 },
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 15, 30, 0.9) 100%)',
                            border: '1px solid rgba(33, 203, 243, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: 1,
                            boxShadow: 'inset 0 0 20px rgba(33, 203, 243, 0.2), 0 0 30px rgba(33, 203, 243, 0.15)'
                        }}>
                            <IoAirplaneSharp style={{ 
                                color: '#21CBF3',
                                fontSize: { xs: 20, md: 24 },
                                filter: 'drop-shadow(0 0 8px rgba(33, 203, 243, 0.5))'
                            }} />
                        </Box>
                    </Box>
                    
                    <Typography variant="h5" sx={{ 
                        fontWeight: 800,
                        background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% auto',
                        animation: 'textShine 3s ease-in-out infinite alternate',
                        letterSpacing: '-0.5px',
                        position: 'relative',
                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -4,
                            left: 0,
                            width: '40%',
                            height: '2px',
                            background: 'linear-gradient(90deg, #21CBF3, transparent)',
                            borderRadius: 1
                        }
                    }}>
                        yónnee
                    </Typography>
                </Box>
                
                <Typography sx={{ 
                    color: 'rgba(255,255,255,0.85)', 
                    mb: { xs: 3, md: 4 },
                    fontSize: { xs: '0.9rem', md: '1.05rem' },
                    lineHeight: 1.7,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                    Connectez directement avec des voyageurs vérifiés pour envoyer vos colis 
                    <Box component="span" sx={{ 
                        color: '#21CBF3', 
                        fontWeight: 600,
                        display: 'inline',
                        textShadow: '0 0 10px rgba(33, 203, 243, 0.5)'
                    }}>
                        {' '}jusqu'à 70% moins cher
                    </Box>
                    {' '}que les services traditionnels
                </Typography>
                
               
            </Grid>
            
            {/* Colonne Contact - Version profonde */}
      {/* Colonne Contact - Version profonde */}
<Grid item xs={12} sm={6} md={4}>
    <Typography variant="h6" sx={{ 
        fontWeight: 700, 
        mb: { xs: 3, md: 4 },
        background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        position: 'relative',
        display: 'inline-block',
        fontSize: { xs: '1rem', md: '1.1rem' },
        '&:before': {
            content: '""',
            position: 'absolute',
            bottom: -6,
            left: 0,
            width: '30px',
            height: '3px',
            background: '#21CBF3',
            borderRadius: 2,
            boxShadow: '0 0 10px rgba(33, 203, 243, 0.5)'
        }
    }}>
        Contact
    </Typography>
    
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
        <Box className="contact-circle" sx={{
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            borderRadius: '50%',
            background: `linear-gradient(135deg, #21CBF320 0%, #21CBF310 100%)`,
            border: `1px solid #21CBF330`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                transform: 'scale(1.1) rotate(5deg)',
                boxShadow: '0 0 25px #21CBF340, inset 0 0 15px #21CBF320'
            }
        }}>
            <MdOutlineEmail style={{ fontSize: { xs: 18, md: 22 }, color: '#21CBF3' }} />
        </Box>
        <Typography sx={{ 
            color: 'rgba(255,255,255,0.95)',
            fontWeight: 600,
            fontSize: { xs: '0.9rem', md: '1.05rem' },
            textShadow: '0 2px 5px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            height: { xs: '40px', md: '48px' }
        }}>
            contact@yonnee.com
        </Typography>
    </Box>
</Grid>
            
            {/* Colonne Social & Apps - Version profonde */}
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    mb: { xs: 3, md: 4 },
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    position: 'relative',
                    display: 'inline-block',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        bottom: -6,
                        left: 0,
                        width: '30px',
                        height: '3px',
                        background: '#21CBF3',
                        borderRadius: 2,
                        boxShadow: '0 0 10px rgba(33, 203, 243, 0.5)'
                    }
                }}>
                    Suivez-nous
                </Typography>
                
                <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 }, mb: { xs: 4, md: 5 } }}>
                    {[
                        { 
                            icon: <FaFacebookF style={{ fontSize: { xs: 16, md: 20 } }} />, 
                            color: '#1877F2', 
                            name: 'Facebook'
                        },
                        { 
                            icon: <FaTwitter style={{ fontSize: { xs: 16, md: 20 } }} />, 
                            color: '#1DA1F2', 
                            name: 'Twitter'
                        },
                        { 
                            icon: <FaInstagram style={{ fontSize: { xs: 16, md: 20 } }} />, 
                            color: '#E4405F', 
                            name: 'Instagram'
                        },
                        { 
                            icon: <FaLinkedinIn style={{ fontSize: { xs: 16, md: 20 } }} />, 
                            color: '#0A66C2', 
                            name: 'LinkedIn'
                        }
                    ].map((social) => (
                        <a 
                            key={social.name}
                            href="#"
                            style={{ textDecoration: 'none' }}
                        >
                            <Box sx={{
                                width: { xs: 40, md: 52 },
                                height: { xs: 40, md: 52 },
                                borderRadius: { xs: 2, md: 3 },
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                    transform: 'translateY(-6px) scale(1.1)',
                                    background: `${social.color}20`,
                                    borderColor: `${social.color}40`,
                                    boxShadow: `0 15px 35px ${social.color}30, inset 0 0 20px ${social.color}15`,
                                    '&:before': {
                                        opacity: 0.15
                                    },
                                    '& .social-icon': {
                                        transform: 'scale(1.2)',
                                        filter: `drop-shadow(0 0 15px ${social.color})`
                                    }
                                },
                                '&:before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: `linear-gradient(135deg, ${social.color}30, transparent)`,
                                    opacity: 0,
                                    transition: 'opacity 0.4s ease'
                                }
                            }}>
                                <Box className="social-icon" sx={{
                                    color: 'white',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}>
                                    {social.icon}
                                </Box>
                            </Box>
                        </a>
                    ))}
                </Box>
                
              
               
            </Grid>
        </Grid>
        
        {/* Footer bas avec effets premium */}
        <Box sx={{ 
            mt: { xs: 6, md: 8 }, 
            pt: { xs: 4, md: 5 }, 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            '&:before': {
                content: '""',
                position: 'absolute',
                top: -1,
                left: '25%',
                right: '25%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(33, 203, 243, 0.4), transparent)'
            }
        }}>
            <Typography sx={{ 
                color: 'rgba(255,255,255,0.5)', 
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                textShadow: '0 2px 5px rgba(0,0,0,0.2)',
                textAlign: 'center'
            }}>
                © {new Date().getFullYear()} yónnee. Tous droits réservés.
            </Typography>
            
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: { xs: 2, md: 4 }, 
                flexWrap: 'wrap',
                position: 'relative'
            }}>
                {['Politique de confidentialité', 'Conditions d\'utilisation', 'Mentions légales', 'Cookies'].map((item, index) => (
                    <Typography 
                        key={index}
                        sx={{ 
                            color: 'rgba(255,255,255,0.6)', 
                            fontSize: { xs: '0.7rem', md: '0.85rem' },
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            padding: '4px 8px',
                            borderRadius: 1,
                            '&:hover': {
                                color: '#21CBF3',
                                background: 'rgba(33, 203, 243, 0.1)',
                                transform: 'translateY(-2px)',
                                '&:before': {
                                    width: '100%',
                                    opacity: 1
                                }
                            },
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                bottom: -2,
                                left: '10%',
                                width: '0%',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, #21CBF3, transparent)',
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                opacity: 0
                            }
                        }}
                    >
                        {item}
                    </Typography>
                ))}
            </Box>
            
            {/* Signature élégante */}
            <Box sx={{ 
                mt: 4,
                pt: 3,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center'
            }}>
                <Typography variant="caption" sx={{ 
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: { xs: '0.65rem', md: '0.75rem' },
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                }}>
                    <Box component="span" sx={{ 
                        color: '#21CBF3',
                        fontWeight: 600
                    }}>
                        ✈️
                    </Box>
                    Connecter le monde, un colis à la fois
                    <Box component="span" sx={{ 
                        color: '#21CBF3',
                        fontWeight: 600
                    }}>
                        ✈️
                    </Box>
                </Typography>
            </Box>
        </Box>
    </Container>
    
    {/* Animation CSS globale */}
    <style jsx global>{`
        @keyframes textShine {
            0% {
                background-position: 0% 50%;
            }
            100% {
                background-position: 100% 50%;
            }
        }
    `}</style>
</Box>
        </Box>
    );
};

export default Navbar;