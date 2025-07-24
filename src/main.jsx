// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// Ahora importa el Provider desde su propio archivo
import TalkbackProvider from './context/TalkbackProvider.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TalkbackProvider>
        <App />
      </TalkbackProvider>
    </BrowserRouter>
  </React.StrictMode>,
);