@echo off
echo ====================================
echo    PRUEBA DE BASE DE DATOS CURSOPIA
echo ====================================
echo.

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

echo Probando conexión a PostgreSQL...
node test-database.js

echo.
echo ====================================
pause
