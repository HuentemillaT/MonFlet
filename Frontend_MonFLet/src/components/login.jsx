import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/userService'; // Usamos esta función

function Login({ setIsAuthenticated, setUserEmail }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarCuadro, setMostrarCuadro] = useState(false);
  const navigate = useNavigate();

  // Verificar si ya existe un token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setMostrarCuadro(true);
      navigate('/dashboard/perfil');  // Redirige al perfil si ya está autenticado
    }
  }, [setIsAuthenticated, navigate]);

  // Manejo del submit en el login
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Por favor ingresa un correo válido');
      return;
    }
  
    try {
      const response = await loginUsuario({ email, password }); // Usamos axios para enviar la solicitud

      const { token, user } = response.data;

      // Guardar token y datos de usuario en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userNombre', user.nombre);
      localStorage.setItem('userEmail', user.email);

      setIsAuthenticated(true);  // Actualiza el estado global de autenticación
      setUserEmail(user.email);  // Actualiza el estado del email del usuario
      navigate('/dashboard/perfil');  // Redirige al perfil
    } catch (err) {
      console.error(err);
      const mensaje = err.response?.data?.message || 'Credenciales incorrectas o error de servidor';
      alert(mensaje);  // Muestra el error
    }
  };

  // Cerrar la alerta flotante
  const cerrarAlerta = () => {
    setMostrarCuadro(false);
    navigate('/dashboard/perfil');  // Redirige directamente al perfil si ya tiene sesión activa
  };

  return (
    <div className="login-container">
      {mostrarCuadro && (
        <div className="alerta-flotante">
          <span className="cerrar" onClick={cerrarAlerta}>×</span>
          ¡Ya tienes una sesión activa! Redirígete al perfil o cierra sesión.
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Iniciar Sesión</h2>

        <div className="login-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <div className="login-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <button type="submit" className="login-btn">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
