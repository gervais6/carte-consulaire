import React, { useState, useEffect } from 'react';
import './Admin.css';
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
  FaIndustry
} from 'react-icons/fa';

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
        // Scroll vers le formulaire
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
            'En attente': { color: 'warning', icon: <FaBox className="me-1" /> },
            'En transit': { color: 'info', icon: <FaShippingFast className="me-1" /> },
            'Livré': { color: 'success', icon: <FaCheckCircle className="me-1" /> },
            'Retourné': { color: 'secondary', icon: <FaUndo className="me-1" /> },
            'Annulé': { color: 'danger', icon: <FaTimesCircle className="me-1" /> }
        };
        
        const config = statusConfig[status] || { color: 'light', icon: <FaBox className="me-1" /> };
        
        return (
            <span className={`badge bg-${config.color} text-dark d-flex align-items-center`}>
                {config.icon}
                {status}
            </span>
        );
    };

    const statusFilters = [
        { value: 'all', label: 'Tous', count: reservations.length },
        { value: 'En attente', label: 'En attente', count: pendingReservations },
        { value: 'En transit', label: 'En transit', count: reservations.filter(r => r.currentStatus === 'En transit').length },
        { value: 'Livré', label: 'Livré', count: reservations.filter(r => r.currentStatus === 'Livré').length },
        { value: 'Annulé', label: 'Annulé', count: reservations.filter(r => r.currentStatus === 'Annulé').length }
    ];

    return (
        <div className="admin-dashboard">
            <ToastContainer />
            <div className="wrapper d-flex">
                {/* Sidebar */}
                <div className={`sidebar bg-dark text-white ${sidebarCollapsed ? 'collapsed' : ''}`}>
                    <div className="sidebar-header p-4 border-bottom">
                        <div className="d-flex align-items-center justify-content-between">
                            {!sidebarCollapsed && (
                                <>
                                    <div className="d-flex align-items-center">
                                        <div className="logo-icon bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                            <FaTruck className="fs-5" />
                                        </div>
                                        <h5 className="mb-0 fw-bold">TransLog Admin</h5>
                                    </div>
                                    <button className="btn btn-sm btn-outline-light" onClick={toggleSidebar}>
                                        <FaChevronLeft />
                                    </button>
                                </>
                            )}
                            {sidebarCollapsed && (
                                <button className="btn btn-sm btn-outline-light" onClick={toggleSidebar}>
                                    <FaChevronRight />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="p-4 border-bottom">
                        <div className="d-flex align-items-center">
                            <div className="position-relative">
                                <img 
                                    src="https://ui-avatars.com/api/?name=Admin+User&background=0D6EFD&color=fff&bold=true" 
                                    className="rounded-circle me-3" 
                                    alt="Admin" 
                                    width="45" 
                                    height="45" 
                                />
                                <span className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style={{ width: '12px', height: '12px' }}></span>
                            </div>
                            {!sidebarCollapsed && (
                                <div>
                                    <h6 className="mb-0 fw-bold">Administrateur</h6>
                                    <small className="text-light">Dashboard</small>
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="nav flex-column p-3">
                        <a 
                            href="#" 
                            className={`nav-link d-flex align-items-center py-3 ${!showProfile && !showNextDeparture ? 'active bg-primary' : 'text-light'}`}
                            onClick={() => { setShowProfile(false); setShowNextDeparture(false); }}
                        >
                            <FaHome className={`${sidebarCollapsed ? 'mx-auto' : 'me-3'}`} />
                            {!sidebarCollapsed && <span>Dashboard</span>}
                        </a>
                        <a 
                            href="#" 
                            className={`nav-link d-flex align-items-center py-3 ${showProfile ? 'active bg-primary' : 'text-light'}`}
                            onClick={handleProfileClick}
                        >
                            <FaUsers className={`${sidebarCollapsed ? 'mx-auto' : 'me-3'}`} />
                            {!sidebarCollapsed && <span>Utilisateurs</span>}
                        </a>
                        <a 
                            href="#" 
                            className={`nav-link d-flex align-items-center py-3 ${showNextDeparture ? 'active bg-primary' : 'text-light'}`}
                            onClick={handleNextDepartureClick}
                        >
                            <FaCalendarDay className={`${sidebarCollapsed ? 'mx-auto' : 'me-3'}`} />
                            {!sidebarCollapsed && <span>Prochains Départs</span>}
                        </a>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="main-content flex-grow-1 bg-light">
                    {/* Header */}
                    <header className="bg-white shadow-sm border-bottom px-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h1 className="h4 mb-0 fw-bold text-dark">
                                    {showProfile ? 'Gestion des utilisateurs' : 
                                     showNextDeparture ? 'Gestion des départs' : 
                                     'Tableau de bord administratif'}
                                </h1>
                                {!showProfile && !showNextDeparture && (
                                    <small className="text-muted">Gestion complète des réservations et soumissions</small>
                                )}
                            </div>
                            <div className="d-flex gap-3 align-items-center">
                                <div className="position-relative">
                                    <button className="btn btn-outline-secondary position-relative">
                                        <FaBell />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {pendingReservations}
                                        </span>
                                    </button>
                                </div>
                                <button className="btn btn-outline-secondary">
                                    <FaCog />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="p-4">
                        {error && <div className="alert alert-danger">{error}</div>}
                        
                        {showProfile ? (
                            <div className="container-fluid">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-header bg-white border-0 py-3">
                                        <h5 className="mb-0 fw-bold">Utilisateurs connectés</h5>
                                    </div>
                                    <div className="card-body">
                                        {loading ? (
                                            <div className="text-center py-5">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Chargement...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Nom</th>
                                                            <th>Prénom</th>
                                                            <th>Email</th>
                                                            <th>Téléphone</th>
                                                            <th>Statut</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.isArray(connectedUsers) && connectedUsers.length > 0 ? (
                                                            connectedUsers.map(user => (
                                                                <tr key={user._id || user.id}>
                                                                    <td><span className="badge bg-secondary">#{user._id?.substring(0, 8) || user.id}</span></td>
                                                                    <td>{user.name}</td>
                                                                    <td>{user.prenom}</td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <FaEnvelope className="me-2 text-muted" />
                                                                            {user.email}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <FaPhone className="me-2 text-muted" />
                                                                            {user.telephone || user.phone || 'N/A'}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <span className="badge bg-success">Connecté</span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="6" className="text-center py-4">
                                                                    <div className="text-muted">Aucun utilisateur connecté</div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : showNextDeparture ? (
                            <div className="container-fluid">
                                <div className="row">
                                    {/* Formulaire d'ajout/modification */}
                                    <div className="col-lg-6 mb-4 submission-form-section">
                                        <div className="card border-0 shadow-sm h-100">
                                            <div className="card-header bg-white border-0 py-3">
                                                <h5 className="mb-0 fw-bold">
                                                    {formData.id ? 'Modifier un départ' : 'Ajouter un nouveau départ'}
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="form-label fw-medium">Entreprise *</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">
                                                                    <FaBuilding className="text-primary" />
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    name="company"
                                                                    className="form-control"
                                                                    placeholder="Nom de l'entreprise"
                                                                    value={formData.company}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label fw-medium">Prix (F CFA) *</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">
                                                                    <FaEuroSign className="text-primary" />
                                                                </span>
                                                                <input
                                                                    type="number"
                                                                    name="price"
                                                                    className="form-control"
                                                                    placeholder="Prix"
                                                                    value={formData.price}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label fw-medium">Départ *</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">
                                                                    <FaMapMarkerAlt className="text-primary" />
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    name="from"
                                                                    className="form-control"
                                                                    placeholder="Ville de départ"
                                                                    value={formData.from}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label fw-medium">Destination *</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">
                                                                    <FaMapMarkerAlt className="text-primary" />
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    name="to"
                                                                    className="form-control"
                                                                    placeholder="Ville d'arrivée"
                                                                    value={formData.to}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label fw-medium">Poids (kg) *</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">
                                                                    <FaWeightHanging className="text-primary" />
                                                                </span>
                                                                <input
                                                                    type="number"
                                                                    name="kilos"
                                                                    className="form-control"
                                                                    placeholder="Poids en kg"
                                                                    value={formData.kilos}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label fw-medium">Date de départ *</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">
                                                                    <FaCalendarAlt className="text-primary" />
                                                                </span>
                                                                <input
                                                                    type="date"
                                                                    name="departure_date"
                                                                    className="form-control"
                                                                    value={formData.departure_date}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 d-flex gap-2">
                                                        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                                            {loading ? 'Envoi en cours...' : formData.id ? 'Mettre à jour' : 'Ajouter le départ'}
                                                        </button>
                                                        {formData.id && (
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-outline-secondary"
                                                                onClick={() => setFormData({ id: null, company: '', from: '', to: '', kilos: '', departure_date: '', price: '' })}
                                                            >
                                                                Annuler
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Liste des départs existants */}
                                    <div className="col-lg-6">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0 fw-bold">Départs programmés ({submissions.length})</h5>
                                            </div>
                                            <div className="card-body">
                                                {loading ? (
                                                    <div className="text-center py-4">
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Chargement...</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="table-responsive">
                                                        <table className="table table-hover">
                                                            <thead className="table-light">
                                                                <tr>
                                                                    <th>Entreprise</th>
                                                                    <th>Trajet</th>
                                                                    <th>Date</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {filteredSubmissions.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="4" className="text-center py-4">
                                                                            <div className="text-muted">Aucun départ programmé</div>
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    filteredSubmissions.map((submission) => (
                                                                        <tr key={submission._id || submission.id}>
                                                                            <td className="fw-medium">
                                                                                <div className="d-flex align-items-center">
                                                                                    <FaIndustry className="me-2 text-muted" />
                                                                                    {submission.company}
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="fw-medium">{submission.from} → {submission.to}</div>
                                                                                <small className="text-muted">
                                                                                    {submission.kilos} kg • {parseFloat(submission.price || 0).toFixed(2)} F CFA
                                                                                </small>
                                                                            </td>
                                                                            <td>
                                                                                <span className="badge bg-light text-dark">
                                                                                    {submission.departure_date ? new Date(submission.departure_date).toLocaleDateString() : 'Date non définie'}
                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="d-flex gap-2">
                                                                                    <button 
                                                                                        className="btn btn-sm btn-outline-primary"
                                                                                        onClick={() => handleEditSubmission(submission)}
                                                                                        title="Modifier"
                                                                                    >
                                                                                        <FaEdit />
                                                                                    </button>
                                                                                    <button 
                                                                                        className="btn btn-sm btn-outline-danger"
                                                                                        onClick={() => handleDeleteSubmission(submission._id || submission.id)}
                                                                                        title="Supprimer"
                                                                                    >
                                                                                        <FaTrash />
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Statistiques */}
                                <div className="row mb-4">
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-0 shadow-sm bg-primary text-white">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h2 className="mb-0 fw-bold">{reservations.length}</h2>
                                                        <p className="mb-0 opacity-75">Réservations totales</p>
                                                    </div>
                                                    <div className="icon-circle bg-white bg-opacity-25 p-3">
                                                        <FaArchive className="fs-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-0 shadow-sm bg-success text-white">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h2 className="mb-0 fw-bold">{totalKilos} kg</h2>
                                                        <p className="mb-0 opacity-75">Poids total</p>
                                                    </div>
                                                    <div className="icon-circle bg-white bg-opacity-25 p-3">
                                                        <FaBalanceScale className="fs-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-0 shadow-sm bg-warning text-white">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h2 className="mb-0 fw-bold">{totalPrice.toFixed(2)} F CFA</h2>
                                                        <p className="mb-0 opacity-75">Valeur totale</p>
                                                    </div>
                                                    <div className="icon-circle bg-white bg-opacity-25 p-3">
                                                        <FaEuroSign className="fs-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-0 shadow-sm bg-info text-white">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h2 className="mb-0 fw-bold">{activeReservations}</h2>
                                                        <p className="mb-0 opacity-75">Réservations actives</p>
                                                    </div>
                                                    <div className="icon-circle bg-white bg-opacity-25 p-3">
                                                        <FaTruck className="fs-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Barre de recherche et filtres */}
                                <div className="card border-0 shadow-sm mb-4">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <h5 className="mb-0 fw-bold">Gestion des réservations</h5>
                                                <small className="text-muted">{filteredReservations.length} réservation(s) trouvée(s)</small>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0">
                                                        <FaSearch className="text-muted" />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control border-start-0"
                                                        placeholder="Rechercher une réservation..."
                                                        value={searchTerm}
                                                        onChange={handleSearchChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Filtres par statut */}
                                        <div className="mt-3">
                                            <div className="d-flex flex-wrap gap-2">
                                                {statusFilters.map(filter => (
                                                    <button
                                                        key={filter.value}
                                                        className={`btn btn-sm ${activeStatusFilter === filter.value ? 'btn-primary' : 'btn-outline-primary'}`}
                                                        onClick={() => setActiveStatusFilter(filter.value)}
                                                    >
                                                        {filter.label}
                                                        <span className="badge bg-light text-dark ms-2">
                                                            {filter.count}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Table des Réservations COMPLÈTE */}
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Client</th>
                                                        <th>Contact</th>
                                                        <th>Entreprise</th>
                                                        <th>Trajet</th>
                                                        <th>Date</th>
                                                        <th>Poids</th>
                                                        <th>Prix</th>
                                                        <th>Statut</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="9" className="text-center py-5">
                                                                <div className="spinner-border text-primary" role="status">
                                                                    <span className="visually-hidden">Chargement...</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ) : filteredReservations.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="9" className="text-center py-4">
                                                                <div className="text-muted">Aucune réservation trouvée</div>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        filteredReservations.map((reservation, index) => (
                                                            <tr key={reservation._id || index}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-circle bg-primary text-white me-3">
                                                                            {reservation.nom?.charAt(0)}{reservation.prenom?.charAt(0)}
                                                                        </div>
                                                                        <div>
                                                                            <div className="fw-medium">{reservation.nom} {reservation.prenom}</div>
                                                                            <small className="text-muted">ID: {reservation._id?.substring(0, 8) || reservation.id}</small>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex flex-column">
                                                                        <div className="d-flex align-items-center mb-1">
                                                                            <FaEnvelope className="me-2 text-muted small" />
                                                                            <small>{reservation.email}</small>
                                                                        </div>
                                                                        <div className="d-flex align-items-center">
                                                                            <FaPhone className="me-2 text-muted small" />
                                                                            <small>{reservation.num}</small>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <FaIndustry className="me-2 text-muted" />
                                                                        <span>{reservation.company}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="fw-medium">{reservation.from}</div>
                                                                    <div className="text-muted small">→ {reservation.to}</div>
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-light text-dark">
                                                                        {reservation.departure_date ? new Date(reservation.departure_date).toLocaleDateString() : 'Date non définie'}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-light text-dark fw-bold">
                                                                        {reservation.kilos} kg
                                                                    </span>
                                                                </td>
                                                                <td className="fw-bold text-primary">
                                                                    {parseFloat(reservation.price || 0).toFixed(2)} F CFA
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button 
                                                                            className="btn btn-sm dropdown-toggle" 
                                                                            type="button" 
                                                                            data-bs-toggle="dropdown"
                                                                            style={{ 
                                                                                backgroundColor: '#f8f9fa',
                                                                                border: '1px solid #dee2e6'
                                                                            }}
                                                                        >
                                                                            {getStatusBadge(reservation.currentStatus)}
                                                                        </button>
                                                                        <ul className="dropdown-menu shadow-sm">
                                                                            {['En attente', 'En transit', 'Livré', 'Retourné', 'Annulé'].map((status) => (
                                                                                <li key={status}>
                                                                                    <button 
                                                                                        className="dropdown-item d-flex align-items-center"
                                                                                        onClick={() => addStatus(reservation._id || reservation.id, status)}
                                                                                    >
                                                                                        {getStatusBadge(status)}
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button 
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() => handleDeleteReservation(reservation._id || reservation.id)}
                                                                        title="Supprimer"
                                                                    >
                                                                        <FaTrash />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;