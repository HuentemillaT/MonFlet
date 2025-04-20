import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function MenuNavegacion({ isAuthenticated, handleLogout }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/dashboard/login');
  };

  return (
    <nav className="menu-nav">
      <ul>
        <li><Link to="/dashboard/inicio">Inicio</Link></li>
        <li><Link to="/dashboard/mapa">Mapa</Link></li>
        <li><Link to="/dashboard/vehiculos">Vehículos</Link></li>
        <li><Link to="/dashboard/documento">Documentos</Link></li>
        <li><Link to="/dashboard/perfil">Perfil</Link></li>
        <li><Link to="/dashboard/registro">Registro</Link></li>
        <li>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="login-button">
              <img src="/icons/logout.png" alt="Login" className="iconl" />
            </button>
          ) : (
            <button onClick={handleLoginClick} className="login-button">
              <img src="/icons/login.png" alt="Login" className="iconl" />
            </button>
          )}
        </li>

      </ul>
    </nav>
  );
}

export default MenuNavegacion;
