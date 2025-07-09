-- CreateEnum
CREATE TYPE "CURSO_CATEGORIA" AS ENUM ('Idiomas', 'Finanzas', 'Alfabetización_de_Adultos');

-- CreateEnum
CREATE TYPE "CURSO_NIVEL" AS ENUM ('Principiante', 'Intermedio', 'Avanzado');

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permiso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesPermisos" (
    "id_rol" INTEGER NOT NULL,
    "id_permiso" INTEGER NOT NULL,

    CONSTRAINT "RolesPermisos_pkey" PRIMARY KEY ("id_rol","id_permiso")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena_hash" TEXT NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cursos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoria" "CURSO_CATEGORIA" NOT NULL,
    "nivel" "CURSO_NIVEL" NOT NULL,
    "id_instructor" INTEGER,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "url_imagen_portada" TEXT,
    "duracion_estimada" TEXT,
    "es_destacado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leccion" (
    "id" SERIAL NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT,
    "orden" INTEGER,

    CONSTRAINT "Leccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgresoUsuario" (
    "id_usuario" INTEGER NOT NULL,
    "id_leccion" INTEGER NOT NULL,
    "completado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_completado" TIMESTAMP(3),

    CONSTRAINT "ProgresoUsuario_pkey" PRIMARY KEY ("id_usuario","id_leccion")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "url_destino" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resena" (
    "id" SERIAL NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "puntuacion" SMALLINT NOT NULL,
    "comentario" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resena_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificado" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL,
    "codigo_unico" TEXT NOT NULL,

    CONSTRAINT "Certificado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuestionario" (
    "id" SERIAL NOT NULL,
    "id_leccion" INTEGER,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "Cuestionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" SERIAL NOT NULL,
    "id_cuestionario" INTEGER NOT NULL,
    "texto_pregunta" TEXT NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opcion" (
    "id" SERIAL NOT NULL,
    "id_pregunta" INTEGER NOT NULL,
    "texto_opcion" TEXT NOT NULL,
    "es_correcta" BOOLEAN NOT NULL,

    CONSTRAINT "Opcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultadosCuestionario" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_cuestionario" INTEGER NOT NULL,
    "puntuacion" DOUBLE PRECISION,
    "fecha_intento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResultadosCuestionario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Permiso_nombre_key" ON "Permiso"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Resena_id_curso_id_usuario_key" ON "Resena"("id_curso", "id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Certificado_codigo_unico_key" ON "Certificado"("codigo_unico");

-- CreateIndex
CREATE UNIQUE INDEX "Cuestionario_id_leccion_key" ON "Cuestionario"("id_leccion");

-- AddForeignKey
ALTER TABLE "RolesPermisos" ADD CONSTRAINT "RolesPermisos_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermisos" ADD CONSTRAINT "RolesPermisos_id_permiso_fkey" FOREIGN KEY ("id_permiso") REFERENCES "Permiso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos" ADD CONSTRAINT "Cursos_id_instructor_fkey" FOREIGN KEY ("id_instructor") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leccion" ADD CONSTRAINT "Leccion_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgresoUsuario" ADD CONSTRAINT "ProgresoUsuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgresoUsuario" ADD CONSTRAINT "ProgresoUsuario_id_leccion_fkey" FOREIGN KEY ("id_leccion") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cuestionario" ADD CONSTRAINT "Cuestionario_id_leccion_fkey" FOREIGN KEY ("id_leccion") REFERENCES "Leccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_id_cuestionario_fkey" FOREIGN KEY ("id_cuestionario") REFERENCES "Cuestionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opcion" ADD CONSTRAINT "Opcion_id_pregunta_fkey" FOREIGN KEY ("id_pregunta") REFERENCES "Pregunta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadosCuestionario" ADD CONSTRAINT "ResultadosCuestionario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadosCuestionario" ADD CONSTRAINT "ResultadosCuestionario_id_cuestionario_fkey" FOREIGN KEY ("id_cuestionario") REFERENCES "Cuestionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
