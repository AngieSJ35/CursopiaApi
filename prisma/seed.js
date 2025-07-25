const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeding de la base de datos...');

  try {
    // Crear roles si no existen
    const adminRole = await prisma.rol.upsert({
      where: { nombre: 'admin' },
      update: {},
      create: {
        nombre: 'admin',
        descripcion: 'Administrador del sistema'
      }
    });

    const studentRole = await prisma.rol.upsert({
      where: { nombre: 'estudiante' },
      update: {},
      create: {
        nombre: 'estudiante',
        descripcion: 'Estudiante'
      }
    });

    const instructorRole = await prisma.rol.upsert({
      where: { nombre: 'instructor' },
      update: {},
      create: {
        nombre: 'instructor',
        descripcion: 'Instructor de cursos'
      }
    });

    console.log('✅ Roles creados');

    // Crear usuario administrador
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await prisma.usuario.upsert({
      where: { email: 'admin@cursopia.com' },
      update: {},
      create: {
        nombre_completo: 'Administrador Cursopia',
        nombre: 'Admin',
        email: 'admin@cursopia.com',
        contrasena_hash: hashedPassword,
        password: hashedPassword,
        id_rol: adminRole.id
      }
    });

    // Crear usuario instructor
    const instructorPassword = await bcrypt.hash('instructor123', 10);
    
    const instructorUser = await prisma.usuario.upsert({
      where: { email: 'instructor@cursopia.com' },
      update: {},
      create: {
        nombre_completo: 'María González',
        nombre: 'María',
        email: 'instructor@cursopia.com',
        contrasena_hash: instructorPassword,
        password: instructorPassword,
        id_rol: instructorRole.id
      }
    });

    console.log('✅ Usuarios creados');

    // Crear cursos de ejemplo
    const cursosData = [
      {
        titulo: 'Inglés Básico para Principiantes',
        descripcion: 'Aprende los fundamentos del idioma inglés desde cero',
        categoria: 'Idiomas',
        nivel: 'Principiante',
        id_instructor: instructorUser.id,
        publicado: true,
        duracion_estimada: '4 semanas',
        es_destacado: true
      },
      {
        titulo: 'Alfabetización para Adultos',
        descripcion: 'Desarrolla habilidades de lectura y escritura',
        categoria: 'Alfabetización_de_Adultos',
        nivel: 'Principiante',
        id_instructor: instructorUser.id,
        publicado: true,
        duracion_estimada: '6 semanas',
        es_destacado: false
      },
      {
        titulo: 'Finanzas Personales Básicas',
        descripcion: 'Aprende a manejar tu dinero de forma inteligente',
        categoria: 'Finanzas',
        nivel: 'Principiante',
        id_instructor: instructorUser.id,
        publicado: true,
        duracion_estimada: '3 semanas',
        es_destacado: false
      }
    ];

    const cursos = [];
    for (const cursoData of cursosData) {
      // Verificar si el curso ya existe
      const cursoExistente = await prisma.curso.findFirst({
        where: { titulo: cursoData.titulo }
      });

      let curso;
      if (cursoExistente) {
        curso = cursoExistente;
      } else {
        curso = await prisma.curso.create({
          data: cursoData
        });
      }

      cursos.push(curso);

      // Crear lecciones de ejemplo para cada curso solo si no existen
      const leccionesExistentes = await prisma.leccion.findMany({
        where: { id_curso: curso.id }
      });

      if (leccionesExistentes.length === 0) {
        const leccionesData = [
          {
            titulo: `Introducción a ${curso.titulo}`,
            contenido: `Bienvenido al curso de ${curso.titulo}. En esta lección aprenderás los conceptos básicos.`,
            orden: 1,
            id_curso: curso.id
          },
          {
            titulo: `Conceptos Fundamentales`,
            contenido: `En esta lección profundizaremos en los conceptos fundamentales del tema.`,
            orden: 2,
            id_curso: curso.id
          },
          {
            titulo: `Práctica y Ejercicios`,
            contenido: `Ahora es momento de poner en práctica lo aprendido con ejercicios.`,
            orden: 3,
            id_curso: curso.id
          }
        ];

        for (const leccionData of leccionesData) {
          await prisma.leccion.create({
            data: leccionData
          });
        }
      }
    }

    console.log('✅ Cursos y lecciones creados');

    console.log('🎉 Seeding completado exitosamente!');
    console.log('');
    console.log('Credenciales de prueba:');
    console.log('Admin: admin@cursopia.com / admin123');
    console.log('Instructor: instructor@cursopia.com / instructor123');

  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
