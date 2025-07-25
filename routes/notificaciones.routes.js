const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client.js');
const { authenticateToken } = require('../middleware/auth');

// GET /api/notificaciones - Obtener notificaciones del usuario
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notificaciones = await prisma.notificacion.findMany({
      where: { id_usuario: req.user.id },
      orderBy: { fecha_creacion: 'desc' }
    });

    res.json(notificaciones);
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
});

// GET /api/notificaciones/no-leidas - Obtener notificaciones no leídas
router.get('/no-leidas', authenticateToken, async (req, res) => {
  try {
    const notificaciones = await prisma.notificacion.findMany({
      where: { 
        id_usuario: req.user.id,
        leido: false
      },
      orderBy: { fecha_creacion: 'desc' }
    });

    res.json(notificaciones);
  } catch (error) {
    console.error('Error al obtener notificaciones no leídas:', error);
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
});

// POST /api/notificaciones - Crear nueva notificación
router.post('/', authenticateToken, async (req, res) => {
  const { id_usuario, mensaje, url_destino } = req.body;

  // Solo los admin pueden crear notificaciones para otros usuarios
  if (id_usuario !== req.user.id && req.user.rol.nombre !== 'admin') {
    return res.status(403).json({ error: 'No tienes permisos para crear notificaciones para otros usuarios' });
  }

  try {
    const nuevaNotificacion = await prisma.notificacion.create({
      data: {
        id_usuario: id_usuario || req.user.id,
        mensaje,
        url_destino
      }
    });

    res.status(201).json(nuevaNotificacion);
  } catch (error) {
    console.error('Error al crear notificación:', error);
    res.status(500).json({ error: 'Error al crear la notificación' });
  }
});

// PUT /api/notificaciones/:id/marcar-leida - Marcar notificación como leída
router.put('/:id/marcar-leida', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // Verificar que la notificación pertenece al usuario
    const notificacion = await prisma.notificacion.findUnique({
      where: { id }
    });

    if (!notificacion) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    if (notificacion.id_usuario !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permisos para modificar esta notificación' });
    }

    const notificacionActualizada = await prisma.notificacion.update({
      where: { id },
      data: { leido: true }
    });

    res.json({
      mensaje: 'Notificación marcada como leída',
      notificacion: notificacionActualizada
    });
  } catch (error) {
    console.error('Error al marcar notificación como leída:', error);
    res.status(500).json({ error: 'Error al actualizar la notificación' });
  }
});

// PUT /api/notificaciones/marcar-todas-leidas - Marcar todas las notificaciones como leídas
router.put('/marcar-todas-leidas', authenticateToken, async (req, res) => {
  try {
    const resultado = await prisma.notificacion.updateMany({
      where: { 
        id_usuario: req.user.id,
        leido: false
      },
      data: { leido: true }
    });

    res.json({
      mensaje: 'Todas las notificaciones marcadas como leídas',
      actualizadas: resultado.count
    });
  } catch (error) {
    console.error('Error al marcar todas las notificaciones como leídas:', error);
    res.status(500).json({ error: 'Error al actualizar las notificaciones' });
  }
});

// DELETE /api/notificaciones/:id - Eliminar notificación
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // Verificar que la notificación pertenece al usuario
    const notificacion = await prisma.notificacion.findUnique({
      where: { id }
    });

    if (!notificacion) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    if (notificacion.id_usuario !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar esta notificación' });
    }

    await prisma.notificacion.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar notificación:', error);
    res.status(500).json({ error: 'Error al eliminar la notificación' });
  }
});

module.exports = router;
