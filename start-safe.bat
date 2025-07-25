@echo off
echo ====================================
echo      CURSOPIA BACKEND - SEGURO
echo ====================================
echo.

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

echo Verificando archivos necesarios...
if not exist "index.js" (
    echo ❌ ERROR: index.js no encontrado
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo ❌ ERROR: node_modules no encontrado
    echo Ejecutando npm install...
    npm install
)

if not exist ".env" (
    echo ❌ ERROR: .env no encontrado
    pause
    exit /b 1
)

echo ✅ Todos los archivos encontrados
echo.
echo Iniciando servidor...
echo ✅ Backend: http://localhost:3000
echo ✅ API Test: http://localhost:3000/test
echo.
echo MANTÉN ESTA VENTANA ABIERTA
echo.

node index.js

echo.
echo El servidor se detuvo. Presiona cualquier tecla para cerrar.
pause
