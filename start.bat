@echo off
echo Starting PharmaGuard Application...
echo.

echo Starting Backend Server...
start "PharmaGuard Backend" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Development Server...
start "PharmaGuard Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both services are starting!
echo 🌐 Backend will be available at: http://localhost:3000
echo 🎨 Frontend will be available at: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul 