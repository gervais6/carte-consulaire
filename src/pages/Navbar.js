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
                <a className="nav-link me-5" href="#compte" style={{color: '#2575fc',fontFamily: 'Poppins, sans-serif', fontWeight: 200}}>Mon compte</a>
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
        <div className="row align-items-center h-100">
            <div className="col-lg-12 text-center mt-5">
            <p className="display-4 fw-bold mb-5 mt-5 text-dark text-center responsive-text"  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800}}>
    Simplifiez l'envoi de<br /> vos colis 
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
            font-size: 45px; /* Taille pour les très petits écrans */
            font-family: 'Poppins, sans-serif';
            font-weight: 800;
            
            
        }
    }
`}</style>
<div className='col-lg-12 bg-dark rounded-4 d-flex flex-column flex-md-row justify-content-center' style={{ padding: '50px 50px 50px' }}>
    <Link to="/connect" className="btn btn-light btn-lg mb-3 mb-md-0 me-md-3 w-100 w-md-50 p-3 " style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, whiteSpace: 'nowrap' }}>
        <i className="fas fa-sign-in me-2" aria-hidden="true"></i>Se connecter
    </Link>
    <Link to="/compte" className="btn btn-light btn-lg w-100 w-md-50 p-3 " style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, whiteSpace: 'nowrap' }}>
        <i className="fas fa-user-plus me-2" aria-hidden="true"></i>S'inscrire
    </Link>
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
<h3 className="text-justify mb-5 mt-3" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 100,color:'#2575fc'}}>    <BsGraphUp style={{marginRight:15,marginTop:-10}} />Chiffres Clés</h3>
    <div className="row">
      <div className="col-md-4 mb-4"style={{fontFamily: 'Poppins, sans-serif'}}>
        <div className="text-center animate__animated animate__bounceIn"  >
          <h3 style={{fontFamily: 'Poppins, sans-serif', fontWeight: 800}} ><AnimatedNumber value={1000000 } /></h3>
          <p>Colis Livrés</p>
        </div>
      </div>
      <div className="col-md-4 mb-4"style={{fontFamily: 'Poppins, sans-serif'}}>
        <div className="text-center animate__animated animate__bounceIn">
          <h3 style={{fontFamily: 'Poppins, sans-serif', fontWeight: 800}}><AnimatedNumber value={500000 } /></h3>
          <p>Utilisateurs Satisfaits</p>
        </div>
      </div>
      <div className="col-md-4 mb-4"style={{fontFamily: 'Poppins, sans-serif'}}>
        <div className="text-center animate__animated animate__bounceIn">
          <h3 style={{fontFamily: 'Poppins, sans-serif', fontWeight: 800}}><AnimatedNumber value={130 } /></h3>
          <p>GPs effectués</p>
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
        src={myImage} 
        alt="App Screenshot" 
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