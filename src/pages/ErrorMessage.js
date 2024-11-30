// ErrorMessage.js
import React from 'react';
import './ErrorMessage.css'; // Create a CSS file for styling

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <div className="icon">❌</div>
      <h2>Echoué</h2>
      <p>Votre inscrption n'a pas été enregister.</p>
      
    </div>
  );
};

export default ErrorMessage;