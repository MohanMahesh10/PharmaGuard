#!/bin/bash

echo "🛡️ Starting PharmaGuard Application..."
echo

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

echo "🚀 Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 3

echo "🎨 Starting Frontend Development Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo
echo "✅ Both services are starting!"
echo "🌐 Backend: http://localhost:3000"
echo "🎨 Frontend: http://localhost:5173"
echo
echo "Press Ctrl+C to stop both services"

# Wait for user interrupt
trap 'echo ""; echo "🛑 Stopping services..."; kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait 