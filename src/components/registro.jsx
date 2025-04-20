import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro({setIsAuthenticated}) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí podrías hacer una petición a tu API para registrar
    const nuevoUsuario = {
      nombre,
      email,
      password,
    };

    // Guardar usuario simulado (no seguro, solo para ejemplo)
    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
    localStorage.setItem('authToken', 'fake-token');

    setIsAuthenticated(true); // <- Esto actualiza el estado global

    // Redirige al perfil
    navigate('/dashboard/perfil');
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit} className="registro-form">
        <h2 className="registro-title">Registro de Usuario</h2>

        <div className="registro-group">
          <label>Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="registro-input"
          />
        </div>

        <div className="registro-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="registro-input"
          />
        </div>

        <div className="registro-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="registro-input"
          />
        </div>

        <div className="registro-group">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="registro-input"
          />
        </div>

        <button type="submit" className="registro-btn">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;
