import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarCuadro, setMostrarCuadro] = useState(false);

  const navigate = useNavigate();

     // Verificar si ya hay un token de autenticación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); 
      setMostrarCuadro(true);
      const timer = setTimeout(() => {
        setMostrarCuadro(false);
      }, 4000); // Desaparece en 4 segundos
      return () => clearTimeout(timer);
    }
  }, [setIsAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

    if (!usuarioGuardado) {
      alert('No hay usuario registrado');
      return;
    }

    if (
      usuarioGuardado.email === email &&
      usuarioGuardado.password === password
    ) {
      localStorage.setItem('authToken', 'fake-token');
      localStorage.setItem('userName', usuarioGuardado.nombre);
      localStorage.setItem('userEmail', usuarioGuardado.email);


      setIsAuthenticated(true);
      navigate('/dashboard/perfil');
    } else {
      alert('Credenciales incorrectas');
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
