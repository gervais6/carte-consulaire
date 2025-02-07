import React, { useEffect, useState } from 'react';
import '../pages/navbar.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import logo from '../pages/Logo Yonnee.png'; // Importez l'image de votre logo
import { FaUser , FaRegCalendar } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoAirplaneSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from './AuthContext'; 

const Navbar = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [num, setNum] = useState('');
    const [kilos, setKilos] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [localSelectedSubmission, setLocalSelectedSubmission] = useState(null);
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth(); 

    const StyledButton = styled(Button)({
        margin: '0.5rem',
    });

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/submissions');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setSubmissions(data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, []);

    const filteredSubmissions = submissions.filter(submission =>
        submission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.to.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
 setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Tous les champs sont requis.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/login", formData);
            console.log(response.data);

            if (response.data.success) {
                localStorage.setItem('token', response.data.token); 
                login(); 
                toast.success("Connexion réussie.");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error(response.data.message || "Identifiants incorrects.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            if (error.response) {
                const errorMessage = error.response.data.message || "Erreur lors de la connexion. Veuillez réessayer.";
                toast.error(errorMessage);
            } else {
                toast.error("Erreur lors de la connexion. Veuillez réessayer.");
            }
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top">
                <div className="container">
                    <img src={logo} alt="Logo" style={{ width: '150px', height: '50px' }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link me-4" to="#compte" data-bs-toggle="modal" data-bs-target="#login" style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif' }}>Se connecter</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link me-4" to="#about" style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif' }}>À propos de nous</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#contact" style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif' }}>Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <ToastContainer />

            <div className="modal fade" id="login" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content" style={{ backgroundColor: '#343a40', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
            <div className="modal-header" style={{ background: '#212529' }}>
                <h5 className="modal-title" id="loginModalLabel">Connexion</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3"> {/* Ajout de la classe mb-3 pour l'espacement */}
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Entrez votre email" 
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        />
                    </div>
                    <div className="form-group mb-3" style={{ position: 'relative' }}> {/* Ajout de la classe mb-3 pour l'espacement */}
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Entrez votre mot de passe"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        />
                        <InputAdornment position="end" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                style={{ background: 'transparent' }} 
                            >
                                <span style={{ color: 'black' }}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </span>
                            </IconButton>
                        </InputAdornment>
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', backgroundColor: '#212529',color:"white" }}>Se connecter</button>
                </form>
                <div className="form-check d-flex justify-content-center mb-5" style={{ marginTop: 20, color: "white" }}>
                    <label className="form-check-label" htmlFor="form2Example3">
                        Vous n'avez pas un compte <Link  className="" to="/compte" style={{ textDecoration: "none", fontSize: 15 }}>Inscrivez-vous</Link>
                    </label>
                </div>
                <div className="form-check d-flex justify-content-center mb-5" style={{ marginTop: -30, color: "white" }}>
                    <label className="form-check-label" htmlFor="form2Example3">
                        Vous avez oublié votre <Link to="/mdp" style={{ textDecoration: "none" }}>mot de passe</Link>
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>

            <header className="hero" id="compte" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', fontWeight: 800, backgroundColor: '#343a40' }}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-lg-12 text-center mt-5">
                            <h1 className="display-4 fw-bold mb-4 text-light">
                                Simplifiez l'envoi de vos colis en un clic
                            </h1>
                            <div className='col-lg-12 bg-dark rounded-4 d-flex flex-column flex-md-row justify-content-center' style={{ padding: '40px 20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                                <div className="container">
                                    <div className="position-relative mb-4">
                                        <input
                                            type="text"
                                            className="form-control search-input"
                                            placeholder="Trouver un GP..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ borderRadius: '20px', padding: '10px 20px' }}
                                        />
                                        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3" style={{ color: '#6c757d' }}></i>
                                    </div>
                                    <div className="recent-searches pt-3">
                                        <p className="text-muted mb-3">Prochains départs</p>
                                        {filteredSubmissions.map((submission, index) => (
                                            <div
                                                className="radio-container"
                                                key={index}
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#logiModal"
                                                onClick={() => setLocalSelectedSubmission(submission)}
                                                style={{ backgroundColor: '#495057', borderRadius: '10px', padding: '15px', marginBottom: '10px' }}
                                            >
                                                <div className='row align-items-center'>
                                                    <div className='col-12 col-md-4 text-center'>
                                                        <h5 className="mb-3" style={{ color: "white" }}>{submission.company}</h5>
                                                        <div className='pays text-light' style={{ fontWeight: "100" }}>{submission.from}</div>
                                                    </div>
                                                    <div className='col-12 col-md-4 d-flex justify-content-center align-items-center'>
                                                        <IoAirplaneSharp style={{ fontSize: 30, color: "black" }} />
                                                    </div>
                                                    <div className='col-12 col-md-4 text-center'>
                                                        <h5 className="mb-3" style={{ color: "#FFD700", fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#495057', padding: '10px', borderRadius: '5px' }}>
                                                            {submission.kilos} colis restant
                                                        </h5>
                                                        <div className='pays text-light' style={{ fontWeight: "100" }}>{submission.to}</div>
                                                    </div>
                                                </div>
                                                <hr style={{ border: "1px solid #ffffff" }} />
                                                <div className='row'>
                                                    <div className='col-12 col-md-4'>
                                                        <h5 className="mb-3 text-light" style={{ fontWeight : "bold" }}>Date de départ</h5>
                                                        <div className='pays text-light' style={{ fontWeight: "100" }}>{submission.departure_date}</div>
                                                    </div>
                                                    <div className='col-12 col-md-4 text-center'>
                                                        <h5 className="mb-5"></h5>
                                                        <div className='pays text-light'></div>
                                                    </div>
                                                    <div className='col-12 col-md-4 text-center'>
                                                        <h5 className="mb-3 text-light" style={{ fontWeight: "bold" }}>Prix</h5>
                                                        <div className='pays text-light' style={{ fontWeight: "100" }}>{submission.price} F CFA</div>
                                                    </div>
                                                </div>
                                                <label className="custom-radio pulse-radio d-block"></label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="modal fade" id="logiModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: '#343a40', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                        <div className="modal-header" style={{ background: '#212529' }}>
                            <h5 className="modal-title" id="loginModalLabel">Réservez votre colis</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {localSelectedSubmission ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-5" style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ flex: 1 }}>
                                            <GiCardboardBoxClosed style={{ fontSize: 30, marginBottom: 10 }} />
                                            <span style={{ fontWeight: 800 }}> {localSelectedSubmission.company} </span>
                                            <br />
                                            <p className='text-light mt-3 ms-2'>
                                                {localSelectedSubmission.from} - {localSelectedSubmission.to}<br /><br />
                                                {localSelectedSubmission.price} F CFA /kg
                                            </p>
                                        </div>
                                        <p style={{ marginRight: "10px", marginTop: 90, color: "white" }}>
                                            {localSelectedSubmission.departure_date}
                                        </p>
                                    </div>
                                    <hr style={{ border: "2px solid white", marginTop: -40, marginBottom: -25 }} />
                                    <p className='text-light mt-5' style={{ fontWeight: 800 }}>
                                        <FaUser  style={{ fontSize: 25, marginBottom: 10, marginRight: 10 }} /> Coordonnées
                                    </p>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder='Nom' value={nom} onChange={(e) => setNom(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder='Prénom' value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="number" className="form-control" placeholder='Téléphone' value={num} onChange={(e) => setNum(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="number" className="form-control" placeholder='Nombre de kilos' value={kilos} onChange={(e) => setKilos(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn" style={{ backgroundColor: '#212529', color: 'white', width: '100%', padding: '10px' }}>
                                        <FaRegCalendar style={{ marginRight: 10 }} /> Réserver
                                    </button>
                                </form>
                            ) : (
                                <p className='text-light'>Réservation effectuée. Veuillez consulter votre e-mail pour confirmer la validation.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <section id="about" className="py-5" style ={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', fontWeight: 800, backgroundColor: '#343a40' }}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-lg-12 mt-5">
                            <h1 className="display-4 fw-bold mb-4 text-center text-light">yónnee, c’est quoi ?</h1>
                            <div className='col-lg-12 bg-dark rounded-4 shadow' style={{ padding: '40px 20px', background: 'rgba(37, 117, 252, 0.8)' }}>
                                <div className="row align-items-center">
                                    <div className="col-lg-6 order-lg-1 ">
                                        <img 
                                            src={""} // Remplacez par l'URL de votre image
                                            alt="Description de l'image" 
                                            className="img-fluid" 
                                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} 
                                        />
                                    </div>
                                    <div className="col-lg-6 order-lg-2 text-light text-left" style={{ fontWeight: 500 }}>
                                        <p>
                                            yónnee est une plateforme dédiée à l'envoi de colis. Nous gérons entièrement le processus d'expédition en utilisant nos propres GPs. Les clients souhaitant envoyer un colis, nous contactent directement pour organiser l'envoi, et nous leur permettons de suivre leur colis en temps réel via notre application ou notre site web.
                                        </p>
                                        <p>Rejoignez des milliers d'utilisateurs satisfaits qui ont déjà découvert la rapidité et la fiabilité de notre service d'envoi de colis.</p>
                                        <br />
                                        <p>yónnee offre une interface fluide et facilite au mieux le processus qui compte 5 étapes :
                                            <br /><br />
                                            <strong>01.</strong> Je renseigne l’adresse de départ et l’adresse de destination
                                            <br /><br />
                                            <strong>02.</strong> Je choisis une date de départ
                                            <br /><br />
                                            <strong>03.</strong> Je consulte les départs disponibles
                                            <br /><br />
                                            <strong>04.</strong> Je réserve et je me fais contacter par un conseiller de Yóbbal pour organiser l’envoi
                                            <br /><br />
                                            <strong>05.</strong> Je reçois mon numéro de suivi après paiement pour suivre mon colis en temps réel depuis l’application ou sur le site de yónnee.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-dark text-light py-5" id="contact" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <div className="container">
                    <h1 className='text-center mb-5' style={{ color: "#ffffff" }}>Contactez-nous</h1>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-form p-5 shadow-sm" style={{ background: '#343a40', borderRadius: '10px' }}>
                                <h5 className="text-center mb-4" style={{ color: "white" }}>Envoyer un message</h5>
                                <form>
                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" placeholder="Nom" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" placeholder="Prénom" required />
                                        </div>
                                        <div className="col-12">
                                            <input type="email" className="form-control" placeholder="Email" required />
                                        </div>
                                        <div className="col-12">
                                            <textarea className="form-control" rows="5" placeholder="Message" required></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-light w-100 py-3" type="submit">Envoyer</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="bg-dark text-light py-3">
                <div className="container text-center">
                    <p>Copyright &copy; Tous droits réservés .</p>
                    <p>Conçu avec <span className="text-danger">&hearts;</span> par DEFAR</p>
                    <div className="social-links">
                        <a href="#" className="social-icon bg-primary me-2"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon bg-info me-2"><i className="fab fa-twitter"></i></a>
                        <a href ="#" className="social-icon bg-danger me-2"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-icon bg-primary"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Navbar;