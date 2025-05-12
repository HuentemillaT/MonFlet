// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Cargar variables de entorno desde .env

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

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
const User = require('./models/user');
// Middleware para autenticar JWT
const authenticate = require('./middleware/auth');

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

// Importa rutas de perfil
const perfilRoutes = require('./routes/perfil');
app.use('/perfil', perfilRoutes);

// Cargar archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Siempre usar '/uploads/documentos' como directorio
    const dir = path.join(__dirname, 'uploads', 'documentos');
    console.log('Directorio de carga:', dir);
    
    // Crear el directorio si no existe
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      console.error('Error al crear directorio:', err);
    }
    
    // Guardar archivo en el directorio especificado
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Nombrar el archivo con un timestamp para evitar conflictos
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage });

const Documento = require('./models/Documento'); // Asegúrate de tener este modelo

// Subir documento
app.post('/subir-documento', authenticate, upload.single('archivo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha recibido ningún archivo' });
  }

  try {
    const nuevoDocumento = new Documento({
      tipo: req.body.tipo, // Asegúrate de mandar esto desde el frontend
      usuario: req.user.id, // Asumiendo que `authenticate` agrega el usuario al req
      nombreArchivo: req.file.originalname,
      rutaArchivo: req.file.path,
      fechaSubida: new Date()
    });

    await nuevoDocumento.save();

    res.status(201).json({
      message: 'Documento subido y guardado en la base de datos',
      file: {
        nombre: req.file.originalname,
        path: req.file.path,
      },
    });
  } catch (error) {
    console.error('Error al guardar en MongoDB:', error);
    res.status(500).json({ message: 'Error al guardar el documento en la base de datos' });
  }
});
app.get('/documentos', authenticate, async (req, res) => {
  try {
    const documentos = await Documento.find({ usuario: req.user.id }).sort({ fechaSubida: -1 });
    res.status(200).json(documentos);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ message: 'Error al obtener documentos' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Iniciar servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});