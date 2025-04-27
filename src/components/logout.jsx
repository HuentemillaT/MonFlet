// components/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
     // Actualizar el estado global de autenticación
    setIsAuthenticated(false);

    setTimeout(() => {
      // Redirigir al inicio
      navigate('/dashboard/inicio');
    }, 300); // 300 milisegundos de delay
  }, [navigate, setIsAuthenticated]);

=======
    // Limpiar toda la información relacionada a la sesión
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    // Actualizar el estado global de autenticación
    setIsAuthenticated(false);

    // Redirigir al inicio
    navigate('/dashboard/inicio');
  }, [navigate, setIsAuthenticated]);

>>>>>>> origin/developer
  return null; // No renderiza nada visible
}

export default Logout;
