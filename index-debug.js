const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
  console.error('❌ Error no capturado:', error);
  console.error('Stack:', error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada en:', promise);
  console.error('Razón:', reason);
});

// 1) Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// 2) Parseo de JSON
app.use(express.json());

console.log("🚀 Servidor Cursopia iniciando...");

// Probar la conexión a la base de datos
const testDatabaseConnection = async () => {
  try {
    const prisma = require('./prisma/client.js');
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos exitosa');
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a la base de datos:', error);
    return false;
  }
};

// 3) Middleware de manejo de errores para rutas
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Ruta de prueba simple (sin base de datos)
app.get('/test', (req, res) => {
  res.json({ message: 'Backend funcionando', status: 'OK', timestamp: new Date() });
});

// Ruta de prueba de base de datos
app.get('/api/test-db', asyncHandler(async (req, res) => {
  const prisma = require('./prisma/client.js');
  const count = await prisma.usuario.count();
  res.json({ 
    message: 'Base de datos funcionando', 
    usuariosEnBD: count,
    timestamp: new Date() 
  });
}));

// 4) Cargar rutas con manejo de errores
try {
  console.log('📁 Cargando rutas...');
  app.use('/api/cursos', require('./routes/cursos.routes'));
  console.log('✅ Rutas de cursos cargadas');
  
  app.use('/api/auth', require('./routes/auth.routes'));
  console.log('✅ Rutas de auth cargadas');
  
  app.use('/api/usuarios', require('./routes/usuarios.routes'));
  console.log('✅ Rutas de usuarios cargadas');
  
  app.use('/api/lecciones', require('./routes/lecciones.routes'));
  console.log('✅ Rutas de lecciones cargadas');
  
  app.use('/api/notificaciones', require('./routes/notificaciones.routes'));
  console.log('✅ Rutas de notificaciones cargadas');
  
} catch (error) {
  console.error('❌ Error cargando rutas:', error);
}

// Middleware de manejo de errores global
app.use((error, req, res, next) => {
  console.error('❌ Error en la aplicación:', error);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// 5) Inicializar servidor
const startServer = async () => {
  try {
    // Probar conexión a BD primero
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      console.log('⚠️  Continuando sin conexión a la base de datos...');
    }
    
    const server = app.listen(PORT, () => {
      console.log(`🌟 Servidor corriendo en http://localhost:${PORT}`);
      console.log('📊 Rutas disponibles:');
      console.log('   GET  /test - Prueba básica');
      console.log('   GET  /api/test-db - Prueba de base de datos');
      console.log('   POST /api/auth/register - Registro');
      console.log('   POST /api/auth/login - Login');
    });

    server.on('error', (error) => {
      console.error('❌ Error del servidor:', error);
    });

  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  }
};

startServer();
