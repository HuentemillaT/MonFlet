const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/usuarios', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err.message);
});

// Modelo de usuario
const Usuario = mongoose.model('Usuario', new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  rut: { type: String, unique: true },
  password: String,
}));

// Middleware para autenticar token
function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Ruta de registro
app.post('/signup', async (req, res) => {
  const { nombre, email, rut, password } = req.body;

  if (!nombre || !email || !rut || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ nombre, email, rut, password: hashedPassword });
    await usuario.save();

    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { nombre, email, rut } });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el usuario. Email o RUT duplicado.' });
  }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ message: 'Credenciales inválidas' });

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { nombre: usuario.nombre, email: usuario.email, rut: usuario.rut } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Ruta para obtener perfil
app.get('/perfil', autenticarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id).select('-password');
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
});

// Ruta para actualizar perfil
app.put('/perfil', autenticarToken, async (req, res) => {
  const { nombre, email, rut, nuevaPassword } = req.body;

  try {
    const updateData = { nombre, email, rut };
    if (nuevaPassword) {
      updateData.password = await bcrypt.hash(nuevaPassword, 10);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
    res.json({ message: 'Perfil actualizado correctamente', user: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
});

app.listen(5000, () => {
  console.log('Servidor iniciado en el puerto 5000');
});
