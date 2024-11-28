import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../pages/Profils.css';
import { FaCamera } from 'react-icons/fa'; 
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('demande'); 
    const [trackingNumber, setTrackingNumber] = useState('');
    const [status, setStatus] = useState(''); 
    const [history, setHistory] = useState([
        { id: 1, date: '01/11/2024', status: 'Soumise' },
        { id: 2, date: '05/11/2024', status: 'En cours de traitement' },
        { id: 3, date: '10/11/2024', status: 'Prête à être récupérée' },
    ]);
    const [showDetails, setShowDetails] = useState(false); 
    const [profileImage, setProfileImage] = useState("https://bootdey.com/img/Content/avatar/avatar7.png"); 
    const [imageFile, setImageFile] = useState(null); 

    // État pour le formulaire étape par étape
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        nom: '',
        dateNaissance: '',
        lieuNaissance: '',
        nationalite: '',
        adresse: '',
        email: '',
        telephone: '',
        numeroPieceIdentite: '',
        dateExpirationPiece: '',
        photoIdentite: null,
        justificatifDomicile: null,
    });

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
                setProfileImage(reader.result); 
            };
            reader.readAsDataURL(file);
            setImageFile(file); 
        }
    };

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData({
            ...formData,
            [id]: files ? files[0] : value,
        });
    };

    const nextStep = () => {
        if (currentStep < 4) { // 5 étapes au total
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    // Détection de la taille de l'écran
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ overflowY: 'auto', maxHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Header />
            <div className="container">
                <div className="profile">
                    <div className="profile-header">
                        <div className="profile-header-cover"></div>
                        <div className="profile-header-content">
                            <div className="profile-header-img" style={{ width: '150px', height: '150px ', position: 'relative' }}>
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

                            <div className="d-md-none mb-3">
                                <button
                                    className={`btn btn-outline-secondary w-100 mb-2 ${activeTab === 'demande' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('demande')}
                                    style={{ backgroundColor: '#20247b', color: 'white', padding: '8px', borderRadius: '5px' }}
                                >
                                    Demande de carte consulaire
                                </button>
                                <button
                                    className={`btn btn-outline-secondary w-100 ${activeTab === 'suivi' ? 'active' : ''}`}
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
                                        style={{ backgroundColor: '#20247b', color: 'white', padding: '6px', borderRadius: '5px' }}
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
                                            <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                                <h5 className="mb-4" style={{ color: '#20247b' }}>Demande de carte consulaire</h5>
                                                <div className="mb-3">
                                                    <label htmlFor="nom">Nom Complet</label>
                                                    <input type="text" className="form-control" id="nom" placeholder="" required style={{ fontSize: "16px" }} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="date_naissance">Date de Naissance</label>
                                                    <input type="date" className="form-control" id ="date_naissance" required style={{ fontSize: "16px" }} min="1900-01-01" max={new Date().toISOString().split("T")[0]} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="lieu_naissance">Lieu de Naissance</label>
                                                    <input type="text" className="form-control" id="lieu_naissance" placeholder="" required style={{ fontSize: "16px" }} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="nationalite">Nationalité</label>
                                                    <input type="text" className="form-control" id="nationalite" placeholder="" required style={{ fontSize: "16px" }} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="adresse">Adresse</label>
                                                    <input type="text" className="form-control" id="adresse" placeholder="" required style={{ fontSize: "16px" }} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email">E-mail</label>
                                                    <input type="email" className="form-control" id="email" placeholder="" required style={{ fontSize: "16px" }} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="telephone">Numéro de Téléphone</label>
                                                    <input type="tel" className="form-control" id="telephone" placeholder="" required style={{ fontSize: "16px" }} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="numero_piece_identite">Numéro de Pièce d'Identité</label>
                                                    <input type="text" className="form-control" id="numero_piece_identite" placeholder="" required style={{ fontSize: "16px" }} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="date_expiration_piece">Date d'Expiration de la Pièce</label>
                                                    <input type="date" className="form-control" id="date_expiration_piece" required style={{ fontSize: "16px" }} min={new Date().toISOString().split("T")[0]} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="photo_identite">Photo d'Identité</label>
                                                    <input type="file" className="form-control" id="photo_identite" accept=".jpg, .png" required onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="justificatif_domicile">Justificatif de Domicile</label>
                                                    <input type="file" className="form-control" id="justificatif_domicile" accept=".jpg, .png" required onChange={handleChange} />
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
                                                <h5 className="mb-4" style={{ color: '#20247b' }}>Suivi de carte consulaire</h5>
                                                <div className="mb-3">
                                                    <label htmlFor="tracking_number">Numéro de suivi</label>
                                                    <input type="text" className="form-control" id="tracking_number" placeholder="Entrez votre numéro de suivi" required style={{ fontSize: "16px" }} onChange={(e) => setTrackingNumber(e.target.value)} />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary w-100"
                                                    style={{ fontSize: "15 px", backgroundColor: '#20247b' }}
                                                    onClick={handleCheckTracking}
                                                >
                                                    Vérifier le statut
                                                </button>
                                                {showDetails && (
                                                    <div className="mt-4">
                                                        <h6 className="mb-3" style={{ color: '#20247b' }}>Statut actuel : {status}</h6>
                                                        <h6 className="mb-3" style={{ color: '#20247b' }}>Historique</h6>
                                                        <ul className="list-group">
                                                            {history.map((item) => (
                                                                <li key={item.id} className="list-group-item">
                                                                    <div className="d-flex justify-content-between">
                                                                        <span style={{ fontSize: "15px" }}>{item.date}</span>
                                                                        <span style={{ fontSize: "15px" }}>{item.status}</span>
                                                                    </div>
                                                                </li>
                                                            ))}
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