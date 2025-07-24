// src/pages/CourseSelection.jsx
import React from 'react';
import AccessibleButton from '../components/AccessibleButton';
import './CourseSelection.css';

function CourseSelection() {
  // Obtenemos el nombre del usuario de localStorage para personalizar el saludo
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.name : 'Usuario';

  return (
    <div className="course-selection-container">
      <h1>¡Bienvenido de nuevo, {userName}!</h1>
      <p>¿Qué te gustaría aprender hoy?</p>
      <div className="selection-buttons">
        <AccessibleButton 
          linkTo="/curso-alfabetizacion/paso/1"
          className="button tertiary"
          ariaLabel="Acceder al curso de Alfabetización"
        >
          Acceder a curso de Alfabetización
        </AccessibleButton>
        <AccessibleButton 
          linkTo="/curso/paso/1"
          className="button primary"
          ariaLabel="Acceder al curso de Inglés"
        >
          Acceder a curso de Inglés
        </AccessibleButton>
      </div>
    </div>
  );
}

export default CourseSelection;