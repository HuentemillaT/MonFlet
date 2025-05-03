const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());

const users = []; // Esto es solo para demo, en producción usarías una base de datos

// Endpoint de Registro (crearUsuario)
app.post('/crearUsuario', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email y contraseña son necesarios' });
  }

  // Verifica si el usuario ya existe
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).send({ message: 'El usuario ya existe' });
  }

  // Registra el nuevo usuario (esto sería en la base de datos)
  users.push({ email, password });
  res.status(201).send({ message: 'Usuario registrado con éxito' });
});

// Endpoint de Login (simulado)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).send({ message: 'Credenciales inválidas' });
  }

  // Generar un token falso (en producción deberías generar un JWT real)
  const token = 'fake-jwt-token';
  res.status(200).send({ token, email });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
