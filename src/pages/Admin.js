import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaWeightHanging, 
  FaCalendarAlt, 
  FaEuroSign, 
  FaSearch, 
  FaTrash, 
  FaEdit, 
  FaUser, 
  FaTruck, 
  FaHome, 
  FaCalendarDay,
  FaArchive,
  FaBalanceScale,
  FaUsers,
  FaBell,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaUndo,
  FaEnvelope,
  FaPhone,
  FaIndustry,
  FaChartLine,
  FaDatabase,
  FaMoneyBillWave
} from 'react-icons/fa';
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  IconButton,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
  Divider,
  Avatar,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';

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

const DangerButton = styled(ModernButton)(({ theme }) => ({
  background: 'linear-gradient(90deg, #DC2626 0%, #B91C1C 100%)',
  color: '#FFFFFF',
  '&:hover': {
    background: 'linear-gradient(90deg, #B91C1C 0%, #991B1B 100%)',
    boxShadow: '0 8px 24px rgba(220, 38, 38, 0.25)',
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(31, 41, 55, 0.02)',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Sidebar = styled(Box)(({ theme, collapsed }) => ({
  width: collapsed ? '80px' : '280px',
  background: 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
  color: '#FFFFFF',
  transition: 'width 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  height: '100vh',
  zIndex: 1000,
  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: '280px',
  background: '#F9FAFB',
  minHeight: '100vh',
  transition: 'margin-left 0.3s ease',
  '&.collapsed': {
    marginLeft: '80px',
  }
}));

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        id: null,
        company: '',
        from: '',
        to: '',
        kilos: '',
        departure_date: '',
        price: ''
    });
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [showNextDeparture, setShowNextDeparture] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [activeStatusFilter, setActiveStatusFilter] = useState('all');
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedReservation, setSelectedReservation] = useState(null);

    // Base URL pour les API
    const API_BASE_URL = 'http://localhost:8000/api';
    const ADMIN_BASE_URL = 'http://localhost:8000/api/admin';

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Gestion de la recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeleteSubmission = async (id) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette soumission ?");
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`${ADMIN_BASE_URL}/submissions/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.success(response.data.message);
                setSubmissions(submissions.filter(submission => submission.id !== id));
            } catch (error) {
                console.error('Error deleting submission:', error);
                toast.error('Erreur lors de la suppression de la soumission: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${ADMIN_BASE_URL}/reservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des réservations.');
            }
            
            const data = await response.json();
            // Si l'API retourne un objet avec une propriété 'reservations'
            const reservationsData = data.reservations || data;
            
            const reservationsWithStatuses = reservationsData.map(reservation => ({
                ...reservation,
                statuses: reservation.statuses || [],
                currentStatus: reservation.status || 'En attente'
            }));
            setReservations(reservationsWithStatuses);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            toast.error('Erreur lors de la récupération des réservations.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            let response;
            
            if (formData.id) {
                // Mise à jour d'une soumission existante
                response = await fetch(`${ADMIN_BASE_URL}/submissions/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                // Création d'une nouvelle soumission
                response = await fetch(`${ADMIN_BASE_URL}/submissions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue');
            }

            const result = await response.json();
            
            toast.success(formData.id ? 'Données mises à jour avec succès!' : 'Données enregistrées avec succès!');
            
            if (formData.id) {
                // Mettre à jour la soumission dans la liste
                setSubmissions(submissions.map(sub => 
                    sub.id === formData.id ? { ...sub, ...result.submission || formData } : sub
                ));
            } else {
                // Ajouter la nouvelle soumission à la liste
                if (result.submission) {
                    setSubmissions([...submissions, result.submission]);
                }
                // Rafraîchir la liste des soumissions
                fetchSubmissions();
            }
            
            // Rafraîchir les réservations
            await fetchReservations();
            
            // Réinitialiser le formulaire
            setFormData({ id: null, company: '', from: '', to: '', kilos: '', departure_date: '', price: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Erreur lors de l\'envoi des données: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchConnectedUsers = async () => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${ADMIN_BASE_URL}/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des utilisateurs.');
            }

            const data = await response.json();
            // Si l'API retourne un objet avec une propriété 'users'
            const usersData = data.users || data;
            setConnectedUsers(Array.isArray(usersData) ? usersData : []);
            
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Erreur lors de la récupération des utilisateurs: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
        fetchSubmissions();
    }, []);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const handleProfileClick = async () => {
        setShowProfile(true);
        setShowNextDeparture(false);
        await fetchConnectedUsers();
    };

    const handleNextDepartureClick = () => {
        setShowProfile(false);
        setShowNextDeparture(true);
    };

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${ADMIN_BASE_URL}/submissions`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des soumissions.');
            }
            
            const data = await response.json();
            // Si l'API retourne un objet avec une propriété 'submissions'
            const submissionsData = data.submissions || data;
            setSubmissions(Array.isArray(submissionsData) ? submissionsData : []);
            
        } catch (error) {
            console.error('Error fetching submissions:', error);
            toast.error('Erreur lors de la récupération des soumissions.');
        } finally {
            setLoading(false);
        }
    };

    const addStatus = async (reservationId, newStatus) => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${ADMIN_BASE_URL}/reservations/${reservationId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue lors de la mise à jour du statut.');
            }

            const result = await response.json();
            
            // Mettre à jour les réservations localement
            const updatedReservations = reservations.map(reservation => {
                if (reservation.id === reservationId) {
                    return {
                        ...reservation,
                        statuses: [...(reservation.statuses || []), { status: newStatus, updatedAt: new Date() }],
                        currentStatus: newStatus
                    };
                }
                return reservation;
            });

            setReservations(updatedReservations);
            toast.success(`Statut mis à jour à: ${newStatus}`);
        } catch (error) {
            console.error('Error adding status:', error);
            toast.error('Erreur lors de la mise à jour du statut: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReservation = async (id) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?");
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`${ADMIN_BASE_URL}/reservations/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.success(response.data.message);
                setReservations(reservations.filter(reservation => reservation.id !== id));
            } catch (error) {
                console.error('Error deleting reservation:', error);
                toast.error('Erreur lors de la suppression de la réservation: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleEditSubmission = (submission) => {
        setFormData({
            id: submission._id || submission.id,
            company: submission.company,
            from: submission.from,
            to: submission.to,
            kilos: submission.kilos,
            departure_date: submission.departure_date ? submission.departure_date.split('T')[0] : '',
            price: submission.price
        });
    };

    const filteredReservations = reservations.filter(reservation => {
        const matchesSearch = (
            reservation.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.num?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.to?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesStatus = activeStatusFilter === 'all' || 
                             reservation.currentStatus === activeStatusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalKilos = reservations.reduce((total, reservation) => total + (parseFloat(reservation.kilos) || 0), 0);
    const totalPrice = reservations.reduce((total, reservation) => total + (parseFloat(reservation.price) || 0), 0);
    const activeReservations = reservations.filter(r => 
        r.currentStatus !== 'Annulé' && r.currentStatus !== 'Livré'
    ).length;
    const pendingReservations = reservations.filter(r => r.currentStatus === 'En attente').length;

    const filteredSubmissions = submissions.filter(submission => {
        return (
            submission.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.to?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

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

    const getStatusBadge = (status) => {
        const statusConfig = {
            'En attente': { color: '#F59E0B', bgColor: '#FEF3C7' },
            'En transit': { color: '#3B82F6', bgColor: '#DBEAFE' },
            'Livré': { color: '#10B981', bgColor: '#D1FAE5' },
            'Retourné': { color: '#8B5CF6', bgColor: '#EDE9FE' },
            'Annulé': { color: '#EF4444', bgColor: '#FEE2E2' }
        };
        
        const config = statusConfig[status] || { color: '#6B7280', bgColor: '#F3F4F6' };
        
        return (
            <Chip
                label={status}
                size="small"
                sx={{
                    backgroundColor: config.bgColor,
                    color: config.color,
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: 'none',
                }}
            />
        );
    };

    const statusFilters = [
        { value: 'all', label: 'Tous', count: reservations.length },
        { value: 'En attente', label: 'En attente', count: pendingReservations },
        { value: 'En transit', label: 'En transit', count: reservations.filter(r => r.currentStatus === 'En transit').length },
        { value: 'Livré', label: 'Livré', count: reservations.filter(r => r.currentStatus === 'Livré').length },
        { value: 'Annulé', label: 'Annulé', count: reservations.filter(r => r.currentStatus === 'Annulé').length }
    ];

    const handleMenuOpen = (event, reservation) => {
        setMenuAnchor(event.currentTarget);
        setSelectedReservation(reservation);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setSelectedReservation(null);
    };

    const handleStatusChange = (newStatus) => {
        if (selectedReservation) {
            addStatus(selectedReservation._id || selectedReservation.id, newStatus);
        }
        handleMenuClose();
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F9FAFB' }}>
            <ToastContainer />
            
            {/* Sidebar */}
            <Sidebar collapsed={sidebarCollapsed}>
                <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {!sidebarCollapsed && (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <FaTruck style={{ color: '#FFFFFF', fontSize: 20 }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                                        Admin Panel
                                    </Typography>
                                </Box>
                                <IconButton onClick={toggleSidebar} sx={{ color: '#FFFFFF' }}>
                                    <FaChevronLeft />
                                </IconButton>
                            </>
                        )}
                        {sidebarCollapsed && (
                            <IconButton onClick={toggleSidebar} sx={{ color: '#FFFFFF' }}>
                                <FaChevronRight />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                            sx={{ 
                                width: 45, 
                                height: 45,
                                bgcolor: '#3B82F6',
                                color: '#FFFFFF',
                                fontWeight: 600
                            }}
                        >
                            A
                        </Avatar>
                        {!sidebarCollapsed && (
                            <Box>
                                <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                                    Administrateur
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Super Admin
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box sx={{ p: 2, flex: 1 }}>
                    <Button
                        fullWidth
                        startIcon={<FaHome />}
                        sx={{
                            justifyContent: 'flex-start',
                            color: !showProfile && !showNextDeparture ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: !showProfile && !showNextDeparture ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                            borderRadius: '12px',
                            mb: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                        onClick={() => { setShowProfile(false); setShowNextDeparture(false); }}
                    >
                        {!sidebarCollapsed && 'Dashboard'}
                    </Button>
                    
                    <Button
                        fullWidth
                        startIcon={<FaUsers />}
                        sx={{
                            justifyContent: 'flex-start',
                            color: showProfile ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: showProfile ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                            borderRadius: '12px',
                            mb: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                        onClick={handleProfileClick}
                    >
                        {!sidebarCollapsed && 'Utilisateurs'}
                    </Button>
                    
                    <Button
                        fullWidth
                        startIcon={<FaCalendarDay />}
                        sx={{
                            justifyContent: 'flex-start',
                            color: showNextDeparture ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: showNextDeparture ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                            borderRadius: '12px',
                            mb: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                        onClick={handleNextDepartureClick}
                    >
                        {!sidebarCollapsed && 'Départs'}
                    </Button>
                </Box>
            </Sidebar>

            {/* Main Content */}
            <MainContent className={sidebarCollapsed ? 'collapsed' : ''}>
                {/* Header */}
                <Box sx={{ 
                    bgcolor: '#FFFFFF', 
                    borderBottom: '1px solid #E5E7EB',
                    px: 4,
                    py: 2
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h5" sx={{ 
                                fontWeight: 700,
                                color: '#1F2937',
                                mb: 0.5
                            }}>
                                {showProfile ? 'Gestion des utilisateurs' : 
                                 showNextDeparture ? 'Gestion des départs' : 
                                 'Tableau de bord administratif'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                {showProfile ? 'Gérez les utilisateurs de la plateforme' :
                                 showNextDeparture ? 'Gérez les départs programmés' :
                                 'Gestion complète des réservations et soumissions'}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <IconButton sx={{ position: 'relative' }}>
                                <Badge badgeContent={pendingReservations} color="error">
                                    <FaBell style={{ color: '#6B7280' }} />
                                </Badge>
                            </IconButton>
                            <IconButton>
                                <FaCog style={{ color: '#6B7280' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                {/* Content */}
                <Box sx={{ p: 4 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    {showProfile ? (
                        <ModernCard>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700,
                                    color: '#1F2937',
                                    mb: 3
                                }}>
                                    Utilisateurs connectés
                                </Typography>
                                
                                {loading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                                        <Table>
                                            <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                                                    <TableCell sx={{ fontWeight: 600 }}>Nom</TableCell>
                                                    <TableCell sx={{ fontWeight: 600 }}>Prénom</TableCell>
                                                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                                    <TableCell sx={{ fontWeight: 600 }}>Téléphone</TableCell>
                                                    <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Array.isArray(connectedUsers) && connectedUsers.length > 0 ? (
                                                    connectedUsers.map(user => (
                                                        <StyledTableRow key={user._id || user.id}>
                                                            <TableCell>
                                                                <Typography variant="body2" sx={{ 
                                                                    color: '#6B7280',
                                                                    fontFamily: 'monospace'
                                                                }}>
                                                                    #{user._id?.substring(0, 8) || user.id}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>{user.name}</TableCell>
                                                            <TableCell>{user.prenom}</TableCell>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <FaEnvelope style={{ color: '#9CA3AF' }} />
                                                                    <Typography variant="body2">
                                                                        {user.email}
                                                                    </Typography>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <FaPhone style={{ color: '#9CA3AF' }} />
                                                                    <Typography variant="body2">
                                                                        {user.telephone || user.phone || 'N/A'}
                                                                    </Typography>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <ModernChip 
                                                                    label="Connecté"
                                                                    sx={{ 
                                                                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                                                                        color: '#10B981'
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </StyledTableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                                            <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                                Aucun utilisateur connecté
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </CardContent>
                        </ModernCard>
                    ) : showNextDeparture ? (
                        <Grid container spacing={3}>
                            {/* Formulaire d'ajout/modification */}
                            <Grid item xs={12} md={6}>
                                <ModernCard>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 700,
                                            color: '#1F2937',
                                            mb: 3
                                        }}>
                                            {formData.id ? 'Modifier un départ' : 'Ajouter un nouveau départ'}
                                        </Typography>
                                        
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="body2" sx={{ 
                                                        mb: 1, 
                                                        color: '#374151',
                                                        fontWeight: 600
                                                    }}>
                                                        Entreprise *
                                                    </Typography>
                                                    <ModernTextField
                                                        fullWidth
                                                        name="company"
                                                        placeholder="Nom de l'entreprise"
                                                        value={formData.company}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <FaBuilding style={{ color: '#1F2937' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="body2" sx={{ 
                                                        mb: 1, 
                                                        color: '#374151',
                                                        fontWeight: 600
                                                    }}>
                                                        Prix (F CFA) *
                                                    </Typography>
                                                    <ModernTextField
                                                        fullWidth
                                                        type="number"
                                                        name="price"
                                                        placeholder="Prix"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <FaEuroSign style={{ color: '#1F2937' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="body2" sx={{ 
                                                        mb: 1, 
                                                        color: '#374151',
                                                        fontWeight: 600
                                                    }}>
                                                        Départ *
                                                    </Typography>
                                                    <ModernTextField
                                                        fullWidth
                                                        name="from"
                                                        placeholder="Ville de départ"
                                                        value={formData.from}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <FaMapMarkerAlt style={{ color: '#1F2937' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="body2" sx={{ 
                                                        mb: 1, 
                                                        color: '#374151',
                                                        fontWeight: 600
                                                    }}>
                                                        Destination *
                                                    </Typography>
                                                    <ModernTextField
                                                        fullWidth
                                                        name="to"
                                                        placeholder="Ville d'arrivée"
                                                        value={formData.to}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <FaMapMarkerAlt style={{ color: '#1F2937' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="body2" sx={{ 
                                                        mb: 1, 
                                                        color: '#374151',
                                                        fontWeight: 600
                                                    }}>
                                                        Poids (kg) *
                                                    </Typography>
                                                    <ModernTextField
                                                        fullWidth
                                                        type="number"
                                                        name="kilos"
                                                        placeholder="Poids en kg"
                                                        value={formData.kilos}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <FaWeightHanging style={{ color: '#1F2937' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="body2" sx={{ 
                                                        mb: 1, 
                                                        color: '#374151',
                                                        fontWeight: 600
                                                    }}>
                                                        Date de départ *
                                                    </Typography>
                                                    <ModernTextField
                                                        fullWidth
                                                        type="date"
                                                        name="departure_date"
                                                        value={formData.departure_date}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <FaCalendarAlt style={{ color: '#1F2937' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            
                                            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                                                <PrimaryButton
                                                    type="submit"
                                                    disabled={loading}
                                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                                                >
                                                    {loading ? 'Envoi en cours...' : formData.id ? 'Mettre à jour' : 'Ajouter le départ'}
                                                </PrimaryButton>
                                                {formData.id && (
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => setFormData({ id: null, company: '', from: '', to: '', kilos: '', departure_date: '', price: '' })}
                                                        sx={{ borderRadius: '12px' }}
                                                    >
                                                        Annuler
                                                    </Button>
                                                )}
                                            </Box>
                                        </form>
                                    </CardContent>
                                </ModernCard>
                            </Grid>

                            {/* Liste des départs existants */}
                            <Grid item xs={12} md={6}>
                                <ModernCard>
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
                                                Départs programmés ({submissions.length})
                                            </Typography>
                                        </Box>
                                        
                                        {loading ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                                <CircularProgress />
                                            </Box>
                                        ) : (
                                            <Box sx={{ maxHeight: '500px', overflow: 'auto' }}>
                                                {filteredSubmissions.length === 0 ? (
                                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                                        <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                            Aucun départ programmé
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    <Grid container spacing={2}>
                                                        {filteredSubmissions.map((submission) => (
                                                            <Grid item xs={12} key={submission._id || submission.id}>
                                                                <ResultCard sx={{ p: 2 }}>
                                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Box>
                                                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1F2937' }}>
                                                                                {submission.company}
                                                                            </Typography>
                                                                            <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                                                {submission.from} → {submission.to}
                                                                            </Typography>
                                                                            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                                                                <ModernChip 
                                                                                    label={`${submission.kilos} kg`}
                                                                                    size="small"
                                                                                    sx={{ 
                                                                                        bgcolor: 'rgba(243, 244, 246, 0.5)',
                                                                                        color: '#374151',
                                                                                    }} 
                                                                                />
                                                                                <ModernChip 
                                                                                    label={`${parseFloat(submission.price || 0).toFixed(2)} F CFA`}
                                                                                    size="small"
                                                                                    sx={{ 
                                                                                        bgcolor: 'rgba(229, 231, 235, 0.3)',
                                                                                        color: '#374151',
                                                                                    }} 
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                                            <IconButton 
                                                                                size="small"
                                                                                onClick={() => handleEditSubmission(submission)}
                                                                                sx={{ color: '#1F2937' }}
                                                                            >
                                                                                <FaEdit />
                                                                            </IconButton>
                                                                            <IconButton 
                                                                                size="small"
                                                                                onClick={() => handleDeleteSubmission(submission._id || submission.id)}
                                                                                sx={{ color: '#DC2626' }}
                                                                            >
                                                                                <FaTrash />
                                                                            </IconButton>
                                                                        </Box>
                                                                    </Box>
                                                                    <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'block', mt: 1 }}>
                                                                        Départ: {submission.departure_date ? new Date(submission.departure_date).toLocaleDateString() : 'Date non définie'}
                                                                    </Typography>
                                                                </ResultCard>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                )}
                                            </Box>
                                        )}
                                    </CardContent>
                                </ModernCard>
                            </Grid>
                        </Grid>
                    ) : (
                        <>
                            {/* Statistiques */}
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <ModernCard>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h4" sx={{ 
                                                        fontWeight: 700,
                                                        color: '#1F2937',
                                                        mb: 0.5
                                                    }}>
                                                        {reservations.length}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                        Réservations totales
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <FaDatabase style={{ color: '#3B82F6', fontSize: 24 }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </ModernCard>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={3}>
                                    <ModernCard>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h4" sx={{ 
                                                        fontWeight: 700,
                                                        color: '#1F2937',
                                                        mb: 0.5
                                                    }}>
                                                        {totalKilos} kg
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                        Poids total
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    background: 'rgba(16, 185, 129, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <FaBalanceScale style={{ color: '#10B981', fontSize: 24 }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </ModernCard>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={3}>
                                    <ModernCard>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h4" sx={{ 
                                                        fontWeight: 700,
                                                        color: '#1F2937',
                                                        mb: 0.5
                                                    }}>
                                                        {totalPrice.toFixed(2)} F CFA
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                        Valeur totale
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    background: 'rgba(245, 158, 11, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <FaMoneyBillWave style={{ color: '#F59E0B', fontSize: 24 }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </ModernCard>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={3}>
                                    <ModernCard>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h4" sx={{ 
                                                        fontWeight: 700,
                                                        color: '#1F2937',
                                                        mb: 0.5
                                                    }}>
                                                        {activeReservations}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                        Réservations actives
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    background: 'rgba(99, 102, 241, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <FaTruck style={{ color: '#6366F1', fontSize: 24 }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </ModernCard>
                                </Grid>
                            </Grid>

                            {/* Barre de recherche et filtres */}
                            <ModernCard sx={{ mb: 3 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
                                                Gestion des réservations
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                {filteredReservations.length} réservation(s) trouvée(s)
                                            </Typography>
                                        </Box>
                                        <Box sx={{ width: '300px' }}>
                                            <ModernTextField
                                                fullWidth
                                                placeholder="Rechercher une réservation..."
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <FaSearch style={{ color: '#9CA3AF' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    
                                    {/* Filtres par statut */}
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {statusFilters.map(filter => (
                                            <ModernChip
                                                key={filter.value}
                                                label={`${filter.label} (${filter.count})`}
                                                onClick={() => setActiveStatusFilter(filter.value)}
                                                sx={{
                                                    bgcolor: activeStatusFilter === filter.value ? '#1F2937' : 'rgba(229, 231, 235, 0.3)',
                                                    color: activeStatusFilter === filter.value ? '#FFFFFF' : '#374151',
                                                    '&:hover': {
                                                        bgcolor: activeStatusFilter === filter.value ? '#374151' : 'rgba(229, 231, 235, 0.5)',
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </ModernCard>

                            {/* Table des Réservations */}
                            <ModernCard>
                                <CardContent sx={{ p: 0 }}>
                                    {loading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                                            <CircularProgress />
                                        </Box>
                                    ) : filteredReservations.length === 0 ? (
                                        <Box sx={{ textAlign: 'center', py: 8 }}>
                                            {/* Correction ici: utilisation de FaBox au lieu de FaShippingBox */}
                                            <FaBox style={{ fontSize: 48, color: '#9CA3AF', marginBottom: 16 }} />
                                            <Typography variant="h6" sx={{ color: '#6B7280', mb: 1 }}>
                                                Aucune réservation trouvée
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                Essayez de modifier vos critères de recherche
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <TableContainer sx={{ maxHeight: '600px' }}>
                                            <Table stickyHeader>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#F9FAFB' }}>Client</TableCell>
                                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#F9FAFB' }}>Contact</TableCell>
                                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#F9FAFB' }}>Trajet</TableCell>
                                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#F9FAFB' }}>Date</TableCell>
                                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#F9FAFB' }}>Poids</TableCell>
                                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#F9FAFB' }}>Prix</TableCell>
                                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#F9FAFB' }}>Statut</TableCell>
                                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#F9FAFB' }}>Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {filteredReservations.map((reservation) => (
                                                        <StyledTableRow key={reservation._id}>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                    <Avatar sx={{ 
                                                                        width: 40, 
                                                                        height: 40,
                                                                        bgcolor: '#3B82F6',
                                                                        color: '#FFFFFF',
                                                                        fontWeight: 600
                                                                    }}>
                                                                        {reservation.nom?.charAt(0)}{reservation.prenom?.charAt(0)}
                                                                    </Avatar>
                                                                    <Box>
                                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1F2937' }}>
                                                                            {reservation.nom} {reservation.prenom}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                                                            {reservation.company}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Box>
                                                                    <Typography variant="body2" sx={{ color: '#1F2937' }}>
                                                                        {reservation.email}
                                                                    </Typography>
                                                                    <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                                                        {reservation.num}
                                                                    </Typography>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography variant="body2" sx={{ color: '#1F2937' }}>
                                                                    {reservation.from} → {reservation.to}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <ModernChip 
                                                                    label={reservation.departure_date ? new Date(reservation.departure_date).toLocaleDateString() : 'N/A'}
                                                                    sx={{ 
                                                                        bgcolor: 'rgba(243, 244, 246, 0.5)',
                                                                        color: '#374151',
                                                                    }} 
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <ModernChip 
                                                                    label={`${reservation.kilos} kg`}
                                                                    sx={{ 
                                                                        bgcolor: 'rgba(229, 231, 235, 0.3)',
                                                                        color: '#374151',
                                                                        fontWeight: 600
                                                                    }} 
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography variant="body2" sx={{ color: '#1F2937', fontWeight: 600 }}>
                                                                    {parseFloat(reservation.price || 0).toFixed(2)} F CFA
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    size="small"
                                                                    onClick={(e) => handleMenuOpen(e, reservation)}
                                                                    sx={{ 
                                                                        p: 0,
                                                                        minWidth: 'auto',
                                                                        '&:hover': { bgcolor: 'transparent' }
                                                                    }}
                                                                >
                                                                    {getStatusBadge(reservation.currentStatus)}
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell>
                                                                <IconButton 
                                                                    size="small"
                                                                    onClick={() => handleDeleteReservation(reservation._id)}
                                                                    sx={{ color: '#DC2626' }}
                                                                >
                                                                    <FaTrash />
                                                                </IconButton>
                                                            </TableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </CardContent>
                            </ModernCard>
                        </>
                    )}
                </Box>
            </MainContent>

            {/* Menu des statuts */}
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
                        minWidth: '180px'
                    }
                }}
            >
                {['En attente', 'En transit', 'Livré', 'Retourné', 'Annulé'].map((status) => (
                    <MenuItem 
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        sx={{ py: 1.5 }}
                    >
                        {getStatusBadge(status)}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default AdminDashboard;