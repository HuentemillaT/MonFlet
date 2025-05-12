import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Registro
export const signup = (usuario) => {
  return axios.post(`${API_URL}/signup`, usuario);
};

// Login
export const loginUsuario = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// Obtener perfil
export const obtenerPerfil = async (token) => {
  const response = await axios.get(`${API_URL}/perfil`, {
    headers: { 'Authorization': token },
  });
  return response.data;
};

// Actualizar perfil
export const actualizarPerfil = async (perfilData, token) => {
  const response = await axios.put(`${API_URL}/perfil`, perfilData, {
    headers: { 'Authorization': token },
  });
  return response.data;
};

//Subir archivos (usuarios conductor)
export const subirDocumento = async (formData, token) => {
  return axios.post(`${API_URL}/subir-documento`, formData, {
    headers: {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    }
  });
};
