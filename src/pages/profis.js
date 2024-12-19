import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import '../pages/Profils.css';
import '../pages/VisualiserCart.css';

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
    const [recentActivities, setRecentActivities] = useState([]);
    const [visibleActivitiesCount, setVisibleActivitiesCount] = useState(3);
    const [consularCardRequests, setConsularCardRequests] = useState([]);

    const notifications = [
        { id: 1, message: "Votre demande de carte consulaire a été reçue.", date: "il y a 1 jour" },
        { id: 2, message: "Votre mot de passe a été modifié avec succès.", date: "il y a 2 jours" },
        { id: 3, message: "Vous avez reçu un nouveau message.", date: "il y a 3 jours" },
    ];

    // Enregistrer une activité
    const recordActivity = async (message) => {
        try {
            const response = await fetch('http://localhost:8000/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                console.log("Activité enregistrée avec succès");
            } else {
                console.error("Erreur lors de l'enregistrement de l'activité");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    // Récupérer les activités récentes
    const fetchRecentActivities = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/activities', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRecentActivities(data);
            } else {
                console.error("Erreur lors de la récupération des activités");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    // Récupérer les demandes de carte consulaire
    const fetchConsularCardRequests = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/consular-card-requests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setConsularCardRequests(data);
            } else {
                console.error("Erreur lors de la récupération des demandes");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    // Gérer la déconnexion
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

    // Activer ou désactiver l'authentification à deux facteurs
    const toggleTwoFactorAuth = () => {
        setTwoFactorAuthEnabled(!twoFactorAuthEnabled);
        const message = twoFactorAuthEnabled ? "L'authentification à deux facteurs a été désactivée." : "L'authentification à deux facteurs a été activée.";
        recordActivity(message);
        toast.success(message);
    };

    // Gérer les notifications par email
    const toggleEmailNotifications = () => {
        setEmailNotificationsEnabled(!emailNotificationsEnabled);
        const message = emailNotificationsEnabled ? "Les notifications par email ont été désactivées." : "Les notifications par email ont été activées.";
        recordActivity(message);
        toast.success(message);
    };

    // Soumettre une demande de carte consulaire
    const submitConsularCardRequest = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/consular-card-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(consularCardInfo),
            });

            if (response.ok) {
                setIsConsularCardRequested(true);
                toast.success("Demande de carte consulaire soumise avec succès.");
                recordActivity("Demande de carte consulaire soumise.");
            } else {
                console.error("Erreur lors de la soumission de la demande");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    useEffect(() => {
        fetchRecentActivities();
        fetchConsularCardRequests();
    }, []);

    return (
        <div className="profile-container">
            <ToastContainer />
            <h1>Profil Utilisateur</h1>
            {/* Tabs for navigation */}
            <div className="tabs">
                <button onClick={() => setActiveTab('personalInfo')}>Informations Personnelles</button>
                <button onClick={() => setActiveTab('consularCard')}>Carte Consulaire</button>
                <button onClick={() => setActiveTab('activities')}>Activités Récentes</button>
            </div>
            {/* Render active tab content */}
            {activeTab === 'personalInfo' && (
                <div>
                    <h2>Informations Personnelles</h2>
                    {/* Form for personal information */}
                    <form>
                        {/* Form fields for personal info */}
                    </form>
                </div>
            )}
            {activeTab === 'consularCard' && (
                <div>
                    <h2>Demande de Carte Consulaire</h2>
                    {/* Form for consular card request */}
                    <form>
                        {/* Form fields for consular card info */}
                        <button type="button" onClick={submitConsularCardRequest}>Soumettre Demande</button>
                    </form>
                </div>
            )}
            {activeTab === 'activities' && (
                <div>
                    <h2>Activités Récentes</h2>
                    {/* List recent activities */}
                    <ul>
                        {recentActivities.slice(0, visibleActivitiesCount).map(activity => (
                            <li key={activity.id}>{activity.message} - {activity.date}</li>
                        ))}
                    </ul>
                    <button onClick={() => setVisibleActivitiesCount(visibleActivitiesCount + 3)}>Voir Plus</button>
                </div>
            )}
            <button onClick={handleLogout}>Déconnexion</button>
        </div>
    );
};

export default Profile;