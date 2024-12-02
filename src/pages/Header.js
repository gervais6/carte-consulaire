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
                    <Link to="#" className="navbar-brand">
                        E-AFEP
                    </Link>
                    <div className="d-flex me-3 position-relative">
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;