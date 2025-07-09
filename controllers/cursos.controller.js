const prisma = require('../prisma/client.js');

// GET /api/cursos
exports.listarCursos = async (req, res) => {
    try {
        const cursos = await prisma.curso.findMany({
            include: {
                instructor: {
                    select: { id: true, nombre_completo: true, email: true }
                },
                resenas: true
            }
        });
        res.json(cursos);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
};

// GET /api/cursos/:id
exports.obtenerCurso = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const curso = await prisma.curso.findUnique({
            where: { id },
            include: {
                instructor: true,
                lecciones: true,
                resenas: true
            }
        });
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
        res.json(curso);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el curso' });
    }
};

// POST /api/cursos
exports.crearCurso = async (req, res) => {
    const {
        titulo,
        descripcion,
        categoria,
        nivel,
        id_instructor,
        publicado,
        url_imagen_portada,
        duracion_estimada,
        es_destacado
    } = req.body;

    try {
        const nuevoCurso = await prisma.curso.create({
            data: {
                titulo,
                descripcion,
                categoria,
                nivel,
                id_instructor,
                publicado,
                url_imagen_portada,
                duracion_estimada,
                es_destacado
            }
        });
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el curso', detalle: error.message });
    }
};

// PUT /api/cursos/:id
exports.editarCurso = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cursoActualizado = await prisma.curso.update({
            where: { id },
            data: req.body
        });
        res.json(cursoActualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el curso', detalle: error.message });
    }
};

// DELETE /api/cursos/:id
exports.eliminarCurso = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.curso.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el curso', detalle: error.message });
    }
};

// GET /api/cursos/:id/lecciones
exports.obtenerLeccionesDelCurso = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const lecciones = await prisma.leccion.findMany({
            where: { id_curso: id },
            orderBy: { orden: 'asc' }
        });
        res.json(lecciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las lecciones del curso' });
    }
};