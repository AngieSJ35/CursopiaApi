/*
  Warnings:

  - You are about to drop the `Cursos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certificado" DROP CONSTRAINT "Certificado_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "Cursos" DROP CONSTRAINT "Cursos_id_instructor_fkey";

-- DropForeignKey
ALTER TABLE "Leccion" DROP CONSTRAINT "Leccion_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "Resena" DROP CONSTRAINT "Resena_id_curso_fkey";

-- DropTable
DROP TABLE "Cursos";

-- CreateTable
CREATE TABLE "Curso" (
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

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_id_instructor_fkey" FOREIGN KEY ("id_instructor") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leccion" ADD CONSTRAINT "Leccion_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
