// ConfirmationMessage.js
import React from 'react';
import './ConfirmationMessage'; // Optional: Create a CSS file for styles

const ConfirmationMessage = () => {
  return (
    <div className="confirmation">
      <div className="icon">✔</div>
      <h2>Effectué</h2>
      <p>Vous serez redirigé dans 5min </p>
    </div>
  );
};

export default ConfirmationMessage;