const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../prisma/client.js');

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