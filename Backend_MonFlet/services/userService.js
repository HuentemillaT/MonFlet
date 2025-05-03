// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Cambia esto según la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para crear un usuario (ahora se llama crearUsuario)
export const crearUsuario = async (userData) => {
  try {
    const response = await api.post('/crearUsuario', userData);
    console.log('Respuesta de registro:', response);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
    console.error('Error en crearUsuario:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Función para login
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error en login:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error desconocido');
  }
};
