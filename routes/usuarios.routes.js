const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client.js');
const { authenticateToken } = require('../middleware/auth');

// GET /api/usuarios - Obtener todos los usuarios (solo admin)
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Verificar si el usuario es admin
    if (req.user.rol.nombre !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre_completo: true,
        email: true,
        fecha_creacion: true,
        rol: {
          select: {
            nombre: true
          }
        }
      }
    });

    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// GET /api/usuarios/perfil - Obtener perfil del usuario actual
router.get('/perfil', authenticateToken, async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nombre_completo: true,
        email: true,
        fecha_creacion: true,
        rol: {
          select: {
            nombre: true
          }
        }
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

// PUT /api/usuarios/perfil - Actualizar perfil del usuario
router.put('/perfil', authenticateToken, async (req, res) => {
  const { nombre_completo } = req.body;

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: req.user.id },
      data: {
        nombre_completo
      },
      select: {
        id: true,
        nombre_completo: true,
        email: true,
        fecha_creacion: true,
        rol: {
          select: {
            nombre: true
          }
        }
      }
    });

    res.json({
      mensaje: 'Perfil actualizado exitosamente',
      usuario: usuarioActualizado
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
});

// GET /api/usuarios/:id/progreso - Obtener progreso del usuario en cursos
router.get('/:id/progreso', authenticateToken, async (req, res) => {
  const userId = parseInt(req.params.id);

  // Verificar que el usuario solo pueda ver su propio progreso o que sea admin
  if (req.user.id !== userId && req.user.rol.nombre !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  try {
    const progreso = await prisma.progresoUsuario.findMany({
      where: { id_usuario: userId },
      include: {
        leccion: {
          include: {
            curso: {
              select: {
                id: true,
                titulo: true,
                categoria: true
              }
            }
          }
        }
      }
    });

    res.json(progreso);
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    res.status(500).json({ error: 'Error al obtener el progreso' });
  }
});

// POST /api/usuarios
// Crea un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre_completo, email, contrasena } = req.body;

    if (!nombre_completo || !email || !contrasena) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Verificar si ya existe el correo
    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente) {
      return res.status(409).json({ error: 'El correo ya está en uso' });
    }

    // Encriptar la contraseña
    const contrasena_hash = await bcrypt.hash(contrasena, 10);

    // Crear el usuario (le damos el rol 1 por defecto)
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        email,
        contrasena_hash,
        id_rol: 1 // Asegúrate de tener un rol con ID 1 en la base de datos
      },
      select: {
        id: true,
        nombre_completo: true,
        email: true,
        fecha_creacion: true
      }
    });

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ error: 'Error interno al registrar usuario' });
  }
});

module.exports = router;