import React, { useState } from 'react';
import './Profils.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

const Profile = () => {
  const [currentSection, setCurrentSection] = useState('home'); // State to manage the current section
  const [profilePicture, setProfilePicture] = useState('https://assets.codepen.io/285131/hat-man.png'); // Default profile picture

  const [name, setName] = useState('');

  const [prenom, setPrenom] = useState('');

  const [email, setEmail] = useState('');

  const [telephone, setTelephone] = useState('');


  const handleProfilePictureChange = (event) => {

    const file = event.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {

        setProfilePicture(reader.result);

      };

      reader.readAsDataURL(file);

    }

  };
  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <div>
            <main className="main">
              <div className="responsive-wrapper">
                <div className="main-header">
                  <h1>Demandes de documents administratifs</h1>
                  <div className="search">
                    <input type="text" placeholder="Rechercher des demandes..." />
                    <button type="submit">
                      <i className="ph-magnifying-glass-bold"></i>
                    </button>
                  </div>
                </div>

                <div className="horizontal-tabs">
   

                  <a href="#" className="active" onClick={() => setCurrentSection('home')}>Details</a>

                  <a href="#"   onClick={() => setCurrentSection('profile')}>Profile</a>
              <a href="#" onClick={() => setCurrentSection('demandes')}>Demandes</a>


                </div>

                <div className="content-header">
                  <div className="content-header-intro">
                    <h2>Votre historique de demandes</h2>
                    <p>Consultez et gérez vos demandes de documents soumises à l'ambassade du Gabon.</p>
                  </div>
                  <div className="content-header-actions">
                    <a href="#" className="button">
                      <i className="ph-filters-bold"></i>
                      <span>Filtres</span>
                    </a>
                    <a href="#" className="button">
                      <i className="ph-plus-bold"></i>
                      <span>Nouvelle demande</span>
                    </a>
                  </div>
                </div>

                <div className="content">
                  <div className="content-panel">
                    <div className="vertical-tabs">
                      <a href="#" className="active">Toutes les demandes</a>
                      <a href="#">En attente</a>
                      <a href="#">Approuvées</a>
                      <a href="#">Rejetées</a>
                    </div>
                  </div>

                  <div className="content-main">
                    <div className="tasks-wrapper">
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-1" checked />
                        <label htmlFor="item-1">
                          <span className="label-text">Dashboard Design Implementation</span>
                        </label>
                        <span className="tag approved">Approuvé</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-2" checked />
                        <label htmlFor="item-2">
                          <span className="label-text">Create a userflow</span>
                        </label>
                        <span className="tag progress">En cours</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-3" />
                        <label htmlFor="item-3">
                          <span className="label-text">Application Implementation</span>
                        </label>
                        <span className="tag review">En révision</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-4" />
                        <label htmlFor="item-4">
                          <span className="label-text">Create a Dashboard Design</span>
                        </label>
                        <span className="tag progress">En cours</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-5" />
                        <label htmlFor="item-5">
                          <span className="label-text">Create a Web Application Design</span>
                        </label>
                        <span className="tag approved">Approuvé</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-6" />
                        <label htmlFor="item-6">
                          <span className="label-text">Interactive Design</span>
                        </label>
                        <span className="tag review">En révision</span>
                      </div>
                      <div className="header upcoming">Tâches à venir</div>
 <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-7" />
                        <label htmlFor="item-7">
                          <span className="label-text">Dashboard Design Implementation</span>
                        </label>
                        <span className="tag waiting">En attente</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-8" />
                        <label htmlFor="item-8">
                          <span className="label-text">Create a userflow</span>
                        </label>
                        <span className="tag waiting">En attente</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-9" />
                        <label htmlFor="item-9">
                          <span className="label-text">Application Implementation</span>
                        </label>
                        <span className="tag waiting">En attente</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-10" />
                        <label htmlFor="item-10">
                          <span className="label-text">Create a Dashboard Design</span>
                        </label>
                        <span className="tag waiting">En attente</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        );
      case 'profile':
        return (

          <div>

            <main className="main">

              <div className="responsive-wrapper">

                <div className="main-header">

                  <h1>Profile de l'utilisateur</h1>

                </div>


                <div className="horizontal-tabs">



                <a href="#"  onClick={() => setCurrentSection('home')}>Details</a>

<a href="#" className="active"  onClick={() => setCurrentSection('profile')}>Profile</a>
<a href="#" onClick={() => setCurrentSection('demandes')}>Demandes</a>


                </div>


                <div className="content-header">

                  <div className="content-header-intro">

                    < h2>Bienvenue dans votre espace personnel</h2>

                    <p> Ici, vous pouvez consulter et gérer vos informations personnelles et mettre à jour vos coordonnées.</p>

                  </div>

                  <div className="content-header-actions">

                    <a href="#" className="button">

                      <i className="ph-plus-bold"></i>

                      <span>Nouvelle demande</span>

                    </a>

                  </div>

                </div>


                <div className="content">

                  <div className="content-panel">

                    <div className="vertical-tabs">

                      <a className="nav-link active" href="#" style={{fontSize:15}}><i className="fas fa-user me-2"></i>Information personnelle</a>

                      
                    </div>

                  </div>


                  <div className="content-main">

                    <div className="mb-4">

                      <h5 className="mb-4">Information personnelle</h5>

                      <div className="row g-3">

                        <div className="col-md-6">

                          <label className="form-label">Noms</label>

                          <input type="text" className="form-control" placeholder="Entrez votre nom" value={name} onChange={(e) => setName(e.target.value)} />

                        </div>

                        <div className="col-md-6">

                          <label className="form-label">Prénoms</label>

                          <input type="text" className="form-control" placeholder="Entrez votre prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />

                        </div>

                        <div className="col-md-6">

                          <label className="form-label">Email</label>

                          <input type="email" className="form-control" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>

                        <div className="col-md-6">

                          <label className="form-label">Téléphone</label>

                          <input type="tel" className="form-control" placeholder="Entrez votre numéro de téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />

                        </div>

                      </div>

                    </div>





                    <div className="notification-settings mb-4">

                      <h5 className="mb-3">Paramètres de notification</h5>

                      <p>Activez les notifications pour rester informé des mises à jour importantes.</p>

                      <div class="col-md-6">
                                            <div class="settings-card card">
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h6 class="mb-1">Email Notifications</h6>
                                                            <p class="text-muted mb-0 small">Receive activity updates
                                                            </p>
                                                        </div>
                                                        <div class="form-check form-switch">
                                                            <input class="form-check-input" type="checkbox" checked/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                    </div>

                  </div>

                </div>

              </div>

            </main>

          </div>

        );
      case 'demandes':
        return (
          <div>
            <main className="main">
              <div className="responsive-wrapper">
                <div className="main-header">
                  <h1>Demandes de documents administratifs</h1>
                  <div className="search">
                    <input type="text" placeholder="Rechercher des demandes..." />
                    <button type="submit">
                      <i className=" ph-magnifying-glass-bold"></i>
                    </button>
                  </div>
                </div>

                <div className="horizontal-tabs">
                <a href="#"  onClick={() => setCurrentSection('home')}>Details</a>

<a href="#"   onClick={() => setCurrentSection('profile')}>Profile</a>
<a href="#" className="active" onClick={() => setCurrentSection('demandes')}>Demandes</a>
</div>

                <div className="content-header">
                  <div className="content-header-intro">
                    <h2>Votre historique de demandes</h2>
                    <p>Consultez et gérez vos demandes de documents soumises à l'ambassade du Gabon.</p>
                  </div>
                  <div className="content-header-actions">
                    <a href="#" className="button">
                      <i className="ph-filters-bold"></i>
                      <span>Filtres</span>
                    </a>
                    <a href="#" className="button">
                      <i className="ph-plus-bold"></i>
                      <span>Nouvelle demande</span>
                    </a>
                  </div>
                </div>

                <div className="content">
                  <div className="content-panel">
                    <div className="vertical-tabs">
                      <a href="#" className="active">Toutes les demandes</a>
                      <a href="#">En attente</a>
                      <a href="#">Approuvées</a>
                      <a href="#">Rejetées</a>
                      
                    </div>
                  </div>

                  <div className="content-main">
                    <div className="tasks-wrapper">
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-1" checked />
                        <label htmlFor="item-1">
                          <span className="label-text">Dashboard Design Implementation</span>
                        </label>
                        <span className="tag approved">Approuvé</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-2" checked />
                        <label htmlFor="item-2">
                          <span className="label-text">Create a userflow</span>
                        </label>
                        <span className="tag progress">En cours</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-3" />
                        <label htmlFor="item-3">
                          <span className="label-text">Application Implementation</span>
                        </label>
                        <span className="tag review">En révision</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-4" />
                        <label htmlFor="item-4">
                          <span className="label-text">Create a Dashboard Design</span>
                        </label>
                        <span className="tag progress">En cours</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-5" />
                        <label htmlFor="item-5">
                          <span className="label-text">Create a Web Application Design</span>
                        </label>
                        <span className="tag approved">Approuvé</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-6" />
                        <label htmlFor="item-6">
                          <span className="label-text">Interactive Design</span>
                        </label>
                        <span className="tag review">En révision</span>
                      </div>
                      <div className="header upcoming">Tâches à venir</div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-7" />
                        <label htmlFor="item-7">
                          <span className="label-text">Dashboard Design Implementation</span>
                        </label>
                        <span className="tag waiting">En attente</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-8" />
                        <label htmlFor="item-8">
                          <span className="label-text">Create a userflow</span>
                        </label>
                        <span className="tag waiting">En attente</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-9" />
                        <label htmlFor 
="item-9">
                          <span className="label-text">Application Implementation</span>
                        </label>
                        <span className="tag waiting">En attente</span>
                      </div>
                      <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-10" />
                        <label htmlFor="item-10">
                          <span className="label-text">Create a Dashboard Design</span>
                        </label>
                        <span className="tag waiting">En attente</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h2>Notifications</h2>
            <p>Voici vos notifications récentes.</p>
          </div>
        );
      case 'facturation':
        return (
          <div>
            <h2>Facturation</h2>
            <p>Voici vos informations de facturation.</p>
          </div>
        );
      default:
        return <h1>Bienvenue sur la page d'accueil</h1>;
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa' }}> {/* Set the background color here */}
      <header className="header" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="header-content responsive-wrapper">
          <div className="header-logo">
            <a href="#">
              <div>
                <img src="https://assets.codepen.io/285131/untitled-ui-icon.svg" alt="Logo Icon" />
              </div>
              <img src="https://assets.codepen.io/285131/untitled-ui.svg" alt="Logo" />
            </a>
          </div>
          <div className="header-navigation">
            <nav className="header-navigation-links">
              <a href="#" onClick={() => setCurrentSection('home')}>Accueil</a>
              <a href="#" onClick={() => setCurrentSection('profile')}>Profile</a>
              <a href="#" onClick={() => setCurrentSection('demandes')}>Demandes</a>
              <a href="#" onClick={() => setCurrentSection('facturation')}>Facturation</a>
            </nav>
            <div className="header-navigation-actions">
              <a href="#" className="button" style={{ backgroundColor: '#007bff', color: '#fff' }}>
                <i className="ph-lightning-bold"></i>
                <span>Déconnexion</span>
              </a>
              <a href="#" className="icon-button">
                <i className="ph-gear-bold"></i>
              </a>
              <a href="#" className="icon-button">
                <i className="ph-bell-bold"></i>
              </a>
              <a href="#" className="avatar">
                <img src="https://assets.codepen.io/285131/hat-man.png" alt="Avatar utilisateur" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main>
        {renderSection()}
      </main>
    </div>
  );
};

export default Profile;