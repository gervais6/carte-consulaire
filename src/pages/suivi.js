import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/navbar.css';
import logo from '../pages/Logo Yonnee.png';
import { BiUserCircle } from 'react-icons/bi'; // Exemple d'icône d'utilisateur
const Suivi = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const navigate = useNavigate();
    const [userName, setUserName] = useState(''); // État pour le nom de l'utilisateur



    useEffect(() => {
        // Récupérer le token depuis le localStorage
        const storedToken = localStorage.getItem('token');
        console.log("Token récupéré:", storedToken); // Ajoutez ceci pour déboguer
        if (!storedToken) {
            // Rediriger vers la page de connexion si le token n'existe pas
            navigate('/connect'); // Remplacez '/connect' par la route de votre page de connexion
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Numéro de suivi soumis:", trackingNumber);
        // Ajoutez ici la logique pour traiter le numéro de suivi
    };


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


    const handleLogout = () => {

        localStorage.removeItem('token'); // Supprime le token

        localStorage.removeItem('userName'); // Supprime le nom de l'utilisateur

        navigate('/'); // Redirige vers la page de connexion

    };



 

    return ( 
        <div>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top" >
                <div className="container">
                    <img src={logo} alt="Logo" style={{ width: '150px', height: '50px' }} />
                    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto">


                        <div className="dropdown ms-auto "style={{marginRight:-25}} >

                        <button className="  btn btn-outline-dark text-light   dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">

<BiUserCircle className="me-2  " style={{fontSize:25,marginLeft:100}} /> {/* Icône d'utilisateur */}

Mon compte

</button>

<ul className="dropdown-menu dropdown-menu-end">

    <li>

        <a className="dropdown-item" href="#" onClick={handleLogout}>

            <i className="bi bi-box-arrow-right"></i> Déconnexion

        </a>

    </li>

    <li>

        <a className="dropdown-item disabled" href="#">

            <h6 className="text-dark mb-0">Bienvenue, {userName}!</h6> {/* Affiche le nom de l'utilisateur */}

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