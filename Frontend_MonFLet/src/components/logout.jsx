import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/dashboard/inicio');
  }, [navigate, setIsAuthenticated]);

  return null; // No muestra nada en pantalla
}

export default Logout;