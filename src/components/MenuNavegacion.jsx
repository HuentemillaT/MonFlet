import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function MenuNavegacion({ isAuthenticated, handleLogout, userEmail }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/dashboard/login');
  };

  const handleSubmit = () => {
    navigate('/dashboard/registro');
  };

  return (
    <nav className="menu-nav">
      <div className="logo-container">
        <li><a href="/dashboard/inicio">
          <img src="/icons/logo1_1.png" className="icon-logo" alt="Logo empresa" />
        </a></li>
      </div>
      <ul>
<<<<<<< HEAD
        <li>
          <div className='litext'>
            <Link to="/dashboard/inicio">Inicio</Link>
          </div>
        </li>

        {/* Mostrar estas opciones solo si el usuario está autenticado */}
        {isAuthenticated && (
          <>
            <li>
              <div className='litext'>
                <Link to="/dashboard/mantencion">Mantenciones</Link>
              </div>
            </li>

            {/* Mostrar "Mapa" solo si el correo es conductorav.cl o adminlog.cl */}
            {(userEmail?.toLowerCase().includes('conductorav.cl') || userEmail?.toLowerCase().includes('adminlog.cl')) && (
              <li>
                <div className='litext'>
                  <Link to="/dashboard/mapa">Mapa Clientes</Link>
                </div>
              </li>
            )}

              {/* Mostrar "Vehículos" solo si el correo es adminlog.cl */}
              {userEmail?.toLowerCase().includes('adminlog.cl') && (
              <li>
                <div className='litext'>
                  <Link to="/dashboard/vehiculos">Estado Vehiculos</Link>
                </div>
              </li>
            )}

            {/* Mostrar "Vehículos2" solo si el correo es conductord.cl */}
            {userEmail?.toLowerCase().includes('conductord.cl') && (
              <li>
                <div className='litext'>
                  <Link to="/dashboard/vehiculos2">Ruta Despachos</Link>
                </div>
              </li>
            )}

            {/* Mostrar "Documentos" o "Documentos2" dependiendo del dominio del correo */}
            <li>
              <div className='litext'>
                {userEmail?.toLowerCase().includes('conductord.cl') || userEmail?.toLowerCase().includes('conductorav.cl') ? (
                  <Link to="/dashboard/documento">Documentos</Link>
                ) : userEmail?.toLowerCase().includes('adminlog.cl') && (
                  <Link to="/dashboard/documento2">Documentos</Link>
                )}
              </div>
            </li>

            <li>
              <div className='litext'>
                <Link to="/dashboard/perfil">Perfil</Link>
              </div>
            </li>
          </>
        )}

        {/* Mostrar el enlace de Registro solo si no está autenticado */}
        {!isAuthenticated && (
          <li>
            <button onClick={handleSubmit} className="login-button" aria-label="Ir a Registro">
              <img src="/icons/registro.png" alt="Ícono de registro" className="iconl" />
              <h1 className='h1log'>Registro</h1>
            </button>
          </li>
        )}

        {/* Muestra el botón de logout si está autenticado, de lo contrario muestra el login */}
=======
        <li><Link to="/dashboard/inicio">Inicio</Link></li>
        <li><Link to="/dashboard/inicio"></Link></li>
        <li>
          {isAuthenticated && (
          <Link to="/dashboard/mantencion">Mantención Vehiculos</Link>)}
          
        </li>
        <li>
          {isAuthenticated && (
          <Link to="/dashboard/mapa">Mapa Clientes</Link>)}
          
        </li>
        <li>
        {isAuthenticated && (
          <Link to="/dashboard/vehiculos">Mapa Vehículos</Link>)}
        </li>
        <li>
          {isAuthenticated && (
          <Link to="/dashboard/documento">Documentos</Link>)}
        </li>
        <li>
          {isAuthenticated && (
          <Link to="/dashboard/perfil">Perfil</Link>)}
        </li>
        {/* Mostrar el enlace de Registro solo si no está autenticado */}
        <li>
           {!isAuthenticated && ( 
          <Link to="/dashboard/registro">Registro</Link>)}
        </li>
>>>>>>> origin/developer
        <li>  
          {isAuthenticated ? (
            <button onClick={handleLogout} className="login-button" aria-label="Cerrar sesión">
              <img src="/icons/logout.png" alt="Ícono de logout" className="iconl" />
              <h1 className='h1log'>Cerrar Sesión</h1>
            </button>
          ) : (
            <button onClick={handleLoginClick} className="login-button" aria-label="Ir a Iniciar sesión">
              <img src="/icons/login.png" alt="Ícono de login" className="iconl" /> 
              <h1 className='h1log'>Iniciar Sesión</h1>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default MenuNavegacion;
