import React from "react";
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdNotifications } from "react-icons/md"; // Importer l'icône de notification

const Header = () => {
    const notificationCount = 5; // Exemple de nombre de notifications non lues

    return ( 
        <header className="bg-dark text-white">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <IoMdArrowRoundBack style={{ marginRight: 8 }} />
                        E-AFEP
                    </Link>
                    <div className="d-flex me-3 position-relative">
                        <Link to="/notifications" className="nav-link">
                            <MdNotifications style={{ fontSize: '24px', color: 'white', marginRight: '0px' }} />
                            {/* Badge pour les notifications */}
                            {notificationCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {notificationCount}
                                    <span className="visually-hidden">notifications non lues</span>
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;