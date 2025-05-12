const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Guarda los datos del usuario decodificados en req.user
    next();  // Pasa al siguiente middleware o ruta
  } catch (error) {
    return res.status(400).json({ message: 'Token no válido' });
  }
};

module.exports = authMiddleware;