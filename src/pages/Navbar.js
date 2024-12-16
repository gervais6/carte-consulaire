import React from 'react';
import '../pages/navbar.css';
import { Link } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset'; // Import de l'icône de réinitialisation

const Navbar = () => {
  return (
    <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />



      <header className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Bienvenue sur votre plateforme E-AFEP</h1>
              <h3 className="lead mb-4">Une solution conçue pour vous simplifier vos démarches administratives</h3>
              <div className="d-flex justify-content-start flex-column flex-md-row">
  <Link to="/connect" className="btn btn-light btn-lg me-2 mb-2 mb-md-0 btn-full-width">
    <i className="fa fa-sign-in me-2"></i>Se connecter
  </Link>
  <Link to="/compte" className="btn btn-outline-light btn-lg btn-full-width">
    <i className="fa fa-user-plus me-2"></i>Créer un compte
  </Link>
</div>            </div>
            <div className="col-lg-6 py-4">
              <img src="https://images.unsplash.com/photo-1592323360850-e317605f0526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8YXBwJTIwc2NyZWVuc2hvdHxlbnwwfDB8fHwxNzI3NzgzMDE1fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="App Screenshot" className="img-fluid app-screenshot" />
            </div>
          </div>
        </div>
      </header>


      {/* Le reste de votre code... */}
      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Pourquoi E-AFEP ?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <i className="fas fa-bolt feature-icon"></i>
                <h3>Gain de temps</h3>
                <p>Plus besoin de se déplacer : vos démarches quand vous voulez , où vous voulez</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <i className="fas fa-lock feature-icon"></i>
                <h3>Sécurité</h3>
                <p>Nous sécurisons et fiabilisons vos informations</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <i className="fas fa-sync feature-icon"></i>
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

      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
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
    </div>
  );
};

export default Navbar;