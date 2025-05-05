import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/userService';

function formatearRut(rut) {
  rut = rut.replace(/^0+/, '').replace(/\D/g, '');  // Elimina ceros iniciales y caracteres no numéricos
  
  if (rut.length <= 1) return rut;  // Si solo tiene un dígito, retornamos el rut tal cual

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  const cuerpoFormateado = cuerpo.replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, '$1.');

  return `${cuerpoFormateado}-${dv}`;
}


function Registro({ setIsAuthenticated, setUserEmail }) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accesoRestringido, setAccesoRestringido] = useState(false);
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAccesoRestringido(true);
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    const emailFormateado = email.trim().toLowerCase();
    
    if (
      !emailFormateado.endsWith('@conductord.cl') &&
      !emailFormateado.endsWith('@conductorav.cl') &&
      !emailFormateado.endsWith('@adminlog.cl')
    ) {
      setEmailError('El correo debe pertenecer a uno de los siguientes dominios: @conductord.cl, @conductorav.cl, @adminlog.cl');
      return;
    }
    
    try {
      const response = await signup({ nombre, rut, email: emailFormateado, password });
      const { token, user } = response.data;
    
      console.log('Usuario registrado con éxito:', user);
    
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userNombre', user.nombre);
      setIsAuthenticated(true);
      setUserEmail(user.email);
      navigate('/dashboard/perfil');
    } catch (err) {
      console.error('Error en el registro:', err);
      const mensaje = err.response?.data?.message || 'Error al registrar usuario';
      alert(mensaje);  // Muestra el error al usuario
    }
  };
  

  if (accesoRestringido) {
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
          <label>RUT</label>
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(formatearRut(e.target.value))}
            required
            className="registro-input"
          />
        </div>

        <div className="registro-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            required
            className="registro-input"
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
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

export default Registro;    // src/services/userService.js
