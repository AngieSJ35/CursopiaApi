console.log('🔧 Diagnóstico del servidor...');

try {
  require('dotenv').config();
  console.log('✅ dotenv cargado');
  
  const express = require('express');
  console.log('✅ express cargado');
  
  const cors = require('cors');
  console.log('✅ cors cargado');
  
  console.log('🔍 Variables de entorno:');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurada' : 'No configurada');
  console.log('PORT:', process.env.PORT || 3000);
  
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }));
  
  app.use(express.json());
  
  // Ruta de prueba simple
  app.get('/test', (req, res) => {
    res.json({ message: 'Servidor funcionando', timestamp: new Date() });
  });
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log('🔗 Prueba: http://localhost:' + PORT + '/test');
  });
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
}
