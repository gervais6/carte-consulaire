import React from 'react';
import '../pages/navbar.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import myImage from '../pages/cover_app.png'; // Importez l'image
import logo from '../pages/LOGO.png'; // Importez l'image de votre logo
import { FaFacebook } from "react-icons/fa6";
import { BsGraphUp } from "react-icons/bs";
import { useSpring, animated } from 'react-spring';
const AnimatedNumber = ({ value }) => {

  const props = useSpring({ number: value, from: { number: 0 }, config: { duration: 1000 } });


  return (

    <animated.h3>

      {props.number.to(n => Math.floor(n))}

    </animated.h3>

  );

};


const Navbar = ({ value }) => {

  const StyledButton = styled(Button)({
    margin: '0.5rem', // Adds spacing around the button
  });

  

  return (
    <div>
      
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet"/>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"/>

      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container">
          <img src={logo} alt=" Logo" style={{ width: '120px', height: '30px' }} /> {/* Ajoutez l'image ici */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse p-3 " id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <a className="nav-link me-5" href="#compte" data-bs-toggle="modal" data-bs-target="#loginModal" style={{color: '#2575fc',fontFamily: 'Poppins, sans-serif', fontWeight: 200}}>Se connecter</a>
              </li>

              <li className="nav-item">
                <a className="nav-link me-5" href="#about" style={{color: '#2575fc',fontFamily: 'Poppins, sans-serif', fontWeight: 200}}>À propos de nous</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" style={{color: '#2575fc',fontFamily: 'Poppins, sans-serif', fontWeight: 200}}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="hero" id="compte" style={{  minHeight: '100vh' ,fontFamily: 'Poppins, sans-serif', fontWeight: 800}}>
        
    <div className="container h-100">
    <div class="container ">


<div class="modal fade" id="loginModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Welcome Back!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <div class="input-group">
              <input type="email" class="form-control" placeholder="name@example.com"/>
              <span class="input-group-text">
                  <i class="fas fa-envelope"></i>
                </span>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <div class="input-group">
              <input type="password" class="form-control" placeholder="Enter your password"/>
              <span class="input-group-text password-toggle">
                  <i class="fas fa-eye"></i>
                </span>
            </div>
          </div>

          <div class="form-check">
            <div>
              <input type="checkbox" class="form-check-input" id="remember"/>
              <label class="form-check-label" for="remember">Remember me</label>
            </div>
            <a href="#" class="text-decoration-none">Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-login text-white">Sign In</button>

          <div class="divider">
            <span>or continue with</span>
          </div>

          <div class="social-login">
            <button type="button" class="btn btn-social">
                <i class="fab fa-google"></i>Google
              </button>
            <button type="button" class="btn btn-social">
                <i class="fab fa-facebook-f"></i>Facebook
              </button>
          </div>

          <div class="register-link">
            Don't have an account? <a href="#" class="text-decoration-none">Register now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
        <div className="row align-items-center h-100">
            <div className="col-lg-12 text-justify mt-5">
            <p className="display-4 fw-bold mb-5 mt-5 text-dark text-justify responsive-text"  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800}}>
    Simplifiez l'envoi de vos colis en un clic
</p>

<style jsx>{`
    .responsive-text {
        font-size: 70px; /* Taille par défaut pour les écrans larges */
        line-height: 1.2;
        font-family: 'Poppins, sans-serif';
        font-weight: 800;
    }

    @media (max-width: 1200px) {
        .responsive-text {
            font-size: 80px; /* Taille pour les écrans de taille moyenne */
            font-family: 'Poppins, sans-serif';
            font-weight: 800;
        }
    }

    @media (max-width: 992px) {
        .responsive-text {
            font-size: 70px; /* Taille pour les écrans plus petits */
            font-family: 'Poppins, sans-serif';
            font-weight: 800;
        }
    }

    @media (max-width: 768px) {
        .responsive-text {
            font-size: 60px; /* Taille pour les appareils mobiles */
            font-family: 'Poppins, sans-serif';
            font-weight: 800;
        }
    }

    @media (max-width: 576px) {
        .responsive-text {
            font-size: 50px; /* Taille pour les très petits écrans */
            font-family: 'Poppins, sans-serif';
            font-weight: 800;
            
            
        }
    }
`}</style>
<div className='col-lg-12 bg-dark rounded-4 d-flex flex-column flex-md-row justify-content-center' style={{ padding: '50px 30px 80px' }}>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"/>

    <div class="container">

        <div class="position-relative mb-4">
            <input type="text" class="form-control search-input" placeholder="Type to search..."/>
            <i class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
        </div>

        <div class="search-tags d-flex flex-wrap mb-4">
            <span class="tag">Technology</span>
            <span class="tag">Design</span>
            <span class="tag">Development</span>
            <span class="tag">AI</span>
            <span class="tag">Machine Learning</span>
        </div>

        <div class="recent-searches pt-3">
            <p class="text-muted mb-3">Recent Searches</p>
            <div class="recent-item d-flex align-items-center">
                <i class="bi bi-clock-history me-2"></i>
                <span>Modern Web Development</span>
            </div>
            <div class="recent-item d-flex align-items-center">
                <i class="bi bi-clock-history me-2"></i>
                <span>UI/UX Best Practices</span>
            </div>
            <div class="recent-item d-flex align-items-center">
                <i class="bi bi-clock-history me-2"></i>
                <span>Bootstrap 5 Tutorial</span>
            </div>
        </div>
    </div>
</div>





<div className='col-lg-12 rounded-pill bg-dark p-3  mx-auto text-center' style={{ position: 'relative', zIndex: 1, marginTop: -30, border: '3px solid #2575fc' ,width:250,fontFamily: 'Poppins, sans-serif', fontWeight: 200}}>
 REJOIGNEZ NOUS 
 <a href="#" class="social-icon bg-primary"><i class="fab fa-facebook-f"></i></a>

</div> 
            </div>
        </div>
    </div>
</header>

<section id="features" className="py-5" style={{ background: '#2575fc' }}>
  <div className="container">
  <div className='col-lg-12 bg-dark rounded-4  ' style={{paddingBottom:60,paddingTop:40,paddingRight:80,paddingLeft:80,color:'white'}}>

    {/* Section Chiffres Clés */}
<div class="container py-5">
        <div class="text-center mb-5">
            <h1 class="section-heading display-4 mb-3">Discover Features</h1>
            <p class="text-muted lead">Explore our powerful tools designed to enhance your workflow</p>
        </div>

        <div class="row g-4">
            <div class="col-md-4">
                <div class="card feature-card h-100 p-4">
                    <div class="icon-wrapper bg-soft-primary">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
                            class="text-primary">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h3 class="card-title">Smart Analytics</h3>
                    <p class="card-text text-muted">Get deep insights into your data with our advanced analytics tools.
                    </p>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card feature-card h-100 p-4">
                    <div class="icon-wrapper bg-soft-success">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
                            class="text-success">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <h3 class="card-title">Real-time Monitoring</h3>
                    <p class="card-text text-muted">Monitor your systems in real-time with instant notifications.</p>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card feature-card h-100 p-4">
                    <div class="icon-wrapper bg-soft-warning">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
                            class="text-warning">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h3 class="card-title">Advanced Security</h3>
                    <p class="card-text text-muted">Enterprise-grade security to protect your valuable data.</p>
                </div>
            </div>
        </div>
    </div>
  </div>
  </div>
</section>

<section id="about" className="py-5" style={{ background: '#2575fc' }}>
    <div className="container">
        <div className='col-lg-12 bg-dark rounded-4' style={{ paddingBottom: 60, paddingTop: 40, paddingRight: 20, paddingLeft: 20, color: 'white', background: 'rgba(37, 117, 252, 0.8)' }}>
            <div className="row align-items-center">
                <div className="col-lg-6 order-lg-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                    <h1 className="mb-4 ">Yóbbal, c’est quoi ?</h1>
                    <p>
                        Yóbbal est une plateforme dédiée à l'envoi de colis. Nous gérons entièrement le processus d'expédition en utilisant nos propres GPs. Les clients souhaitant envoyer un colis, nous contactent directement pour organiser l'envoi, et nous leur permettons de suivre leur colis en temps réel via notre application ou notre site web.
                    </p>
                    <p>Rejoignez des milliers d'utilisateurs satisfaits qui ont déjà découvert la rapidité et la fiabilité de notre service d'envoi de colis.</p>

                    <br />
                    <p>Yóbbal offre une interface fluide et facilite au mieux le processus qui compte 5 étapes :
                        <br /><br />
                        01. Je renseigne l’adresse de départ et l’adresse de destination
                        <br /><br />
                        02. Je choisis une date de départ
                        <br /><br />
                        03. Je consulte les départs disponibles
                        <br /><br />
                        04. Je réserve et je me fais contacter par un conseiller de Yóbbal pour organiser l’envoi
                        <br /><br />
                        05. Je reçois mon numéro de suivi après paiement pour suivre mon colis en temps réel depuis l’application ou sur le site de Yóbbal.
                    </p>
                </div>
<div className="col-lg-6 order-lg-1 text-center">
    <img 
        src={""} 
        alt="" 
        className="img-fluid app-screenshot" 
        style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} 
    />
