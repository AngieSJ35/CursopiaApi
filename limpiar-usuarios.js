const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function limpiarUsuarios() {
  try {
    console.log('🧹 Limpiando usuarios existentes...');
    
    const result = await prisma.usuario.deleteMany({
      where: {
        email: {
          contains: '@gmail.com'
        }
      }
    });
    
    console.log(`✅ Se eliminaron ${result.count} usuarios`);
    console.log('💡 Ahora puedes registrarte con cualquier email @gmail.com');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

limpiarUsuarios();
