const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client.js');
const { authenticateToken } = require('../middleware/auth');

// GET /api/lecciones - Obtener todas las lecciones
router.get('/', async (req, res) => {
  try {
    const lecciones = await prisma.leccion.findMany({
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
            categoria: true
          }
        },
        cuestionario: {
          include: {
            preguntas: {
              include: {
                opciones: true
              }
            }
          }
        }
      },
      orderBy: [
        { id_curso: 'asc' },
        { orden: 'asc' }
      ]
    });

    res.json(lecciones);
  } catch (error) {
    console.error('Error al obtener lecciones:', error);
    res.status(500).json({ error: 'Error al obtener las lecciones' });
  }
});

// GET /api/lecciones/:id - Obtener una lección específica
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const leccion = await prisma.leccion.findUnique({
      where: { id },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
            categoria: true,
            nivel: true
          }
        },
        cuestionario: {
          include: {
            preguntas: {
              include: {
                opciones: true
              },
              orderBy: { id: 'asc' }
            }
          }
        }
      }
    });

    if (!leccion) {
      return res.status(404).json({ error: 'Lección no encontrada' });
    }

    res.json(leccion);
  } catch (error) {
    console.error('Error al obtener lección:', error);
    res.status(500).json({ error: 'Error al obtener la lección' });
  }
});

// POST /api/lecciones - Crear nueva lección
router.post('/', authenticateToken, async (req, res) => {
  const { id_curso, titulo, contenido, orden } = req.body;

  if (!id_curso || !titulo) {
    return res.status(400).json({ error: 'id_curso y titulo son requeridos' });
  }

  try {
    const nuevaLeccion = await prisma.leccion.create({
      data: {
        id_curso,
        titulo,
        contenido,
        orden
      },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true
          }
        }
      }
    });

    res.status(201).json(nuevaLeccion);
  } catch (error) {
    console.error('Error al crear lección:', error);
    res.status(500).json({ error: 'Error al crear la lección' });
  }
});

// PUT /api/lecciones/:id - Actualizar lección
router.put('/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, contenido, orden } = req.body;

  try {
    const leccionActualizada = await prisma.leccion.update({
      where: { id },
      data: {
        titulo,
        contenido,
        orden
      },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true
          }
        }
      }
    });

    res.json(leccionActualizada);
  } catch (error) {
    console.error('Error al actualizar lección:', error);
    res.status(500).json({ error: 'Error al actualizar la lección' });
  }
});

// DELETE /api/lecciones/:id - Eliminar lección
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.leccion.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar lección:', error);
    res.status(500).json({ error: 'Error al eliminar la lección' });
  }
});

// POST /api/lecciones/:id/completar - Marcar lección como completada
router.post('/:id/completar', authenticateToken, async (req, res) => {
  const id_leccion = parseInt(req.params.id);
  const id_usuario = req.user.id;

  try {
    // Verificar si ya existe el progreso
    const progresoExistente = await prisma.progresoUsuario.findUnique({
      where: {
        id_usuario_id_leccion: {
          id_usuario,
          id_leccion
        }
      }
    });

    let progreso;

    if (progresoExistente) {
      // Actualizar progreso existente
      progreso = await prisma.progresoUsuario.update({
        where: {
          id_usuario_id_leccion: {
            id_usuario,
            id_leccion
          }
        },
        data: {
          completado: true,
          fecha_completado: new Date()
        },
        include: {
          leccion: {
            select: {
              titulo: true,
              curso: {
                select: {
                  titulo: true
                }
              }
            }
          }
        }
      });
    } else {
      // Crear nuevo progreso
      progreso = await prisma.progresoUsuario.create({
        data: {
          id_usuario,
          id_leccion,
          completado: true,
          fecha_completado: new Date()
        },
        include: {
          leccion: {
            select: {
              titulo: true,
              curso: {
                select: {
                  titulo: true
                }
              }
            }
          }
        }
      });
    }

    res.json({
      mensaje: 'Lección marcada como completada',
      progreso
    });
  } catch (error) {
    console.error('Error al marcar lección como completada:', error);
    res.status(500).json({ error: 'Error al actualizar el progreso' });
  }
});

module.exports = router;
