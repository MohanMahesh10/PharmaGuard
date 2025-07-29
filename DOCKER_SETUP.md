# 🐳 PharmaGuard Docker Setup Guide

## Quick Start

### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git (to clone the repository)

### 2. Clone and Run

```bash
# Clone the repository
git clone <repository-url>
cd PharmaGuard

# Run the application
docker compose up --build
```

**That's it!** The application will be available at:
- 🎨 **Frontend**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:3000

### 3. Stop the Application

```bash
# Stop containers
docker compose down
```

## Available Scripts

### Windows
```cmd
# Interactive setup
docker-run.bat
```

### Unix/Linux/macOS
```bash
# Make executable and run
chmod +x docker-run.sh
./docker-run.sh
```

## Deployment Modes

### Development Mode (Default)
- **Frontend**: Svelte dev server with hot reload on port 5173
- **Backend**: Node.js with live reload
- **Command**: `docker compose up --build`

### Production Mode
- **Frontend**: Optimized build served by Nginx on port 80
- **Backend**: Production Node.js server
- **Command**: `docker compose -f docker-compose.prod.yml up --build`

## Environment Variables

Create a `.env` file in the `backend/` directory (optional):

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

## Troubleshooting

### Docker not found
Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Port already in use
```bash
# Stop all containers
docker compose down

# Or use different ports by editing docker-compose.yml
```

### Rebuild containers
```bash
# Clean rebuild
docker compose down
docker compose build --no-cache
docker compose up
```

### View logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
```

## Testing the API

Once running, test with these sample NDC codes:
- `0002-7510-01` - Humulin R (insulin)
- `0069-2587-10` - Pfizer product
- `50090-4406-0` - A-S Medication Solutions product

## File Structure

```
PharmaGuard/
├── docker-compose.yml       # Development setup
├── docker-compose.prod.yml  # Production setup
├── docker-run.bat          # Windows script
├── docker-run.sh           # Unix script
├── backend/
│   ├── Dockerfile          # Backend container
│   └── ...
└── frontend/
    ├── Dockerfile          # Production frontend
    ├── Dockerfile.dev      # Development frontend
    └── ...
``` 