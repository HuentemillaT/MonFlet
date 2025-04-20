import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

    if (
      usuarioGuardado &&
      usuarioGuardado.email === email &&
      usuarioGuardado.password === password
    ) {
      localStorage.setItem('authToken', 'fake-token');
      setIsAuthenticated(true); // <- ACTUALIZA EL ESTADO GLOBAL
      navigate('/dashboard/perfil');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
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
