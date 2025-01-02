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


   const [recentActivities, setRecentActivities] = useState([]);


   const [visibleActivitiesCount, setVisibleActivitiesCount] = useState(3); // State for visible activities count




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


       setActiveTab('consularCard');


   };




   const handleTrackingClick = () => {


       if (!isConsularCardRequested) {


           toast.error("Vous devez d'abord faire une demande de carte consulaire pour accéder à cette section.");


           return;


       }


       setActiveTab('tracking');


   };




   const handleNotificationsClick = () => {


       setActiveTab('notifications');


   };




   const handlePersonalInfoClick = () => {


       setActiveTab('personalInfo');


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


           identityProof: e.target.files[0]


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


               await recordActivity("Mise à jour des informations personnelles");


               fetchRecentActivities(); // Fetch activities after update


           } else {


               console.error("Erreur lors de la mise à jour des informations", response.status);


               toast.error("Erreur lors de la mise à jour des informations.");


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


               toast.success(data.message);


               setIsConsularCardRequested(true);


               await recordActivity("Demande de carte consulaire soumise");


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


                       name: data.name,


                       prenom: data.prenom,


                       email: data.email,


                       password: '',


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


       fetchRecentActivities ();


   }, []);




   const handleShowMoreActivities = () => {


       setVisibleActivitiesCount(visibleActivitiesCount + 5); // Increase the count by 5


   };




   const handleShowLessActivities = () => {


       setVisibleActivitiesCount(3); // Reset to initial count


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


           <div className="bg-light">


               <div className="container ">


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


                                   <button className ="btn btn-outline-primary"><i className="fas fa-envelope me-2"></i>Message</button>


                                   <button className="btn btn-danger" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Déconnexion</button>


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


                                                   <a className={`nav-link ${activeTab === 'personalInfo' ? 'active' : ''}`} href="#" onClick={handlePersonalInfoClick}>


                                                       <i className="fas fa-user me-2"></i>Info personnelles


                                                   </a>


                                                   <a className={`nav-link ${activeTab === 'consularCard' ? 'active' : ''}`} href="#" onClick={handleSecurityClick}>


                                                       <i className="fas fa-lock me-2"></i>Carte consulaire


                                                   </a>


                                                   <a className={`nav-link ${activeTab === 'tracking' ? 'active' : ''}`} href="#" onClick={handleTrackingClick}>


                                                       <i className="fas fa-truck me-2"></i>Suivi de la carte consulaire


                                                   </a>


                                                   <a className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`} href="#" onClick={handleNotificationsClick}>


                                                       <i className="fas fa-bell me-2"></i>Notifications


                                                   </a>


                                                   <a className={`nav-link ${activeTab === 'recentActivities' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('recentActivities')}>


                                                       <i className="fas fa-history me-2"></i>Activités récentes


                                                   </a>


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


                                                                   <input type="email" className="form-control" name="email" value={personalInfo.email} onChange={handleInputChange} />


                                                               </div>


                                                               <div className="col-md-6">


                                                                   <label className="form-label">Mot de passe</label>


                                                                   <input type="password" className="form-control" name="password" value={personalInfo.password} onChange={handleInputChange} />


                                                               </div>


                                                               <div className="col-12">


                                                                   <label className="form-label">Bio</label>


                                                                   <textarea className="form-control" name="bio" rows="4" value={personalInfo.bio} onChange={handleInputChange}></textarea>


                                                               </div>


                                                           </div>


                                                           <button type="submit" className="btn btn-primary mt-3">Mettre à jour</button>


                                                       </form>


                                                   </div>


                                               )}




                                               {activeTab === 'recentActivities' && (


                                                   <div className="mb-4">


                                                       <h5 className="mb-4">Activités récentes</h5>


                                                       {recentActivities.slice(0, visibleActivitiesCount).map(activity => (


                                                           <div key={activity.id} className="activity-item mb-3">


                                                               <h6 className="mb-1">{activity.message}</h6>


                                                               <p className="text-muted small mb-0">{activity.date}</p>


                                                           </div>


                                                       ))}


                                                       {visibleActivitiesCount < recentActivities.length && (


                                                           <button className="btn btn-link" onClick={handleShowMoreActivities}>


                                                               Voir plus


                                                           </button>


                                                       )}


                                                       {visibleActivitiesCount > 3 && (


                                                           <button className="btn btn-link" onClick={handleShowLessActivities}>


                                                               Voir moins


                                                           </button>


                                                       )}


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


                                                               <input type="email" className=" form-control" name="email" value={consularCardInfo.email} onChange={handleConsularCardInputChange} required />


                                                           </div>


                                                           <div className="mb-3">


                                                               <label className="form-label">Justificatif d'identité</label>


                                                               <input type="file" className="form-control" onChange={handleFileChange} required />


                                                           </div>


                                                           <button type="submit" className="btn btn-primary mb-3">Soumettre</button>


                                                       </form>


                                                   </div>


                                               )}




                                               {activeTab === 'tracking' && isConsularCardRequested && (


                                                   <div className='mb-5'>


                                                       <h5 className="mb-4">Suivi de la carte consulaire</h5>


                                                       {trackingInfo.map(info => (


                                                           <div key={info.id} className="activity-item mb-3">


                                                               <h6 className="mb-1">{info.message}</h6>


                                                               <p className="text-muted small mb-0">{info.date}</p>


                                                           </div>


                                                       ))}


                                                   </div>


                                               )}




                                               {activeTab === 'tracking' && !isConsularCardRequested && (


                                                   <div className='mb-5'>


                                                       <h5 className="mb-4">Suivi de la carte consulaire</h5>


                                                       <p>Vous devez d'abord faire une demande de carte consulaire pour accéder à cette section.</p>


                                                   </div>


                                               )}




                                               {activeTab === 'notifications' && (


                                                   <div className="mb-4">


                                                       <h5 className="mb-4">Notifications</h5>


                                                       {notifications.map(notification => (


                                                           <div key={notification.id} className="activity-item mb-3">


                                                               <h6 className="mb-1">{notification.message}</h6>


                                                               <p className="text-muted small mb-0">{notification.date}</p>


                                                           </div>


                                                       ))}


                                                   </div>


                                               )}




                                               {/* Settings Cards */}


                                               <div className="row g-4 mb-4">


                                                   <div className="col-md-6">


                                                       <div className="settings-card card">


                                                           <div className="card-body">


                                                               <div className="d-flex justify-content-between align-items-center">


                                                                   <div>


                                                                       <h6 className="mb-1">Authentification à deux facteurs</h6>


                                                                       <p className="text-muted mb-0 small">Ajoutez une couche de sécurité supplémentaire</p>


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


                                                                       <h6 className="mb-1">Notifications par email</h6>


                                                                       <p className="text-muted mb-0 small">Recevez des mises à jour d'activité</p>


                                                                   </div>


                                                                   <div className="form-check form-switch">


                                                                       <input className="form-check-input" type="checkbox" checked={emailNotificationsEnabled} onChange={toggleEmailNotifications} />


                                                                   </div>


                                                               </div>


                                                           </div>


                                                       </div>


                                                   </div>


                                               </div>




                                               {/* Recent Activity */}


                                               <div>


                                                   <h5 className="mb-4">Activité récente</h5>


                                                   {recentActivities.slice(0, visibleActivitiesCount).map(activity => (


                                                       <div key={activity.id} className="activity-item mb-3">


                                                           <h6 className="mb-1">{activity.message}</h6>


                                                           <p className="text-muted small mb-0">{activity.date}</p>


                                                       </div>


                                                   ))}


                                                   {visibleActivitiesCount < recentActivities.length && (


                                                       <button className="btn btn-link" onClick={handleShowMoreActivities}>


                                                           Voir plus


                                                       </button>


                                                   )}


                                                   {visibleActivitiesCount > 3 && (


                                                       <button className="btn btn-link" onClick={handleShowLessActivities}>


                                                           Voir moins


                                                       </button>


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


           </div>




           <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false } closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />


       </div>


   );


};




export default Profile;