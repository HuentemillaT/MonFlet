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
      <div className="logo-container">
        <img src="/icons/logo1_1.png" className="icon-logo" alt="Logo empresa" />
      </div>
      <ul>
        <li><Link to="/dashboard/inicio">Inicio</Link></li>
        <li><Link to="/dashboard/mapa">Mapa Clientes</Link></li>
        <li><Link to="/dashboard/vehiculos">Mapa Vehículos</Link></li>
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
