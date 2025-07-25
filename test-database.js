const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  console.log('🔍 Probando conexión a la base de datos...');
  
  const prisma = new PrismaClient();
  
  try {
    // Intentar conectar
    await prisma.$connect();
    console.log('✅ Conexión a PostgreSQL exitosa');
    
    // Probar una consulta simple
    const userCount = await prisma.usuario.count();
    console.log(`📊 Usuarios en la base de datos: ${userCount}`);
    
    const courseCount = await prisma.curso.count();
    console.log(`📚 Cursos en la base de datos: ${courseCount}`);
    
  } catch (error) {
    console.error('❌ Error de conexión a la base de datos:');
    console.error(error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 Posibles soluciones:');
      console.log('1. Verifica que PostgreSQL esté corriendo');
      console.log('2. Verifica que la base de datos "cursopia_db" exista');
      console.log('3. Verifica las credenciales en el archivo .env');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
