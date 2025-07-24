// src/components/useTalkback.js
import { useTalkbackContext } from '../context/TalkbackAPI';

export const useTalkback = (text) => {
  const { isTalkbackEnabled } = useTalkbackContext();

  const speak = () => {
    if (!isTalkbackEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // --- LÓGICA PARA CAMBIAR LA VOZ ---
    const voices = window.speechSynthesis.getVoices();
    // Reemplaza el nombre con el que más te guste de tu consola
    const chosenVoice = voices.find(voice => voice.name === 'Google español de Estados Unidos'); 
    
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    } else {
      // Si no encuentra la voz, usa el español por defecto
      utterance.lang = 'es-ES';
    }
    // ------------------------------------

    window.speechSynthesis.speak(utterance);
  };

  return {
    onMouseEnter: speak,
    onFocus: speak,
  };
};