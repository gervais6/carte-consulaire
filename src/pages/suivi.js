import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/navbar.css';
import logo from '../pages/Logo Yonnee.png';
import { BiUserCircle } from 'react-icons/bi'; // Exemple d'icône d'utilisateur
import { ToastContainer, toast } from 'react-toastify'; // Importer ToastContainer et toast
import 'react-toastify/dist/ReactToastify.css'; // Importer le CSS de react-toastify

const Suivi = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserEmail = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/personal-info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajout du token
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    toast.error(`Erreur lors de la récupération de l'email: ${response.status} ${errorMessage}`); // Afficher un toast d'erreur
                    throw new Error(`Erreur lors de la récupération de l'email: ${response.status} ${errorMessage}`);
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
        // Récupérer le token depuis le localStorage
        const storedToken = localStorage.getItem('token');
        console.log("Token récupéré:", storedToken); // Ajoutez ceci pour déboguer
        if (!storedToken) {
            // Rediriger vers la page de connexion si le token n'existe pas
            navigate('/connect'); // Remplacez '/connect' par la route de votre page de connexion
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Numéro de suivi soumis:", trackingNumber);

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
                toast.error(`Erreur lors de la récupération des informations de suivi: ${response.status} ${errorMessage}`); // Afficher un toast d'erreur
                throw new Error(`Erreur lors de la récupération des informations de suivi: ${response.status} ${errorMessage}`);
            }

            const data = await response.json();
            // Traitez les données de suivi ici
            console.log("Données de suivi:", data);
        } catch (error) {
            console.error("Erreur:", error);
            toast.error('Erreur lors de la récupération des informations de suivi.'); // Afficher un toast d'erreur générique
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
                console.log("Déconnexion réussie");
                window.location.href = '/';
            } else {
                console.error("Erreur lors de la déconnexion");
                toast.error('Erreur lors de la déconnexion.'); // Afficher un toast d'erreur
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            toast.error('Erreur réseau lors de la déconnexion.'); // Afficher un toast d'erreur
        }
    };

    return ( 
        <div>
            <ToastContainer /> {/* Ajouter le ToastContainer ici */}
            <nav className="navbar navbar-expand-lg bg-dark fixed-top">
                <div className="container">
                    <img src={logo} alt="Logo" style={{ width: '150px', height: '50px' }} />
                    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <div className="dropdown ms-auto" style={{ marginRight: -25 }}>
                                <button className="btn btn-outline-dark text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BiUserCircle className="me-2" style={{ fontSize: 25, marginLeft: 100 }} /> {/* Icône d'utilisateur */}
                                    Mon compte
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className="dropdown-item disabled" href="#">
                                            <h6 className="text-dark mb-0"><span style={{ color: 'black' }}>{loading ? 'Chargement...' : email}</span></h6>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={handleLogout}>
                                            <i className="bi bi-box-arrow-right"></i> Déconnexion
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="hero" id="compte" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', fontWeight: 800, backgroundColor: '#343a40', overflow: 'auto' }}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-lg-12 text-center mt-5">
                            <h1 className="display-4 fw-bold mb-4 text-light">Suivez votre colis</h1>
                            <div className='col-lg-12 bg-dark rounded-4 d-flex flex-column flex-md-row justify-content-center' style={{ padding: '40px 20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                                <div className="container">
                                    <div className="position-relative mb-4">
                                        <form className="d-flex" onSubmit={handleSubmit}>
                                            <div className="input-group">
                                                <input 
                                                    className="form-control form-control-lg" 
                                                    type="search" 
                                                    placeholder="Entrez votre numéro de suivi" 
                                                    aria-label="Search" 
                                                    value={trackingNumber}
                                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                                />
                                                <button className="btn btn-light px-4" type="submit">
                                                    <i className="bi bi-search"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <footer className="bg-dark text-light py-5" style={{ fontFamily: 'Poppins, sans-serif', marginTop: -200 }}>
                <footer className="footer text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <div className="container">
                        <p>Copyright &copy; Tous droits réservés.</p>
                        <p>Conçu avec <span className="text-danger">&hearts;</span> par DEFAR</p>
                    </div>
                    <div className="social-links">
                        <a href="#" className="social-icon bg-primary"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon bg-info"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon bg-danger"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-icon bg-primary"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </footer>
            </footer>
        </div>
    );
};

export default Suivi;