// server.js
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())
app.get('/api/health', (req, res) => res.json({ status: 'OK API' }));
app.listen(3000, () => console.log('Backend on http://localhost:3000'));
