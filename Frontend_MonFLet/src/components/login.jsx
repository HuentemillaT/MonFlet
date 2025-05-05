import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/userService';

function Login({ setIsAuthenticated, setUserEmail }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarCuadro, setMostrarCuadro] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setMostrarCuadro(true);
      navigate('/dashboard/perfil');
    }
  }, [setIsAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Por favor ingresa un correo válido');
      return;
    }
  
    try {
      // Como loginUsuario ya devuelve response.data directamente,
      // no necesitas usar .data aquí.
      const { token, user } = await loginUsuario({ email, password });
  
      localStorage.setItem('authToken', token);
      localStorage.setItem('userNombre', user.nombre);
      localStorage.setItem('userEmail', user.email);
  
      setIsAuthenticated(true);
      setUserEmail(user.email);
      navigate('/dashboard/perfil');
    } catch (err) {
      console.error(err);
      const mensaje = err.response?.data?.message || 'Credenciales incorrectas o error de servidor';
      alert(mensaje);
    }
  };
  return (
    <div className="login-container">
      {mostrarCuadro && (
        <div className="alerta-flotante">
          <span className="cerrar" onClick={() => setMostrarCuadro(false)}>×</span>
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