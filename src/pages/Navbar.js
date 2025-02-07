import React, { useEffect, useState } from 'react';
import '../pages/navbar.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import logo from '../pages/Yonnee logo-3.png'; // Importez l'image de votre logo
import { FaUser , FaRegCalendar } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoAirplaneSharp } from "react-icons/io5";

const Navbar = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [num, setNum] = useState('');
    const [kilos, setKilos] = useState(''); // Nouvel état pour le nombre de kilos
    const [submissions, setSubmissions] = useState([]);
    const [localSelectedSubmission, setLocalSelectedSubmission] = useState(null);
    const [reservationSuccess, setReservationSuccess] = useState(false); // État pour la confirmation de réservation
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nom,
            prenom,
            email,
            num,
            kilos, // Inclure le nombre de kilos dans les données
            company: localSelectedSubmission.company,
            from: localSelectedSubmission.from,
            to: localSelectedSubmission.to,
            price: localSelectedSubmission.price,
            departure_date: localSelectedSubmission.departure_date,
        };

        try {
            const response = await fetch('http://localhost:8000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Réservation réussie:', result);
                // Réinitialisez le formulaire ou fermez le modal ici
                setNom('');
                setPrenom('');
                setEmail('');
                setNum('');
                setKilos(''); // Réinitialiser le nombre de kilos
                setLocalSelectedSubmission(null);
                setReservationSuccess(true); // Indiquer que la réservation a réussi
            } else {
                console.error('Erreur lors de la réservation:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur de réseau:', error);
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
                    <div className="collapse navbar-collapse p-3" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link me-5" href="#compte" data-bs-toggle="modal" data-bs-target="#logiModal" style={{ color: '#2575fc',fontFamily: 'Poppins, sans-serif' }}>Se connecter</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link me-5" href="#about" style={{ color: '#2575fc',fontFamily: 'Poppins, sans-serif' }}>À propos de nous</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contact" style={{ color: '#2575fc',fontFamily: 'Poppins, sans-serif' }}>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="hero" id="compte" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>
    <div className="container h-100">
        <div className="row align-items-center h-100">
            <div className="col-lg-12 text-center mt-5">
                <p className="display-4 fw-bold mb-5 mt-5 text-dark" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>
                    Simplifiez l'envoi de vos colis en un clic
                </p>
                <div className='col-lg-12 bg-dark rounded-4 d-flex flex-column flex-md-row justify-content-center' style={{ padding: '50px 30px 80px' }}>
                    <div className="container">
                        <div className="position-relative mb-4">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Trouver un GP..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
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
                                >
                                    <div className='row'>
                                        <div className='col-12 col-md-4'>
                                            <h5 className="mb-3" style={{ color: "white" }}>{submission.company}</h5>
                                            <div className='pays text-dark' style={{ fontWeight: "100" }}>{submission.from}</div>
                                        </div>
                                        <div className='col-12 col-md-4 text-center'>
                                            <h5 className="mb-5"></h5>
                                            <div className='pays text-dark'>
                                                <IoAirplaneSharp style={{ fontSize: 20, marginTop: -10 }} />
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-4 text-center'>
                                            <h5 className="mb-3" style={{ color: "white" }}>{submission.kilos} colis restant</h5>
                                            <div className='pays text-dark' style={{ fontWeight: "100" }}>{submission.to}</div>
                                        </div>
                                    </div>
                                    <hr style={{ border: "2px solid #ffffff" }} />
                                    <div className='row'>
                                        <div className='col-12 col-md-4'>
                                            <h5 className="mb-3 text-dark" style={{ fontWeight: "bold" }}>Date de départ</h5>
                                            <div className='pays text-dark' style={{ fontWeight: "100" }}>{submission.departure_date}</div>
                                        </div>
                                        <div className='col-12 col-md-4 text-center'>
                                            <h5 className="mb-5"></h5>
                                            <div className='pays text-dark'></div>
                                        </div>
                                        <div className='col-12 col-md-4 text-center'>
                                            <h5 className="mb-3 text-dark" style={{ fontWeight: "bold" }}>Prix</h5>
                                            <div className='pays text-dark' style={{ fontWeight: "100" }}>{submission.price} F CFA</div>
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
                    <div className="modal-content">
                        <div class ="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Réservez votre colis</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {localSelectedSubmission ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-5" style={{ display: "flex", alignItems: "center", fontFamily: 'Poppins , sans-serif' }}>
                                        <div style={{ flex: 1 }}>
                                            <GiCardboardBoxClosed style={{ fontSize: 30, marginBottom: 10 }} />
                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}> {localSelectedSubmission.company} </span>
                                            <br />
                                            <p className='text-dark mt-3 ms-2'>
                                                {localSelectedSubmission.from} - {localSelectedSubmission.to}<br /><br />
                                                {localSelectedSubmission.price} F CFA /kg
                                            </p>
                                        </div>
                                        <p style={{ marginRight: "10px", marginTop: 90, color: "black" }}>
                                            {localSelectedSubmission.departure_date}
                                        </p>
                                    </div>
                                    <hr style={{ border: "2px solid black", marginTop: -40, marginBottom: -25 }} />
                                    <p className='text-dark mt-5' style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>
                                        <FaUser  style={{ fontSize: 25, marginBottom: 10, marginRight: 10 }} /> Coordonnées
                                    </p>
                                    <div className="mb-3 text-dark">
                                        <input type="text" className="form-control" placeholder='Nom' value={nom} onChange={(e) => setNom(e.target.value)} required />
                                    </div>
                                    <div className="mb-3 text-dark">
                                        <input type="text" className="form-control" placeholder='Prénom' value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                                    </div>
                                    <div className="mb-3 text-dark">
                                        <input type="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3 text-dark">
                                        <input type="number" className="form-control" placeholder='Téléphone' value={num} onChange={(e) => setNum(e.target.value)} required />
                                    </div>
                                    <div className="mb-3 text-dark">
                                        <input type="number" className="form-control" placeholder='Nombre de kilos' value={kilos} onChange={(e) => setKilos(e.target.value)} required /> {/* Champ pour le nombre de kilos */}
                                    </div>
                                    <button type="submit" className="btn btn-login text-white">
                                        <FaRegCalendar style={{ marginRight: 10 }} /> Réserver
                                    </button>
                                </form>
                            ) : (
                                <p className='text-dark'>Réservation effectuée.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <section id="about" className="py-5" style={{ background: '#2575fc' }}>
                <div className="container">
                    <div className='col-lg-12 bg-dark rounded-4' style={{ paddingBottom: 60, paddingTop: 40, paddingRight: 20, paddingLeft: 20, color: 'white', background: 'rgba(37, 117, 252, 0.8)' }}>
                        <div className="row align-items-center m-2">
                            <div className="col-lg-6 order-lg-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                                <h1 className="mb-4">yónnee, c’est quoi ?</h1>
                                <p>
                                    yónnee est une plateforme dédiée à l'envoi de colis. Nous gérons entièrement le processus d'expédition en utilisant nos propres GPs. Les clients souhaitant envoyer un colis, nous contactent directement pour organiser l'envoi, et nous leur permettons de suivre leur colis en temps réel via notre application ou notre site web.
                                </p>
                                <p>Rejoignez des milliers d'utilisateurs satisfaits qui ont déjà découvert la rapidité et la fiabilité de notre service d'envoi de colis.</p>
                                <br />
                                <p>yónnee offre une interface fluide et facilite au mieux le processus qui compte 5 étapes :
                                    <br /><br />
                                    01. Je renseigne l’adresse de départ et l’adresse de destination
                                    <br /><br />
                                    02. Je choisis une date de départ
                                    <br /><br />
                                    03. Je consulte les départs disponibles
                                    <br /><br />
                                    04. Je réserve et je me fais contacter par un conseiller de Yóbbal pour organiser l’envoi
                                    <br /><br />
                                    05. Je reçois mon numéro de suivi après paiement pour suivre mon colis en temps réel depuis l’application ou sur le site de yónnee.
                                </p>
                            </div>
                            <div className="col-lg-6 order-lg-1 text-center">
                                <img 
                                    src={""} 
                                    alt="" 
                                    className="img-fluid app-s creenshot" 
                                    style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-dark text-light py-5" id="contact" style={{ minHeight: '90vh', fontFamily: 'Poppins, sans-serif' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className='text-center mb-5 mt-5' style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: "#2575fc" }}>Contactez-nous</h1>
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="contact-form p-5 shadow-sm ">
                                        <h7 className="text-center mb-4" style={{ color: "black" }}>Envoyer un message</h7>
                                        <form>
                                            <div className="row g-3 mt-3">
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control custom-input" placeholder="Nom" />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control custom-input" placeholder="Prenom" />
                                                </div>
                                                <div className="col-12">
                                                    <input type="email" className="form-control custom-input" placeholder="Email " />
                                                </div>
                                                <div className="col-12">
                                                    <textarea className="form-control custom-input" rows="5" placeholder=" Message"></textarea>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100 py-3" type="submit">Envoyer</button>
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

            <footer className="bg-dark text-light py-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <footer className="footer text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <div className="container" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <p>Copyright &copy; 2024. All rights reserved.</p>
                        <p>Designed with <span className="text-danger">&hearts;</span> by Your Name</p>
                    </div>
                    <div className="social-links">
                        <a href="#" className="social-icon bg-primary"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon bg-info"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon bg-danger"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-icon bg-primary"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </footer>
            </footer>
        </div>
    );
};

export default Navbar;