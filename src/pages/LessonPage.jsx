// src/pages/LessonPage.jsx
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { courseData as englishCourseData } from '../data/courseData';
import { literacyCourseData } from '../data/literacyCourseData';
import './LessonPage.css';
import AccessibleButton from '../components/AccessibleButton';

// Se actualiza el componente ContentBlock para manejar la nueva actividad
const ContentBlock = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <h2 className="lesson-heading">{block.text}</h2>;
    case 'subheading':
      return <h3 className="lesson-subheading">{block.text}</h3>;
    case 'paragraph':
      return <p className="lesson-paragraph">{block.text}</p>;
    case 'example':
      return (
        <div className="lesson-example">
          <p><strong>{block.original}</strong> {block.translation && <span>{block.translation}</span>}</p>
          <p className="note">{block.note}</p>
          {block.image && <img src={block.image} alt={block.note} className="lesson-image-inline" />}
        </div>
      );
    case 'image':
      return <img src={block.src} alt={block.alt} className="lesson-image-full" />;
    case 'note':
      return <p className="lesson-note">{block.text}</p>;
    case 'activity':
      // --- ESTA ES LA LÓGICA CORREGIDA ---
      // Si la actividad es del nuevo tipo "mixto"
      if (block.activity_type === 'mixed') {
        return (
          <div className="lesson-activity">
            <h3>{block.title}</h3>
            {block.parts.map((part, index) => (
              <div key={index} className="activity-part">
                <p className="activity-instruction">{part.instruction}</p>
                <ul>
                  {part.sentences.map((sentence, i) => <li key={i}>{sentence}</li>)}
                </ul>
              </div>
            ))}
          </div>
        );
      }
      // Si no, es una actividad simple como las de antes
      return (
        <div className="lesson-activity">
          <h3>{block.title}</h3>
          <ul>
            {block.sentences.map((sentence, i) => <li key={i}>{sentence}</li>)}
          </ul>
        </div>
      );
    default:
      return null;
  }
};

function LessonPage() {
  const { stepId, topicId } = useParams();
  const location = useLocation();

  const isEnglishCourse = location.pathname.startsWith('/curso/paso');
  const courseData = isEnglishCourse ? englishCourseData : literacyCourseData;
  const basePath = isEnglishCourse ? '/curso/paso' : '/curso-alfabetizacion/paso';

  const step = courseData.find(s => s.id === parseInt(stepId));
  const topic = step?.grammar.concat(step.vocabulary).find(t => t.id === topicId);

  if (!topic || !topic.content || topic.content.length === 0) {
    return (
      <div className="lesson-page white-background">
        <div className="lesson-content">
          <h1>Contenido no disponible</h1>
          <p>El contenido para esta lección estará disponible próximamente.</p>
          <Link to={`${basePath}/${stepId}`}>Volver al paso</Link>
        </div>
      </div>
    );
  }
  
  const allTopicsInStep = step ? [...step.grammar, ...step.vocabulary] : [];
  const currentTopicIndex = allTopicsInStep.findIndex(t => t.id === topicId);
  const nextTopic = currentTopicIndex !== -1 && currentTopicIndex < allTopicsInStep.length - 1
    ? allTopicsInStep[currentTopicIndex + 1]
    : null;

  return (
    <div className="lesson-page white-background">
      <div className="lesson-content">
        {topic.content.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
        <div className="lesson-navigation">
          <AccessibleButton 
            linkTo={`${basePath}/${stepId}`} 
            className="button secondary"
          >
            Volver a la lista de temas
          </AccessibleButton>
          
          {nextTopic && (
            <AccessibleButton 
              linkTo={`${basePath}/${stepId}/${nextTopic.id}`} 
              className="button primary"
            >
              Siguiente Módulo: {nextTopic.title}
            </AccessibleButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonPage;