// src/components/InteractiveFeatureCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTalkback } from './useTalkback'; // 1. Importa el hook
import './InteractiveFeatureCard.css';

// 2. Añade una nueva prop 'talkbackText'
function InteractiveFeatureCard({ icon, title, description, linkTo, talkbackText }) {
  // 3. Usa el hook con el texto recibido
  const cardTalkback = useTalkback(talkbackText);

  return (
    // 4. Aplica los eventos de talkback al enlace
    <Link to={linkTo} className="feature-card-link" {...cardTalkback}>
      <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default InteractiveFeatureCard;