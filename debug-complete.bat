@echo off
echo ====================================
echo    DEBUG COMPLETO - CURSOPIA
echo ====================================
echo.

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

echo Verificando Node.js...
node --version

echo.
echo Verificando archivos...
dir index.js
dir .env
dir node_modules

echo.
echo Intentando ejecutar con debug...
node index.js

echo.
echo Si hay error, aparecerá arriba.
pause
