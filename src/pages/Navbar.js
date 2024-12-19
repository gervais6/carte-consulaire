import React from 'react';
import '../pages/navbar.css';
import { Link } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset'; // Import de l'icône de réinitialisation

const Navbar = () => {
  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      
      <header class="masthead">
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-lg-6">
                        <div class="mb-5 mb-lg-0 text-start text-lg-start">
                        <h1 className="display-4 fw-bold mb-3 ">Bienvenue sur votre plateforme E-AFEP</h1>
                        <p class="lead fw-normal text-muted mb-5">Une solution conçue pour simplifier vos démarches administratives</p>
                        <div className="d-flex justify-content-start flex-column flex-md-row">
    <Link to="/connect" className="btn btn-light btn-lg me-2 mb-2" aria-label="Se connecter">
      <i className="fa fa-sign-in me-2"></i>Se connecter
    </Link>

  </div>

                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="masthead-device-mockup">
                            <svg class="circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="circleGradient" gradientTransform="rotate(45)">
                                        <stop class="gradient-start-color" offset="0%"></stop>
                                        <stop class="gradient-end-color" offset="100%"></stop>
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="50"></circle></svg
                            ><svg class="shape-1 d-none d-sm-block" viewBox="0 0 240.83 240.83" xmlns="http://www.w3.org/2000/svg">
                                <rect x="-32.54" y="78.39" width="305.92" height="84.05" rx="42.03" transform="translate(120.42 -49.88) rotate(45)"></rect>
                                <rect x="-32.54" y="78.39" width="305.92" height="84.05" rx="42.03" transform="translate(-49.88 120.42) rotate(-45)"></rect></svg
                            ><svg class="shape-2 d-none d-sm-block" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"></circle></svg>
                            <div class="device-wrapper">
                                <div class="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
                                    <div class="screen bg-black">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb -5">Pourquoi E-AFEP ?</h2>
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
      

      <section id="about" className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h2 className="mb-4">Foire aux questions</h2>
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
                      Est-ce que E-AFEP?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Votre nouvelle application E-AFEP est un service pensé et conçu pour vous. Elle a pour objectif d’offrir à chacun de nos concitoyens la possibilité de faire ses démarches en ligne sans avoir à vous déplacer.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                      Comment faire mes démarches en ligne ?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      . Création de compte <br /> <br />
                      . Connexion à mon espace <br /> <br />
                      . Effectuer mes démarches <br /> <br />
                      . Suivi de mes demandes <br /> <br />
                      . Retrait à l’ambassade
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                      Est-ce que je peux faire avec E-AFEP ?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      . Carte consulaire<br />
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
                      J'ai oublié mon mot de passe ?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Il vous faut cliquer sur le lien "Mot de passe oublié" au niveau de la page login, puis taper votre adresse mail et cliquer sur envoyer. Vous allez recevoir un email pour réinitialiser votre mot de passe.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta">
            <div class="cta-content">
                <div class="container px-5">
                    <h2 class="text-white display-1 lh-1 mb-4">
                        
                        Arrêtez d'attendre.
                        <br />
                        Inscrivez-vous .
                    </h2>
                   <Link to="/compte" class="btn btn-outline-light py-3 px-4 rounded-pill" >Inscrivez-vous</Link>  
                </div>
            </div>
        </section>

      <footer class Name="bg-dark text-light py-4">
        <div className="container mt-3 ">
          <div className="row ">
            <div className="col-md-6 ">
              <h5>E-afep</h5>
              <p>Une solution conçue pour vous simplifier vos démarches administratives.</p>
            </div>
            <div className="col-md-6">
              <h5>Contactez -nous</h5>
              <p>Email: info@EFAP.com</p>
              <p>Phone: (123) 456-7890</p>
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