import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsAuthenticated, setUserEmail }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Elimina sólo los datos de sesión relevantes
    localStorage.removeItem('authToken');
    localStorage.removeItem('userNombre');
    localStorage.removeItem('userEmail');

    // Actualiza los estados de autenticación y usuario
    setIsAuthenticated(false);
    setUserEmail('');

    // Redirige al inicio o donde desees
    navigate('/dashboard/inicio');
  }, [navigate, setIsAuthenticated, setUserEmail]);

  return null;
}

export default Logout;
