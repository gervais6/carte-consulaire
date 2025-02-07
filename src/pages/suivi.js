import React from 'react';
import '../pages/navbar.css';
import logo from '../pages/Yonnee logo-3.png'; // Importez l'image de votre logo


const suivi = () => {
    return ( 

    <div>
      


      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container">
          <img src={logo} alt=" Logo" style={{ width: '150px', height: '50px' }} /> {/* Ajoutez l'image ici */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse p-3 " id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <a className="nav-link me-5" href="#compte"  style={{color: '#2575fc',fontFamily: 'Poppins, sans-serif', fontWeight: 200}}>Mon compte</a>
              </li>


            </ul>
          </div>
        </div>
      </nav>






      <header className="hero" id="compte" style={{  minHeight: '100vh' ,fontFamily: 'Poppins, sans-serif', fontWeight: 800}}>
        
    <div className="container h-100">
    <div class="container ">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet"/>


<div class="modal fade" id="loginModal" tabindex="-1">

  <div class="modal-dialog modal-dialog-centered">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet"/>


  </div>
</div>
</div>
        <div className="row align-items-center h-100">
            <div className="col-lg-12 text-justify mt-5">
            <p className="display-4 fw-bold mb-5 mt-5 text-dark text-center responsive-text"  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800}}>
            Suivez votre colis
            <br/>
            
</p>


<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"/>

    <div class="container">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet"/>

        <div class="position-relative mb-4">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet"/>

        <form class="d-flex">
                <div class="input-group">
                    <input class="form-control form-control-lg" type="search" placeholder="Entrez votre numro de suivi" aria-label="Search"/>
                    <button class="btn btn-primary px-4" type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                </div>
            </form>

        </div>



    </div>







            </div>
        </div>
    </div>
</header>





<footer class="bg-dark text-light py-5 "style={{ fontFamily: 'Poppins, sans-serif',marginTop:-200}}>

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


 
export default suivi;