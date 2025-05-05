const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Cargar variables de entorno desde .env

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'secreto';  // Usa una variable de entorno para la clave

// Middleware de JSON
app.use(express.json());

// Middleware CORS corregido
app.use(cors({
  origin: (origin, callback) => {
    // Permitir orígenes locales y solicitudes sin origen
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('No autorizado por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Permitir preflight para todas las rutas
app.options('*', cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/monflet')
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Esquema y modelo de usuario
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rut: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Middleware para autenticar JWT
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(404).json({ message: 'Usuario no encontrado' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido', error: error.message });
  }
};

// Función para crear JWT
const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor Express corriendo!');
});

// Registro de usuarios
app.post('/signup', async (req, res) => {
  const { nombre, rut, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ nombre, rut, email, password: hashedPassword });
    await user.save();

    const token = createToken(user);  // Utilizamos la función para crear el token

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      token,
      user: { email: user.email, nombre: user.nombre, rut: user.rut },
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el usuario', error: error.message });
  }
});

// Login de usuarios
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = createToken(user);  // Utilizamos la función para crear el token

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { email: user.email, nombre: user.nombre, rut: user.rut },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
});

// Obtener perfil del usuario autenticado
app.get('/perfil', authenticate, (req, res) => {
  res.status(200).json({ user: req.user });
});

// Actualizar perfil del usuario autenticado
app.put('/perfil', authenticate, async (req, res) => {
  const { nombre, rut } = req.body;

  try {
    req.user.nombre = nombre || req.user.nombre;
    req.user.rut = rut || req.user.rut;
    await req.user.save();
    res.status(200).json({ message: 'Perfil actualizado', user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  }
});

// Iniciar servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
