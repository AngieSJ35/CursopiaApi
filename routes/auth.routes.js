const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client.js');
const { authenticateToken } = require('../middleware/auth');

// 🚀 Registro de usuario
router.post('/register', async (req, res) => {
  const { name, nombre, email, password } = req.body;
  const userName = name || nombre; // Aceptar ambos campos

  if (!userName || !email || !password) {
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

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre_completo: userName,
        nombre: userName,
        email,
        contrasena_hash: hashedPassword,
        password: hashedPassword, // Campo temporal para compatibilidad
        id_rol: 1 // Rol de estudiante por defecto
      }
    });

    // Generar token JWT
    const token = jwt.sign(
      { userId: nuevoUsuario.id, email: nuevoUsuario.email },
      process.env.JWT_SECRET || 'tu_clave_secreta_jwt_2024',
      { expiresIn: '24h' }
    );

    const { contrasena_hash, password: _, ...userSinPassword } = nuevoUsuario;

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userSinPassword,
      token
    });

  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// 🚀 Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: {
        rol: {
          select: {
            nombre: true
          }
        }
      }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.contrasena_hash || usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || 'tu_clave_secreta_jwt_2024',
      { expiresIn: '24h' }
    );

    const { contrasena_hash, password: _, ...userSinPassword } = usuario;

    res.json({
      message: 'Login exitoso',
      user: userSinPassword,
      token
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// 🚀 Verificar token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    valido: true,
    usuario: req.user
  });
});

// 🚀 Logout (opcional, principalmente para el frontend)
router.post('/logout', (req, res) => {
  res.json({ mensaje: 'Logout exitoso' });
});

module.exports = router;
