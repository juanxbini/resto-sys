const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nombre_empresa: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  sucursales: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sucursal'
  }],
  creado_en: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
