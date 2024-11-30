// Modal.js
import React from 'react';
import './Modal.css'; // Assurez-vous d'importer le CSS pour le style

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;