import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import '../pages/Profils.css';

const Profile = () => {
    const toggleSidebar = () => {

        const sidebar = document.querySelector('.sidebar');

        sidebar.classList.toggle('collapsed');

    };

    
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
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet"/>

<div className="d-flex">

<nav className="sidebar d-flex flex-column flex-shrink-0 position-fixed">

    <button className="toggle-btn" onClick={toggleSidebar}>

        <i className="fas fa-chevron-left"></i>

    </button>


    <div className="p-4">

        <h4 className="logo-text fw-bold mb-0">NexusFlow</h4>

        <p className="text-muted small hide-on-collapse">Dashboard</p>

    </div>


    <div className="nav flex-column">

        <a href="#" className="sidebar-link active text-decoration-none p-3">

            <i className="fas fa-home me-3"></i>

            <span className="hide-on-collapse">Dashboard</span>

        </a>

        <a href="#" className="sidebar-link text-decoration-none p-3">

            <i className="fas fa-chart-bar me-3"></i>

            <span className="hide-on-collapse">Analytics</span>

        </a>

        <a href="#" className="sidebar-link text-decoration-none p-3">

            <i className="fas fa-users me-3"></i>

            <span className="hide-on-collapse">Customers</span>

        </a>

        <a href="#" className="sidebar-link text-decoration-none p-3">

            <i className="fas fa-box me-3"></i>

            <span className="hide-on-collapse">Products</span>

        </a>

        <a href="#" className="sidebar-link text-decoration-none p-3">

            <i className="fas fa-gear me-3"></i>

            <span className="hide-on-collapse">Settings</span>

        </a>

    </div>


    <div className="profile-section mt-auto p-4">

        <div className="d-flex align-items-center">

            <img src="https://randomuser.me/api/portraits/women/70.jpg" style={{ height: '60px' }} className="rounded-circle" alt="Profile" />

            <div className="ms-3 profile-info">

                <h6 className="text-white mb-0">Alex Morgan</h6>

                <small className="text-muted">Admin</small>

            </div>

        </div>

    </div>

</nav>


<main className="main-content">

    <div className="container-fluid">

        <h2>Welcome to NexusFlow</h2>

        <p className="text-muted">Streamline your workflow with our intuitive dashboard.</p>

    </div>

</main>

</div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        </div>
    );
};

export default Profile;