// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // ✅ Importamos conexión a MongoDB
require('dotenv').config(); // ✅ Cargamos variables de entorno

const mainRoutes = require('./routes');

const app = express();

// Conectar a MongoDB Atlas
connectDB();

app.use(cors());
app.use(express.json());

app.use(mainRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'OK API' }));

app.listen(process.env.PORT || 3000, () =>
  console.log(`Backend on http://localhost:${process.env.PORT || 3000}`)
);

