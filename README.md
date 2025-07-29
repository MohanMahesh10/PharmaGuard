# 🛡️ PharmaGuard - Medicine Authenticity Checker

A modern web application that helps users verify the authenticity of medicines using FDA NDC (National Drug Code) database validation and expiry date checking.

## ✨ Features

- **NDC Validation**: Verifies medicine codes against the FDA NDC database
- **Expiry Check**: Validates if medicines are expired or still valid
- **AI-Powered Feedback**: Optional Google Gemini API integration for natural language explanations
- **Modern UI**: Beautiful, responsive Svelte frontend
- **Real-time Results**: Instant verification with clear visual feedback
- **Dockerized**: Easy deployment with Docker and Docker Compose

## 🏗️ Project Structure

```
pharmaguard/
├── backend/                 # Node.js + Express API
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   ├── Dockerfile          # Container configuration
│   └── .env.example        # Environment variables template
├── frontend/               # Svelte frontend
│   ├── src/
│   │   ├── App.svelte      # Main component
│   │   ├── main.js         # App entry point
│   │   └── app.css         # Global styles
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── Dockerfile          # Production container
│   └── Dockerfile.dev      # Development container
├── docker-compose.yml      # Development Docker setup
├── docker-compose.prod.yml # Production Docker setup
├── docker-run.bat          # Windows Docker script
├── docker-run.sh           # Unix Docker script
└── README.md              # This file
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

**Prerequisites:** Docker and Docker Compose installed

#### Windows:
```cmd
# Run the setup script
docker-run.bat

# Or manually:
# Development mode
docker compose up --build

# Production mode
docker compose -f docker-compose.prod.yml up --build
```

#### Unix/Linux/macOS:
```bash
# Make script executable
chmod +x docker-run.sh

# Run the setup script
./docker-run.sh

# Or manually:
# Development mode
docker compose up --build

# Production mode
docker compose -f docker-compose.prod.yml up --build
```

**Access the application:**
- **Development**: Frontend at http://localhost:5173, Backend at http://localhost:3000
- **Production**: Frontend at http://localhost, Backend at http://localhost:3000

### Option 2: Manual Setup

**Prerequisites:** Node.js 18+ and npm

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```
   
4. (Optional) Add your Google Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

5. Start the server:
   ```bash
   npm start
   ```
   
   The backend will run on `http://localhost:3000`

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### POST /verify

Verifies a medicine using NDC code and expiry date.

**Request Body:**
```json
{
  "ndc": "12345-678-90",
  "expiry": "2025-12-31"
}
```

**Response:**
```json
{
  "status": "verified|expired|fake",
  "message": "Human-readable explanation",
  "fda_data": {
    "brand_name": "Medicine Name",
    "generic_name": "Generic Name",
    "dosage_form": "TABLET",
    "labeler_name": "Manufacturer",
    "marketing_status": "Active"
  }
}
```

### GET /health

Health check endpoint.

## 🧪 Testing the Application

You can test the application with these sample NDC codes from the FDA database:

- `0002-7510-01` - Humulin R (insulin)
- `0069-2587-10` - Pfizer product
- `50090-4406-0` - A-S Medication Solutions product

## 🐳 Docker Commands

### Development Mode
```bash
# Start services
docker compose up --build

# Stop services
docker compose down

# View logs
docker compose logs -f

# Rebuild specific service
docker compose build backend
docker compose build frontend
```

### Production Mode
```bash
# Start services
docker compose -f docker-compose.prod.yml up --build

# Stop services
docker compose -f docker-compose.prod.yml down

# View logs
docker compose -f docker-compose.prod.yml logs -f
```

### Useful Docker Commands
```bash
# Remove all containers and images
docker compose down --rmi all --volumes

# Shell into backend container
docker compose exec backend sh

# Shell into frontend container
docker compose exec frontend sh
```

## 🔑 Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 3000)
- `GEMINI_API_KEY` - Google Gemini API key (optional)
- `NODE_ENV` - Environment mode (development/production)

### Frontend

- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

## 🔍 How It Works

1. **User Input**: Users enter an NDC code and expiry date
2. **FDA Validation**: Backend queries the FDA NDC API to verify the medicine exists
3. **Expiry Check**: Compares the expiry date with current date
4. **AI Enhancement**: (Optional) Gemini API generates user-friendly explanations
5. **Result Display**: Frontend shows verification result with medicine details

## 🎨 Status Types

- ✅ **Verified**: Medicine is authentic and not expired
- ⚠️ **Expired**: Medicine is authentic but expired
- ❌ **Not Found**: NDC not found in FDA database (potentially counterfeit)

## 🛠️ Technologies Used

- **Frontend**: Svelte, Vite, Modern CSS
- **Backend**: Node.js, Express, Axios
- **APIs**: FDA NDC API, Google Gemini API
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (production)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on the repository. 