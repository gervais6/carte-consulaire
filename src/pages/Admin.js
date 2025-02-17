import React, { useState, useEffect } from 'react';
import './Admin.css'; // Assurez-vous d'avoir ce fichier CSS pour le style
import axios from 'axios';

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

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Gestion de la recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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

            alert('Données enregistrées avec succès !');
            await fetchReservations(); // Récupérer les réservations après la soumission
            setFormData({ company: '', from: '', to: '', kilos: '', departure_date: '', price: '' }); // Réinitialiser le formulaire
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Erreur lors de l\'envoi des données : ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Récupération des réservations
    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/reservations');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des réservations.');
            }
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setError('Erreur lors de la récupération des réservations.');
        } finally {
            setLoading(false);
        }
    };

    // Récupération des utilisateurs connectés
    const fetchConnectedUsers = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/connected-users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des utilisateurs connectés.');
            }

            const data = await response.json();
            setConnectedUsers(data);
        } catch (error) {
            console.error('Error fetching connected users:', error);
            setError('Erreur lors de la récupération des utilisateurs connectés.');
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

    // Suppression d'une soumission
    const handleDeleteSubmission = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette soumission ?')) {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`http://localhost:8000/api/submissions/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Une erreur est survenue');
                }

                alert('Données supprimées avec succès !');
                fetchReservations(); // Récupérer à nouveau les réservations
            } catch (error) {
                console.error('Error deleting submission:', error);
                setError('Erreur lors de la suppression des données : ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // Remplissage du formulaire pour modification
    const handleEditSubmission = (submission) => {
        setFormData({
            id: submission.id, // Assurez-vous de définir l'ID
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

    // Mise à jour d'une soumission
    const handleUpdateSubmission = async (id) => {
        // Vérifiez que tous les champs requis sont remplis
        if (!formData.company || !formData.from || !formData.to || !formData.kilos || !formData.departure_date || !formData.price) {
            alert('Veuillez remplir tous les champs requis.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/submissions/${id}`, formData);
            console.log('Submission updated:', response.data);
            alert('Données mises à jour avec succès !');
            fetchReservations(); // Récupérer à nouveau les réservations
            setFormData({ id: null, company: '', from: '', to: '', kilos: '', departure_date: '', price: '' }); // Réinitialiser le formulaire
        } catch (error) {
            console.error('Error updating submission:', error);
            setError('Erreur lors de la mise à jour des données : ' + error.message);
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
            <div className="wrapper">
                <div className="main-content" style={{ marginRight: sidebarCollapsed ? '0' : '300px', padding: '20px' }}>
                    <h1 className="mb-4" style={{ color: 'white' }}>Tableau de Bord Administrateur</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    {showProfile ? (
                        <div>
                            <h2>Profil de l'utilisateur</h2>
                            <button onClick={handleBackToDashboard} className="btn btn-secondary">Retour au tableau de bord</button>
                            {loading ? (
                                <p>Chargement des utilisateurs connectés...</p>
                            ) : (
                                <>
                                    {/* Statistiques des utilisateurs connectés */}
                                    <div className="row mb-4">
                                        <div className="col-xl-3 col-md-6">
                                            <div className="card bg-dark text-white" style={{ height: '150px' }}>
                                                <div className="card-body d-flex flex-column justify-content-between">
                                                    <div className="float-right">
                                                        <i className="fa fa-users text-white h4 ml-3"></i>
                                                    </div>
                                                    <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{connectedUsers.length}</h5>
                                                    <p className="text-white mb-0">Utilisateurs Connectés</p>
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
                                                    <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{totalPrice.toFixed(2)} F cfa</h5>
                                                    <p className="text-white mb-0">Total Price</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Table des Utilisateurs Connectés */}
                                    <h3>Utilisateurs connectés :</h3>
                                    <div className="table-responsive">
                                        <table className="table table-dark table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nom</th>
                                                    <th scope="col">Prénom</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Statut</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {connectedUsers.map(user => (
                                                    <tr key={user.id}>
                                                        <td>{user.name}</td>
                                                        <td>{user.prenom}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
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
                                            <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{totalPrice.toFixed(2)} F cfa</h5>
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
                                                                    <td>{parseFloat(reservation.price).toFixed(2)} F cfa</td>
                                                                    <td>
                                                                        <div className="action">
                                                                            <a href="#" className="text-success mr-4" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => handleEditSubmission(reservation)}>
                                                                                <i className="fa fa-pencil h5 m-0"></i>
                                                                            </a>
                                                                            <a href="#" className="text-danger" data-toggle="tooltip" data-placement="top" title="Close" onClick={() => handleDeleteSubmission(reservation.id)}>
                                                                                <i className="fa fa-remove h5 m-0"></i>
                                                                            </a>
                                                                        </div>
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
                            <img src="https://via.placeholder.com/40" className="rounded-circle me-2" alt="User    " />
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