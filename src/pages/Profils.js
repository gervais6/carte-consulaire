import React from 'react';
import './Profils.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

const Profile = () => {
  return (
    <div>
      <header className="header">
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
              <a href="#">Accueil</a>
              <a href="#">Demandes</a>
              <a href="#">Notifications</a>
              <a href="#">Contactez-nous</a>
            </nav>
            <div className="header-navigation-actions">
              <a href="#" className="button">
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
          <a href="#" className="button">
            <i className="ph-list-bold"></i>
            <span>Menu</span>
          </a>
        </div>
      </header>

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
            <a href="#">Mes détails</a>
            <a href="#">Profil</a>
            <a href="#">Demandes</a>
            <a href="#">Facturation</a>
            <a href="#" className="active">Notifications</a>
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
                    <span className="label-text ">Create a userflow</span>
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
};

export default Profile;