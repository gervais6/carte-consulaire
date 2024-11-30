// ConfirmationMessage.js
import React from 'react';
import './ConfirmationMessage.css'; // Optional: Create a CSS file for styles

const ConfirmationMessage = () => {
  return (
    <div className="confirmation">
      <div className="icon">✔</div>
      <h2>Effectué</h2>
      <p>Votre inscrption à bien été enregister.</p>
    </div>
  );
};

export default ConfirmationMessage;