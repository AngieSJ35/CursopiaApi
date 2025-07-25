@echo off
title CURSOPIA - Instalación y Diagnóstico
echo ====================================
echo  INSTALACIÓN COMPLETA - CURSOPIA
echo ====================================
echo.

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

echo 1. Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado
    echo Descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo 2. Instalando/Verificando dependencias...
echo Esto puede tomar un momento...
npm install
if %errorlevel% neq 0 (
    echo ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)

echo.
echo 3. Generando cliente Prisma...
npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: No se pudo generar el cliente Prisma
    pause
    exit /b 1
)

echo.
echo 4. Verificando conexión a base de datos...
echo Testing database connection...
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); console.log('Conectando...'); prisma.$connect().then(() => { console.log('✅ Conexión exitosa'); prisma.$disconnect(); }).catch((e) => { console.log('❌ Error:', e.message); process.exit(1); });"

echo.
echo 5. Iniciando servidor...
echo ====================================
echo.
echo El servidor debería mostrar:
echo "Servidor Cursopia iniciando..."
echo "Servidor corriendo en http://localhost:3000"
echo.
echo Presiona Ctrl+C para detener el servidor
echo ====================================
echo.

node index.js

pause
