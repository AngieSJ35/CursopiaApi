const express = require('express');
const cors = require('cors');

/* const authRoutes = require('./routes/auth.routes.js');
const usuarioRoutes = require('./routes/usuarios.routes.js/index.js');
const leccionRoutes = require('./routes/lecciones.routes.js/index.js');
const evaluacionRoutes = require('./routes/evaluaciones.routes');
const certificadoRoutes = require('./routes/certificados.routes');
const notificacionRoutes = require('./routes/notificaciones.routes.js/index.js');
 */
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/cursos', require('./routes/cursos.routes'));
// Rutas por módulo
/* app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/lecciones', leccionRoutes);
app.use('/api/evaluaciones', evaluacionRoutes);
app.use('/api/certificados', certificadoRoutes);
app.use('/api/notificaciones', notificacionRoutes);
 */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});