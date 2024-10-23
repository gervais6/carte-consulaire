import React from "react";
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const Header = () => {
    return ( 
        <header className="bg-dark text-white">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">

            <Link to="/" className="navbar-brand ">
            <IoMdArrowRoundBack style={{marginRight:8}} />
            E-AFEP
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Optionally, you can add more menu items here */}
            </div>
          </div>
        </nav>
      </header>

     );
}
 
export default Header;