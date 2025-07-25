@echo off
title CURSOPIA - Limpiar Base de Datos
echo ====================================
echo    CURSOPIA - LIMPIAR USUARIOS
echo ====================================
echo.
echo Este script eliminará todos los usuarios
echo con emails @gmail.com de la base de datos
echo.
echo ¿Estás seguro? Presiona cualquier tecla para continuar
echo o cierra esta ventana para cancelar
pause >nul

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

echo.
echo Ejecutando limpieza...
node limpiar-usuarios.js

echo.
echo ====================================
echo Limpieza completada.
echo Ahora puedes registrarte de nuevo.
echo ====================================
pause
