// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import CourseStep from './pages/CourseStep';
import PreviewPage from './pages/PreviewPage';
import CourseSelection from './pages/CourseSelection';
import LessonPage from './pages/LessonPage'; // Importa la nueva página de lección

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas Públicas */}
        <Route index element={<Home />} />
        <Route path="register" element={<AuthPage mode="register" />} />
        <Route path="login" element={<AuthPage mode="login" />} />
        <Route path="preview" element={<PreviewPage />} />

        {/* Rutas Privadas */}
        <Route 
          path="dashboard"
          element={ <ProtectedRoute> <CourseSelection /> </ProtectedRoute> }
        />
        <Route 
          path="curso/paso/:stepId" 
          element={ <ProtectedRoute> <CourseStep /> </ProtectedRoute> } 
        />
        <Route 
          path="curso-alfabetizacion/paso/:stepId"
          element={ <ProtectedRoute> <CourseStep /> </ProtectedRoute> }
        />
        {/* Nuevas rutas para el contenido detallado de cada lección */}
        <Route 
          path="curso/paso/:stepId/:topicId" 
          element={ <ProtectedRoute> <LessonPage /> </ProtectedRoute> }
        />
        <Route 
          path="curso-alfabetizacion/paso/:stepId/:topicId"
          element={ <ProtectedRoute> <LessonPage /> </ProtectedRoute> }
        />
      </Route>
    </Routes>
  );
}

export default App;