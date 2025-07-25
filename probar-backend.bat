@echo off
title CURSOPIA - Prueba Backend
echo ====================================
echo      CURSOPIA - PRUEBA BACKEND
echo ====================================
echo.

echo Probando conexión al backend...
echo.

echo 1. Probando endpoint /test...
curl -s http://localhost:3000/test
if %errorlevel% neq 0 (
    echo ❌ Backend no responde en puerto 3000
    echo.
    echo Verifica que el servidor esté ejecutándose:
    echo - Haz doble clic en "iniciar-backend.bat"
    echo - O ejecuta "diagnostico-completo.bat"
) else (
    echo.
    echo ✅ Backend está funcionando correctamente!
)

echo.
echo 2. Probando endpoint /api/test...
curl -s http://localhost:3000/api/test

echo.
echo ====================================
echo Prueba completada.
echo ====================================
pause
