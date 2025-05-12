// models/Documento.jsx
const mongoose = require('mongoose');

const documentoSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nombreArchivo: { type: String, required: true },
  rutaArchivo: { type: String, required: true },
  fechaSubida: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Documento', documentoSchema);