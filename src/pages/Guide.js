import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Guide.css';
import Footer from '../pages/Footer';
import Header from '../pages/Header';

const accordionData = [
    {
      id: 1,
      title: "Qu'est-ce que E-AFEP?",
      content: `
        <p>Votre nouvelle application E-AFEP est un service pensé et conçu pour nos concitoyens. Elle a pour objectif d’offrir à chacun de nos concitoyens la possibilité de faire ses démarches en ligne sans avoir à vous déplacer.</p>
      `,
    },
    {
      id: 2,
      title: "Comment faire mes démarches en ligne ?",
      content: `
        <h5>Étapes pour faire vos démarches en ligne avec E-AFEP :</h5>
        <ol>
          <li>
            <strong>Création de compte :</strong>
            <ul>
              <li>Créez une adresse mail (Google, Yahoo, ou Hotmail, ou autre) si vous n’en avez pas.</li>
              <li>Accédez à la page de création de votre espace personnel via le menu « Mon espace » ou le bouton « Accéder à votre espace ».</li>
              <li>Renseignez votre email, cliquez sur « Recevoir un code de vérification ».</li>
              <li>Le bouton change de statut et affiche « Code envoyé ».</li>
              <li>Rendez-vous dans votre boîte mail et copiez ou notez le code reçu.</li>
              <li>Collez ou saisissez le code dans le champ « Code de vérification » et cliquez sur « Suivant ».</li>
              <li>Saisissez votre identifiant et votre mot de passe, puis cliquez sur « Suivant ».</li>
              <li>Complétez tous les champs obligatoires des différents formulaires et cliquez sur « Suivant » à chaque étape.</li>
              <li>Joignez les justificatifs demandés (photo d’identité et pièce d’identité).</li>
              <li>Lisez et acceptez les conditions générales d’utilisation du site et cochez la case associée.</li>
              <li>Sur la page récapitulative, vérifiez les informations saisies et modifiez si besoin.</li>
              <li>Cliquez sur « Envoyer » si toutes les informations sont correctes.</li>
              <li>Un message de confirmation de la création de votre compte sera affiché.</li>
              <li>Vous pouvez maintenant vous rendre sur votre espace personnel.</li>
            </ul>
          </li>
          <li>
            <strong>Connexion à mon espace :</strong>
            <ul>
              <li>Pour vous connecter, saisissez votre login et votre mot de passe, puis cliquez sur « Connexion ».</li>
            </ul>
          </li>
          <li>
            <strong>Effectuer mes démarches :</strong>
            <ul>
              <li>Connecté à votre espace personnel, cliquez sur « Mes démarches », choisissez le type de document souhaité et effectuez votre demande.</li>
              <li>Remplissez tous les champs obligatoires, joignez les justificatifs demandés, choisissez le mode de livraison, payez en ligne par carte bancaire et cochez la case « Acception conditions générales ».</li>
              <li>Cliquez sur « Envoyer demande ».</li>
            </ul>
          </li>
          <li>
            <strong>Suivi de mes demandes :</strong>
            <ul>
              <li>Vous pouvez suivre votre demande depuis votre espace personnel et par mail.</li>
              <li>En cas de demande d'information complémentaire par le Consulat, répondez dans les meilleurs délais.</li>
              <li>Votre document sera livré chez vous sous 3 à 5 jours si vous avez choisi la livraison par la poste ou récupéré à l’Ambassade avec le numéro de retrait reçu par mail.</li>
            </ul>
          </li>
        </ol>
      `,
    },
    {
      id: 3,
      title: "J'ai oublié mon mot de passe.",
      content: `
        <p>Il vous faut cliquer sur le lien "Mot de passe oublié" au niveau de la page login, puis taper votre adresse mail et cliquer sur envoyer. Vous allez recevoir un email pour réinitialiser votre mot de passe.</p>
      `,
    },
    {
      id: 4,
      title: "Qu'est-ce que je peux faire avec E-AFEP ?",
      content: `
        <p><strong>E-AFEP est :</strong></p>
        <ul>
          <li>Un portail unique pour vos démarches</li>
          <li>Carte consulaire</li>
        </ul>
        <p>Plus besoin de faire des allers-retours à l’ambassade ou faire la queue pour effectuer une demande.</p>
        <p>Faites toutes vos démarches en ligne depuis chez vous et n’importe où au Sénégal.</p>
        <p><strong>Une solution accessible via tous les terminaux :</strong></p>
        <ul>
          <li>Téléphone</li>
          <li>Tablette</li>
          <li>Ordinateur</li>
        </ul>
        <p><strong>Un espace sécurisé personnalisé permettant de :</strong></p>
        <ul>
          <li>Suivre toutes vos demandes en ligne ainsi que leur avancement.</li>
          <li>Suivre en temps réel l’avancement de votre demande sur votre espace personnel sécurisé.</li>
          <li>Recevoir un mail de confirmation dès que vos documents sont prêts.</li>
        </ul>
        <p><strong>Choisissez le mode de retrait de vos documents :</strong></p>
        <ul>
          <li>Retirer vos documents à l’Ambassade directement.</li>
        </ul>
        <p><strong>Des documents sécurisés :</strong></p>
        <ul>
          <li>Respectant les plus hauts standards internationaux.</li>
          <li>Une refonte complète de vos documents afin de vous proposer des documents sécurisés acceptés et reconnus par tous nos partenaires.</li>
          <li>Des documents conçus pour durer et des options de sécurité intégrées à tous.</li>
        </ul>
      `,
    },
  ];

const Guide = () => {
  const [openAccordion, setOpenAccordion] = useState(1);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Responsive Header */}
      <Header/>
      {/* Main Content */}
      <div className="container mt-5 flex-fill">
        <h2 className="mb-4 mt-5 text-center text-md-start">Questions générales</h2>
        <div className="accordion" id="accordionPanelsStayOpenExample">
          {accordionData.map((item) => (
            <div className="accordion-item mb-3" key={item.id}>
              <h2 className="accordion-header" id={`panelsStayOpen-heading${item.id}`}>
                <button
                  className={`accordion-button ${openAccordion !== item.id ? 'collapsed' : ''}`}
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={openAccordion === item.id}
                  aria-controls={`panelsStayOpen-collapse${item.id}`}
                >
                  {item.title}
                </button>
              </h2>
              <div
                id={`panelsStayOpen-collapse${item.id}`}
                className={`accordion-collapse collapse ${openAccordion === item.id ? 'show' : ''}`}
                aria-labelledby={`panelsStayOpen-heading${item.id}`}
              >
                <div className="accordion-body" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Guide;
