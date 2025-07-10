const express = require('express');
const router = express.Router();

// Base de datos simulada
const usuariosFake = [
  {
    id: 1,
    email: 'admin@correo.com',
    password: '1234',
    name: 'Admin Cursopia'
  },
];

// 🚀 Registro de usuario
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validación básica
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Verificar si el usuario ya existe
  const yaExiste = usuariosFake.find(u => u.email === email);
  if (yaExiste) {
    return res.status(409).json({ error: 'El correo ya está registrado' });
  }

  // Crear nuevo usuario (simulado)
  const nuevoUsuario = {
    id: usuariosFake.length + 1,
    email,
    password,
    name,
  };

  usuariosFake.push(nuevoUsuario); // Guardar en la lista simulada

  const { password: _, ...userSinPassword } = nuevoUsuario;

  res.status(201).json({
    mensaje: 'Usuario registrado exitosamente',
    usuario: userSinPassword,
    token: 'token_simulado_1234'
  });
});

// 🚀 Login de usuario (ya lo tenías)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  const usuario = usuariosFake.find(
    (u) => u.email === email && u.password === password
  );

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const { password: _, ...userWithoutPassword } = usuario;

  return res.json({
    ...userWithoutPassword,
    token: 'token_simulado_1234'
  });
});

module.exports = router;
