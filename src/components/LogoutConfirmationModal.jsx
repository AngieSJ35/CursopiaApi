// src/components/LogoutConfirmationModal.jsx
import React from 'react';
import AccessibleButton from './AccessibleButton';
import './LogoutConfirmationModal.css';

function LogoutConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog" aria-modal="true">
        <h2>Confirmar Cierre de Sesión</h2>
        <p>¿Estás seguro de que quieres cerrar sesión?</p>
        <div className="modal-actions">
          <AccessibleButton onClick={onCancel} className="button secondary" ariaLabel="Cancelar y permanecer en la sesión">
            Cancelar
          </AccessibleButton>
          <AccessibleButton onClick={onConfirm} className="button primary" ariaLabel="Confirmar y cerrar la sesión">
            Confirmar
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmationModal;