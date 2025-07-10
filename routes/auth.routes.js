const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client.js');

// 🚀 Registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si ya existe
    const yaExiste = await prisma.usuario.findUnique({
      where: { email }
    });

    if (yaExiste) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    // Crear nuevo usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: name,
        email,
        password
      }
    });

    const { password: _, ...userSinPassword } = nuevoUsuario;

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: userSinPassword,
      token: 'token_simulado_1234'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// 🚀 Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

   // if (!usuario || usuario.password !== password) {
  //  return res.status(401).json({ error: 'Credenciales inválidas' });
   // }

    const { password: _, ...userSinPassword } = usuario;

    res.json({
      ...userSinPassword,
      token: 'token_simulado_1234'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
