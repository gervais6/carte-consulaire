import React from 'react';
import '../pages/navbar.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Navbar = () => {
  const StyledButton = styled(Button)({
    margin: '0.5rem', // Adds spacing around the button
  });

  return (
    <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">E-AFEP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">Fonctionnalités</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">À propos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Simplifiez vos démarches administratives</h1>
              <p className="lead mb-4">Créez et gérez vos demandes de documents administratifs en quelques clics.</p>
              <Link to="/connect" className="btn btn-light btn-lg me-2">
                <i className="fas fa-sign-in me-2"></i>Se connecter
              </Link>
              <Link to="/compte" className="btn btn-outline-light btn-lg">
                <i className="fas fa-user-plus me-2"></i>S'inscrire
              </Link>
            </div>
            <div className="col-lg-6 py-4">
              <img src="https://images.unsplash.com/photo-1592323360850-e317605f0526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8YXBwJTIwc2NyZWVuc2hvdHxlbnwwfDB8fHwxNzI3NzgzMDE1fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="App Screenshot" className="img-fluid app-screenshot" />
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-5">
  <div className="container">
    <h2 className="text-center mb-5">Fonctionnalités Clés</h2>
    <div className="row">
      <div className="col-md-4 mb-4">
        <div className="text-center">
          <i className="fas fa-file-alt feature-icon"></i> {/* Document icon */}
          <h3>Gestion de Documents</h3>
          <p>Créez et gérez vos demandes de documents administratifs facilement.</p>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="text-center">
          <i className="fas fa-shield-alt feature-icon"></i> {/* Shield icon for security */}
          <h3>Sécurité</h3>
          <p>Vos informations sont protégées par des systèmes de sécurité avancés.</p>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="text-center">
          <i className="fas fa-sync feature-icon"></i> {/* Sync icon for easy sync */}
          <h3>Synchronisation Facile</h3>
          <p>Suivez l'avancement de vos demandes en temps réel.</p>
        </div>
      </div>

    </div>
  </div>
</section>

      <section id="about" className="bg-light py-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 order-lg-2">
                    <h2 className="mb-4">À propos de notre application</h2>
                    <p>Notre application est conçue pour simplifier vos démarches administratives. Avec une interface intuitive, vous pouvez facilement créer et suivre vos demandes de documents.</p>
                    <p>Rejoignez des milliers d'utilisateurs satisfaits qui ont déjà découvert la puissance de notre application.</p>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <img src="https://images.unsplash.com/photo-1592323360850-e317605f0526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8YXBwJTIwc2NyZWVuc2hvdHxlbnwwfDB8fHwxNzI3NzgzMDE1fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="À propos de notre application" className="img-fluid rounded" />
                </div>
            </div>
        </div>
    </section>

    <section className="cta py-5">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-12">
                <div className="accordion" id="modernAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Comment créer une demande ?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#modernAccordion">
                            <div className="accordion-body">
                                Pour créer une demande, connectez-vous à votre compte, sélectionnez le type de document que vous souhaitez demander, remplissez le formulaire en ligne avec les informations requises, puis soumettez votre demande.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Comment suivre l'état de ma demande  en ligne?
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#modernAccordion">
                            <div className="accordion-body">
                                Vous pouvez suivre l'état de votre demande en vous rendant dans la section "suivi de la carte consulaire" de votre compte. Vous y trouverez des mises à jour sur le statut de votre demande et des notifications par e-mail.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Que faire si j'ai des problèmes avec ma demande ?
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#modernAccordion">
                            <div className="accordion-body">
                                Si vous rencontrez des problèmes avec votre demande, vous pouvez consulter notre section d'aide ou contacter notre support client via le formulaire de contact disponible dans l'application.
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
                    <h5>E-AFEP</h5>
                    <p>Transformez la façon dont vous gérez vos démarches administratives.</p>
                </div>
                <div className="col-md-6">
                    <h5>Contactez-nous</h5>
                    <p>Email: info@eafep.com</p>
                    <p>Téléphone: (123) 456-7890</p>
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