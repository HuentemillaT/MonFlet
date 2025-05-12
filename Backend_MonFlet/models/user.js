const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rut: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  patente: { type: String },
  direccion: { type: String },
  fechaNacimiento: { type: Date },
  afp: { type: String },
  previsionSalud: { type: String },
});

module.exports = mongoose.model('User', userSchema);


//const User = mongoose.model('User', userSchema);