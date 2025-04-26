import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro({setIsAuthenticated}) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accesoRestringido,setAccesoRestringido] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      setAccesoRestringido(true);
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Verificar si ya existe un usuario con el mismo correo
    const usuarioExistente = JSON.parse(localStorage.getItem('usuarioRegistrado'));
    if (usuarioExistente && usuarioExistente.email === email) {
      alert('Este correo ya está registrado');
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
    localStorage.setItem('authToken', 'fake-token');  // Simula un token de autenticación
    localStorage.setItem('userName', nombre);
    localStorage.setItem('userEmail', email);

    setIsAuthenticated(true); // <- Esto actualiza el estado global

    // Redirige al perfil
    navigate('/dashboard/perfil');
  };

  if (accesoRestringido ) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h3>Ya tienes una sesión activa o estás registrado.</h3>
        <p>Redirígete al perfil o cierra sesión para registrar una nueva cuenta.</p>
      </div>
    );
  }

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
