import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../pages/Profils.css';
import { FaCamera } from 'react-icons/fa'; // Importation de l'icône de la caméra
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('demande'); 
    const [trackingNumber, setTrackingNumber] = useState('');
    const [status, setStatus] = useState(''); 
    const [history, setHistory] = useState([
        { id: 1, date: '01/11/2024', status: 'Soumise' },
        { id: 2, date: '05/11/2 024', status: 'En cours de traitement' },
        { id: 3, date: '10/11/2024', status: 'Prête à être récupérée' },
    ]);
    const [showDetails, setShowDetails] = useState(false); 
    const [profileImage, setProfileImage] = useState("https://bootdey.com/img/Content/avatar/avatar7.png"); // Image de profil par défaut
    const [imageFile, setImageFile] = useState(null); // État pour le fichier image

    const handleCheckTracking = () => {
        if (trackingNumber) {
            setStatus('En cours de traitement'); 
            setShowDetails(true); 
        } else {
            alert("Veuillez entrer un numéro de suivi valide.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Met à jour l'image de profil avec le fichier sélectionné
            };
            reader.readAsDataURL(file);
            setImageFile(file); // Enregistre le fichier image
        }
    };

    return (
        <div style={{ overflowY: 'auto', maxHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Header />
            <div className="container">
                <div className="profile">
                    <div className="profile-header">
                        <div className="profile-header-cover"></div>
                        <div className="profile-header-content">
                            <div className="profile-header-img" style={{ width: '150px', height: '150px', position: 'relative' }}>
                                <img 
                                    src={profileImage} 
                                    alt="Profile" 
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', border: '3px solid #20247b' }} 
                                />
                                <label htmlFor="upload-photo" style={{ position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer' }}>
                                    <FaCamera style={{ fontSize: '24px', color: 'white', backgroundColor: '#20247b', borderRadius: '50%', padding: '5px' }} />
                                </label>
                                <input 
                                    type="file" 
                                    id="upload-photo" 
                                    accept="image/*" 
                                    style={{ display: 'none' }} 
                                    onChange={handleImageChange} 
                                />
                            </div>

                            {/* Responsive Navigation */}
                            <div className="d-md-none mb-3">
                                <button
                                    className={`btn btn-outline-secondary w-100 mb-2 ${activeTab === 'demande' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('demande')}
                                    style={{ backgroundColor: '#20247b', color: 'white', padding: '8px', borderRadius: '5px' }}
                                >
                                    Demande de carte consulaire
                                </button>
                                <button
                                    className={`btn btn-outline-secondary w-100 ${activeTab === 'suivi' ? 'active' : '' }`}
                                    onClick={() => setActiveTab('suivi')}
                                    style={{ backgroundColor: 'white', color: 'gray', padding: '8px', borderRadius: '5px' }}
                                >
                                    Suivi carte consulaire
                                </button>
                                <button
                                    className="btn btn-outline-secondary w-100 mt-2" 
                                    aria-label="Déconnexion"
                                    style={{ backgroundColor: 'white', color: 'gray', padding: '8px', borderRadius: '5px' }}
                                >
                                    Déconnexion
                                </button>
                            </div>

                            <ul className="profile-header-tab nav nav-tabs nav-tabs-v2 ms-5 d-none d-md-flex">
                                <li className="nav-item">
                                    <button
                                        className={`btn btn-outline-secondary w-100 ${activeTab === 'demande' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('demande')}
                                        style={{ backgroundColor: '#20247b', color: 'white', padding: '6px', borderRadius: '5px' }}
                                    >
                                        Demande de carte consulaire
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`btn btn-outline-secondary w-100 mb-2 ms-3 ${activeTab === 'suivi' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('suivi')}
                                        style={{ backgroundColor: '#20247b ', color: 'white', padding: '6px', borderRadius: '5px' }}
                                    >
                                        Suivi de carte consulaire
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="profile-container">
                        <div className="profile-sidebar">
                            <div className="desktop-sticky-top">
                                <button className="btn btn-danger w-100" aria-label="Déconnexion" style={{ borderRadius: '5px' }}>
                                    Déconnexion
                                </button>
                            </div>
                        </div>

                        <div className="profile-content">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="container mt-5">
                                        {activeTab === 'demande' && (
                                            <form onSubmit={(e) => { e.preventDefault(); /* Handle form submission */ }} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                                <h5 className="mb-4" style={{ color: '#20247b' }}>Demande de carte consulaire</h5>
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
                                                    style={{ fontSize: "15px", backgroundColor: '#20247b' }}
                                                    aria-label="Soumettre la demande"
                                                >
                                                    Soumettre la demande
                                                </button>
                                            </form>
                                        )}

                                        {activeTab === 'suivi' && (
                                            <div className="container" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                                <h5 className="mb-4" style={{ color: '#20247b' }}>Suivi de votre demande</h5>
                                                <div className="mb-3">
                                                    <label htmlFor="numero_suivi" className="form-label" style={{ fontSize: "16px" }}>Numéro de suivi</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="numero_suivi"
                                                        placeholder="Entrez votre numéro de suivi"
                                                        value={trackingNumber}
                                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                                        required
                                                        style={{ fontSize: "16px" }}
                                                    />
                                                </div>
                                                <button
                                                    className="btn btn-primary w-100"
                                                    style={{ fontSize: "15px", backgroundColor: '#20247b' }}
                                                    aria-label="Vérifier le suivi"
                                                    onClick={handleCheckTracking}
                                                >
                                                    Vérifier le suivi
                                                </button>

                                                {showDetails && (
                                                    <div className="mt-4">
                                                        <h6 style={{ fontSize: "18px" }}>Statut de votre demande :</h6>
                                                        <p style={{ fontSize: "16px", color: "green" }}>{status}</p>

                                                        <h6 style={{ fontSize: "18px" }}>Historique des demandes :</h6>
                                                        <ul>
                                                            {history.map((item) => (
                                                                <li key={item.id} style={{ fontSize: "16px" }}>
                                                                    Demande #{item.id} - Soumise le {item.date} - Statut : {item.status}
                                                                </li>
                                                            ))}
                                                        </ul>
 <h6 style={{ fontSize: "18px" }}>Timeline des étapes :</h6>
                                                        <ul>
                                                            <li style={{ fontSize: "16px" }}>Soumission de la demande - 01/11/2024</li>
                                                            <li style={{ fontSize: "16px" }}>Traitement en cours - 05/11/2024</li>
                                                            <li style={{ fontSize: "16px" }}>Prête à être récupérée - 10/11/2024</li>
                                                        </ul>

                                                        <h6 style={{ fontSize: "18px" }}>Détails de la demande :</h6>
                                                        <ul>
                                                            <li style={{ fontSize: "16px" }}>Type de carte : Carte consulaire</li>
                                                            <li style={{ fontSize: "16px" }}>Date de soumission : 01/11/2024</li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;