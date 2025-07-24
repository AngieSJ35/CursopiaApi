import { createContext, useContext } from 'react';
export const TalkbackContext = createContext();
export function useTalkbackContext() {
  return useContext(TalkbackContext);
}