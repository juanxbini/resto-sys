const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validar que venga el token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario y excluir password del resultado
    const user = await User.findById(decoded.id).select('-password');

    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    req.user = user; // inyectamos el usuario
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;

