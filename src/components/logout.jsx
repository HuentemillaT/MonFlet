import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí borrarías los datos del usuario, token, etc.
    localStorage.removeItem('authToken'); // Ejemplo
    sessionStorage.clear(); // Si usas sessionStorage

    // Redirigir al login
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Cerrar sesión
    </button>
  );
}

export default Logout;