// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccessibleButton from './AccessibleButton';
import { useTalkback } from './useTalkback';
import LogoutConfirmationModal from './LogoutConfirmationModal'; // Importa el modal

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal

  const sobreNosotrosTalkback = useTalkback('Ir a la sección Sobre nosotros');
  const contactosTalkback = useTalkback('Ir a la sección de Contactos');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.isLoggedIn) {
      setUser(loggedInUser);
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  // Esta es la función que realmente cierra la sesión
  const handleLogoutConfirm = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowLogoutModal(false); // Cierra el modal
    navigate('/');
  };

  const renderNavButtons = () => {
    if (user) {
      return (
        <>
          <span className="user-greeting">¡Hola, {user.name}!</span>
          {/* Este botón ahora solo abre el modal de confirmación */}
          <AccessibleButton 
            onClick={() => setShowLogoutModal(true)} 
            className="button secondary" 
            ariaLabel="Cerrar sesión"
          >
            Cerrar sesión
          </AccessibleButton>
        </>
      );
    }

    // El resto de la lógica para usuarios no logueados se mantiene igual
    if (location.pathname === '/register') {
      return <><AccessibleButton linkTo="/login" className="button primary">Iniciar sesión</AccessibleButton><AccessibleButton linkTo="/" className="button secondary">Volver</AccessibleButton></>;
    } else if (location.pathname === '/login') {
      return <><AccessibleButton linkTo="/register" className="button primary">Registrarse</AccessibleButton><AccessibleButton linkTo="/" className="button secondary">Volver</AccessibleButton></>;
    } else {
      return <><AccessibleButton linkTo="/register" className="button primary">Registrarse</AccessibleButton><AccessibleButton linkTo="/login" className="button secondary">Iniciar sesión</AccessibleButton></>;
    }
  };

  return (
    // Usamos un Fragment para poder renderizar el modal y el header
    <>
      {/* El modal solo se muestra si showLogoutModal es true */}
      {showLogoutModal && (
        <LogoutConfirmationModal 
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <header className="main-header">
        <Link to="/" className="logo">CURSOPIA</Link>
        <nav>
          <a href="#" {...sobreNosotrosTalkback}>Sobre nosotros</a>
          <a href="#" {...contactosTalkback}>Contactos</a>
          {renderNavButtons()}
        </nav>
      </header>
    </>
  );
}

export default Header;