const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173',       // Cambia si tu front corre en otro puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true                       // Si vas a usar cookies o auth basada en sesiones
}));

// 2) Parseo de JSON
app.use(express.json());

console.log("hola");

// 3) Rutas de tu API
app.use('/api/cursos', require('./routes/cursos.routes'));


// Si en el futuro usas más módulos, descomenta y ajusta estas líneas:
console.log("¿Qué devuelve require('./routes/auth.routes.js')?", require('./routes/auth.routes.js'));
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/usuarios',       require('./routes/usuarios.routes.js'));
// app.use('/api/lecciones',      require('./routes/lecciones.routes.js'));
// app.use('/api/evaluaciones',   require('./routes/evaluaciones.routes'));
// app.use('/api/certificados',   require('./routes/certificados.routes'));
// app.use('/api/notificaciones', require('./routes/notificaciones.routes.js'));


// 4) Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
