import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../pages/Profils.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('personalInfo'); // 'personalInfo' par défaut
    const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false); // Ajout de l'état pour l'authentification à deux facteurs
    const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
    const [showConsularCardForm, setShowConsularCardForm] = useState(false);
    const [showTrackingInfo, setShowTrackingInfo] = useState(false); // État pour afficher les informations de suivi
    const [showNotifications, setShowNotifications] = useState(false); // État pour afficher les notifications
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
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

    const notifications = [
        { id: 1, message: "Votre demande de carte consulaire a été reçue.", date: "il y a 1 jour" },
        { id: 2, message: "Votre mot de passe a été modifié avec succès.", date: "il y a 2 jours" },
        { id: 3, message: "Vous avez reçu un nouveau message.", date: "il y a 3 jours" },
    ];

    const trackingInfo = [
        { id: 1, message: "Votre demande de carte consulaire est en cours de traitement.", date: "il y a 1 jour" },
        { id: 2, message: "Votre carte consulaire a été expédiée.", date: "il y a 2 jours" },
        { id: 3, message: "Votre carte consulaire est prête à être récupérée.", date: "il y a 3 jours" },
    ];

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

    const toggleEmailNotifications = () => {
        setEmailNotificationsEnabled(!emailNotificationsEnabled);
    };

    const handleSecurityClick = () => {
        setShowConsularCardForm(true);
        setShowTrackingInfo(false); // Masquer le suivi de la carte consulaire
        setShowNotifications(false); // Masquer les notifications
        setActiveTab('consularCard'); // Met à jour l'onglet actif
    };

    const handleTrackingClick = () => {
        setShowTrackingInfo(true); // Afficher les informations de suivi
        setShowConsularCardForm(false); // Masquer le formulaire de demande de carte consulaire
        setShowNotifications(false); // Masquer les notifications
        setActiveTab('tracking'); // Met à jour l'onglet actif
    };

    const handleNotificationsClick = () => {
        setShowNotifications(true); // Afficher les notifications
        setShowConsularCardForm(false); // Masquer le formulaire de demande de carte consulaire
        setShowTrackingInfo(false); // Masquer le suivi de la carte consulaire
        setActiveTab('notifications'); // Met à jour l'onglet actif
    };

    const handlePersonalInfoClick = () => {
        setShowConsularCardForm(false);
        setShowTrackingInfo(false); // Masquer le suivi de la carte consulaire
        setShowNotifications(false); // Masquer les notifications
        setActiveTab('personalInfo'); // Met à jour l'onglet actif
    };

    const handleInputChange = ( e) => {
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
            identityProof: e.target.files[0]
        });
    };

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
            <div className="bg-light flex-grow-1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="profile-header position-relative mb-4">
                                <div className="position-absolute top-0 end-0 p-3">
                                    <button className="btn btn-light"><i className="fas fa-edit me-2"></i>Edit Cover</button>
                                </div>
                            </div>

                            {/* Profile Header */}
                            <div className="text-center">
                                <div className="position-relative d-inline-block">
                                    <img src="https://randomuser.me/api/portraits/men/40.jpg" className="rounded-circle profile-pic" alt="Profile Picture" />
                                    <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div>
                                <h3 className="mt-3 mb-1">{personalInfo.firstName} {personalInfo.lastName}</h3>
                                <p className="text-muted mb-3">{personalInfo.bio}</p>
                                <div className="d-flex justify-content-center gap-2 mb-4">
                                    <button className="btn btn-outline-primary" style={{ fontSize: '17px' }}><i className="fas fa-envelope me-2"></i>Message</button>
                                    <button className="btn btn-danger ms-2" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Déconnexion</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-3 border-end">
                                            <div className="p-4">
                                                <div className="nav flex-column nav-pills">
                                                    <a className={`nav-link ${activeTab === 'personalInfo' ? 'active' : ''}`} href="#" style={{ fontSize: '18px' }} onClick={handlePersonalInfoClick}>
                                                        <i className="fas fa-user me-2"></i>Info personnelles
                                                    </a>
                                                    <a className={`nav-link ${activeTab === 'consularCard' ? 'active' : ''}`} href="#" style={{ fontSize: '17px' }} onClick={handleSecurityClick}>
                                                        <i className="fas fa-id-card me-2"></i>Demande de carte consulaire
                                                    </a>
                                                    <a className={`nav-link ${activeTab === 'tracking' ? 'active' : ''}`} href="#" style={{ fontSize: '18px' }} onClick={handleTrackingClick}>
                                                        <i className="fas fa-truck me-2"></i>Suivi carte consulaire
                                                    </a>
                                                    <a className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`} href="#" style={{ fontSize: '18px' }} onClick={handleNotificationsClick}>
                                                        <i className="fas fa-bell me-2"></i>Notifications
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-9">
                                            <div className="p-4">
                                                {showConsularCardForm ? (
                                                    <div>
                                                        <h5 className="mb-4" style={{ fontSize: '18px' }}>Demande de carte consulaire</h5>
                                                        <form>
                                                            <div className="mb-3">
                                                                <label className="form-label">Nom</label>
                                                                <input type="text" className="form-control" name="lastName" value={consularCardInfo.lastName} onChange={handleConsularCardInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Prénom</label>
                                                                <input type="text" className="form-control" name="firstName" value={consularCardInfo.firstName} onChange={handleConsularCardInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Date de naissance</label>
                                                                <input type="text" className="form-control" name="dateOfBirth" value={consularCardInfo.dateOfBirth} onChange={handleConsularCardInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Adresse</label>
                                                                <input type="text" className="form-control" name="address" value={consularCardInfo.address} onChange={handleConsularCardInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Numéro de passeport</label>
                                                                <input type="text" className="form-control" name="passportNumber" value={consularCardInfo.passportNumber} onChange={handleConsularCardInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Nationalité</label>
                                                                <input type="text" className="form-control" name="nationality" value={consularCardInfo.nationality} onChange={handleConsularCardInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Téléphone</label>
                                                                <input type="tel" className="form-control" name="phone" value={consularCardInfo.phone} onChange={handleConsularCardInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Email</label>
                                                                <input type="email" className="form-control" name="email" value={consularCardInfo.email} onChange={handleConsularCardInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Justificatif d'identité</label>
                                                                <input type="file" className="form-control" onChange={handleFileChange} />
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mb-3">Soumettre</button>
                                                        </form>
                                                    </div>
                                                ) : showTrackingInfo ? (
                                                    <div className='mb-5'>
                                                        <h5 className="mb-4" style={{ fontSize: '18px' }}>Suivi de la carte consulaire</h5>
                                                        {trackingInfo.map(info => (
                                                            <div key={info.id} className="activity-item mb-3">
                                                                <h6 className="mb-1" style={{ fontSize: '18px' }}>{info.message}</h6>
                                                                <p className="text-muted small mb-0" style={{ fontSize: '18px' }}>{info.date}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : showNotifications ? (
                                                    <div className="mb-4">
                                                        <h5 className="mb-4" style={{ fontSize: '18px' }}>Notifications</h5>
                                                        {notifications.map(notification => (
                                                            <div key={notification.id} className="activity-item mb-3">
                                                                <h6 className="mb-1" style={{ fontSize: '18px' }}>{notification.message}</h6>
                                                                <p className="text-muted small mb-0" style={{ fontSize: '18px' }}>{notification.date}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="mb-4">
                                                        <h5 className="mb-4" style={{ fontSize: '18px '}}>Informations personnelles</h5>
                                                        <div className="row g-3">
                                                            <div className="col-md-6">
                                                                <label className="form-label" style={{ fontSize: '18px' }}>Noms</label>
                                                                <input type="text" className="form-control" name="lastName" value={personalInfo.lastName} onChange={handleInputChange} style={{ fontSize: '18px' }} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="form-label" style={{ fontSize: '18px' }}>Prénoms</label>
                                                                <input type="text" className="form-control" name="firstName" value={personalInfo.firstName} onChange={handleInputChange} style={{ fontSize: '18px' }} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="form-label" style={{ fontSize: '18px' }}>Email</label>
                                                                <input type="email" className="form-control" name="email" value={personalInfo.email} onChange={handleInputChange} style={{ fontSize: '18px' }} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="form-label" style={{ fontSize: '18px' }}>Téléphone</label>
                                                                <input type="tel" className="form-control" name="phone" value={personalInfo.phone} onChange={handleInputChange} style={{ fontSize: '18px' }} />
                                                            </div>
                                                            <div className="col-12">
                                                                <label className="form-label" style={{ fontSize: '18px' }}>Bio</label>
                                                                <textarea className="form-control" name="bio" rows="4" value={personalInfo.bio} onChange={handleInputChange} style={{ fontSize: '18px' }}></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="row g-4 mb-4">
                                                    <div className="col-md-6">
                                                        <div className="settings-card card">
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Authentification à deux facteurs</h6>
                                                                        <p className="text-muted mb-0 small" style={{ fontSize: '18px' }}>Ajoutez une couche de sécurité supplémentaire</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" checked={twoFactorAuthEnabled} onChange={toggleTwoFactorAuth} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="settings-card card">
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Notifications par courrier électronique</h6>
                                                                        <p className="text-muted mb-0 small" style={{ fontSize: '18px' }}>Recevez des mises à jour d'activité</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" checked={emailNotificationsEnabled} onChange={toggleEmailNotifications} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h5 className="mb-4" style={{ fontSize: '18px' }}>Activité récente</h5>
                                                    <div className="activity-item mb-3">
                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Photo de profil mise à jour</h6>
                                                        <p className="text-muted small mb-0" style={{ fontSize: '18px' }}>il y a 2 heures</p>
                                                    </div>
                                                    <div className="activity-item mb-3">
                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Mot de passe modifié</h6>
                                                        <p className="text-muted small mb-0" style={{ fontSize: '18px' }}>Hier</p>
                                                    </div>
                                                    <div className="activity-item">
                                                        <h6 
                                                        className="mb-1" style={{ fontSize: '18px' }}>Informations de facturation mises à jour</h6>
                                                        <p className="text-muted small mb-0" style={{ fontSize: '18px' }}>il y a 3 jours</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;