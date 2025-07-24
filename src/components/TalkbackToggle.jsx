// src/components/TalkbackToggle.jsx
import React from 'react';
import { useTalkbackContext } from '../context/TalkbackAPI';
import { useTalkback } from './useTalkback'; // 1. Importa el hook de voz
import './TalkbackToggle.css';

function TalkbackToggle() {
  const { isTalkbackEnabled, toggleTalkback } = useTalkbackContext();
  
  // 2. Prepara el talkback para el interruptor
  const switchTalkback = useTalkback(`Interruptor para ${isTalkbackEnabled ? 'desactivar' : 'activar'} el lector de pantalla`);

  return (
    <div className="talkback-toggle">
      <label htmlFor="talkback-switch">Activar Lector de Pantalla</label>
      <button 
        id="talkback-switch"
        role="switch" 
        aria-checked={isTalkbackEnabled}
        onClick={toggleTalkback}
        className={`switch-btn ${isTalkbackEnabled ? 'on' : 'off'}`}
        // 3. Aplica los eventos de talkback al botón
        {...switchTalkback}
      >
        <span className="switch-thumb"></span>
      </button>
    </div>
  );
}

export default TalkbackToggle;