import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = async (userData) => {
  const response = await api.post('/signup', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const obtenerPerfil = async (token) => {
  const response = await api.get('/perfil', {
    headers: { Authorization: token },
  });
  return response.data;
};

export const actualizarPerfil = async (token, data) => {
  const response = await api.put('/perfil', data, {
    headers: { Authorization: token },
  });
  return response.data;
};
