import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../pages/navbar.css';
import { IoPersonAddSharp } from "react-icons/io5";
import { GiPadlock } from "react-icons/gi";
import { FaUserCircle, FaBars } from "react-icons/fa"; // Importation de l'icône de menu
import { Link } from 'react-router-dom';
import Footer from '../pages/Footer';

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const myRef = useRef(null);

  const handleScroll = useCallback(() => {
    setIsFixed(window.scrollY >= 200);
  }, []);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  const handleMouseEnter = () => {
    if (windowWidth >= 768) {
      setDropdownVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (windowWidth >= 768) {
      setDropdownVisible(false);
    }
  };

  const handleNavToggle = () => {
    setNavVisible(prevState => !prevState);
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(prevState => !prevState);
  };

  return (
    <>
      <header className="header-area overlay">
        <nav ref={myRef} className={`navbar navbar-expand-md navbar-dark ${isFixed ? 'fixed-top' : ''}`}>
          <div className="container">
            <a href="/" className="navbar-brand">E-AFEP</a>

            {/* Bouton pour ouvrir l'offcanvas sur mobile avec icône de menu */}
            {windowWidth < 768 && (
              <button
                className="btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                style={{ backgroundColor: 'black', color: 'white' }} // Couleur de fond et couleur du texte
              >
                <FaBars style={{ fontSize: '24px' }} />
              </button>
            )}

            {/* Offcanvas menu uniquement visible sur mobile */}
            {windowWidth < 768 && (
  <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" style={{backgroundColor:"#20247b"}}>
    <div className="offcanvas-header">
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body  "  >
      <ul className="navbar-nav flex-column" style={{backgroundColor:"#20247b"}}> {/* Menu vertical */}
        <li className={`nav-item dropdown ${dropdownVisible ? 'show' : ''}`} >
          <a
            href="#"
            className="nav-link dropdown-toggle"
            onClick={handleDropdownToggle}
            aria-haspopup="true"
            aria-expanded={dropdownVisible}

          >
            <FaUserCircle style={{ marginRight: 5 }} /> Mon espace E-AFEP
          </a>
          <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
            <Link to="/profils" className="dropdown-item" style={{backgroundColor:"#20247b"}}>Mon compte</Link>
            <a href="#" className="dropdown-item" style={{backgroundColor:"#20247b"}}>Déconnexion</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
)}
            {/* Menu classique pour les écrans plus larges */}
            <div id="main-nav" className={`collapse navbar-collapse ${navVisible ? 'show' : ''}`}>
              <ul className="navbar-nav ms-auto">
                {windowWidth >= 768 && (
                  <li className="nav-item">
                    <Link to="/guide" className="nav-link">Guide utilisateur</Link>
                  </li>
                )}
                <li className={`nav-item dropdown ${dropdownVisible ? 'show' : '' }`}>
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    onClick={handleDropdownToggle}
                    aria-haspopup="true"
                    aria-expanded ={dropdownVisible}
                  >
                    <FaUserCircle style={{ marginRight: 5 }} /> Mon espace E-AFEP
                  </a>
                  <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                    <Link to="/profils" className="dropdown-item">Mon compte</Link>
                    <a href="#" className="dropdown-item">Déconnexion</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="banner">
          <div className="container">
            <h1>Bienvenue sur votre plateforme E-AFEP</h1>
            <p>Une solution pensée et conçue pour simplifier vos démarches administratives</p>

            <Link to="/connect" className="button button-primary me-3">
              <GiPadlock /> Accéder à votre espace
            </Link>

            <Link to="/compte" className="button button-danger">
              <IoPersonAddSharp /> Créer un compte
            </Link>
          </div>
        </div>
      </header>

      <main className="">
        <section className="section services-section" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="section-title">
                  <h2>Pourquoi E-AFEP ?</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-lg-4">
                <div className="feature-box-1">
                  <div className="icon">
                    <i className="fa fa-user"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Simplicité</h5>
                    <p>Un seul espace personnel pour tout faire et tout suivre en temps réel.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="feature-box-1">
                  <div className="icon">
                    <i className="fa fa-key"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Sécurité</h5>
                    <p>Nous sécurisons et fiabilisons vos informations.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="feature-box-1">
                  <div className="icon">
                    <i className="fa fa-hourglass"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Gain De Temps</h5>
                    <p>Plus besoin de se déplacer : faites vos démarches quand vous voulez.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer className="" />
    </>
  );
};

export default Navbar;