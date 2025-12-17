import React, { useState, useEffect } from 'react';
import { 
  IconButton, 
  TextField, 
  Button,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Fade,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Tooltip,
  IconButton as MuiIconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  InputAdornment
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Lock, 
  Email,
  FlightTakeoff,
  Person,
  ArrowBack,
  Security,
  Dashboard,
  People,
  CalendarToday,
  Notifications,
  Settings,
  Menu as MenuIcon,
  Search,
  Delete,
  Edit,
  Business,
  LocationOn,
  Scale,
  Euro,
  LocalShipping,
  CheckCircle,
  Cancel,
  Refresh,
  Phone,
  Email as EmailIcon,
  Factory,
  Home,
  Archive,
  TrendingUp,
  MoreVert,
  FilterList,
  Add,
  Logout,
  AccountCircle,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ================ STYLES MODERNES ================
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

const GlassCard = styled(ModernCard)(({ theme }) => ({
  background: 'linear-gradient(145deg, #FFFFFF 0%, #F9FAFB 100%)',
  border: '1px solid rgba(229, 231, 235, 0.8)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
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

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1F2937 0%, #374151 100%)',
  color: '#FFFFFF',
  borderRadius: 12,
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 24px',
  '&:hover': {
    background: 'linear-gradient(90deg, #374151 0%, #4B5563 100%)',
    boxShadow: '0 8px 24px rgba(31, 41, 55, 0.25)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: '#FFFFFF',
  color: '#1F2937',
  border: '1px solid #E5E7EB',
  borderRadius: 12,
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 24px',
  '&:hover': {
    background: '#F9FAFB',
    borderColor: '#1F2937',
  },
}));

const StatCard = styled(ModernCard)(({ theme, color = '#1F2937' }) => ({
  '&::before': {
    background: `linear-gradient(90deg, ${color} 0%, ${color}99 100%)`,
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 280,
  minHeight: '100vh',
  background: '#1F2937',
  color: 'white',
  transition: 'all 0.3s ease',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 1200,
  '&.collapsed': {
    width: 80,
  }
}));

// ================ COMPOSANT PRINCIPAL ================
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);

    const API_BASE_URL = 'http://localhost:8000/api';
    const ADMIN_BASE_URL = 'http://localhost:8000/api/admin';

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                response = await fetch(`${ADMIN_BASE_URL}/submissions/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                });
            } else {
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
                setSubmissions(submissions.map(sub => 
                    sub.id === formData.id ? { ...sub, ...result.submission || formData } : sub
                ));
            } else {
                if (result.submission) {
                    setSubmissions([...submissions, result.submission]);
                }
                fetchSubmissions();
            }
            
            await fetchReservations();
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
        document.querySelector('.submission-form-section')?.scrollIntoView({ behavior: 'smooth' });
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

    const getStatusColor = (status) => {
        switch(status) {
            case 'En attente': return '#F59E0B';
            case 'En transit': return '#3B82F6';
            case 'Livré': return '#10B981';
            case 'Retourné': return '#8B5CF6';
            case 'Annulé': return '#EF4444';
            default: return '#6B7280';
        }
    };

    const StatusChip = ({ status }) => (
        <Chip
            label={status}
            size="small"
            sx={{
                backgroundColor: `${getStatusColor(status)}15`,
                color: getStatusColor(status),
                fontWeight: 600,
                border: `1px solid ${getStatusColor(status)}30`,
                borderRadius: 2,
            }}
        />
    );

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header Sidebar */}
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
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
                                    <LocalShipping sx={{ color: 'white', fontSize: 24 }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 900, color: 'white' }}>
                                    Yónnee Admin
                                </Typography>
                            </Box>
                            <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
                                <ChevronLeft />
                            </IconButton>
                        </>
                    )}
                    {sidebarCollapsed && (
                        <IconButton onClick={toggleSidebar} sx={{ color: 'white', mx: 'auto' }}>
                            <ChevronRight />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* Profile Section */}
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        src="https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff&bold=true"
                        sx={{ width: 48, height: 48 }}
                    />
                    {!sidebarCollapsed && (
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: 'white' }}>
                                Administrateur
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                Super Admin
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Navigation */}
            <List sx={{ flex: 1, p: 2 }}>
                <ListItem 
                    button 
                    selected={!showProfile && !showNextDeparture}
                    onClick={() => { setShowProfile(false); setShowNextDeparture(false); }}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&.Mui-selected': {
                            background: 'rgba(59, 130, 246, 0.15)',
                            '&:hover': { background: 'rgba(59, 130, 246, 0.2)' }
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                        <Dashboard />
                    </ListItemIcon>
                    {!sidebarCollapsed && <ListItemText primary="Dashboard" />}
                </ListItem>

                <ListItem 
                    button 
                    selected={showProfile}
                    onClick={handleProfileClick}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&.Mui-selected': {
                            background: 'rgba(59, 130, 246, 0.15)',
                            '&:hover': { background: 'rgba(59, 130, 246, 0.2)' }
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                        <People />
                    </ListItemIcon>
                    {!sidebarCollapsed && <ListItemText primary="Utilisateurs" />}
                </ListItem>

                <ListItem 
                    button 
                    selected={showNextDeparture}
                    onClick={handleNextDepartureClick}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&.Mui-selected': {
                            background: 'rgba(59, 130, 246, 0.15)',
                            '&:hover': { background: 'rgba(59, 130, 246, 0.2)' }
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                        <CalendarToday />
                    </ListItemIcon>
                    {!sidebarCollapsed && <ListItemText primary="Départs" />}
                </ListItem>
            </List>

            {/* Footer Sidebar */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                        <Logout />
                    </ListItemIcon>
                    {!sidebarCollapsed && <ListItemText primary="Déconnexion" />}
                </ListItem>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
            <ToastContainer />
            
            {/* Sidebar pour desktop */}
            {!isMobile && (
                <Sidebar className={sidebarCollapsed ? 'collapsed' : ''}>
                    {drawer}
                </Sidebar>
            )}

            {/* Sidebar pour mobile */}
            {isMobile && (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                >
                    {drawer}
                </Drawer>
            )}

            {/* Main Content */}
            <Box 
                sx={{ 
                    flex: 1, 
                    ml: isMobile ? 0 : (sidebarCollapsed ? '80px' : '280px'),
                    transition: 'margin-left 0.3s ease'
                }}
            >
                {/* AppBar */}
                <AppBar 
                    position="sticky" 
                    sx={{ 
                        background: '#FFFFFF', 
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                        borderBottom: '1px solid rgba(229, 231, 235, 0.8)'
                    }}
                >
                    <Toolbar>
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={() => setMobileOpen(true)}
                                sx={{ mr: 2, color: '#1F2937' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}

                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: '#1F2937' }}>
                            {showProfile ? 'Gestion des utilisateurs' : 
                             showNextDeparture ? 'Gestion des départs' : 
                             'Tableau de bord administratif'}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Tooltip title="Notifications">
                                <IconButton sx={{ color: '#1F2937' }}>
                                    <Badge badgeContent={notificationCount} color="error">
                                        <Notifications />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Paramètres">
                                <IconButton sx={{ color: '#1F2937' }}>
                                    <Settings />
                                </IconButton>
                            </Tooltip>
                            <Avatar
                                src="https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff&bold=true"
                                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Content */}
                <Box sx={{ p: 3 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {showProfile ? (
                        <GlassCard>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1F2937' }}>
                                    Utilisateurs connectés
                                </Typography>
                                
                                {loading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                                                    <TableCell sx={{ fontWeight: 700 }}>Utilisateur</TableCell>
                                                    <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                                    <TableCell sx={{ fontWeight: 700 }}>Téléphone</TableCell>
                                                    <TableCell sx={{ fontWeight: 700 }}>Statut</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {connectedUsers.length > 0 ? (
                                                    connectedUsers.map((user) => (
                                                        <TableRow key={user._id || user.id} hover>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                    <Avatar>
                                                                        {user.name?.charAt(0)}{user.prenom?.charAt(0)}
                                                                    </Avatar>
                                                                    <Box>
                                                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                                            {user.name} {user.prenom}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                                                            ID: #{user._id?.substring(0, 8) || user.id}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <EmailIcon sx={{ color: '#6B7280', fontSize: 16 }} />
                                                                    {user.email}
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Phone sx={{ color: '#6B7280', fontSize: 16 }} />
                                                                    {user.telephone || user.phone || 'N/A'}
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Chip 
                                                                    label="Connecté" 
                                                                    size="small" 
                                                                    color="success"
                                                                    sx={{ fontWeight: 600 }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                                                            <Typography color="textSecondary">
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
                        </GlassCard>
                    ) : showNextDeparture ? (
                        <Grid container spacing={3}>
                            {/* Formulaire */}
                            <Grid item xs={12} md={6} className="submission-form-section">
                                <GlassCard>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1F2937' }}>
                                            {formData.id ? 'Modifier un départ' : 'Ajouter un nouveau départ'}
                                        </Typography>
                                        
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <ModernTextField
                                                        fullWidth
                                                        label="Entreprise"
                                                        name="company"
                                                        value={formData.company}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Business sx={{ color: '#6B7280' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <ModernTextField
                                                        fullWidth
                                                        label="Prix (F CFA)"
                                                        name="price"
                                                        type="number"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Euro sx={{ color: '#6B7280' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <ModernTextField
                                                        fullWidth
                                                        label="Départ"
                                                        name="from"
                                                        value={formData.from}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <LocationOn sx={{ color: '#6B7280' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <ModernTextField
                                                        fullWidth
                                                        label="Destination"
                                                        name="to"
                                                        value={formData.to}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <LocationOn sx={{ color: '#6B7280' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <ModernTextField
                                                        fullWidth
                                                        label="Poids (kg)"
                                                        name="kilos"
                                                        type="number"
                                                        value={formData.kilos}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Scale sx={{ color: '#6B7280' }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <ModernTextField
                                                        fullWidth
                                                        label="Date de départ"
                                                        name="departure_date"
                                                        type="date"
                                                        value={formData.departure_date}
                                                        onChange={handleChange}
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <CalendarToday sx={{ color: '#6B7280' }} />
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
                                                    startIcon={formData.id ? <Edit /> : <Add />}
                                                >
                                                    {loading ? 'Envoi en cours...' : formData.id ? 'Mettre à jour' : 'Ajouter le départ'}
                                                </PrimaryButton>
                                                {formData.id && (
                                                    <SecondaryButton
                                                        onClick={() => setFormData({ id: null, company: '', from: '', to: '', kilos: '', departure_date: '', price: '' })}
                                                    >
                                                        Annuler
                                                    </SecondaryButton>
                                                )}
                                            </Box>
                                        </form>
                                    </CardContent>
                                </GlassCard>
                            </Grid>

                            {/* Liste des départs */}
                            <Grid item xs={12} md={6}>
                                <GlassCard>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>
                                                Départs programmés
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                {submissions.length} départ(s)
                                            </Typography>
                                        </Box>
                                        
                                        {loading ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                                                <CircularProgress />
                                            </Box>
                                        ) : (
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                                                            <TableCell sx={{ fontWeight: 700 }}>Entreprise</TableCell>
                                                            <TableCell sx={{ fontWeight: 700 }}>Trajet</TableCell>
                                                            <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                                                            <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {filteredSubmissions.length === 0 ? (
                                                            <TableRow>
                                                                <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                                                                    <Typography color="textSecondary">
                                                                        Aucun départ programmé
                                                                    </Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            filteredSubmissions.map((submission) => (
                                                                <TableRow key={submission._id || submission.id} hover>
                                                                    <TableCell>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                            <Factory sx={{ color: '#6B7280', fontSize: 20 }} />
                                                                            {submission.company}
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                            {submission.from} → {submission.to}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                                                            {submission.kilos} kg • {parseFloat(submission.price || 0).toFixed(2)} F CFA
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Chip 
                                                                            label={submission.departure_date ? new Date(submission.departure_date).toLocaleDateString() : 'Date non définie'}
                                                                            size="small"
                                                                            sx={{ backgroundColor: '#F3F4F6', color: '#374151' }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                                            <IconButton 
                                                                                size="small" 
                                                                                onClick={() => handleEditSubmission(submission)}
                                                                                sx={{ color: '#3B82F6' }}
                                                                            >
                                                                                <Edit />
                                                                            </IconButton>
                                                                            <IconButton 
                                                                                size="small" 
                                                                                onClick={() => handleDeleteSubmission(submission._id || submission.id)}
                                                                                sx={{ color: '#EF4444' }}
                                                                            >
                                                                                <Delete />
                                                                            </IconButton>
                                                                        </Box>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
                                    </CardContent>
                                </GlassCard>
                            </Grid>
                        </Grid>
                    ) : (
                        <>
                            {/* Statistiques */}
                            <Grid container spacing={3} sx={{ mb: 3 }}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <StatCard color="#3B82F6">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#1F2937' }}>
                                                        {reservations.length}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                        Réservations totales
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: '12px',
                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Archive sx={{ color: '#3B82F6', fontSize: 28 }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </StatCard>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <StatCard color="#10B981">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#1F2937' }}>
                                                        {totalKilos} kg
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                        Poids total
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: '12px',
                                                    background: 'rgba(16, 185, 129, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Scale sx={{ color: '#10B981', fontSize: 28 }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </StatCard>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <StatCard color="#F59E0B">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#1F2937' }}>
                                                        {totalPrice.toFixed(2)} F
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                        Valeur totale
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: '12px',
                                                    background: 'rgba(245, 158, 11, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Euro sx={{ color: '#F59E0B', fontSize: 28 }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </StatCard>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <StatCard color="#8B5CF6">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#1F2937' }}>
                                                        {activeReservations}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                                        Réservations actives
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: '12px',
                                                    background: 'rgba(139, 92, 246, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <LocalShipping sx={{ color: '#8B5CF6', fontSize: 28 }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </StatCard>
                                </Grid>
                            </Grid>

                            {/* Barre de recherche et filtres */}
                            <GlassCard sx={{ mb: 3 }}>
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
                                        
                                        <ModernTextField
                                            placeholder="Rechercher une réservation..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            size="small"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search sx={{ color: '#6B7280' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ width: 300 }}
                                        />
                                    </Box>

                                    {/* Filtres par statut */}
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {[
                                            { value: 'all', label: 'Tous', count: reservations.length },
                                            { value: 'En attente', label: 'En attente', count: pendingReservations },
                                            { value: 'En transit', label: 'En transit', count: reservations.filter(r => r.currentStatus === 'En transit').length },
                                            { value: 'Livré', label: 'Livré', count: reservations.filter(r => r.currentStatus === 'Livré').length },
                                            { value: 'Annulé', label: 'Annulé', count: reservations.filter(r => r.currentStatus === 'Annulé').length }
                                        ].map((filter) => (
                                            <Chip
                                                key={filter.value}
                                                label={`${filter.label} (${filter.count})`}
                                                onClick={() => setActiveStatusFilter(filter.value)}
                                                color={activeStatusFilter === filter.value ? "primary" : "default"}
                                                variant={activeStatusFilter === filter.value ? "filled" : "outlined"}
                                                sx={{ fontWeight: 600 }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </GlassCard>

                            {/* Table des Réservations */}
                            <GlassCard>
                                <CardContent sx={{ p: 3 }}>
                                    {loading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                                            <CircularProgress />
                                        </Box>
                                    ) : (
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                                                        <TableCell sx={{ fontWeight: 700 }}>Client</TableCell>
                                                        <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
                                                        <TableCell sx={{ fontWeight: 700 }}>Entreprise</TableCell>
                                                        <TableCell sx={{ fontWeight: 700 }}>Trajet</TableCell>
                                                        <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                                                        <TableCell sx={{ fontWeight: 700 }}>Poids</TableCell>
                                                        <TableCell sx={{ fontWeight: 700 }}>Prix</TableCell>
                                                        <TableCell sx={{ fontWeight: 700 }}>Statut</TableCell>
                                                        <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {filteredReservations.length === 0 ? (
                                                        <TableRow>
                                                            <TableCell colSpan={9} sx={{ textAlign: 'center', py: 4 }}>
                                                                <Typography color="textSecondary">
                                                                    Aucune réservation trouvée
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        filteredReservations.map((reservation, index) => (
                                                            <TableRow key={reservation._id || index} hover>
                                                                <TableCell>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                        <Avatar sx={{ bgcolor: '#3B82F6' }}>
                                                                            {reservation.nom?.charAt(0)}{reservation.prenom?.charAt(0)}
                                                                        </Avatar>
                                                                        <Box>
                                                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                                                {reservation.nom} {reservation.prenom}
                                                                            </Typography>
                                                                            <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                                                                ID: #{reservation._id?.substring(0, 8) || reservation.id}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                            <EmailIcon sx={{ color: '#6B7280', fontSize: 14 }} />
                                                                            <Typography variant="body2">{reservation.email}</Typography>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                            <Phone sx={{ color: '#6B7280', fontSize: 14 }} />
                                                                            <Typography variant="body2">{reservation.num}</Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <Factory sx={{ color: '#6B7280', fontSize: 16 }} />
                                                                        <Typography variant="body2">{reservation.company}</Typography>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                        {reservation.from} → {reservation.to}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Chip 
                                                                        label={reservation.departure_date ? new Date(reservation.departure_date).toLocaleDateString() : 'Date non définie'}
                                                                        size="small"
                                                                        sx={{ backgroundColor: '#F3F4F6', color: '#374151' }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Chip 
                                                                        label={`${reservation.kilos} kg`}
                                                                        size="small"
                                                                        sx={{ backgroundColor: '#F3F4F6', color: '#374151', fontWeight: 700 }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#059669' }}>
                                                                        {parseFloat(reservation.price || 0).toFixed(2)} F CFA
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Menu
                                                                        anchorEl={anchorEl}
                                                                        open={Boolean(anchorEl)}
                                                                        onClose={() => setAnchorEl(null)}
                                                                    >
                                                                        {['En attente', 'En transit', 'Livré', 'Retourné', 'Annulé'].map((status) => (
                                                                            <MenuItem 
                                                                                key={status}
                                                                                onClick={() => {
                                                                                    addStatus(reservation._id || reservation.id, status);
                                                                                    setAnchorEl(null);
                                                                                }}
                                                                            >
                                                                                <StatusChip status={status} />
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Menu>
                                                                    <Box 
                                                                        onClick={(e) => setAnchorEl(e.currentTarget)}
                                                                        sx={{ cursor: 'pointer' }}
                                                                    >
                                                                        <StatusChip status={reservation.currentStatus} />
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <IconButton 
                                                                        size="small" 
                                                                        onClick={() => handleDeleteReservation(reservation._id || reservation.id)}
                                                                        sx={{ color: '#EF4444' }}
                                                                    >
                                                                        <Delete />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </CardContent>
                            </GlassCard>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;