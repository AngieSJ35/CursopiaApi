const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// 2) Parseo de JSON
app.use(express.json());

console.log("Servidor Cursopia iniciando...");

// 3) Rutas de tu API
app.use('/api/cursos', require('./routes/cursos.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/lecciones', require('./routes/lecciones.routes'));
app.use('/api/notificaciones', require('./routes/notificaciones.routes'));

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente', timestamp: new Date() });
});

// Ruta de prueba simple
app.get('/test', (req, res) => {
  res.json({ message: 'Backend funcionando', status: 'OK' });
});

// 4) Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
