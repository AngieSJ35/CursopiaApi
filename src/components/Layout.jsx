// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import { useTalkback } from './useTalkback';

function Footer() {
  const sobreNosotrosTalkback = useTalkback('Ir a la sección Sobre nosotros');
  const cursosTalkback = useTalkback('Ver la vista previa del curso de inglés');
  const inicioTalkback = useTalkback('Volver a la página de inicio');
  const emailTalkback = useTalkback('Contactar por correo electrónico');
  const githubTalkback = useTalkback('Visitar el repositorio en GitHub');
  // Talkback para los elementos del formulario de contacto
  const contactEmailInputTalkback = useTalkback('Campo para escribir tu correo para que te contactemos');
  const contactSendTalkback = useTalkback('Botón para enviar tu correo');

  return (
    <footer className="main-footer">
      <div className="footer-column">
        <h3>CURSOPIA</h3>
        <a href="#" {...sobreNosotrosTalkback}>Sobre nosotros</a>
        <Link to="/preview?topic=ingles" {...cursosTalkback}>Cursos de ingles</Link>
      </div>
      <div className="footer-column">
        <h3>CONTACTO</h3>
        <Link to="/" {...inicioTalkback}>Inicio</Link>
        <a href="mailto:contacto@cursopia.com" {...emailTalkback}>Email</a>
        <a href="#" {...githubTalkback}>GitHub</a>
      </div>
      <div className="footer-column footer-contact-form">
        <h3>¡TE CONTACTAMOS!</h3>
        <div className="input-group">
          <input type="email" placeholder="Tu correo..." {...contactEmailInputTalkback} />
          <button className="button-enviar" {...contactSendTalkback}>ENVIAR</button>
        </div>
      </div>
    </footer>
  );
}

function Layout() {
  return (
    <div className="page-layout">
      <Header />
      <main className="page-content">{<Outlet />}</main>
      <Footer />
    </div>
  );
}

export default Layout;