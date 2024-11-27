import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../pages/Profils.css';
import { FaCheckCircle, FaHourglassHalf, FaClock, FaCamera } from 'react-icons/fa';
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('demande'); // Gère l'onglet actif

    return (
        <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
            <Header />
            <div className="container">
                <div className="profile">
                    <div className="profile-header">
                        <div className="profile-header-cover"></div>
                        <div className="profile-header-content">
                            <div className="profile-header-img" style={{ width: '150px', height: '150px' }}>
                                <img 
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png" 
                                    alt="" 
                                    style={{ width: '100%', height: '100%', borderRadius: '50%' }} // Rounded profile picture
                                />
                                <button 
                                    className="btn btn-light mt-2" 
                                    style={{ position: 'absolute', bottom: '10px', right: '10px' }} 
                                    aria-label="Changer la photo de profil"
                                >
                                    <FaCamera /> Changer
                                </button>
                            </div>

                            {/* Responsive Navigation */}
                            <div className="d-md-none mb-3">
                                <button
                                    className={`btn btn-outline-secondary w-100 mb-2 ${activeTab === 'demande' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('demande')}
                                    style={{backgroundColor:'#20247b',color:'white',padding:'8px'}}
                                >
                                    Demande de carte consulaire
                                </button>
                                <button
                                    className={`btn btn-outline-secondary w-100 ${activeTab === 'suivi' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('suivi')}
                                    style={{backgroundColor:'white',color:'gray',padding:'8px'}}

                                >
                                    Suivi carte consulaire
                                </button>
                                <button className="btn btn-outline-secondary w-100 mt-2" aria-label="Déconnexion"
                                    style={{backgroundColor:'white',color:'gray',padding:'8px'}}
>
                                    Déconnexion
                                </button>
                            </div>

                            <ul className="profile-header-tab nav nav-tabs nav-tabs-v2 ms-5 d-none d-md-flex">
                                <li className="nav-item">
                                    <button
                                        className={`btn btn-outline-secondary w-100 mb-2 ${activeTab === 'demande' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('demande')}
                                        style={{backgroundColor:'#20247b',color:'white',padding:'8px'}}
                                        >
                                        Demande de carte consulaire
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`btn btn-outline-secondary w-100 ${activeTab === 'suivi' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('suivi')}
                                        style={{backgroundColor:'white',color:'gray',padding:'8px'}}

                                    >
                                        Suivi carte consulaire
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="profile-container">
                        <div className="profile-sidebar">
                            <div className="desktop-sticky-top">
                                <button className="btn btn-danger w-100" aria-label="Déconnexion">
                                    Déconnexion
                                </button>
                            </div>
                        </div>

                        <div className="profile-content">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="container mt-5">
                                        {/* Affichage conditionnel selon l'onglet actif */}
                                        {activeTab === 'demande' && (
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="nom" className="form-label" style={{ fontSize: "16px" }}>Nom complet</label>
                                                    <input type="text" className="form-control" id="nom" placeholder="Entrez votre nom complet" required style={{ fontSize: "16px" }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="date_naissance" className="form-label" style={{ fontSize: "16px" }}>Date de naissance</label>
                                                    <input type="date" className="form-control" id="date_naissance" required style={{ fontSize: "16px" }} min="1900-01-01" max={new Date().toISOString().split("T")[0]} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="lieu_naissance" className="form-label" style={{ fontSize: "16px" }}>Lieu de naissance</label>
                                                    <input type="text" className="form-control" id="lieu_naissance" placeholder="Entrez votre lieu de naissance" required style={{ fontSize: "16px" }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="nationalite" className="form-label" style={{ fontSize: "16px" }}>Nationalité</label>
                                                    <input type="text" className="form-control" id="nationalite" placeholder="Entrez votre nationalité" required style={{ fontSize: "16px" }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="adresse" className="form-label" style={{ fontSize: "16px" }}>Adresse actuelle</label>
                                                    <input type="text" className="form-control" id="adresse" placeholder="Entrez votre adresse actuelle" required style={{ fontSize: "16px" }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label" style={{ fontSize: "16px" }}>Adresse e-mail</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Entrez votre e-mail" required style={{ fontSize: "16px" }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="telephone" className="form-label" style={{ fontSize: "16px" }}>Numéro de téléphone</label>
                                                    <input type="tel" className="form-control" id="telephone" placeholder="Entrez votre numéro de téléphone" required style={{ fontSize: "16px" }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="numero_piece_identite" className="form-label" style={{ fontSize: "16px" }}>Numéro de pièce d'identité</label>
                                                    <input type="text" className="form-control" id="numero_piece_identite" placeholder="Entrez le numéro de votre pièce d'identité" required style={{ fontSize: "16px" }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="date_expiration_piece" className="form-label" style={{ fontSize: "16px" }}>Date d'expiration de la pièce d'identité</label>
                                                    <input type="date" className="form-control" id="date_expiration_piece" required style={{ fontSize: "16px" }} min={new Date().toISOString().split("T")[0]} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="photo_identite" className="form-label" style={{ fontSize: "16px" }}>Photo d'identité (format JPG ou PNG)</label>
                                                    <input type="file" className="form-control" id="photo_identite" accept=".jpg, .png" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="justificatif_domicile" className="form-label" style={{ fontSize: "16px" }}>Justificatif de domicile</label>
                                                    <input type="file" className="form-control" id="justificatif_domicile" accept=".pdf, .jpg, .png" required />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100"
                                                    style={{ fontSize: "15px", backgroundColor: "#20247b",}}
                                                    aria-label="Soumettre la demande"
                                                >
                                                    Soumettre la demande
                                                </button>
                                            </form>
                                        )}

                                        {activeTab === 'suivi' && (
                                            <div className="container">
                                                <h5 style={{ fontSize: "20px", marginBottom: "20px" }}>Suivi de votre carte consulaire</h5>
                                                <button
                                                    className={`btn w-100 ${activeTab === 'suivi' ? 'btn-outline-secondary' : 'btn-outline-primary'}`}
                                                    style={{ fontSize: "17px", padding: "10px 20px" }}
                                                    onClick={() => setActiveTab('suivi')}
                                                    aria-label="Vérifier le suivi"
                                                >
                                                    Vérifier le suivi
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Footer présent ici */}
        </div>
    );
};

export default Profile;