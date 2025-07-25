@echo off
title CURSOPIA - Diagnóstico Simple
echo ====================================
echo    DIAGNÓSTICO SIMPLE - CURSOPIA
echo ====================================
echo.

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

echo Paso 1: Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado correctamente
    pause
    exit /b 1
)

echo.
echo Paso 2: Verificando archivos...
dir index.js >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: index.js no encontrado
    pause
    exit /b 1
)

echo.
echo Paso 3: Verificando dependencias...
if not exist node_modules (
    echo Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: No se pudieron instalar las dependencias
        pause
        exit /b 1
    )
)

echo.
echo Paso 4: Verificando sintaxis...
node -c index.js
if %errorlevel% neq 0 (
    echo ERROR: Error de sintaxis en index.js
    pause
    exit /b 1
)

echo.
echo Paso 5: Intentando iniciar servidor...
echo.
echo Si el servidor inicia correctamente, verás:
echo "Servidor Cursopia iniciando..."
echo "Servidor corriendo en http://localhost:3000"
echo.
echo Si hay errores, aparecerán a continuación:
echo ====================================

timeout /t 3 /nobreak >nul
node index.js

echo.
echo ====================================
pause
