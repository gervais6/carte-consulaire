import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../pages/navbar.css';
import { IoPersonAddSharp } from "react-icons/io5";
import { GiPadlock } from "react-icons/gi";
import { FaUserCircle, FaBars } from "react-icons/fa"; // Importation de l'icône de menu
import { Link } from 'react-router-dom';
import Footer from '../pages/Footer';

const Navbar = () => {
      return(
        <div>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>

<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">Awesome App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#features">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#about">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#contact">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<header class="hero">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h1 class="display-4 fw-bold mb-3">Experience the Future of Mobile Apps</h1>
                <p class="lead mb-4">Download our revolutionary app today and transform the way you interact with your
                    mobile device.</p>
                <a href="#" class="btn btn-light btn-lg me-2">
                    <i class="fab fa-apple me-2"></i>App Store
                </a>
                <a href="#" class="btn btn-outline-light btn-lg">
                    <i class="fab fa-google-play me-2"></i>Google Play
                </a>
            </div>
            <div class="col-lg-6 py-4">
                <img src="https://images.unsplash.com/photo-1592323360850-e317605f0526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8YXBwJTIwc2NyZWVuc2hvdHxlbnwwfDB8fHwxNzI3NzgzMDE1fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="App Screenshot" class="img-fluid app-screenshot"/>
            </div>
        </div>
    </div>
</header>

<section id="features" class="py-5">
    <div class="container">
        <h2 class="text-center mb-5">Key Features</h2>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="text-center">
                    <i class="fas fa-bolt feature-icon"></i>
                    <h3>Lightning Fast</h3>
                    <p>Experience unparalleled speed and performance.</p>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="text-center">
                    <i class="fas fa-lock feature-icon"></i>
                    <h3>Secure</h3>
                    <p>Your data is protected with state-of-the-art encryption.</p>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="text-center">
                    <i class="fas fa-sync feature-icon"></i>
                    <h3>Easy Sync</h3>
                    <p>Seamlessly sync across all your devices.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="about" class="bg-light py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6 order-lg-2">
                <h2 class="mb-4">About Our App</h2>
                <p>Our app is designed to simplify your life and boost your productivity. With intuitive features and a
                    user-friendly interface, you'll wonder how you ever lived without it.</p>
                <p>Join thousands of satisfied users who have already discovered the power of our app.</p>
            </div>
            <div class="col-lg-6 order-lg-1">
                <img src="https://images.unsplash.com/photo-1592323360850-e317605f0526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8YXBwJTIwc2NyZWVuc2hvdHxlbnwwfDB8fHwxNzI3NzgzMDE1fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="About Our App" class="img-fluid rounded"/>
            </div>
        </div>
    </div>
</section>

<section class="cta py-5">
    <div class="container text-center">
        <h2 class="mb-4">Ready to Get Started?</h2>
        <p class="lead mb-4">Download our app now and start your journey to a more efficient life!</p>
        <div>

<Link to="/connect" className="btn btn-primary btn-lg me-2">Se connecter</Link>

<Link to="/compte" className="btn btn-outline-primary btn-lg">Créer un compte</Link>

</div>    </div>
</section>

<footer class="bg-dark text-light py-4">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h5>Awesome App</h5>
                <p>Transforming the way you use your mobile device.</p>
            </div>
            <div class="col-md-6">
                <h5>Contact Us</h5>
                <p>Email: info@awesomeapp.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
        </div>
        <hr/>
        <div class="text-center">
            <p>&copy; 2023 Awesome App. All rights reserved.</p>
        </div>
    </div>
</footer>
</div>
      )   
  
};

export default Navbar;