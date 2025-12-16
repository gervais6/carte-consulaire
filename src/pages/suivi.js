import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Box, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    IconButton,
    Avatar,
    Chip,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    useMediaQuery,
    useTheme,
    LinearProgress,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
    FaSearch, 
    FaUser, 
    FaSignOutAlt, 
    FaCheckCircle,
    FaTruck,
    FaPlane,
    FaHome,
    FaMapMarkerAlt,
    FaHistory,
    FaBars,
    FaTimes,
    FaWhatsapp,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaWeightHanging,
    FaLinkedinIn
} from 'react-icons/fa';
import { 
    IoAirplaneSharp, 
    IoLocationSharp,
    IoCheckmarkCircle,
    IoTime,
    IoCalendar
} from "react-icons/io5";
import { 
    MdOutlineEmail, 
    MdOutlineLocalShipping,
    MdSecurity,
    MdVerified
} from "react-icons/md";
import { TbUserCircle, TbPackage } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles modernes avec styled-components
const ModernCard = styled(Card)(({ theme }) => ({
    borderRadius: 20,
    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(33, 203, 243, 0.3)',
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
}));

const StatusCard = styled(Card)(({ theme, statuscolor }) => ({
    borderRadius: 16,
    background: statuscolor || 'rgba(33, 203, 243, 0.1)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
    },
}));

