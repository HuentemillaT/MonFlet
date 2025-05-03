import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Registrar usuario
export const crearUsuario = (usuario) => {
    return axios.post(`${API_URL}/signup`, usuario);
  };
  
  // Obtener todos los usuarios (opcional)
  export const obtenerUsuarios = () => {
    return axios.get(`${API_URL}/users`);
  };
// Iniciar sesión
export const loginUsuario = (credenciales) => {
    return axios.post(`${API_URL}/login`, credenciales);
  };