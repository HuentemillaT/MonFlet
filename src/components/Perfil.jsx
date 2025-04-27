import React, { useState, useEffect } from 'react';

function Perfil() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
<<<<<<< HEAD
  const [rut, setRut] = useState('');
=======
>>>>>>> origin/developer
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoEdicionPassword, setModoEdicionPassword] = useState(false);

<<<<<<< HEAD
  // Datos adicionales del perfil
  const [patente, setPatente] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [afp, setAfp] = useState('');
  const [previsionSalud, setPrevisionSalud] = useState('');
  const [password, setPassword] = useState(''); // La contraseña en texto claro

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userEmail = localStorage.getItem('userEmail');
    const usuario = users.find(u => u.email === userEmail);

    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setRut(usuario.rut || '');
      setPatente(usuario.patente || '');
      setDireccion(usuario.direccion || '');
      setFechaNacimiento(usuario.fechaNacimiento || '');
      setAfp(usuario.afp || '');
      setPrevisionSalud(usuario.previsionSalud || '');
      setPassword(usuario.password || ''); // Cargar la contraseña del usuario en texto claro
    }
  }, []);

  const handleGuardarDatosIngreso = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userEmail = localStorage.getItem('userEmail');
    const usuarioIndex = users.findIndex(u => u.email === userEmail);

    if (usuarioIndex === -1) {
      alert('Usuario no encontrado');
      return;
    }

    if (
      modoEdicionPassword &&
      (passwordActual !== password || nuevoPassword !== confirmarPassword)
=======
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
>>>>>>> origin/developer
    ) {
      alert('Verifica que la contraseña actual sea correcta y que las nuevas coincidan.');
      return;
    }

<<<<<<< HEAD
    users[usuarioIndex] = {
      ...users[usuarioIndex],
      nombre,
      email,
      password: nuevoPassword || users[usuarioIndex].password, // Actualizar la contraseña solo si es nueva
    };

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userName', nombre);
    localStorage.setItem('userRut', rut);
    localStorage.setItem('userEmail', email);

    alert('Datos de ingreso actualizados correctamente.');
=======
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
>>>>>>> origin/developer
    setModoEdicion(false);
    setModoEdicionPassword(false);
  };

<<<<<<< HEAD
  const handleGuardarPerfilPersonal = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userEmail = localStorage.getItem('userEmail');
    const usuarioIndex = users.findIndex(u => u.email === userEmail);

    if (usuarioIndex === -1) {
      alert('Usuario no encontrado');
      return;
    }

    users[usuarioIndex] = {
      ...users[usuarioIndex],
      rut,
      patente,
      direccion,
      fechaNacimiento,
      afp,
      previsionSalud,
    };

    localStorage.setItem('users', JSON.stringify(users));
    alert('Perfil personal actualizado correctamente.');
  };

  return (
    <div className="perfil-container">
      {/* Sección 1: Datos de Ingreso */}
      <section className="seccion">
        <h2>Datos de Ingreso</h2>

        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={!modoEdicion}
          />
        </div>

        <div>
          <label htmlFor="rut">RUT:</label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!modoEdicion}
          />
        </div>

        {/* Contraseña: Modo de visualización o edición */}
        <div>
          <label htmlFor="passwordActual">Contraseña actual:</label>
          {modoEdicionPassword ? (
            <input
              type="text" // Mostrar la contraseña en texto claro solo cuando estamos en modo de edición
              id="passwordActual"
              value={passwordActual}
              onChange={(e) => setPasswordActual(e.target.value)}
            />
          ) : (
            <input
              type="password" // Mostrar la contraseña como puntos en el modo de visualización
              id="passwordActual"
              value={password}
              readOnly
            />
          )}
        </div>

        {modoEdicionPassword && (
          <>
            <div>
              <label htmlFor="nuevoPassword">Nueva contraseña:</label>
              <input
                type="password"
                id="nuevoPassword"
                value={nuevoPassword}
                onChange={(e) => setNuevoPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmarPassword">Confirmar nueva contraseña:</label>
              <input
                type="password"
                id="confirmarPassword"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
              />
            </div>
          </>
        )}

        <button onClick={() => setModoEdicion(!modoEdicion)}>
          {modoEdicion ? 'Cancelar' : 'Editar Datos'}
        </button>

        {modoEdicion && (
          <>
            <button onClick={() => setModoEdicionPassword(!modoEdicionPassword)}>
              {modoEdicionPassword ? 'Cancelar cambio de contraseña' : 'Cambiar Contraseña'}
            </button>

            <button onClick={handleGuardarDatosIngreso}>Guardar Cambios</button>
          </>
        )}
      </section>

      {/* Sección 2: Perfil Personal */}
      <section className="seccion">
        <h2>Perfil Personal</h2>

        <div>
          <label htmlFor="patente">Patente Vehículo:</label>
          <input
            type="text"
            id="patente"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
            disabled={!modoEdicion}
          />
        </div>

        <div>
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            disabled={!modoEdicion}
          />
        </div>

        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            disabled={!modoEdicion}
          />
        </div>

        <div>
          <label htmlFor="afp">Tipo AFP:</label>
          <input
            type="text"
            id="afp"
            value={afp}
            onChange={(e) => setAfp(e.target.value)}
            disabled={!modoEdicion}
          />
        </div>

        <div>
          <label htmlFor="previsionSalud">Previsión de Salud:</label>
          <input
            type="text"
            id="previsionSalud"
            value={previsionSalud}
            onChange={(e) => setPrevisionSalud(e.target.value)}
            disabled={!modoEdicion}
          />
        </div>

        <button onClick={handleGuardarPerfilPersonal}>Guardar Perfil Personal</button>
      </section>
=======
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
>>>>>>> origin/developer
    </div>
  );
}

export default Perfil;
