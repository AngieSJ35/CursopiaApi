// src/pages/CourseStep.jsx
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { courseData as englishCourseData } from '../data/courseData';
import { literacyCourseData } from '../data/literacyCourseData';
import './CourseStep.css';
import AccessibleButton from '../components/AccessibleButton';

function CourseStep() {
  const { stepId } = useParams();
  const location = useLocation();

  const isEnglishCourse = location.pathname.startsWith('/curso/paso');
  
  const courseData = isEnglishCourse ? englishCourseData : literacyCourseData;
  const basePath = isEnglishCourse ? '/curso/paso' : '/curso-alfabetizacion/paso';

  const currentStepNumber = parseInt(stepId, 10);
  const step = courseData.find(s => s.id === currentStepNumber);

  if (!step) {
    return (
      <div className="course-step-container">
        <h1>Paso no encontrado</h1>
        <Link to="/dashboard">Volver a la selección de cursos</Link>
      </div>
    );
  }

  const isFirstStep = currentStepNumber === 1;
  const isLastStep = currentStepNumber === courseData.length;

  return (
    <div className="course-step-container">
      <div className="step-header">
        <h1>{step.title}</h1>
      </div>
      <div className="step-content">
        <div className="topic-column">
          <h2>{isEnglishCourse ? 'GRAMÁTICA' : 'LECTOESCRITURA'}</h2>
          <div className="topic-grid">
            {/* --- CORRECCIÓN AQUÍ --- */}
            {/* Ahora lee 'topic.title' y cada botón es un Link a su lección */}
            {step.grammar.map((topic) => (
              <AccessibleButton 
                key={topic.id} 
                className="topic-box grammar" 
                linkTo={`${basePath}/${step.id}/${topic.id}`}
                ariaLabel={`Aprender sobre ${topic.title}`}
              >
                {topic.title}
              </AccessibleButton>
            ))}
          </div>
        </div>
        <div className="topic-column">
          <h2>VOCABULARIO</h2>
          <div className="topic-grid">
            {/* --- CORRECCIÓN AQUÍ --- */}
            {step.vocabulary.map((topic) => (
              <AccessibleButton 
                key={topic.id} 
                className="topic-box vocabulary" 
                linkTo={`${basePath}/${step.id}/${topic.id}`}
                ariaLabel={`Aprender sobre ${topic.title}`}
              >
                {topic.title}
              </AccessibleButton>
            ))}
          </div>
        </div>
      </div>
      <div className="step-action-button-container">
        <AccessibleButton linkTo="/dashboard" className="button secondary">
          Volver al Dashboard
        </AccessibleButton>
        <AccessibleButton className="button tertiary">
          REALIZAR OBJETIVOS
        </AccessibleButton>
      </div>
      <div className="step-navigation">
        <AccessibleButton 
          linkTo={`${basePath}/${currentStepNumber - 1}`} 
          className={`nav-arrow left ${isFirstStep ? 'disabled' : ''}`}
          ariaLabel="Ir al paso anterior"
        >
          ◀
        </AccessibleButton>
        <span>PASO {currentStepNumber} (HASTA {courseData.length})</span>
        <AccessibleButton 
          linkTo={`${basePath}/${currentStepNumber + 1}`} 
          className={`nav-arrow right ${isLastStep ? 'disabled' : ''}`}
          ariaLabel="Ir al siguiente paso"
        >
          ▶
        </AccessibleButton>
      </div>
    </div>
  );
}

export default CourseStep;