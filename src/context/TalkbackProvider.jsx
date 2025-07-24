import React, { useState } from 'react';
import { TalkbackContext } from './TalkbackAPI';

export default function TalkbackProvider({ children }) {
  const [isTalkbackEnabled, setIsTalkbackEnabled] = useState(false);

  const toggleTalkback = () => {
    setIsTalkbackEnabled(prevState => !prevState);
  };

  return (
    <TalkbackContext.Provider value={{ isTalkbackEnabled, toggleTalkback }}>
      {children}
    </TalkbackContext.Provider>
  );
}