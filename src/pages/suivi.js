import React from 'react';
import '../pages/navbar.css';
import logo from '../pages/Logo Yonnee.png'; // Importez l'image de votre logo

const Suivi = () => {
    return ( 
        <div>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top">
                <div className="container">
                    <img src={logo} alt="Logo" style={{ width: '150px', height: '50px' }} />
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse p-3" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link me-5" href="#compte" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: 200 }}>Mon compte</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="hero" id="compte" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', fontWeight: 800, backgroundColor: '#343a40' }}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-lg-12 text-center mt-5">
                            <h1 className="display-4 fw-bold mb-4 text-light">
                                Suivez votre colis
                            </h1>
                            <div className='col-lg-12 bg-dark rounded-4 d-flex flex-column flex-md-row justify-content-center' style={{ padding: '40px 20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                                <div className="container">
                                    <div className="position-relative mb-4">
                                        <form className="d-flex">
                                            <div className="input-group">
                                                <input className="form-control form-control-lg" type="search" placeholder="Entrez votre numéro de suivi" aria-label="Search" />
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