import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../pages/navbar.css';
import { IoPersonAddSharp } from "react-icons/io5";
import { GiPadlock } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa"; // Assurez-vous que l'importation est correcte
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
    setDropdownVisible(prevState => !prevState); // Ajout de cette fonction
  };

  return (
    <>
      <header className="header-area overlay">
        <nav ref={myRef} className={`navbar navbar-expand-md navbar-dark ${isFixed ? 'fixed-top' : ''}`}>
        <div className="container">
  <a href="" className="navbar-brand">E-AFEP</a>

  <button
    type="button"
    className="navbar-toggler collapsed"
    onClick={handleNavToggle}
    aria-label="Toggle navigation"
  >
    <span className="menu-icon-bar"></span>
    <span className="menu-icon-bar"></span>
    <span className="menu-icon-bar"></span>
  </button>

  <div id="main-nav" className={`collapse navbar-collapse ${navVisible ? 'show' : ''}`}>
    <ul className="navbar-nav ms-auto">
      {windowWidth >= 768 && (
        <li>
          <Link to="/guide" className="nav-item nav-link">
            Guide utilisateur
          </Link>
        </li>
      )}

      <li className={`dropdown ${dropdownVisible ? 'show' : ''}`}>
        <a 
          href="#" 
          className="nav-item nav-link dropdown-toggle" 
          onClick={handleDropdownToggle} 
          aria-haspopup="true" 
          aria-expanded={dropdownVisible}
        >
          <FaUserCircle style={{ marginRight: 5 }} /> Mon espace E-AFEP
        </a>
        <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
          <Link to="/profils" className="dropdown-item">
            <FaUserCircle style={{ marginRight: 5 }} /> Mon compte
          </Link>
          <a href="#" className="dropdown-item">
            <GiPadlock style={{ marginRight: 5 }} /> Déconnexion
          </a>
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

      <main className="d-none d-lg-block">
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

<Footer className="d-none d-lg-block" />
    </>
  );
};

export default Navbar;