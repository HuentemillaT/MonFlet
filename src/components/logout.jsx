// components/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpiar toda la información relacionada a la sesión
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    // Actualizar el estado global de autenticación
    setIsAuthenticated(false);

    // Redirigir al inicio
    navigate('/dashboard/inicio');
  }, [navigate, setIsAuthenticated]);

  return null; // No renderiza nada visible
}

export default Logout;
