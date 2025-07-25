@echo off
echo ====================================
echo      CURSOPIA BACKEND - PRINCIPAL
echo ====================================
echo.

cd /d "c:\Users\USUARIO\Documents\Proyecto_unificado\CursopiaApi"

echo Iniciando servidor principal...
echo.
echo ✅ Backend estará disponible en: http://localhost:3000
echo ✅ API endpoints disponibles en: http://localhost:3000/api/
echo.
echo IMPORTANTE: NO CIERRES ESTA VENTANA
echo.
node index.js
pause
