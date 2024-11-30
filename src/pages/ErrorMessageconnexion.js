// ErrorMessage.js
import React from 'react';
import './ErrorMessage.css'; // Create a CSS file for styling

const ErrorMessageconnexion = ({ ErrorMessageconnexion }) => {
  return (
    <div className="error-message" >
      <div className="icon"style={{fontSize:10}} >❌</div>
      <h3>Echoué</h3>
      <p>Votre connexion  n'a pas reussi.</p>
      
    </div>
  );
};

export default ErrorMessageconnexion;