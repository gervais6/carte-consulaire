import React from 'react';
import '../pages/navbar.css';
import { Link } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset'; // Import de l'icône de réinitialisation

const Navbar = () => {
  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
            <div class="container px-5">
                <a class="navbar-brand fw-bold" href="#page-top">Start Bootstrap</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="bi-list"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#features">Features</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#download">Download</a></li>
                    </ul>
                    <button class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                        <span class="d-flex align-items-center">
                            <i class="bi-chat-text-fill me-2"></i>
                            <span class="small">Send Feedback</span>
                        </span>
                    </button>
                </div>
            </div>
        </nav>
      <header className="masthead">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <h1 className="display-4 fw-bold mb-3">Bienvenue sur votre plateforme E-AFEP</h1>
                <p className="lead fw-normal text-muted mb-5">Une solution conçue pour simplifier vos démarches administratives</p>
                <div className="d-flex justify-content-start flex-column flex-md-row">
                  <Link to="/connect" className="btn btn-light btn-lg me-2 mb-2" aria-label="Se connecter">
                    <i className="fa fa-sign-in me-2"></i>Se connecter
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="masthead-device-mockup">
                <svg className="shape-1 d-none d-sm-block" viewBox="0 0 240.83 240.83" xmlns="http://www.w3.org/2000/svg">
                  <rect x="-32.54" y="78.39" width="305.92" height="84.05" rx="42.03" transform="translate(120.42 -49.88) rotate(45)"></rect>
                  <rect x="-32.54" y="78.39" width="305.92" height="84.05" rx="42.03" transform="translate(-49.88 120.42) rotate(-45)"></rect>
                </svg>
                <svg className="shape-2 d-none d-sm-block" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <div className="device-wrapper">
                  <div className="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
                    <div className="screen bg-black"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Pourquoi E-AFEP ?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <i className="fas fa-clock feature-icon"></i>
                <h3>Gain de temps</h3>
                <p>Plus besoin de se déplacer : vos démarches quand vous voulez, où vous voulez</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <i className="fas fa-shield-alt feature-icon"></i>
                <h3>Sécurité</h3>
                <p>Nous sécurisons et fiabilisons vos informations</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <i className="fas fa-thumbs-up feature-icon"></i>
                <h3>Simplicité</h3>
                <p>Un seul espace personnel pour tout faire et tout suivre en temps réel</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="cta">
        <div className="cta-content">
          <div className="container text-center px-5">
            <h2 className="text-white display-1 lh-1 mb-4">
              Arrêtez n'attendez plus
              <br />
              Inscrivez-vous 
            </h2>
            <Link to="/compte" className="btn btn-outline-light py-3 px-4 rounded-pill">Inscrivez-vous</Link>  
          </div>
        </div>
      </section>

      <footer className="bg-light text-black py-4">
        <div className="container mt-3">
          <div className="row text-center">
            <div className="col-md-6">
              <h5>E-afep</h5>
              <p>Une solution conçue pour vous simplifier vos démarches administratives.</p>
            </div>
            <div className="col-md-6">
              <h5>Contactez-nous</h5>
              <p>Email: info@EFAP .com</p>
              <p>Téléphone: (123) 456-7890</p>
            </div>
          </div>
          <hr />
          <div className="text-center">
            <p>&copy; 2023 E-AFEP. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Navbar;