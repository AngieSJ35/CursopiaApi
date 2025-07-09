const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursos.controller');

router.get('/', cursoController.listarCursos);
router.get('/:id', cursoController.obtenerCurso);
router.post('/', cursoController.crearCurso);
router.put('/:id', cursoController.editarCurso);
router.delete('/:id', cursoController.eliminarCurso);
router.get('/:id/lecciones', cursoController.obtenerLeccionesDelCurso);

module.exports = router;