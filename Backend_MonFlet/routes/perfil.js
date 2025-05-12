//routes/perfil.js
const express = require('express');
const router = express.Router();
const user = require('../models/user');
const authMiddleware = require('../middleware/auth');

// Obtener perfil del usuario autenticado
router.get('/', authMiddleware, (req, res) => {
  // El usuario ya está disponible a través de req.user gracias al middleware
  res.status(200).json({ user: req.user });
});

// Actualizar perfil (nombre, rut, patente, dirección, etc.)
router.put('/', authMiddleware, async (req, res) => {
  const { nombre, rut, patente, direccion, fechaNacimiento, afp, previsionSalud } = req.body;

  try {
    // Actualiza los campos que se envían en el cuerpo de la solicitud
    req.user.nombre = nombre || req.user.nombre;
    req.user.rut = rut || req.user.rut;
    req.user.patente = patente || req.user.patente;
    req.user.direccion = direccion || req.user.direccion;
    req.user.fechaNacimiento = fechaNacimiento || req.user.fechaNacimiento;
    req.user.afp = afp || req.user.afp;
    req.user.previsionSalud = previsionSalud || req.user.previsionSalud;

    await req.user.save();  // Guarda los cambios en la base de datos

    res.status(200).json({ message: 'Perfil actualizado', user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  }
});

module.exports = router;