import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Container, Drawer, List, ListItem, ListItemText, Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../pages/Logo Yonnee.png';
import { FaUser , FaRegCalendar } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoAirplaneSharp } from "react-icons/io5";
import cover from '../pages/portrait_black(1).png';

const StyledButton = styled(Button)({
    margin: '0.5rem',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: '#495057',
    },
});

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [localSelectedSubmission, setLocalSelectedSubmission] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [num, setNum] = useState('');
    const [kilos, setKilos] = useState('');
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);


    useEffect(() => {

        // Ajoute une entrée à l'historique pour empêcher le recul

        window.history.pushState(null, '', window.location.href);


        const handlePopState = (event) => {

            // Ajoute à nouveau une entrée à l'historique pour empêcher le recul

            window.history.pushState(null, '', window.location.href);

        };


        // Écoute l'événement popstate

        window.addEventListener('popstate', handlePopState);


        // Nettoyage de l'écouteur d'événements lors du démontage du composant

        return () => {

            window.removeEventListener('popstate', handlePopState);

        };

    }, []);
 

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
            kilos,
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
                setNom('');
                setPrenom('');
                setEmail('');
                setNum('');
                setKilos('');
                setLocalSelectedSubmission(null);
                setReservationSuccess(true);
            } else {
                console.error('Erreur lors de la réservation:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur de réseau:', error);
        }
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const drawerList = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="connect">
                    <ListItemText primary="Se connecter" />
                </ListItem>
                <ListItem button component="a" href="#about">
                    <ListItemText primary="À propos de nous" />
                </ListItem>
                <ListItem button component="a" href="#contact">
                    <ListItemText primary="Contact" />
                </ListItem>
            </List>
        </div>
    );


    

    return (
        <div>
<nav className="navbar navbar-expand-lg bg-dark fixed-top" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 500,}}>
    <div className="container">
        <img src={logo} alt="Logo" style={{ width: '150px', height: '50px' }} />
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="connect">Se connecter</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#about">À propos de nous</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#contact">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList()}
            </Drawer>

            <header className="hero" id="compte" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', fontWeight: 800, backgroundColor: '#343a40' }}>
                <Container>
                    <div className="row align-items-center h-100">
                        <div className="col-lg-12 text-center mt-5">
                            <h1 className="display-4 fw-bold mb-4 text-light">
                                Simplifiez l'envoi de vos colis en un clic
                            </h1>
                            <div className='col-lg-12 bg-dark rounded-4 d-flex flex-column flex-md-row justify-content-center' style={{ padding: '40px 20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                                <div className="container">
                                    <div className="position-relative mb-4  ">
                                    <form className="d-flex" onSubmit={handleSubmit}>
                                            <div className="input-group">
                                                <input 
                                                    className="form-control form-control-lg" 
                                                    type="search" 
                                                    placeholder="Recherche GPs..." 
                                                    aria-label="Search" 
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    />

                                            </div>
                                        </form>
                                    </div>
                                    <div className="recent-searches pt-3">
    <p className="text-muted mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Prochains départs</p>
    {filteredSubmissions.map((submission, index) => (
        <div
            className="radio-container"
            key={index}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#logiModal"
            onClick={() => setLocalSelectedSubmission(submission)}
            style={{
                backgroundColor: 'rgba(52, 58, 64, 0.85)', // Faded dark background
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '15px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
            }}
        >
            <div className='row align-items-center'>
                <div className='col-12 col-md-4 text-start'>
                    <h5 className="mb-3" style={{ color: "white", fontSize: '1.5rem' }}>{submission.company}</h5>
                    <div className='pays text-light' style={{ fontWeight: "100", fontSize: '1rem' }}>{submission.from}</div>
                </div>
                <div className='col-12 col-md-4 d-flex justify-content-center align-items-center'>
                    <IoAirplaneSharp style={{ fontSize: 40, color: "black" }} />
                </div>
                <div className='col-12 col-md-4 text-end'>
                    <h5 className="mb-3" style={{ color: "#1976d2", fontSize: '1.5rem', fontWeight: 'bold', padding: '10px', borderRadius: '5px' }}>
                        {submission.kilos} colis restant
                    </h5>
                    <div className='pays text-light' style={{ fontWeight: "100", fontSize: '1rem' }}>{submission.to}</div>
                </div>
            </div>
            <hr style={{ border: "1px solid #ffffff" }} />
            <div className='row'>
                <div className='col-12 col-md-4 text-start'>
                    <h5 className="mb-3 text-light" style={{ fontWeight: "bold" }}>Date de départ</h5>
                    <div className='pays text-light' style={{ fontWeight: "100" }}>{submission.departure_date}</div>
                </div>
                <div className='col-12 col-md-4 text-center'>
                    <h5 className="mb-5"></h5>
                    <div className='pays text-light'></div>
                </div>
                <div className='col-12 col-md-4 text-end'>
                    <h5 className="mb-3 text-light" style={{ fontWeight: "bold" }}>Prix</h5>
                    <div className='pays text-light' style={{ fontWeight: "100" }}>{submission.price} F CFA</div>
                </div>
            </div>
        </div>
    ))}
</div>

<style jsx>{`
    @media (max-width: 767.98px) { /* Mobile styles */
        .radio-container {
            padding: 15px; /* Reduced padding for mobile */
            margin-bottom: 10px; /* Reduced margin for mobile */
            background-color: rgba(52, 58, 64, 0.85); /* Faded dark background on mobile */
        }
        .radio-container .row {
            margin-bottom: 10px; /* Add spacing between rows */
        }
        .radio-container h5 {
            font-size: 1.2rem; /* Smaller font size for mobile */
            text-align: center; /* Center text on mobile */
        }
        .radio-container .pays {
            font-size: 0.9rem; /* Smaller font size for mobile */
            text-align: center; /* Center text on mobile */
        }
    }
`}</style>
                                </div>
                            </div>


                        </div>
                    </div>
                </Container>
            </header>

            {/* Modal for reservation */}
{/* Modal for reservation */}
<div className="modal fade mt-5" id="logiModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered"> {/* Center the modal */}
        <div className="modal-content" style={{ backgroundColor: '#343a40', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
            <div className="modal-header" style={{ background: '#212529' }}>
                <h5 className="modal-title" id="loginModalLabel">Réservez votre colis</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}> {/* Add padding to the modal body */}
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
                        <TextField
                            className="mb-3"
                            label=" Nom"
                            variant="outlined"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            className="mb-3"
                            label="Prénom"
                            variant="outlined"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            className="mb-3"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            className="mb-3"
                            label="Téléphone"
                            variant="outlined"
                            type="number"
                            value={num}
                            onChange={(e) => setNum(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            className="mb-3"
                            label="Nombre de kilos"
                            variant="outlined"
                            type="number"
                            value={kilos}
                            onChange={(e) => setKilos(e.target.value)}
                            required
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                            <FaRegCalendar style={{ marginRight: 10 }} /> Réserver
                        </Button>
                    </form>
                ) : (
                    <p className='text-light '>Réservation effectuée. Veuillez consulter votre e-mail pour confirmer la validation.</p>
                )}
            </div>
        </div>
    </div>
</div>

            <section id="about" className="py-5" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', fontWeight: 800, backgroundColor: '#343a40' }}>
                <Container>
                    <div className="row align-items-center h-100">
                        <div className="col-lg-12 mt-5">
                        <h1 
    className=" text-center mb-4 text-light" 
    style={{ 
        whiteSpace: 'nowrap', 
    }}
>
    yónnee, c’est quoi ?
</h1>                            <div className='col-lg-12 bg-dark rounded-4 shadow' style={{ padding: '40px 20px', background: 'rgba(37, 117, 252, 0.8)' }}>
                                <div className="row align-items-center">
                                    <div className="col-lg-6 order-lg-1 text-center ">
                                        <img
                                            src={cover}
                                            alt="Description de l'image"
                                            className="img-fluid mb-3"
                                            style={{ maxWidth: '50%', height: 'auto', }}
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
                </Container>
            </section>

            <footer className="bg-dark text-light py-5" id="contact" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <Container>
                    <h1 className='text-center mb-5' style={{ color: "#ffffff" }}>Contactez-nous</h1>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-form p-5 shadow-sm" style={{ background: '#343a40', borderRadius: '10px' }}>
                                <h5 className="text-center mb-4" style={{ color: "white" }}>Envoyer un message</h5>
                                <form>
                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <TextField fullWidth label="Nom" required />
                                        </div>
                                        <div className="col-md-6">
                                            <TextField fullWidth label="Prénom" required />
                                        </div>
                                        <div className="col-12">
                                            <TextField fullWidth label="Email" required />
                                        </div>
                                        <div className="col-12">
                                            <TextField fullWidth label="Message" multiline rows={4} required />
                                        </div>
                                        <div className="col-12">
                                            <Button variant="contained" color="primary" type="submit" style={{ width: '100%' }}>Envoyer</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </footer>

            <footer className="bg-dark text-light py-3">
                <Container className="text-center">
                    <p>Copyright &copy; Tous droits réservés.</p>
                    <p>Conçu avec <span className="text-danger">&hearts;</span> par DEFAR</p>
                    <div className="social-links">
                        <a href="#" className="social-icon bg-primary me-2"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon bg-info me-2"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon bg-danger me-2"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-icon bg-primary"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export default Navbar;