const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** ----- Register User ----- */
const registerUser = async (req, res) => {
  const { email, password, nombre_empresa, logo } = req.body;

  try {
    // Verificar si ya existe el email
    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ msg: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      email,
      password: hashedPassword,
      nombre_empresa,
      logo
    });

    await nuevoUsuario.save();

    // Generar token
    const token = jwt.sign(
      { id: nuevoUsuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error en registerUser:', error.message);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

/** ----- Login User ----- */

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Comparar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en loginUser:', error.message);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
/** ----- Get Me ----- */
const getMe = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
