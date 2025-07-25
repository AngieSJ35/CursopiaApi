@echo off
echo ====================================
echo    DIAGNÓSTICO COMPLETO - CURSOPIA
echo ====================================
echo.

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

echo 1. Verificando Node.js...
node --version 2>&1
echo Node.js Status: %errorlevel%

echo.
echo 2. Verificando archivos principales...
if exist index.js (
    echo [OK] index.js encontrado
) else (
    echo [ERROR] index.js no encontrado
)

if exist .env (
    echo [OK] .env encontrado
) else (
    echo [ERROR] .env no encontrado
)

if exist package.json (
    echo [OK] package.json encontrado
) else (
    echo [ERROR] package.json no encontrado
)

echo.
echo 3. Verificando dependencias...
if exist node_modules (
    echo [OK] node_modules existe
) else (
    echo [ERROR] node_modules no existe
    echo Ejecutando npm install...
    npm install
)

echo.
echo 4. Verificando sintaxis del código...
echo Verificando index.js...
node -c index.js 2>&1
if %errorlevel% == 0 (
    echo [OK] Sintaxis correcta
) else (
    echo [ERROR] Error de sintaxis en index.js
)

echo.
echo 5. Probando conexión a base de datos...
node -e "console.log('Probando conexión...'); const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.$connect().then(() => { console.log('[OK] Conexión a DB exitosa'); process.exit(0); }).catch((e) => { console.log('[ERROR] Conexión a DB falló:', e.message); process.exit(1); });" 2>&1

echo.
echo 6. Intentando iniciar servidor...
echo Si hay errores, aparecerán a continuación:
echo ====================================
node index.js 2>&1

echo.
echo ====================================
echo SERVIDOR DETENIDO - El servidor se cerró inesperadamente
echo Presiona cualquier tecla para cerrar.
pause
