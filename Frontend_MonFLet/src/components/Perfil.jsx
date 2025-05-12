import React, { useState, useEffect } from 'react';
import { obtenerPerfil } from '../services/userService'; // Importa la función

function Perfil() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [modoEdicionIngreso, setModoEdicionIngreso] = useState(false);
  const [modoEdicionPerfil, setModoEdicionPerfil] = useState(false);
  const [modoEdicionPassword, setModoEdicionPassword] = useState(false);

  // Datos adicionales del perfil
  const [patente, setPatente] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [afp, setAfp] = useState('');
  const [previsionSalud, setPrevisionSalud] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
  const token = localStorage.getItem('authToken');
  const datosGuardados = JSON.parse(localStorage.getItem('perfilUsuario'));

  if (datosGuardados) {
    setNombre(datosGuardados.nombre || '');
    setEmail(datosGuardados.email || '');
    setRut(datosGuardados.rut || '');
    setPatente(datosGuardados.patente || '');
    setDireccion(datosGuardados.direccion || '');
    setFechaNacimiento(datosGuardados.fechaNacimiento || '');
    setAfp(datosGuardados.afp || '');
    setPrevisionSalud(datosGuardados.previsionSalud || '');
    setPassword('********');
  }

  if (token) {
    obtenerPerfil(token)
      .then((res) => {
        const usuario = res.user;
        
        // Guardar los datos actualizados en localStorage
        localStorage.setItem('perfilUsuario', JSON.stringify(usuario));

        // Actualizar el estado con los datos obtenidos del backend
        setNombre(usuario.nombre || '');
        setEmail(usuario.email || '');
        setRut(usuario.rut || '');
        setPatente(usuario.patente || '');
        setDireccion(usuario.direccion || '');
        setFechaNacimiento(usuario.fechaNacimiento || '');
        setAfp(usuario.afp || '');
        setPrevisionSalud(usuario.previsionSalud || '');
        setPassword('********');
      })
      .catch((err) => {
        console.error('Error al obtener perfil:', err);
        alert('Error al cargar perfil');
      });
  }
}, []);



  const handleGuardarDatosIngreso = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Token de autenticación no encontrado.');
      return;
    }
  
    // Validación de contraseñas (si estás editando la contraseña)
    if (
      modoEdicionPassword &&
      (passwordActual !== password || nuevoPassword !== confirmarPassword)
    ) {
      alert('Verifica que la contraseña actual sea correcta y que las nuevas coincidan.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          nombre,
          email,
          password: nuevoPassword || undefined, // Enviar solo la nueva contraseña si existe
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar datos de ingreso');
      }
  
      const data = await response.json();
      console.log(data); // Solo para mostrar la respuesta
      alert('Datos de ingreso actualizados correctamente.');
  
      // Actualizar en localStorage para mantener el formato
      localStorage.setItem('userNombre', nombre);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRut', rut);
  
      setModoEdicionIngreso(false);
      setModoEdicionPassword(false);
    } catch (error) {
      console.error('Error al guardar los datos de ingreso:', error);
      alert('Error al actualizar los datos de ingreso.');
    }
  };
  
 const handleGuardarPerfilPersonal = async () => {
  const token = localStorage.getItem('authToken');
  console.log('Token:', token);
  if (!token) {
    alert('Token de autenticación no encontrado.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/perfil', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        patente,
        direccion,
        fechaNacimiento,
        afp,
        previsionSalud,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Detalles del error:', errorText);
      throw new Error('Error al actualizar perfil personal');
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    alert('Perfil personal actualizado correctamente.');

    // Actualizar los valores en el estado directamente
    setPatente(patente);
    setDireccion(direccion);
    setFechaNacimiento(fechaNacimiento);
    setAfp(afp);
    setPrevisionSalud(previsionSalud);

    // Actualizar los datos en localStorage
    localStorage.setItem('userPatente', patente);
    localStorage.setItem('userDireccion', direccion);
    localStorage.setItem('userFechaNacimiento', fechaNacimiento);
    localStorage.setItem('userAfp', afp);
    localStorage.setItem('userPrevisionSalud', previsionSalud);

    // Desactivar el modo edición
    setModoEdicionPerfil(false);

    } catch (error) {
      console.error('Error al guardar el perfil personal:', error);
      alert('Error al actualizar el perfil personal.');
    }
    
};
const perfilActualizado = {
  nombre,
  email,
  rut,
  patente,
  direccion,
  fechaNacimiento,
  afp,
  previsionSalud,
};

localStorage.setItem('perfilUsuario', JSON.stringify(perfilActualizado));

const handleCancelarPerfilPersonal = () => {
  setModoEdicionPerfil(false);
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
            disabled={!modoEdicionIngreso}
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
            disabled={!modoEdicionIngreso}
          />
        </div>

        {/* Contraseña: Modo de visualización o edición */}
        <div>
          <label htmlFor="passwordActual">Contraseña actual:</label>
          {modoEdicionPassword ? (
            <input
              type="text"
              id="passwordActual"
              value={passwordActual}
              onChange={(e) => setPasswordActual(e.target.value)}
            />
          ) : (
            <input
              type="password"
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

        <button onClick={() => setModoEdicionIngreso(!modoEdicionIngreso)}>
          {modoEdicionIngreso ? 'Cancelar' : 'Editar Datos'}
        </button>

        {modoEdicionIngreso && (
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
            disabled={!modoEdicionPerfil}
          />
        </div>

        <div>
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            disabled={!modoEdicionPerfil}
          />
        </div>

        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            disabled={!modoEdicionPerfil}
          />
        </div>

        <div>
          <label htmlFor="afp">Tipo AFP:</label>
          <input
            type="text"
            id="afp"
            value={afp}
            onChange={(e) => setAfp(e.target.value)}
            disabled={!modoEdicionPerfil}
          />
        </div>

        <div>
          <label htmlFor="previsionSalud">Previsión de Salud:</label>
          <input
            type="text"
            id="previsionSalud"
            value={previsionSalud}
            onChange={(e) => setPrevisionSalud(e.target.value)}
            disabled={!modoEdicionPerfil}
          />
        </div>
        {modoEdicionPerfil ? (
          <>
            <button onClick={handleGuardarPerfilPersonal}>Guardar Cambios</button>
            <button onClick={handleCancelarPerfilPersonal}>Cancelar</button>
          </>
        ) : (
          <button onClick={() => setModoEdicionPerfil(true)}>Editar Perfil</button>
        )}
      </section>
    </div>
  );
}

export default Perfil;
