import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import '../pages/Profils.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('personalInfo');
    const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
    const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        prenom: '',
        email: '',
        password: '',
        bio: ''
    });
    const [consularCardInfo, setConsularCardInfo] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        passportNumber: '',
        nationality: '',
        phone: '',
        email: '',
        identityProof: null
    });
    const [isConsularCardRequested, setIsConsularCardRequested] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const maxSteps = 3;

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                localStorage.removeItem('token');
                console.log("Déconnexion réussie");
                window.location.href = '/connect';
            } else {
                console.error("Erreur lors de la déconnexion");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    const toggleTwoFactorAuth = () => {
        setTwoFactorAuthEnabled(!twoFactorAuthEnabled);
    };

    const toggleEmailNotifications = async () => {
        const newValue = !emailNotificationsEnabled; // Inverse l'état actuel
        setEmailNotificationsEnabled(newValue); // Met à jour l'état

        // Logique pour gérer l'activation/désactivation des notifications
        if (newValue) {
            console.log('Notifications par email activées.');
            // Exemple d'appel API pour activer les notifications
            try {
                const response = await fetch('http://localhost:8000/api/notifications/enable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (response.ok) {
                    toast.success("Notifications par email activées.");
                } else {
                    toast.error("Erreur lors de l'activation des notifications.");
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
                toast.error("Erreur réseau lors de l'activation des notifications.");
            }
        } else {
            console.log('Notifications par email désactivées.');
            // Exemple d'appel API pour désactiver les notifications
            try {
                const response = await fetch('http://localhost:8000/api/notifications/disable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (response.ok) {
                    toast.success("Notifications par email désactivées.");
                } else {
                    toast.error("Erreur lors de la désactivation des notifications.");
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
                toast.error("Erreur réseau lors de la désactivation des notifications.");
            }
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo({
            ...personalInfo,
            [name]: value
        });
    };

    const handleConsularCardInputChange = (e) => {
        const { name, value } = e.target;
        setConsularCardInfo({
            ...consularCardInfo,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setConsularCardInfo({
            ...consularCardInfo,
            identityProof: e.target.files[ 0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedInfo = {
            name: personalInfo.name,
            prenom: personalInfo.prenom,
            email: personalInfo.email,
            password: personalInfo.password || undefined,
            bio: personalInfo.bio,
        };

        try {
            const response = await fetch('http://localhost:8000/api/personal-info', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedInfo),
            });

            if (response.ok) {
                toast.success("Informations personnelles mises à jour avec succès.");
            } else {
                const errorData = await response.json();
                console.error("Erreur lors de la mise à jour des informations", response.status);
                toast.error(errorData.message || "Erreur lors de la mise à jour des informations.");
            }

        } catch (error) {
            console.error("Erreur réseau :", error);
            toast.error("Erreur réseau lors de la mise à jour des informations.");
        }
    };

    const handleConsularCardSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', consularCardInfo.firstName);
        formData.append('last_name', consularCardInfo.lastName);
        formData.append('date_of_birth', consularCardInfo.dateOfBirth);
        formData.append('address', consularCardInfo.address);
        formData.append('passport_number', consularCardInfo.passportNumber);
        formData.append('nationality', consularCardInfo.nationality);
        formData.append('phone', consularCardInfo.phone);
        formData.append('email', consularCardInfo.email);
    
        if (consularCardInfo.identityProof) {
            formData.append('identity_proof', consularCardInfo.identityProof);
        }
    
        try {
            const response = await fetch('http://localhost:8000/api/consular-card-requests', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message); // Affiche le message de succès
                setIsConsularCardRequested(true);
                setCurrentStep(2); // Passe à l'étape suivante
    
                // Change l'onglet actif vers "Suivi de la carte consulaire" après 5 secondes
                setTimeout(() => {
                    setActiveTab('tracking');
                }, 5000); // 5000 millisecondes = 5 secondes
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Erreur lors de la soumission de la demande.");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            toast.error("Erreur réseau lors de la soumission de la demande.");
        }
    };

    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/personal-info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPersonalInfo({
                        name: data.name || '',
                        prenom: data.prenom || '',
                        email: data.email || '',
                        password: '', // Ne pas afficher le mot de passe
                        bio: data.bio || '',
                    });
                } else {
                    console.error("Erreur lors de la récupération des informations personnelles");
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
            }
        };

        fetchPersonalInfo();
    }, []);

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        const handlePopState = (event) => {
            window.history.pushState(null, '', window.location.href);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
 

    return (
        <div className="full-height">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <div className="bg-light">
                <div className="container py-3 ">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="profile-header position-relative mb-4">
                                <div className="position-absolute top-0 end-0 p-3">

                                </div>
                            </div>
                            <div className="text-center">
                                <div className="position-relative d-inline-block">
                                    <img src="https://randomuser.me/api/portraits/men/40.jpg" className="rounded-circle profile-pic" alt="Profile Picture" />
                                    <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div>
                                <h3 className="mt-3 mb-1">{personalInfo.name} {personalInfo.prenom}</h3>
                                <p className="text-muted mb-3">{personalInfo.bio}</p>
                                <div className="d-flex justify-content-center gap-2 mb-4">
                                    <button className="btn btn-outline-primary"><i className="fas fa-envelope me-2"></i>Message</button>
                                    <button className="btn btn-danger" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Déconnexion</button>
                                </div>
                            </div>
                        </div>
                         
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-3 border-end">
                                            <div className="p-2">
                                                <div className="nav flex-column nav-pills">
                                                    <a className={`nav-link ${activeTab === 'personalInfo' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('personalInfo')}>
                                                        <i className="fas fa-user me-2"></i>Info personnelles
                                                    </a>
                                                    <a className={`nav-link ${activeTab === 'consularCard' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('consularCard')}>
                                                        <i className="fas fa-id-card me-2"></i>Carte consulaire
                                                    </a>
                                                    <a className={`nav-link ${activeTab === 'tracking' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('tracking')}>
                                                        <i className="fas fa-truck me-2"></i>Suivi de la carte 
                                                    </a>
                                                    <div className="card-body mt-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <i className="fas fa-bell me-2" style={{ fontSize: '1.5rem', color: '#6c757d' }}></i>
                                                                <div>
                                                                    <h6 className="mb-1" style={{ color: '#6c757d' }}>Notifications </h6>
                                                                </div>
                                                            </div>
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" checked={emailNotificationsEnabled} onChange={toggleEmailNotifications} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="p-4">
                                                {activeTab === 'personalInfo' && (
                                                    <div className="mb-4">
                                                        <h5 className="mb-4">Informations personnelles</h5>
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="row g-3">
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Noms</label>
                                                                    <input type="text" className="form-control" name="prenom" value={personalInfo.prenom} onChange={handleInputChange} />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Prénoms</label>
                                                                    <input type="text" className="form-control" name="name" value={personalInfo.name} onChange={handleInputChange} />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Email</label>
                                                                    <input type="email" className="form-control" name="email" value={personalInfo.email} onChange={handleInputChange} readOnly />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Mot de passe</label>
                                                                    <input type="password" className="form-control" name="password" value={personalInfo.password} onChange={handleInputChange} readOnly />
                                                                </div>
                                                                <div className="col-12">
                                                                    <label className="form-label">Bio</label>
                                                                    <textarea className="form-control" name="bio" rows="4" value={personalInfo.bio} onChange={handleInputChange}></textarea>
                                                                </div>
                                                            </div>
                                                            <button type=" submit" className="btn btn-primary mt-3">Mettre à jour</button>
                                                        </form>
                                                    </div>
                                                )}
                                                {activeTab === 'consularCard' && (
                                                    <div className="mb-4">
                                                        <h5 className="mb-4">Demande de carte consulaire</h5>
                                                        <form onSubmit={handleConsularCardSubmit}>
                                                            <div className="mb-3">
                                                                <label className="form-label">Nom</label>
                                                                <input type="text" className="form-control" name="lastName" value={consularCardInfo.lastName} onChange={handleConsularCardInputChange} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Prénom</label>
                                                                <input type="text" className="form-control" name="firstName" value={consularCardInfo.firstName} onChange={handleConsularCardInputChange} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Date de naissance</label>
                                                                <input type="date" className="form-control" name="dateOfBirth" value={consularCardInfo.dateOfBirth} onChange={handleConsularCardInputChange} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Adresse</label>
                                                                <input type="text" className="form-control" name="address" value={consularCardInfo.address} onChange={handleConsularCardInputChange} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Numéro de passeport</label>
                                                                <input type="text" className="form-control" name="passportNumber" value={consularCardInfo.passportNumber} onChange={handleConsularCardInputChange} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Nationalité</label>
                                                                <input type="text" className="form-control" name="nationality" value={consularCardInfo.nationality} onChange={handleConsularCardInputChange} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Téléphone</label>
                                                                <input type="tel" className="form-control" name="phone" value={consularCardInfo.phone} onChange={handleConsularCardInputChange} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Email</label>
                                                                <input type="email" className="form-control" name="email" value={consularCardInfo.email} onChange={handleConsularCardInputChange} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Justificatif d'identité</label>
                                                                <input type="file" className="form-control" onChange={handleFileChange} required />
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mb-3">Soumettre</button>
                                                        </form>
                                                    </div>
                                                )}
                                                {activeTab === 'tracking' && (
                                                    <div className='mb-5'>
                                                        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
                                                        <div className="steps-vertical">
                                                            <div className={`step-vertical ${currentStep >= 1 ? 'complete' : ''}`}>
                                                                <div className="step-vertical-icon">
                                                                    <i className="fas fa-paper-plane"></i>
                                                                </div>
                                                                <div className="step-vertical-content ">
                                                                    <h4>Demande soumise</h4>
                                                                    <p>Votre demande de carte consulaire a été soumise avec succès.</p>
                                                                </div>
                                                            </div>
                                                            <div className={`step-vertical ${currentStep >= 2 ? 'complete' : ''}`}>
                                                                <div className="step-vertical-icon">
                                                                    <i className="fas fa-clock"></i>
                                                                </div>
                                                                <div className="step-vertical-content">
                                                                    <h4>En cours de traitement</h4>
                                                                    <p>Votre demande est actuellement en cours de traitement.</p>
                                                                </div>
                                                            </div>
                                                            <div className={`step-vertical ${currentStep === 3 ? 'complete' : ''}`}>
                                                                <div className="step-vertical-icon">
                                                                
                                                                    <i className="fas fa-check-circle"></i>
                                                                </div>
                                                                <div className="step-vertical-content">
                                                                    <h4>Carte prête</h4>
                                                                    <p>Votre carte consulaire est prête à être récupérée.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Profile;