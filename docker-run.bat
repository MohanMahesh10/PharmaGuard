@echo off
echo 🐳 PharmaGuard Docker Setup
echo.

docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not running
    pause
    exit /b 1
)

echo ✅ Docker is available
echo.
echo Choose deployment mode:
echo 1. Development - Port 5173
echo 2. Production - Port 80
echo.
set /p mode="Enter choice (1 or 2): "

if "%mode%"=="1" (
    echo 🚀 Starting Development Mode...
    docker compose up --build
) else if "%mode%"=="2" (
    echo 🚀 Starting Production Mode...
    docker compose -f docker-compose.prod.yml up --build
) else (
    echo ❌ Invalid choice
    pause
    exit /b 1
) 