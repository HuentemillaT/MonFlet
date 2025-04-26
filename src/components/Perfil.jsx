import React, { useState, useEffect } from 'react';

function Perfil() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoEdicionPassword, setModoEdicionPassword] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioRegistrado'));
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }
  }, []);

  const handleGuardarCambios = () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioRegistrado'));

    if (
      modoEdicionPassword &&
      (passwordActual !== usuario.password || nuevoPassword !== confirmarPassword)
    ) {
      alert('Verifica que la contraseña actual sea correcta y que las nuevas coincidan.');
      return;
    }

    const usuarioActualizado = {
      ...usuario,
      nombre,
      email,
      password: nuevoPassword ? nuevoPassword : usuario.password,
    };

    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioActualizado));
    alert('Datos actualizados correctamente');

    // Limpiar estados
    setPasswordActual('');
    setNuevoPassword('');
    setConfirmarPassword('');
    setModoEdicion(false);
    setModoEdicionPassword(false);
  };

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Perfil del Usuario</h2>

      <div className="perfil-group">
        <label className="perfil-label">Nombre</label>
        <input
          className="perfil-input"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={!modoEdicion}
        />
      </div>

      <div className="perfil-group">
        <label className="perfil-label">Correo electrónico</label>
        <input
          className="perfil-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!modoEdicion}
        />
      </div>

      {!modoEdicionPassword && (
        <div className="perfil-group-horizontal">
          <div className="perfil-password-display">
            <label className="perfil-label">Contraseña</label>
            <input
              className="perfil-input"
              type="password"
              value="********"
              disabled
            />
          </div>

          {modoEdicion && (
            <button
              className="perfil-btn-chico"
              onClick={() => setModoEdicionPassword(true)}
            >
              Modificar
            </button>
          )}
        </div>
      )}

      {modoEdicionPassword && (
        <>
          <div className="perfil-group">
            <label className="perfil-label">Contraseña actual</label>
            <input
              className="perfil-input"
              type="password"
              value={passwordActual}
              onChange={(e) => setPasswordActual(e.target.value)}
            />
          </div>

          <div className="perfil-group">
            <label className="perfil-label">Nueva contraseña</label>
            <input
              className="perfil-input"
              type="password"
              value={nuevoPassword}
              onChange={(e) => setNuevoPassword(e.target.value)}
            />
          </div>

          <div className="perfil-group">
            <label className="perfil-label">Confirmar nueva contraseña</label>
            <input
              className="perfil-input"
              type="password"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
            />
          </div>
        </>
      )}

      {!modoEdicion && (
        <button className="perfil-btn" onClick={() => setModoEdicion(true)}>
          Editar Información
        </button>
      )}

      {(modoEdicion || modoEdicionPassword) && (
        <button className="perfil-btn" onClick={handleGuardarCambios}>
          Guardar Cambios
        </button>
      )}
    </div>
  );
}

export default Perfil;
