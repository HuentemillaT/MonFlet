const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:3004', // origen del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/monflet')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// Esquema del modelo de usuario
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rut: { type: String }, // opcional
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor Express corriendo!');
});

// Registro de usuario
app.post('/signup', async (req, res) => {
  const { nombre, rut, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nombre, rut, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, 'secreto', { expiresIn: '1h' });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      token,
      user: { email: user.email, nombre: user.nombre, rut: user.rut },
    });
  } catch (error) {
    console.error('❌ Error en /signup:', error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { email: user.email, nombre: user.nombre, rut: user.rut },
    });
  } catch (error) {
    console.error('❌ Error en /login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

// Obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Iniciar el servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${port}`);
});
