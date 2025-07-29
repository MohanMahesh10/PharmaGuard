#!/bin/bash

echo "🐳 PharmaGuard Docker Setup"
echo

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker is available"

# Check if Docker Compose is installed
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please update Docker."
    exit 1
fi

echo "✅ Docker Compose is available"
echo

echo "Choose deployment mode:"
echo "1. Development (with hot reload) - Port 5173"
echo "2. Production (optimized build) - Port 80"
echo

read -p "Enter your choice (1 or 2): " mode

case $mode in
    1)
        echo
        echo "🚀 Starting PharmaGuard in Development Mode..."
        echo "📦 Building and starting containers..."
        docker compose up --build
        ;;
    2)
        echo
        echo "🚀 Starting PharmaGuard in Production Mode..."
        echo "📦 Building and starting containers..."
        docker compose -f docker-compose.prod.yml up --build
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo
echo "✅ PharmaGuard is running!"
echo "🌐 Backend API: http://localhost:3000"
if [ "$mode" = "1" ]; then
    echo "🎨 Frontend: http://localhost:5173"
else
    echo "🎨 Frontend: http://localhost"
fi
echo
echo "Press Ctrl+C to stop the containers" 