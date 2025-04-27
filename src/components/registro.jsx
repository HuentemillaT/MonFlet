import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function formatearRut(rut) {
  rut = rut.replace(/^0+/, ''); // Quitar ceros iniciales
  rut = rut.replace(/\D/g, ''); // Quitar todo lo que no sea número

  if (rut.length > 1) {
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);

    let cuerpoFormateado = '';
    let contador = 0;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      cuerpoFormateado = cuerpo[i] + cuerpoFormateado;
      contador++;
      if (contador % 3 === 0 && i !== 0) {
        cuerpoFormateado = '.' + cuerpoFormateado;
      }
    }

    return cuerpoFormateado + '-' + dv;
  }
  return rut;
}

function Registro({ setIsAuthenticated, setUserEmail }) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
<<<<<<< HEAD
  const [accesoRestringido, setAccesoRestringido] = useState(false);
  const [emailError, setEmailError] = useState('');
=======
  const [accesoRestringido,setAccesoRestringido] = useState(false);
>>>>>>> origin/developer
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
<<<<<<< HEAD
=======

>>>>>>> origin/developer
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

<<<<<<< HEAD
    const emailFormateado = email.trim().toLowerCase();
=======
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
>>>>>>> origin/developer

    if (!emailFormateado.endsWith('@conductord.cl') && !emailFormateado.endsWith('@conductorav.cl') && !emailFormateado.endsWith('@adminlog.cl')) {
      setEmailError('El correo debe pertenecer a uno de los siguientes dominios: @conductord.cl, @conductorav.cl, @adminlog.cl');
      return;
    } else {
      setEmailError('');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioExistente = users.find((user) => user.email === emailFormateado);

    if (usuarioExistente) {
      alert('Este correo ya está registrado');
      return;
    }

    const nuevoUsuario = { nombre, email: emailFormateado, password, rut };

    users.push(nuevoUsuario);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
<<<<<<< HEAD
    localStorage.setItem('userEmail', nuevoUsuario.email); // guardar email
    localStorage.setItem('userName', nuevoUsuario.nombre); // opcional guardar nombre
    localStorage.setItem('authToken', 'fake-token'); // ✅ Crear token falso para marcar autenticado
=======
    localStorage.setItem('authToken', 'fake-token');  // Simula un token de autenticación
    localStorage.setItem('userName', nombre);
    localStorage.setItem('userEmail', email);
>>>>>>> origin/developer

    setIsAuthenticated(true); // ✅ Actualizar estado global de autenticación
    setUserEmail(nuevoUsuario.email); // ✅ Actualizar email en estado global

    alert('Usuario registrado correctamente');
    navigate('/dashboard/perfil');
  };

<<<<<<< HEAD
  if (accesoRestringido) {
=======
  if (accesoRestringido ) {
>>>>>>> origin/developer
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
            onChange={(e) => setEmail(e.target.value)}
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

export default Registro;