</div>
            </div>
        </div>
    </div>
</section>



    <footer className="bg-dark text-light py-5" id="contact" style={{  minHeight: '90vh' ,fontFamily: 'Poppins, sans-serif'}} >
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                    <h1 className='text-center mb-5 mt-5'style={{fontFamily: 'Poppins, sans-serif', fontWeight: 800,color:" #2575fc"}}>Contactez-nous</h1>
                    
    
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="contact-form p-5 shadow-sm ">
                    <h7 class="text-center mb-4  " style={{color:"black"}}>Envoyer un message</h7>
                    <form>
                        <div class="row g-3 mt-3" >
                            <div class="col-md-6">
                                <input type="text" class="form-control custom-input" placeholder="Nom"/>
                            </div>
                            <div class="col-md-6">
                                <input type="text" class="form-control custom-input" placeholder="Prenom"/>
                            </div>
                            <div class="col-12">
                                <input type="email" class="form-control custom-input" placeholder="Email "/>
                            </div>
                            <div class="col-12">
                                <textarea class="form-control custom-input" rows="5" placeholder=" Message"></textarea>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary w-100 py-3" type="submit">Envoyer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

              
            </div>
             
             </div>

        </div>
    </footer>



    <footer class="bg-dark text-light py-5 "style={{ fontFamily: 'Poppins, sans-serif'}}>

    <footer class="footer text-center"style={{  fontFamily: 'Poppins, sans-serif'}}>
    <div class="container "style={{  fontFamily: 'Poppins, sans-serif'}}>
        <p>Copyright &copy; 2024. All rights reserved.</p>
        <p>Designed with <span class="text-danger">&hearts;</span> by Your Name</p>
    </div>
    <div class="social-links">
                    <a href="#" class="social-icon bg-primary"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-icon bg-info"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-icon bg-danger"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-icon bg-primary"><i class="fab fa-linkedin-in"></i></a>
                </div>

</footer>

    
</footer>
    
</div>

);
};

export default Navbar;