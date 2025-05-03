// components/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {

     // Actualizar el estado global de autenticación
    setIsAuthenticated(false);

    setTimeout(() => {
      // Redirigir al inicio
      navigate('/dashboard/inicio');
    }, 300); // 300 milisegundos de delay
  }, [navigate, setIsAuthenticated]);

  return null; // No renderiza nada visible
}

export default Logout;


