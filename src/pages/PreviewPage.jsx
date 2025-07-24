// src/pages/PreviewPage.jsx
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './PreviewPage.css';
import AccessibleButton from '../components/AccessibleButton';

// El objeto con toda la información de las vistas previas (AHORA COMPLETO)
const previewsData = {
  alfabetizacion: {
    title: 'Alfabetización: Un Nuevo Comienzo',
    paragraphs: [
      'Aprender a leer y escribir es una herramienta poderosa que abre puertas a nuevos mundos y oportunidades. Este curso está diseñado para acompañarte en cada paso de este viaje, con paciencia, respeto y ejercicios prácticos que fortalecen tu confianza.',
      'Nuestro método se enfoca en empezar por lo más sencillo: el reconocimiento de letras y sonidos, para luego avanzar hacia la construcción de sílabas, palabras y frases completas. ¡Nunca es tarde para redescubrir el placer de la lectura y la escritura!'
    ],
    buttonText: 'Comenzar a Aprender'
  },
  ingles: {
    title: 'Nuestro Inglés',
    paragraphs: [
      'Creemos que aprender inglés puede ser una experiencia positiva a cualquier edad, especialmente cuando se hace paso a paso y con cariño. Por eso, desarrollamos un método de 21 pasos pensado especialmente para personas mayores que están comenzando o retomando el aprendizaje.',
      'Este camino está dividido en tres niveles: Beginner (principiante), Intermediate (intermedio) y Advanced (avanzado). Cada nivel contiene 7 pasos, donde se trabajan de manera sencilla y práctica aspectos clave como vocabulario, gramática, comprensión auditiva (listening) y cohesión.',
      'Cada paso tiene pequeños objetivos que, al cumplirse, permiten avanzar con confianza al siguiente. Así, cada persona aprende a su propio ritmo, sintiéndose acompañada, motivada y segura en cada etapa del proceso.'
    ],
    buttonText: 'Registrarse'
  },
  progreso: {
    title: 'Seguimiento Visual de Progreso',
    paragraphs: [
      'En Cursopia, creemos que ver tu propio avance es una de las mayores fuentes de motivación. Por eso, hemos diseñado un sistema de seguimiento visual que te permite ver claramente cuánto has aprendido y qué tan cerca estás de tus metas. Por cada objetivo que completas, tu barra de progreso personal avanzará.'
    ],
    buttonText: 'Inicia sesión para ver tu progreso'
  }
};

function PreviewPage() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') || 'ingles'; // 'ingles' por defecto si no hay topic

  // Se añade una comprobación para evitar errores si el topic no es válido
  const data = previewsData[topic] || previewsData.ingles;

  // Datos para la simulación de la barra de progreso
  const totalSteps = 7;
  const completedSteps = 4;

  return (
    <div className="preview-container">
      <div className="preview-content">
        <h1>{data.title}</h1>
        {data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

        {/* Renderizado Condicional: Muestra la simulación solo si el topic es 'progreso' */}
        {topic === 'progreso' && (
          <>
            <h2 className="simulation-title">Así se verá tu progreso en el curso de Inglés:</h2>
            <div className="progress-simulation">
              <p>Paso {completedSteps} de {totalSteps} completados</p>
              <div className="steps-bar">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div 
                    key={index}
                    className={`step-circle ${index < completedSteps ? 'completed' : ''}`}
                  ></div>
                ))}
              </div>
            </div>

            <h2 className="simulation-title">Sugerencias para avanzar más rápido:</h2>
            <ul className="suggestions-list">
              <li>✓ <strong>Practica Diariamente:</strong> La constancia es clave.</li>
              <li>✓ <strong>Realiza los Objetivos:</strong> No dejes pasar las actividades prácticas.</li>
              <li>✓ <strong>No Temas Equivocarte:</strong> Cada error es una oportunidad para aprender.</li>
            </ul>
          </>
        )}

        <div className="preview-button-container">
          <AccessibleButton linkTo="/login" className="button primary" ariaLabel={data.buttonText}>
            {data.buttonText}
          </AccessibleButton>
          <AccessibleButton linkTo="/" className="button secondary">
            Volver a Home
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;