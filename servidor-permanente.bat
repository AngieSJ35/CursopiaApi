@echo off
title CURSOPIA Backend - MANTENER ABIERTO
echo ====================================
echo     CURSOPIA BACKEND - SERVIDOR
echo ====================================
echo.
echo IMPORTANTE: NO CIERRES ESTA VENTANA
echo El servidor debe mantenerse corriendo
echo ====================================
echo.

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

:INICIO
echo [%time%] Iniciando servidor...
node index.js
echo.
echo [%time%] Servidor se detuvo. Reiniciando en 3 segundos...
timeout /t 3 /nobreak >nul
goto INICIO
