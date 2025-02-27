import React, { useState, useEffect } from 'react';
import './Admin.css'; // Assurez-vous d'avoir ce fichier CSS pour le style
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Gestion de la recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/reservations');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des réservations.');
            }
            const data = await response.json();
            
            // Assurez-vous que chaque réservation a une propriété statuses
            const reservationsWithStatuses = data.map(reservation => ({
                ...reservation,
                statuses: reservation.statuses || [] // Initialiser à un tableau vide si undefined
            }));
    
            setReservations(reservationsWithStatuses);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            toast.error('Erreur lors de la récupération des réservations.');
        } finally {
            setLoading(false);
        }
    };


    const updateStatus = (index, newStatus) => {

        const updatedReservations = [...reservations];

        updatedReservations[index].status = newStatus;

        setReservations(updatedReservations);

        setStatusMessage(`Statut de la réservation ${index} mis à jour à: ${newStatus}`);

        toast.success(`Statut mis à jour à: ${newStatus}`);

    };

    // Soumission du formulaire pour ajouter une nouvelle soumission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const text = await response.text();
            if (!response.ok) {
                const errorData = JSON.parse(text);
                throw new Error(errorData.message || 'Une erreur est survenue');
            }

            toast.success('Données enregistrées avec succès!');
            await fetchReservations(); // Récupérer les réservations après la soumission
            setFormData({ company: '', from: '', to: '', kilos: '', departure_date: '', price: '' }); // Réinitialiser le formulaire
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Erreur lors de l\'envoi des données: ' + error.message);
        } finally {
            setLoading(false);
        }
    };



    // Récupération des utilisateurs connectés
    const fetchConnectedUsers = async () => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/personal-info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error('Erreur lors de la récupération des informations personnelles.');
            }

            const data = await response.json();
            console.log('Connected User:', data); // Vérifiez la structure des données

            // Assurez-vous que data est un objet
            if (data && typeof data === 'object') {
                setConnectedUsers([data]); // Mettez-le dans un tableau pour le traitement ultérieur
            } else {
                console.error('La réponse n\'est pas un objet valide:', data);
                setConnectedUsers([]); // Ou gérer l'erreur comme vous le souhaitez
            }
        } catch (error) {
            console.error('Error fetching connected users:', error);
            toast.error('Erreur lors de la récupération des utilisateurs connectés: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Récupération initiale des réservations
    useEffect(() => {
        fetchReservations();
    }, []);

    // Gestion de l'affichage de la barre latérale
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // Gestion de l'affichage du profil utilisateur
    const handleProfileClick = async () => {
        setShowProfile(true);
        setShowNextDeparture(false);
        await fetchConnectedUsers();
    };

    // Gestion de l'affichage du prochain départ
    const handleNextDepartureClick = () => {
        setShowProfile(false);
        setShowNextDeparture(true);
    };

    // Retour au tableau de bord
    const handleBackToDashboard = () => {
        setShowProfile(false);
        setShowNextDeparture(false);
    };

    // Récupération des soumissions
    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/submissions');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des soumissions.');
            }
            const data = await response.json();
            setSubmissions(data);
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
            const response = await fetch(`http://localhost:8000/api/reservations/${reservationId}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue lors de la mise à jour du statut.');
            }
    
            const updatedStatus = await response.json();
            // Mettre à jour l'état des réservations
            const updatedReservations = reservations.map(reservation => {
                if (reservation.id === reservationId) {
                    // Ajouter le nouveau statut à la liste des statuts
                    return {
                        ...reservation,
                        statuses: [...reservation.statuses, updatedStatus],
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

    // Suppression d'une soumission
    const handleDeleteSubmission = async (id) => {
        console.log('ID à supprimer:', id); // Vérifiez l'ID ici
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette soumission ?')) {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`http://localhost:8000/api/submissions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const text = await response.text();
                    console.error('Response text:', text); // Affichez le texte de la réponse
                    throw new Error(text || 'Une erreur est survenue');
                }

                toast.success('Données supprimées avec succès!');
                await fetchSubmissions(); // Récupérer à nouveau les soumissions
            } catch (error) {
                console.error('Error deleting submission:', error);
                toast.error('Erreur lors de la suppression des données: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // Remplissage du formulaire pour modification
    const handleEditSubmission = (submission) => {
        setFormData({
            id: submission.id,
            company: submission.company,
            from: submission.from,
            to: submission.to,
            kilos: submission.kilos,
            departure_date: submission.departure_date,
            price: submission.price
        });
    };

    // Filtrage des réservations
    const filteredReservations = reservations.filter(reservation => {
        return (
            reservation.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.num.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Calculer les statistiques
    const totalKilos = reservations.reduce((total, reservation) => total + (reservation.kilos || 0), 0);
    const totalPrice = reservations.reduce((total, reservation) => total + (parseFloat(reservation.price) || 0), 0);

    // Récupération des soumissions
    useEffect(() => {
        fetchSubmissions();
    }, []);

    // Mise à jour d'une soumission
    const handleUpdateSubmission = async (id) => {
        if (!formData.company || !formData.from || !formData.to || !formData.kilos || !formData.departure_date || !formData.price) {
            toast.error('Veuillez remplir tous les champs requis.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/submissions/${id}`, formData);
            toast.success('Données mises à jour avec succès!');
            fetchReservations(); // Récupérer à nouveau les réservations
            setFormData({ id: null, company: '', from: '', to: '', kilos: '', departure_date: '', price: '' }); // Réinitialiser le formulaire
        } catch (error) {
            console.error('Error updating submission:', error);
            toast.error('Erreur lors de la mise à jour des données: ' + error.message);
        }
    };

    // Filtrage des soumissions
    const filteredSubmissions = submissions.filter(submission => {
        return (
            submission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.to.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="admin-dashboard" style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#343a40', color: '#ffffff' }}>
            <ToastContainer />
            <div className="wrapper">
                <div className="main-content" style={{ marginRight: sidebarCollapsed ? '0' : '300px', padding: '20px' }}>
                    <h1 className="mb-4" style={{ color: 'white' }}>Tableau de Bord Administrateur</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    {showProfile ? (
                        <div className="container mt-5">
                            {loading ? (
                                <p>Chargement des utilisateurs connectés...</p>
                            ) : (
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card bg-dark text-white">
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-dark table-striped table-bordered table-centered table-nowrap">
                                                        <thead>
                                                            <tr>
                                                            <th scope="col">#ID</th>

                                                                <th scope="col">Nom</th>
                                                                <th scope="col">Prénom</th>
                                                                <th scope="col">Email</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Array.isArray(connectedUsers) && connectedUsers.map(user => (
                                                                <tr key={user.id}>
                                                                    <td>{user.id}</td>
                                                                    <td>{user.name}</td>
                                                                    <td>{user.prenom}</td>
                                                                    <td>{user.email}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : showNextDeparture ? (
                        <div className="container mt-5">
                            <div className="row mb-4">
                                {/* Submission Form */}
                                <div className="col-md-6 mb-4">
                                    <form className="contact-form p-4 border rounded shadow bg-dark text-white" onSubmit={handleSubmit}>
                                        <h4 className="text-center mb-4 text-light">Formulaire de Soumission</h4>
                                        <div className="form-group">
                                            <label htmlFor="company">Entreprise</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-dark text-white"><i className="fas fa-building"></i></span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    id="company" 
                                                    name="company" 
                                                    className="form-control bg-dark text-white border" 
                                                    value={formData.company} 
                                                    onChange={handleChange} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="from">De</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-dark text-white"><i className="fas fa-map-marker-alt"></i></span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    id="from" 
                                                    name="from" 
                                                    className="form-control bg-dark text-white border" 
                                                    value={formData.from} 
                                                    onChange={handleChange} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="to">À</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-dark text-white"><i className="fas fa-map-marker-alt"></i></span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    id="to" 
                                                    name="to" 
                                                    className="form-control bg-dark text-white border" 
                                                    value={formData.to} 
                                                    onChange={handleChange} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="kilos">Kilos</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-dark text-white"><i className="fas fa-weight-hanging"></i></span>
                                                </div>
                                                <input 
                                                    type="number" 
                                                    id="kilos" 
                                                    name="kilos" 
                                                    className="form-control bg-dark text-white border" 
                                                    value={formData.kilos} 
                                                    onChange={handleChange} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="departure_date">Date de départ</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-dark text-white"><i className="fas fa-calendar-alt"></i></span>
                                                </div>
                                                <input 
                                                    type="date" 
                                                    id="departure_date" 
                                                    name="departure_date" 
                                                    className="form-control bg-dark text-white border" 
                                                    value={formData.departure_date} 
                                                    onChange={handleChange} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="price">Prix</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-dark text-white"><i className="fas fa-euro-sign"></i></span>
                                                </div>
                                                <input 
                                                    type="number" 
                                                    id="price" 
                                                    name="price" 
                                                    className="form-control bg-dark text-white border" 
                                                    value={formData.price} 
                                                    onChange={handleChange} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-light btn-block">Soumettre</button>
                                    </form>
                                </div>

                                {/* Submission Deletion Forms */}
                                {filteredSubmissions.map((submission) => (
                                    <div className="col-md-6 mb-4" key={submission.id}>
                                        <form className="contact-form p-4 border rounded shadow bg-dark text-white" onSubmit={(e) => {
                                            e.preventDefault();
                                            handleDeleteSubmission(submission.id);
                                        }}>
                                            <h4 className="text-center mb-4 text-light">Formulaire de suppression</h4>
                                            <div className="form-group">
                                                <label htmlFor="company">Entreprise</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-dark text-white"><i className="fas fa-building"></i></span>
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        id="company" 
                                                        name="company" 
                                                        className="form-control bg-dark text-white border" 
                                                        value={submission.company} 
                                                        readOnly 
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="from">De</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-dark text-white"><i className="fas fa-map-marker-alt"></i></span>
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        id="from" 
                                                        name="from" 
                                                        className="form-control bg-dark text-white border" 
                                                        value={submission.from} 
                                                        readOnly 
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="to">À</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-dark text-white"><i className="fas fa-map-marker-alt"></i></span>
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        id ="to" 
                                                        name="to" 
                                                        className="form-control bg-dark text-white border" 
                                                        value={submission.to} 
                                                        readOnly 
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="kilos">Kilos</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-dark text-white"><i className="fas fa-weight-hanging"></i></span>
                                                    </div>
                                                    <input 
                                                        type="number" 
                                                        id="kilos" 
                                                        name="kilos" 
                                                        className="form-control bg-dark text-white border" 
                                                        value={submission.kilos} 
                                                        readOnly 
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="departure_date">Date de départ</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-dark text-white"><i className="fas fa-calendar-alt"></i></span>
                                                    </div>
                                                    <input 
                                                        type="date" 
                                                        id="departure_date" 
                                                        name="departure_date" 
                                                        className="form-control bg-dark text-white border" 
                                                        value={submission.departure_date} 
                                                        readOnly 
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="price">Prix</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-dark text-white"><i className="fas fa-euro-sign"></i></span>
                                                    </div>
                                                    <input 
                                                        type="number" 
                                                        id="price" 
                                                        name="price" 
                                                        className="form-control bg-dark text-white border" 
                                                        value={submission.price} 
                                                        readOnly 
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-danger btn-block">Supprimer</button>
                                            <button type="button" className="btn btn-warning btn-block ms-4" onClick={() => handleEditSubmission(submission)}>Modifier</button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Statistiques */}
                            <div className="row mb-4">
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-dark text-white" style={{ height: '150px' }}>
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div className="float-right">
                                                <i className="fa fa-archive text-white h4 ml-3"></i>
                                            </div>
                                            <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{reservations.length}</h5>
                                            <p className="text-white mb-0">Total Reservations</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-dark text-white" style={{ height: '150px' }}>
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div className="float-right">
                                                <i className="fa fa-balance-scale text-white h4 ml-3"></i>
                                            </div>
                                            <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{totalKilos}</h5>
                                            <p className="text-white mb-0">Total Kilos</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-dark text-white" style={{ height: '150px' }}>
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div className="float-right">
                                                <i className="fa fa-euro-sign text-white h4 ml-3"></i>
                                            </div>
                                            <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{totalPrice.toFixed(2)} F CFA</h5>
                                            <p className="text-white mb-0">Total Price</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-dark text-white" style={{ height: '150px' }}>
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <form>
                                                <div className="form-group mb-0">
                                                    <label>Recherche</label>
                                                    <div className="input-group mb-0 mt-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            aria-describedby="project-search-addon"
                                                            value={searchTerm}
                                                            onChange={handleSearchChange}
                                                            style={{ backgroundColor: '#495057', color: 'white', borderRadius: '20px' }}
                                                        />
                                                        <i className="fas fa-search search-icon"></i>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Table des Réservations */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card bg-dark text-white">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                            <table className="table table-dark table-striped table-bordered table-centered table-nowrap">
    <thead>
        <tr>

            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Email</th>
            <th scope="col">Téléphone</th>
            <th scope="col">Kilos</th>
            <th scope="col">Entreprise</th>
            <th scope="col">Départ</th>
            <th scope="col">Arrivée</th>
            <th scope="col">Date</th>
            <th scope="col">Prix</th>
            <th scope="col">Statut</th>
            <th scope="col">Action</th>

        </tr>
    </thead>
    <tbody>
        {loading ? (
            <tr>
                <td colSpan="11" className="text-center">Loading...</td>
            </tr>
        ) : (
            filteredReservations.map((reservation, index) => (
                <tr key={index}>

                    <td>{reservation.nom}</td>
                    <td>{reservation.prenom}</td>
                    <td>{reservation.email}</td>
                    <td>{reservation.num}</td>
                    <td>{reservation.kilos}</td>
                    <td>{reservation.company}</td>
                    <td>{reservation.from}</td>
                    <td>{reservation.to}</td>
                    <td>{reservation.departure_date}</td>
                    <td>{parseFloat(reservation.price).toFixed(2)} F CFA</td>
                    <td>
    <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        id={`dropdownMenuButton${index}`} 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
    >
        Changer le statut 
    </button>
    <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`} style={{ zIndex: 100 }}>
        <li>
            <button 
                className="dropdown-item" 
                onClick={() => addStatus(reservation.id, 'En attente')}
            >
                En attente
            </button>
        </li>
        <li>
            <button 
                className="dropdown-item" 
                onClick={() => addStatus(reservation.id, 'En transit')}
            >
                En transit
            </button>
        </li>
        <li>
            <button 
                className="dropdown-item" 
                onClick={() => addStatus(reservation.id, 'Livré')}
            >
                Livré
            </button>
        </li>
        <li>
            <button 
                className="dropdown-item" 
                onClick={() => addStatus(reservation.id, 'Retourné')}
            >
                Retourné
            </button>
        </li>
        <li>
            <button 
                className="dropdown-item" 
                onClick={() => addStatus(reservation.id, 'Annulé')}
            >
                Annulé
            </button>
        </li>
    </ul>
</td>
                </tr>
            ))
        )}
    </tbody>
</table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <button className="btn btn-light toggle-btn shadow-sm" onClick={toggleSidebar}>
                    <i className="bi bi-list fs-5"></i>
                </button>

                <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
                    <div className="sidebar-header p-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Dashboard</h5>
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-light">
                                    <i className="bi bi-gear"></i>
                                </button>
                                <button className="btn btn-sm btn-light">
                                    <i className="bi bi-bell"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 border-bottom ">
                        <div className="d-flex align-items-center">
                            <img src="https://via.placeholder.com/40" className="rounded-circle me-2" alt="User  " />
                            <div>
                                <h6 className="mb-0">John Doe</h6>
                                <small className="text-muted">Online</small>
                            </div>
                        </div>
                    </div>

                    <nav className="nav flex-column mt-2">
                        <a href="#" className="nav-link active text-light" onClick={() => { setShowProfile(false); setShowNextDeparture(false); }}>
                            <i className="bi bi-house me-2"></i>
                            Dashboard
                        </a>
                        <a href="#" className="nav-link text-light" onClick={handleProfileClick}>
                            <i className="bi bi-person me-2"></i>
                            Utilisateurs
                        </a>
                        <a href="#" className="nav-link text-light" onClick={handleNextDepartureClick}>
                            <i className="bi bi-calendar me-2"></i>
                            Prochain Départ
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;