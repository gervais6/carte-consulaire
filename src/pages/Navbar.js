import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../pages/navbar.css';
import { IoPersonAddSharp } from "react-icons/io5";
import { GiPadlock } from "react-icons/gi";
import { FaUserCircle, FaBars } from "react-icons/fa"; // Importation de l'icône de menu
import { Link } from 'react-router-dom';
import Footer from '../pages/Footer';
import 'font-awesome/css/font-awesome.min.css'; // Assurez-vous d'importer Font Awesome

const Navbar = () => {
      return(
        <div>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>

<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">E-afep</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#features">Caractéristiques</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#about">À propos</a>
                </li>

            </ul>
        </div>
    </div>
</nav>

<header class="hero">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h1 class="display-4 fw-bold mb-3">Bienvenue sur votre plateforme E-AFEP</h1>
                <h3 class="lead mb-4"> Une solution conçue pour vous simplifier vos démarches administratives </h3>
                <div className="d-flex justify-content-start flex-column flex-md-row">

<Link to="/connect" className="btn btn-light btn-lg me-2 mb-2 mb-md-0">

    <i className="fa fa-sign-in me-2"></i>Se connecter

</Link>


<Link to="/compte" className="btn btn-outline-light btn-lg">

    <i className="fa fa-user-plus me-2"></i>Créer un compte

</Link>

</div></div>        <div class="col-lg-6 py-4">
                <img src="https://images.unsplash.com/photo-1592323360850-e317605f0526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8YXBwJTIwc2NyZWVuc2hvdHxlbnwwfDB8fHwxNzI3NzgzMDE1fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="App Screenshot" class="img-fluid app-screenshot"/>
            </div>
        </div>
    </div>
</header>

<section id="features" class="py-5">
    <div class="container">
        <h2 class="text-center mb-5">Pourquoi E-AFEP ?</h2>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="text-center">
                    <i class="fas fa-bolt feature-icon"></i>
                    <h3>Gain de temps</h3>
                    <p>Plus besoin de se déplacer : vos démarches quand vous voulez, où vous voulez</p>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="text-center">
                    <i class="fas fa-lock feature-icon"></i>
                    <h3>Sécurité</h3>
                    <p>Nous sécurisons et fiabiliser vos informations</p>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="text-center">
                    <i class="fas fa-sync feature-icon"></i>
                    <h3>Simplicité </h3>
                    <p>Un seul espace personnel pour tout faire et tout suivre en temps réel</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="about" class="bg-light py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-12">
            <h2 class="mb-4">Foire aux questions</h2>
            <div class="accordion" id="faqAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
                                Est-ce que E-AFEP?                            </button>
                    </h2>
                    <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                        Votre nouvelle application E-AFEP est un service pensé et conçu pour vous. Elle a pour objectif d’offrir à chacun de nos concitoyens la possibilité de faire ses démarches en ligne sans avoir à vous déplacer.                         </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                        Comment faire mes démarches en ligne ?                            </button>
                    </h2>
                    <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            . Création de compte <br/> <br/>
                            . Connexion à mon espace <br/> <br/>
                            . Effectuer mes démarches <br/> <br/>
                            . Suivi de mes demandes <br/> <br/>
                            . Retrait à l’ambassade



                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                                Est-ce que je peux faire avec E-AFEP ?
                            </button>
                    </h2>
                    <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">

        . Carte consulaire<br/>

                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
                                J'ai oublié mon mot de passe ?
                            </button>
                    </h2>
                    <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                        Il vous faut cliquer sur le lien "Mot de passe oublié" au niveau de la page login,puis tapper votre adresse mail et cliquer sur envoyer. Vous allez recevoir un email pour réinitialiser votremot de passe
                        </div>
                    </div>
                </div>
            </div>
        </div>       
         </div>
    </div>
</section>

<section class="cta py-5 mb-5">

</section>

<footer class="bg-dark text-light py-4">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h5>E-afep</h5>
                <p> Une solution conçue pour vous simplifier vos démarches administratives .</p>
            </div>
            <div class="col-md-6">
                <h5>Contactez-nous</h5>
                <p>Email: info@EFAP.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
        </div>
        <hr/>
        <div class="text-center">
            <p>&copy; 2023 E-AFEP. Tous droits réservés.  </p>
        </div>
    </div>
</footer>
</div>
      )   
  
};

export default Navbar;