const Suivi = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [statuses, setStatuses] = useState([]);
    const [reservationInfo, setReservationInfo] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // États pour le stepper
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const fetchUserEmail = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/personal-info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    toast.error(`Erreur: ${response.status} ${errorMessage}`);
                    throw new Error(`Erreur: ${response.status} ${errorMessage}`);
                }

                const data = await response.json();
                setEmail(data.email);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserEmail();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/connect');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token')?.trim();
        if (!token) {
            toast.error('Vous devez vous connecter pour accéder à cette fonctionnalité.');
            navigate('/connect');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/track/${trackingNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                toast.error(`Erreur: ${response.status} ${errorMessage}`);
                throw new Error(`Erreur: ${response.status} ${errorMessage}`);
            }

            const data = await response.json();
            setReservationInfo(data.reservation);

            const statusesResponse = await fetch(`http://localhost:8000/api/reservations/${data.reservation.id}/statuses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!statusesResponse.ok) {
                const errorMessage = await statusesResponse.text();
                toast.error(`Erreur: ${statusesResponse.status} ${errorMessage}`);
                throw new Error(`Erreur: ${statusesResponse.status} ${errorMessage}`);
            }

            const statusesData = await statusesResponse.json();
            setStatuses(statusesData);
            
            // Mettre à jour l'étape active en fonction du dernier statut
            if (statusesData.length > 0) {
                const statusMap = {
                    'en_attente': 0,
                    'pris_en_charge': 1,
                    'en_transit': 2,
                    'arrivé_destination': 3,
                    'livré': 4
                };
                const lastStatus = statusesData[statusesData.length - 1].status;
                setActiveStep(statusMap[lastStatus] || 0);
            }

            toast.success('Informations de suivi récupérées avec succès !');

        } catch (error) {
            console.error("Erreur:", error);
            toast.error('Erreur lors de la récupération des informations de suivi.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                localStorage.removeItem('token');
                toast.success('Déconnexion réussie');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                toast.error('Erreur lors de la déconnexion');
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            toast.error('Erreur réseau lors de la déconnexion.');
        }
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
                    component="a"
                    href="/compte"
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
                        <TbUserCircle />
                    </ListItemIcon>
                    <ListItemText primary="Mon compte" sx={{ color: 'white' }} />
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
                        <TbPackage />
                    </ListItemIcon>
                    <ListItemText primary="Mes envois" sx={{ color: 'white' }} />
                </ListItem>
                <ListItem 
                    button 
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                            background: 'rgba(244, 67, 54, 0.1)',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: '#F44336', minWidth: 40 }}>
                        <FaSignOutAlt />
                    </ListItemIcon>
                    <ListItemText primary="Déconnexion" sx={{ color: 'white' }} />
                </ListItem>
            </List>
        </Drawer>
    );

    // Fonction pour obtenir la couleur en fonction du statut
    const getStatusColor = (status) => {
        const colors = {
            'en_attente': 'rgba(255, 193, 7, 0.1)',
            'pris_en_charge': 'rgba(33, 150, 243, 0.1)',
            'en_transit': 'rgba(156, 39, 176, 0.1)',
            'arrivé_destination': 'rgba(76, 175, 80, 0.1)',
            'livré': 'rgba(76, 175, 80, 0.2)'
        };
        return colors[status] || 'rgba(33, 203, 243, 0.1)';
    };

    // Fonction pour obtenir l'icône en fonction du statut
    const getStatusIcon = (status) => {
        const icons = {
            'en_attente': <IoTime />,
            'pris_en_charge': <FaTruck />,
            'en_transit': <IoAirplaneSharp />,
            'arrivé_destination': <FaMapMarkerAlt />,
            'livré': <FaCheckCircle />
        };
        return icons[status] || <FaHistory />;
    };

    // Fonction pour obtenir le texte du statut
    const getStatusText = (status) => {
        const texts = {
            'en_attente': 'En attente',
            'pris_en_charge': 'Pris en charge',
            'en_transit': 'En transit',
            'arrivé_destination': 'Arrivé à destination',
            'livré': 'Livré'
        };
        return texts[status] || status;
    };

    // Étapes du suivi
    const steps = [
        {
            label: 'En attente',
            description: 'Votre colis est en attente de prise en charge',
            icon: <IoTime style={{ color: '#FFC107' }} />
        },
        {
            label: 'Pris en charge',
            description: 'Le voyageur a pris votre colis en charge',
            icon: <FaTruck style={{ color: '#2196F3' }} />
        },
        {
            label: 'En transit',
            description: 'Votre colis est en cours de transport',
            icon: <IoAirplaneSharp style={{ color: '#9C27B0' }} />
        },
        {
            label: 'Arrivé à destination',
            description: 'Votre colis est arrivé à destination',
            icon: <FaMapMarkerAlt style={{ color: '#4CAF50' }} />
        },
        {
            label: 'Livré',
            description: 'Votre colis a été livré au destinataire',
            icon: <FaCheckCircle style={{ color: '#4CAF50' }} />
        }
    ];

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
            color: 'white',
            minHeight: '100vh',
            fontFamily: '"Inter", "Roboto", sans-serif',
        }}>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

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
            }}>
                <Container maxWidth="lg">
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: isMobile ? 1 : 2
                            }}>
                                <Box sx={{
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
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                                </Box>
                            </Grid>
                        ) : (
                            <Grid item>
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 3, 
                                    alignItems: 'center'
                                }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 2,
                                        px: 3,
                                        py: 1,
                                        borderRadius: 3,
                                        background: 'rgba(33, 203, 243, 0.1)',
                                        border: '1px solid rgba(33, 203, 243, 0.2)',
                                    }}>
                                        <Avatar sx={{ 
                                            width: 36, 
                                            height: 36, 
                                            bgcolor: 'rgba(33, 203, 243, 0.2)'
                                        }}>
                                            <TbUserCircle style={{ color: '#21CBF3' }} />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ 
                                                color: 'rgba(255,255,255,0.7)',
                                                fontSize: '0.75rem'
                                            }}>
                                                Connecté en tant que
                                            </Typography>
                                            <Typography variant="body2" sx={{ 
                                                fontWeight: 600,
                                                color: '#21CBF3'
                                            }}>
                                                {loading ? 'Chargement...' : email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    <Button
                                        variant="outlined"
                                        onClick={handleLogout}
                                        startIcon={<FaSignOutAlt />}
                                        sx={{
                                            border: '2px solid transparent',
                                            color: '#F44336',
                                            borderRadius: 12,
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            px: 3,
                                            py: 1.2,
                                            background: 'linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)) padding-box, linear-gradient(135deg, rgba(244, 67, 54, 0.4) 0%, rgba(183, 28, 28, 0.2) 100%) border-box',
                                            backdropFilter: 'blur(15px)',
                                            '&:hover': {
                                                background: 'linear-gradient(rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.95)) padding-box, linear-gradient(135deg, rgba(244, 67, 54, 0.6) 0%, rgba(183, 28, 28, 0.4) 100%) border-box',
                                            }
                                        }}
                                    >
                                        Déconnexion
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Box>

            {/* Main Content */}
            <Box sx={{ pt: { xs: 12, sm: 15 }, pb: { xs: 6, sm: 10 } }}>
                <Container maxWidth="lg">
                    {/* Hero Section */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 8 } }}>
                        <Typography variant="h1" sx={{
                            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem', lg: '4rem' },
                            fontWeight: 900,
                            mb: { xs: 2, sm: 4 },
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #21CBF3 50%, #FFFFFF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.1,
                        }}>
                            Suivez votre colis
                            <Box component="span" sx={{ 
                                display: 'block',
                                background: 'linear-gradient(90deg, #21CBF3 0%, #FFFFFF 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                en temps réel
                            </Box>
                        </Typography>
                        
                        <Typography variant="h5" sx={{
                            color: 'rgba(255,255,255,0.85)',
                            mb: { xs: 4, sm: 6 },
                            mx: 'auto',
                            fontWeight: 400,
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                            lineHeight: 1.6,
                            px: { xs: 2, sm: 0 },
                        }}>
                            Suivez l'avancement de votre envoi à chaque étape du voyage
                        </Typography>
                    </Box>

                    {/* Search Section */}
                    <ModernCard sx={{ mb: 6, p: { xs: 3, sm: 4 } }}>
                        <CardContent>
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
                                
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        placeholder="Entrez votre numéro de suivi"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
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
                                    
                                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                                        <GradientButton
                                            type="submit"
                                            size="large"
                                            startIcon={<FaSearch />}
                                            sx={{
                                                px: { xs: 4, sm: 6 },
                                                py: { xs: 1.5, sm: 2 },
                                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                            }}
                                        >
                                            Suivre mon colis
                                        </GradientButton>
                                    </Box>
                                </form>
                            </Box>
                        </CardContent>
                    </ModernCard>

                    {/* Résultats du suivi */}
                    {reservationInfo && (
                        <>
                            {/* Informations de la réservation */}
                            <ModernCard sx={{ mb: 4, p: { xs: 3, sm: 4 } }}>
                                <CardContent>
                                    <Typography variant="h5" sx={{ 
                                        fontWeight: 700, 
                                        mb: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <TbPackage style={{ color: '#21CBF3' }} />
                                        Informations de l'envoi
                                    </Typography>
                                    
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ 
                                                p: 3,
                                                borderRadius: 3,
                                                background: 'rgba(33, 203, 243, 0.05)',
                                                border: '1px solid rgba(33, 203, 243, 0.1)',
                                                height: '100%'
                                            }}>
                                                <Typography variant="subtitle2" sx={{ 
                                                    color: 'rgba(255,255,255,0.7)',
                                                    mb: 1
                                                }}>
                                                    Trajet
                                                </Typography>
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'space-between',
                                                    mb: 2
                                                }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                        {reservationInfo.from}
                                                    </Typography>
                                                    <IoAirplaneSharp style={{ 
                                                        color: '#21CBF3',
                                                        fontSize: 20,
                                                        mx: 2
                                                    }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                        {reservationInfo.to}
                                                    </Typography>
                                                </Box>
                                                
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: 2,
                                                    mt: 3
                                                }}>
                                                    <IoCalendar style={{ color: '#21CBF3' }} />
                                                    <Typography variant="body2">
                                                        Date de départ: {reservationInfo.departure_date}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ 
                                                p: 3,
                                                borderRadius: 3,
                                                background: 'rgba(33, 203, 243, 0.05)',
                                                border: '1px solid rgba(33, 203, 243, 0.1)',
                                                height: '100%'
                                            }}>
                                                <Typography variant="subtitle2" sx={{ 
                                                    color: 'rgba(255,255,255,0.7)',
                                                    mb: 1
                                                }}>
                                                    Détails de l'envoi
                                                </Typography>
                                                
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Box sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            gap: 1,
                                                            mb: 2
                                                        }}>
                                                            <FaWeightHanging style={{ color: '#21CBF3' }} />
                                                            <Typography variant="body2">
                                                                Poids: {reservationInfo.kilos} kg
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Box sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            gap: 1,
                                                            mb: 2
                                                        }}>
                                                            <MdOutlineLocalShipping style={{ color: '#21CBF3' }} />
                                                            <Typography variant="body2">
                                                                Numéro: {trackingNumber}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                
                                                <Box sx={{ 
                                                    mt: 3,
                                                    p: 2,
                                                    borderRadius: 2,
                                                    background: 'rgba(76, 175, 80, 0.1)',
                                                    border: '1px solid rgba(76, 175, 80, 0.2)'
                                                }}>
                                                    <Typography variant="body2" sx={{ 
                                                        color: '#4CAF50',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1
                                                    }}>
                                                        <MdSecurity />
                                                        Assurance yónnee incluse
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </ModernCard>

                            {/* Timeline/Stepper */}
                            <ModernCard sx={{ mb: 4, p: { xs: 3, sm: 4 } }}>
                                <CardContent>
                                    <Typography variant="h5" sx={{ 
                                        fontWeight: 700, 
                                        mb: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <FaHistory style={{ color: '#21CBF3' }} />
                                        Suivi du colis
                                    </Typography>
                                    
                                    <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'}>
                                        {steps.map((step, index) => (
                                            <Step key={index}>
                                                <StepLabel
                                                    StepIconComponent={() => (
                                                        <Box sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            background: index <= activeStep 
                                                                ? 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)' 
                                                                : 'rgba(255,255,255,0.1)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: index <= activeStep 
                                                                ? 'none' 
                                                                : '1px solid rgba(255,255,255,0.2)'
                                                        }}>
                                                            {React.cloneElement(step.icon, { 
                                                                style: { 
                                                                    color: index <= activeStep ? 'white' : 'rgba(255,255,255,0.5)',
                                                                    fontSize: 20
                                                                } 
                                                            })}
                                                        </Box>
                                                    )}
                                                >
                                                    <Typography variant="subtitle1" sx={{ 
                                                        fontWeight: 600,
                                                        color: index <= activeStep ? 'white' : 'rgba(255,255,255,0.7)'
                                                    }}>
                                                        {step.label}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ 
                                                        color: 'rgba(255,255,255,0.5)',
                                                        mt: 0.5
                                                    }}>
                                                        {step.description}
                                                    </Typography>
                                                </StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </CardContent>
                            </ModernCard>

                            {/* Historique des statuts */}
                            {statuses.length > 0 && (
                                <ModernCard sx={{ mb: 4, p: { xs: 3, sm: 4 } }}>
                                    <CardContent>
                                        <Typography variant="h5" sx={{ 
                                            fontWeight: 700, 
                                            mb: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2
                                        }}>
                                            <IoTime style={{ color: '#21CBF3' }} />
                                            Historique des mises à jour
                                        </Typography>
                                        
                                        <Grid container spacing={2}>
                                            {statuses.map((status, index) => (
                                                <Grid item xs={12} key={index}>
                                                    <StatusCard 
                                                        statuscolor={getStatusColor(status.status)}
                                                        sx={{ mb: 2 }}
                                                    >
                                                        <CardContent>
                                                            <Grid container alignItems="center" spacing={2}>
                                                                <Grid item xs="auto">
                                                                    <Box sx={{
                                                                        width: 50,
                                                                        height: 50,
                                                                        borderRadius: '50%',
                                                                        background: 'rgba(255,255,255,0.1)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                    }}>
                                                                        {getStatusIcon(status.status)}
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                                            {getStatusText(status.status)}
                                                                        </Typography>
                                                                        <Typography variant="body2" sx={{ 
                                                                            color: 'rgba(255,255,255,0.7)',
                                                                            mt: 0.5
                                                                        }}>
                                                                            {status.description || 'Aucune description disponible'}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ 
                                                                            color: 'rgba(255,255,255,0.5)',
                                                                            display: 'block',
                                                                            mt: 1
                                                                        }}>
                                                                            {new Date(status.date).toLocaleString('fr-FR', {
                                                                                day: '2-digit',
                                                                                month: '2-digit',
                                                                                year: 'numeric',
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs="auto">
                                                                    {index === 0 && (
                                                                        <Chip 
                                                                            label="Dernière mise à jour" 
                                                                            size="small"
                                                                            sx={{ 
                                                                                bgcolor: 'rgba(33, 203, 243, 0.2)',
                                                                                color: '#21CBF3',
                                                                                fontWeight: 600,
                                                                            }} 
                                                                        />
                                                                    )}
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </StatusCard>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                </ModernCard>
                            )}
                        </>
                    )}
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ 
                py: { xs: 6, sm: 10 },
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 30, 0.95) 100%)',
                borderTop: '1px solid rgba(255,255,255,0.1)'
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
                                Suivez vos colis en temps réel avec yónnee
                            </Typography>
                        </Grid>

                        {/* Contact */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                mb: 3,
                                fontSize: { xs: '1rem', sm: '1.1rem' }
                            }}>
                                Besoin d'aide ?
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <MdOutlineEmail style={{ color: '#21CBF3', fontSize: 20 }} />
                                    <Typography sx={{ color: 'rgba(255,255,255,0.95)' }}>
                                        support@yonnee.com
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
                    </Box>
                </Container>
            </Box>

            {/* Bouton WhatsApp */}
            <Box
                component="a"
                href="https://wa.me/+2217785994?text=Bonjour%20yónnee,%20j'ai%20une%20question%20sur%20le%20suivi%20de%20mon%20colis"
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
                <FaWhatsapp style={{ color: 'white', fontSize: isMobile ? 22 : 26 }} />
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

export default Suivi;