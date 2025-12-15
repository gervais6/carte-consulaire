import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Container, 
    Box, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Avatar, 
    Chip, 
    IconButton, 
    Modal, 
    Fade, 
    Backdrop,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
    FaUser, 
    FaRegCalendar, 
    FaSearch, 
    FaPaperPlane, 
    FaShieldAlt, 
    FaMoneyBillWave, 
    FaMapMarkerAlt, 
    FaWeightHanging,
    FaBars,
    FaTimes
} from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoAirplaneSharp, IoClose, IoMenu } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import { FaApple, FaGooglePlay, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaSignInAlt, FaUsers } from "react-icons/fa";
import { TbUserCircle } from "react-icons/tb";
import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import cover from '../pages/portrait_black(1).png';

// Styles modernes avec styled-components
const ModernCard = styled(Card)(({ theme }) => ({
    borderRadius: 20,
    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('sm')]: {
        borderRadius: 16,
    },
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        [theme.breakpoints.down('sm')]: {
            transform: 'translateY(-4px)',
        },
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
    [theme.breakpoints.down('sm')]: {
        padding: '10px 20px',
        fontSize: '0.9rem',
    },
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 20px rgba(25, 118, 210, 0.3)',
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Composant de navigation mobile
    const MobileMenu = () => (
        <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={handleMobileMenuToggle}
            sx={{
                '& .MuiDrawer-paper': {
                    width: isSmallMobile ? '100%' : 320,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 30, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderLeft: '1px solid rgba(255,255,255,0.1)',
                },
            }}
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    yónnee
                </Typography>
                <IconButton onClick={handleMobileMenuToggle} sx={{ color: '#21CBF3' }}>
                    <FaTimes />
                </IconButton>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List sx={{ p: 2 }}>
                <ListItem 
                    button 
                    component={Link} 
                    to="connect" 
                    onClick={handleMobileMenuToggle}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                            background: 'rgba(33, 203, 243, 0.1)',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: '#21CBF3', minWidth: 40 }}>
                        <FaSignInAlt />
                    </ListItemIcon>
                    <ListItemText primary="Connexion" sx={{ color: 'white' }} />
                </ListItem>
                <ListItem 
                    button 
                    onClick={handleMobileMenuToggle}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                            background: 'rgba(33, 203, 243, 0.1)',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: '#21CBF3', minWidth: 40 }}>
                        <IoAirplaneSharp />
                    </ListItemIcon>
                    <ListItemText primary="Proposer un voyage" sx={{ color: 'white' }} />
                </ListItem>
                <ListItem 
                    button 
                    onClick={handleMobileMenuToggle}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                            background: 'rgba(33, 203, 243, 0.1)',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: '#21CBF3', minWidth: 40 }}>
                        <MdOutlineContactSupport />
                    </ListItemIcon>
                    <ListItemText primary="Contact" sx={{ color: 'white' }} />
                </ListItem>
            </List>
            <Box sx={{ p: 2, mt: 'auto' }}>
                <GradientButton fullWidth sx={{ mb: 2 }}>
                    Télécharger l'app
                </GradientButton>
            </Box>
        </Drawer>
    );

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
            color: 'white',
            minHeight: '100vh',
            fontFamily: '"Inter", "Roboto", sans-serif',
            overflowX: 'hidden',
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
                py: isMobile ? 1 : 2,
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
                <Container maxWidth="lg">
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: isMobile ? 1 : 2,
                                position: 'relative',
                                '&:hover .logo-sparkle': {
                                    opacity: 1,
                                    transform: 'translate(-50%, -50%) scale(1.2)'
                                }
                            }}>
                                {/* Logo */}
                                <Box sx={{
                                    position: 'relative',
                                    width: isMobile ? 36 : 40,
                                    height: isMobile ? 36 : 40,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(33, 203, 243, 0.15) 0%, rgba(25, 118, 210, 0.1) 100%)',
                                    border: '1px solid rgba(33, 203, 243, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    boxShadow: 'inset 0 0 20px rgba(33, 203, 243, 0.1), 0 0 30px rgba(33, 203, 243, 0.1)',
                                }}>
                                    <IoAirplaneSharp style={{ 
                                        position: 'relative', 
                                        zIndex: 2, 
                                        color: '#21CBF3',
                                        fontSize: isMobile ? 18 : 20,
                                    }} />
                                </Box>
                                
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 900,
                                    background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.7rem' },
                                    letterSpacing: '-0.5px',
                                    display: isSmallMobile ? 'none' : 'block',
                                }}>
                                    yónnee
                                </Typography>
                            </Box>
                        </Grid>
                        
                        {/* Bouton menu mobile */}
                        {isMobile ? (
                            <Grid item>
                                <IconButton 
                                    onClick={handleMobileMenuToggle}
                                    sx={{ 
                                        color: '#21CBF3',
                                        background: 'rgba(33, 203, 243, 0.1)',
                                        '&:hover': {
                                            background: 'rgba(33, 203, 243, 0.2)',
                                        }
                                    }}
                                >
                                    <FaBars />
                                </IconButton>
                            </Grid>
                        ) : (
                            <Grid item>
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 3, 
                                    alignItems: 'center',
                                    position: 'relative'
                                }}>
                                    <Link to="connect" style={{ textDecoration: 'none' }}>
                                        <Button 
                                            variant="outlined"
                                            sx={{
                                                border: '2px solid transparent',
                                                color: '#21CBF3',
                                                borderRadius: 12,
                                                textTransform: 'none',
                                                fontWeight: 700,
                                                fontSize: '0.95rem',
                                                px: 5,
                                                py: 1.5,
                                                background: 'linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)) padding-box, linear-gradient(135deg, rgba(33, 203, 243, 0.4) 0%, rgba(25, 118, 210, 0.2) 100%) border-box',
                                                backdropFilter: 'blur(15px)',
                                            }}
                                        >
                                            Connexion
                                        </Button>
                                    </Link>
                                    
                                    <GradientButton
                                        sx={{
                                            px: 6,
                                            py: 1.8,
                                            fontSize: '1rem',
                                            borderRadius: 12,
                                            fontWeight: 800,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <IoAirplaneSharp />
                                            Proposer un voyage
                                        </Box>
                                    </GradientButton>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Box>

            {/* Hero Section */}
            <Box sx={{ 
                pt: { xs: 12, sm: 15 }, 
                pb: { xs: 6, sm: 10 },
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Container maxWidth="lg">
                    {/* Hero Content */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 8 } }}>
                        <Typography variant="h1" sx={{
                            fontSize: { xs: '2rem', sm: '2.8rem', md: '4.5rem', lg: '5rem' },
                            fontWeight: 900,
                            mb: { xs: 2, sm: 4 },
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.1,
                        }}>
                            Voyagez utile,
                            <Box component="span" sx={{ 
                                display: 'block',
                                background: 'linear-gradient(90deg, #21CBF3 0%, #FFFFFF 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                envoyez malin
                            </Box>
                        </Typography>
                        
                        <Typography variant="h5" sx={{
                            color: 'rgba(255,255,255,0.85)',
                            mb: { xs: 4, sm: 6 },
                            mx: 'auto',
                            fontWeight: 400,
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.4rem' },
                            lineHeight: 1.6,
                            px: { xs: 2, sm: 0 },
                        }}>
                            Connectez directement avec des voyageurs vérifiés pour envoyer vos colis 
                            <Box component="span" sx={{ 
                                color: '#21CBF3', 
                                fontWeight: 600,
                            }}>
                                {' '}jusqu'à 70% moins cher
                            </Box>
                            {' '}que les services traditionnels
                        </Typography>
                    </Box>

                    {/* Search Section */}
                    <GlassContainer sx={{ mb: 6 }}>
                        {/* Search Bar */}
                        <Box sx={{ position: 'relative', mb: 4 }}>
                            <Box sx={{
                                position: 'absolute',
                                left: { xs: 16, sm: 24 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 1, sm: 2 }
                            }}>
                                <FaSearch style={{
                                    color: '#21CBF3',
                                    fontSize: { xs: 18, sm: 22 },
                                }} />
                                {!isSmallMobile && (
                                    <Box sx={{
                                        width: 2,
                                        height: 20,
                                        background: 'rgba(255,255,255,0.2)',
                                        borderRadius: 1
                                    }} />
                                )}
                            </Box>
                            
                            <TextField
                                fullWidth
                                placeholder={isMobile ? "Rechercher une destination..." : "Où envoyez-vous ? Paris → Dakar, Lyon → Abidjan..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                        background: 'rgba(15, 23, 42, 0.7)',
                                        border: '2px solid rgba(33, 203, 243, 0.3)',
                                        color: 'white',
                                        pl: { xs: 12, sm: 12 },
                                        pr: { xs: 8, sm: 16 },
                                        py: { xs: 1.5, sm: 2 },
                                        fontSize: { xs: '0.9rem', sm: '1.1rem' },
                                    }
                                }}
                            />
                        </Box>

                        {/* Cards de voyage */}
                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                mb: 4,
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
                                    gap: 2
                                }}>
                                    <Box sx={{
                                        width: { xs: 32, sm: 40 },
                                        height: { xs: 32, sm: 40 },
                                        borderRadius: '50%',
                                        background: 'rgba(33, 203, 243, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <IoRocketSharp style={{ color: '#21CBF3', fontSize: { xs: 16, sm: 20 } }} />
                                    </Box>
                                    Trajets disponibles
                                </Typography>
                                
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 1,
                                    flexWrap: 'wrap',
                                    justifyContent: { xs: 'center', sm: 'flex-end' }
                                }}>
                                    <Chip 
                                        label="Tous" 
                                        size="small"
                                        sx={{ 
                                            bgcolor: 'rgba(33, 203, 243, 0.2)',
                                            color: '#21CBF3',
                                            fontWeight: 600,
                                        }} 
                                    />
                                    <Chip 
                                        label="Prochain départ" 
                                        size="small"
                                        sx={{ 
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            color: 'rgba(255,255,255,0.7)',
                                        }} 
                                    />
                                </Box>
                            </Box>
                            
                            {/* Liste des trajets */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {filteredSubmissions.slice(0, isMobile ? 3 : filteredSubmissions.length).map((submission, index) => (
                                    <ModernCard 
                                        key={index}
                                        onClick={() => handleOpenModal(submission)}
                                        sx={{
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                                            {/* Mobile Layout */}
                                            {isMobile ? (
                                                <>
                                                    {/* Header mobile */}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                                        <Avatar sx={{ 
                                                            bgcolor: 'rgba(33, 203, 243, 0.1)',
                                                            width: 48,
                                                            height: 48,
                                                        }}>
                                                            <TbUserCircle style={{ 
                                                                color: '#21CBF3', 
                                                                fontSize: 24,
                                                            }} />
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ 
                                                                fontWeight: 700,
                                                                fontSize: '1rem',
                                                                mb: 0.5
                                                            }}>
                                                                {submission.company}
                                                            </Typography>
                                                            <Chip 
                                                                label="Voyageur vérifié" 
                                                                size="small" 
                                                                sx={{ 
                                                                    bgcolor: 'rgba(76, 175, 80, 0.15)',
                                                                    color: '#4CAF50',
                                                                    fontWeight: 600,
                                                                }} 
                                                            />
                                                        </Box>
                                                    </Box>
                                                    
                                                    {/* Trajet mobile */}
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'space-between',
                                                        mb: 3,
                                                        position: 'relative'
                                                    }}>
                                                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                                                            <Typography variant="caption" sx={{ 
                                                                color: '#21CBF3', 
                                                                fontWeight: 600,
                                                                display: 'block',
                                                                mb: 0.5
                                                            }}>
                                                                Départ
                                                            </Typography>
                                                            <Typography variant="h6" sx={{ 
                                                                fontWeight: 700,
                                                                fontSize: '1.1rem'
                                                            }}>
                                                                {submission.from}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        <IoAirplaneSharp style={{ 
                                                            fontSize: 24, 
                                                            color: '#21CBF3',
                                                            mx: 1
                                                        }} />
                                                        
                                                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                                                            <Typography variant="caption" sx={{ 
                                                                color: '#21CBF3', 
                                                                fontWeight: 600,
                                                                display: 'block',
                                                                mb: 0.5
                                                            }}>
                                                                Destination
                                                            </Typography>
                                                            <Typography variant="h6" sx={{ 
                                                                fontWeight: 700,
                                                                fontSize: '1.1rem'
                                                            }}>
                                                                {submission.to}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    
                                                    {/* Prix mobile */}
                                                    <Box sx={{ 
                                                        textAlign: 'center',
                                                        mb: 3,
                                                        p: 2,
                                                        borderRadius: 2,
                                                        background: 'rgba(33, 203, 243, 0.1)'
                                                    }}>
                                                        <Box sx={{ 
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: 1,
                                                            mb: 2,
                                                        }}>
                                                            <FaWeightHanging style={{ 
                                                                color: '#21CBF3',
                                                            }} />
                                                            <Typography variant="h6" sx={{ 
                                                                fontWeight: 700,
                                                            }}>
                                                                {submission.kilos} kg
                                                            </Typography>
                                                        </Box>
                                                        
                                                        <Typography variant="h4" sx={{ 
                                                            fontWeight: 900,
                                                            background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            lineHeight: 1,
                                                            mb: 1
                                                        }}>
                                                            {submission.price} F CFA
                                                            <Typography component="span" sx={{ 
                                                                fontSize: '0.9rem', 
                                                                ml: 0.5,
                                                                color: 'rgba(255,255,255,0.7)'
                                                            }}>
                                                                /kg
                                                            </Typography>
                                                        </Typography>
                                                    </Box>
                                                    
                                                    {/* Bouton mobile */}
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        sx={{
                                                            background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                                            borderRadius: 2,
                                                            py: 1.5,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                            <FaRegCalendar />
                                                            Réserver
                                                        </Box>
                                                    </Button>
                                                    
                                                    {/* Footer mobile */}
                                                    <Box sx={{ 
                                                        mt: 3, 
                                                        pt: 2, 
                                                        borderTop: '1px solid rgba(255,255,255,0.1)',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <MdAccessTime style={{ color: '#21CBF3' }} />
                                                            <Typography variant="body2">
                                                                {submission.departure_date}
                                                            </Typography>
                                                        </Box>
                                                        <Chip 
                                                            label="Dernières places" 
                                                            size="small"
                                                            sx={{ 
                                                                bgcolor: 'rgba(244, 67, 54, 0.15)',
                                                                color: '#F44336',
                                                                fontWeight: 600,
                                                            }} 
                                                        />
                                                    </Box>
                                                </>
                                            ) : (
                                                // Desktop Layout
                                                <Grid container alignItems="center" spacing={3}>
                                                    <Grid item xs={12} md={3}>
                                                        <Box sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            gap: 3,
                                                            p: 2,
                                                            borderRadius: 3,
                                                            background: 'rgba(33, 203, 243, 0.05)'
                                                        }}>
                                                            <Avatar sx={{ 
                                                                bgcolor: 'rgba(33, 203, 243, 0.1)',
                                                                width: 56,
                                                                height: 56,
                                                                border: '2px solid rgba(33, 203, 243, 0.3)'
                                                            }}>
                                                                <TbUserCircle style={{ 
                                                                    color: '#21CBF3', 
                                                                    fontSize: 30,
                                                                }} />
                                                            </Avatar>
                                                            <Box>
                                                                <Typography variant="h6" sx={{ 
                                                                    fontWeight: 700,
                                                                    color: 'white',
                                                                    mb: 1
                                                                }}>
                                                                    {submission.company}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                                    <Chip 
                                                                        label="Voyageur vérifié" 
                                                                        size="small" 
                                                                        sx={{ 
                                                                            bgcolor: 'rgba(76, 175, 80, 0.15)',
                                                                            color: '#4CAF50',
                                                                            fontWeight: 600,
                                                                        }} 
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} md={5}>
                                                        <Box sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            justifyContent: 'space-between',
                                                            px: 4,
                                                            py: 2,
                                                            position: 'relative'
                                                        }}>
                                                            <Box sx={{ 
                                                                textAlign: 'center', 
                                                                position: 'relative', 
                                                                zIndex: 1,
                                                                p: 3,
                                                                borderRadius: 3,
                                                                background: 'rgba(15, 23, 42, 0.7)',
                                                                border: '1px solid rgba(33, 203, 243, 0.2)'
                                                            }}>
                                                                <Typography variant="caption" sx={{ 
                                                                    color: '#21CBF3', 
                                                                    fontWeight: 600,
                                                                    textTransform: 'uppercase',
                                                                    fontSize: '0.7rem',
                                                                    mb: 1,
                                                                    display: 'block'
                                                                }}>
                                                                    Départ
                                                                </Typography>
                                                                <Typography variant="h5" sx={{ 
                                                                    fontWeight: 800,
                                                                    color: 'white',
                                                                }}>
                                                                    {submission.from}
                                                                </Typography>
                                                            </Box>
                                                            
                                                            <IoAirplaneSharp style={{ 
                                                                fontSize: 32, 
                                                                color: '#21CBF3',
                                                                position: 'relative',
                                                                zIndex: 2,
                                                            }} />
                                                            
                                                            <Box sx={{ 
                                                                textAlign: 'center', 
                                                                position: 'relative', 
                                                                zIndex: 1,
                                                                p: 3,
                                                                borderRadius: 3,
                                                                background: 'rgba(15, 23, 42, 0.7)',
                                                                border: '1px solid rgba(33, 203, 243, 0.2)'
                                                            }}>
                                                                <Typography variant="caption" sx={{ 
                                                                    color: '#21CBF3', 
                                                                    fontWeight: 600,
                                                                    textTransform: 'uppercase',
                                                                    fontSize: '0.7rem',
                                                                    mb: 1,
                                                                    display: 'block'
                                                                }}>
                                                                    Destination
                                                                </Typography>
                                                                <Typography variant="h5" sx={{ 
                                                                    fontWeight: 800,
                                                                    color: 'white',
                                                                }}>
                                                                    {submission.to}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} md={4}>
                                                        <Box sx={{ 
                                                            textAlign: 'right',
                                                            p: 3,
                                                            borderRadius: 3,
                                                            background: 'linear-gradient(135deg, rgba(33, 203, 243, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                                                            border: '1px solid rgba(33, 203, 243, 0.2)'
                                                        }}>
                                                            <Box sx={{ 
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: 2,
                                                                mb: 3,
                                                                p: '8px 16px',
                                                                borderRadius: 20,
                                                                background: 'rgba(33, 203, 243, 0.15)',
                                                                border: '1px solid rgba(33, 203, 243, 0.3)'
                                                            }}>
                                                                <FaWeightHanging style={{ 
                                                                    color: '#21CBF3',
                                                                }} />
                                                                <Typography variant="h5" sx={{ 
                                                                    fontWeight: 800,
                                                                }}>
                                                                    {submission.kilos} kg
                                                                </Typography>
                                                            </Box>
                                                            
                                                            <Box sx={{ mb: 3 }}>
                                                                <Typography variant="h3" sx={{ 
                                                                    fontWeight: 900,
                                                                    background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                                                    WebkitBackgroundClip: 'text',
                                                                    WebkitTextFillColor: 'transparent',
                                                                    lineHeight: 1,
                                                                    mb: 1
                                                                }}>
                                                                    {submission.price} F CFA
                                                                    <Typography component="span" sx={{ 
                                                                        fontSize: '1rem', 
                                                                        ml: 1,
                                                                        color: 'rgba(255,255,255,0.7)'
                                                                    }}>
                                                                        /kg
                                                                    </Typography>
                                                                </Typography>
                                                            </Box>
                                                            
                                                            <Button
                                                                variant="contained"
                                                                sx={{
                                                                    background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                                                    borderRadius: 3,
                                                                    py: 1.5,
                                                                    px: 4,
                                                                    fontWeight: 700,
                                                                    textTransform: 'none',
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                                    <FaRegCalendar />
                                                                    Réserver maintenant
                                                                </Box>
                                                            </Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </CardContent>
                                    </ModernCard>
                                ))}
                            </Box>
                        </Box>
                    </GlassContainer>
                </Container>
            </Box>

            {/* À propos Section */}
            <Box sx={{ py: { xs: 6, sm: 10 }, background: 'rgba(0,0,0,0.3)' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" sx={{ 
                                fontWeight: 800,
                                mb: 4,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Pourquoi choisir yónnee ?
                            </Typography>
                            
                            {/* Features */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
                                {[
                                    { 
                                        icon: <FaMoneyBillWave />, 
                                        title: 'Économisez jusqu\'à 70%',
                                        desc: 'Moins cher que les transporteurs traditionnels'
                                    },
                                    { 
                                        icon: <FaShieldAlt />, 
                                        title: 'Sécurité garantie',
                                        desc: 'Profils vérifiés et suivi en temps réel'
                                    },
                                    { 
                                        icon: <IoAirplaneSharp />, 
                                        title: 'Flexibilité totale',
                                        desc: 'Des départs quotidiens vers toutes destinations'
                                    }
                                ].map((feature, index) => (
                                    <Box key={index} sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 3,
                                        p: 3,
                                        borderRadius: 2,
                                        background: 'rgba(255,255,255,0.05)',
                                    }}>
                                        <Box sx={{
                                            width: { xs: 44, sm: 50 },
                                            height: { xs: 44, sm: 50 },
                                            borderRadius: 12,
                                            background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            {React.cloneElement(feature.icon, { 
                                                style: { fontSize: isMobile ? 20 : 24, color: 'white' } 
                                            })}
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ 
                                                fontWeight: 600, 
                                                mb: 1,
                                                fontSize: { xs: '1rem', sm: '1.1rem' }
                                            }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography sx={{ 
                                                color: 'rgba(255,255,255,0.7)', 
                                                fontSize: { xs: '0.8rem', sm: '0.9rem' } 
                                            }}>
                                                {feature.desc}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            {/* Boutons */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <GradientButton 
                                    fullWidth={isSmallMobile}
                                    sx={{ 
                                        mb: { xs: 2, sm: 0 },
                                        flex: isSmallMobile ? 1 : 'none'
                                    }}
                                >
                                    Commencer maintenant
                                </GradientButton>
                                <Button 
                                    variant="contained"
                                    fullWidth={isSmallMobile}
                                    sx={{
                                        background: 'linear-gradient(90deg, #64748B 0%, #94A3B8 100%)',
                                        borderRadius: 3,
                                        padding: '12px 32px',
                                        fontWeight: 600,
                                        flex: isSmallMobile ? 1 : 'none'
                                    }}
                                >
                                    En savoir plus
                                </Button>
                            </Box>
                        </Grid>

                        {/* Mockup téléphone */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ 
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: { xs: 4, md: 0 }
                            }}>
                                <Box sx={{
                                    width: { xs: '250px', sm: '300px', md: '360px' },
                                    height: { xs: '500px', sm: '600px', md: '720px' },
                                    borderRadius: '40px',
                                    background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                    overflow: 'hidden',
                                    border: 'none'
                                }}>
                                    <img
                                        src={cover}
                                        alt="yónnee"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Processus */}
                    <Box sx={{ mt: { xs: 8, sm: 12 } }}>
                        <Typography variant="h3" sx={{ 
                            textAlign: 'center',
                            fontWeight: 800,
                            mb: 6,
                            fontSize: { xs: '1.8rem', sm: '2.5rem' },
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Comment ça marche ?
                        </Typography>
                        
                        <Grid container spacing={4}>
                            {[
                                { icon: <FaSearch />, title: 'Recherchez', desc: 'Trouvez un voyageur vers votre destination' },
                                { icon: <GiCardboardBoxClosed />, title: 'Réservez', desc: 'Choisissez le nombre de kilos nécessaires' },
                                { icon: <FaUser />, title: 'Rencontrez', desc: 'Organisez la remise du colis en personne' },
                                { icon: <IoAirplaneSharp />, title: 'Suivez', desc: 'Suivez votre colis en temps réel' }
                            ].map((step, index) => (
                                <Grid item xs={6} sm={6} md={3} key={index}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        p: 3,
                                        borderRadius: 3,
                                        background: 'rgba(255,255,255,0.03)',
                                        height: '100%',
                                    }}>
                                        <Box sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 3,
                                        }}>
                                            {React.cloneElement(step.icon, { 
                                                style: { fontSize: isMobile ? 20 : 24, color: 'white' } 
                                            })}
                                        </Box>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 700, 
                                            mb: 2,
                                            fontSize: { xs: '1rem', sm: '1.1rem' }
                                        }}>
                                            {step.title}
                                        </Typography>
                                        <Typography sx={{ 
                                            color: 'rgba(255,255,255,0.7)', 
                                            fontSize: { xs: '0.8rem', sm: '0.9rem' } 
                                        }}>
                                            {step.desc}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>

            {/* Bouton WhatsApp */}
            <Box
                component="a"
                href="https://wa.me/+2217785994?text=Bonjour%20yónnee,%20je%20souhaite%20en%20savoir%20plus"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    position: 'fixed',
                    bottom: { xs: 20, sm: 25 },
                    right: { xs: 20, sm: 25 },
                    width: { xs: 50, sm: 56 },
                    height: { xs: 50, sm: 56 },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                    transition: 'all 0.3s ease',
                    animation: 'float 3s ease-in-out infinite',
                }}
            >
                <svg 
                    width={isMobile ? 22 : 26} 
                    height={isMobile ? 22 : 26} 
                    viewBox="0 0 24 24" 
                    fill="white"
                >
                    <path d="M20.52 3.49C18.18 1.13 15.19 0 12 0 5.48 0 0 5.48 0 12c0 2.13.55 4.16 1.58 5.97L0 24l6.24-1.63c1.75 1 3.77 1.55 5.86 1.55 6.52 0 12-5.48 12-12 0-3.19-1.13-6.18-3.49-8.52zM12 21.75c-1.82 0-3.58-.5-5.12-1.43l-.36-.21-3.74.98.99-3.65-.21-.36C2.75 15.58 2.25 13.82 2.25 12c0-5.38 4.37-9.75 9.75-9.75 2.6 0 5.04 1.01 6.88 2.86 1.84 1.84 2.86 4.28 2.86 6.89 0 5.38-4.37 9.75-9.75 9.75z"/>
                </svg>
            </Box>

            {/* Modal de réservation */}
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
                        width: { xs: '95%', sm: 600 },
                        maxWidth: '95vw',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        bgcolor: 'rgba(15, 23, 42, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: { xs: 2, sm: 4 },
                        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        p: { xs: 2, sm: 4 },
                        outline: 'none'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
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
                                    mb: 4,
                                    p: 3,
                                    borderRadius: 3,
                                    background: 'rgba(33, 203, 243, 0.1)',
                                    border: '1px solid rgba(33, 203, 243, 0.2)'
                                }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} md={8}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                {localSelectedSubmission.from} → {localSelectedSubmission.to}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <MdAccessTime style={{ color: '#21CBF3' }} />
                                                    <Typography variant="body2">
                                                        {localSelectedSubmission.departure_date}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <FaWeightHanging style={{ color: '#21CBF3' }} />
                                                    <Typography variant="body2">
                                                        {localSelectedSubmission.kilos} kg disponibles
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                                            <Typography variant="h4" sx={{ 
                                                fontWeight: 700,
                                                background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}>
                                                {localSelectedSubmission.price} F CFA
                                                <Typography component="span" sx={{ fontSize: '0.875rem', ml: 1 }}>
                                                    /kg
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Formulaire */}
                                <form onSubmit={handleSubmit}>
                                    <Typography variant="subtitle1" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <FaUser style={{ color: '#21CBF3' }} />
                                        Vos coordonnées
                                    </Typography>

                                    <Grid container spacing={3} sx={{ mb: 4 }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Nom"
                                                variant="outlined"
                                                value={nom}
                                                onChange={(e) => setNom(e.target.value)}
                                                required
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
            <Box sx={{ 
                py: { xs: 6, sm: 10 },
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 30, 0.95) 100%)',
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* Logo & Description */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Box sx={{
                                    width: { xs: 40, sm: 50 },
                                    height: { xs: 40, sm: 50 },
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 15, 30, 0.9) 100%)',
                                    border: '1px solid rgba(33, 203, 243, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <IoAirplaneSharp style={{ 
                                        color: '#21CBF3',
                                        fontSize: { xs: 20, sm: 24 },
                                    }} />
                                </Box>
                                <Typography variant="h5" sx={{ 
                                    fontWeight: 800,
                                    background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '1.3rem', sm: '1.5rem' },
                                }}>
                                    yónnee
                                </Typography>
                            </Box>
                            <Typography sx={{ 
                                color: 'rgba(255,255,255,0.85)', 
                                mb: 3,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                            }}>
                                Connectez directement avec des voyageurs vérifiés pour envoyer vos colis 
                                jusqu'à 70% moins cher que les services traditionnels
                            </Typography>
                        </Grid>

                        {/* Contact */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                mb: 3,
                                fontSize: { xs: '1rem', sm: '1.1rem' }
                            }}>
                                Contact
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <MdOutlineEmail style={{ color: '#21CBF3', fontSize: 20 }} />
                                    <Typography sx={{ color: 'rgba(255,255,255,0.95)' }}>
                                        contact@yonnee.com
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Social */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                mb: 3,
                                fontSize: { xs: '1rem', sm: '1.1rem' }
                            }}>
                                Suivez-nous
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                    <IconButton
                                        key={index}
                                        sx={{
                                            color: 'white',
                                            background: 'rgba(255,255,255,0.1)',
                                            '&:hover': {
                                                background: 'rgba(33, 203, 243, 0.3)',
                                            }
                                        }}
                                    >
                                        <Icon style={{ fontSize: 18 }} />
                                    </IconButton>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Footer bas */}
                    <Box sx={{ 
                        mt: 4, 
                        pt: 4, 
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        textAlign: 'center'
                    }}>
                        <Typography sx={{ 
                            color: 'rgba(255,255,255,0.5)', 
                            mb: 2,
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        }}>
                            © {new Date().getFullYear()} yónnee. Tous droits réservés.
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: 2, 
                            flexWrap: 'wrap',
                        }}>
                            {['Politique', 'Conditions', 'Mentions', 'Cookies'].map((item) => (
                                <Typography 
                                    key={item}
                                    sx={{ 
                                        color: 'rgba(255,255,255,0.6)', 
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: '#21CBF3',
                                        }
                                    }}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Menu Mobile */}
            <MobileMenu />

            {/* Animations CSS */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
            `}</style>
        </Box>
    );
};

export default Navbar;