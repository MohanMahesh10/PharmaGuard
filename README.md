# 🛡️ PharmaGuard - Medicine Authenticity Checker

[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern web application that helps users verify the authenticity of medicines using FDA NDC (National Drug Code) database validation and expiry date checking.

![Screenshot 2025-07-29 231253](https://github.com/user-attachments/assets/d00dd896-f0c9-4ec9-a7c7-1b68c8fb4da9)

## ✨ Features

- **🔍 NDC Validation**: Verifies medicine codes against the FDA NDC database
- **📅 Expiry Check**: Validates if medicines are expired or still valid
- **🤖 AI-Powered Feedback**: Optional Google Gemini API integration for natural language explanations
- **🎨 Modern UI**: Beautiful, responsive Svelte frontend with test data helper
- **⚡ Real-time Results**: Instant verification with clear visual feedback
- **🐳 Dockerized**: Easy deployment with Docker and Docker Compose
- **🧪 Test Data**: Comprehensive dummy data for reliable testing

## 🚀 Quick Start

### Option 1: Docker (Recommended)

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed

```bash
# Clone the repository
git clone https://github.com/MohanMahesh10/PharmaGuard.git
cd PharmaGuard

# Start the application
docker compose up --build
```

**Access the application:**
- 🎨 **Frontend**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:3000

### Option 2: Manual Setup

**Prerequisites:** Node.js 18+ and npm

```bash
# Clone the repository
git clone https://github.com/MohanMahesh10/PharmaGuard.git
cd PharmaGuard

# Setup backend
cd backend
npm install
cp .env.example .env
npm start

# Setup frontend (in new terminal)
cd ../frontend
npm install
npm run dev
```

## 🧪 Testing the Application

The application includes comprehensive test data for easy demonstration:

1. **Click "🧪 Show Test Data"** on the frontend
2. **Select any sample NDC** to auto-fill the form
3. **Use Quick Actions** to test different scenarios

### Sample NDC Codes

| NDC Code | Medicine | Status | Use Case |
|----------|----------|--------|----------|
| `0002-7510-01` | Humulin R (insulin) | Valid | ✅ Prescription verification |
| `0069-2587-10` | Lyrica (pregabalin) | Valid | ⚠️ Expiry testing |
| `55111-118-78` | Ibuprofen | Valid | 💊 OTC medicine |
| `99999-999-99` | Invalid NDC | Invalid | ❌ Counterfeit detection |

## 🏗️ Project Structure

```
pharmaguard/
├── 📁 backend/                 # Node.js + Express API
│   ├── 📄 index.js            # Main server file
│   ├── 📄 dummy-data.js        # Test data
│   ├── 📄 package.json        # Dependencies
│   └── 🐳 Dockerfile          # Container config
├── 📁 frontend/               # Svelte frontend
│   ├── 📁 src/
│   │   ├── 📄 App.svelte      # Main component
│   │   ├── 📄 main.js         # Entry point
│   │   └── 📄 app.css         # Global styles
│   ├── 📄 package.json        # Dependencies
│   ├── 🐳 Dockerfile          # Production container
│   └── 🐳 Dockerfile.dev      # Development container
├── 🐳 docker-compose.yml      # Development setup
├── 🐳 docker-compose.prod.yml # Production setup
├── 📄 README.md              # This file
└── 📄 TESTING.md             # Testing guide
```

## 🔌 API Documentation

### Verification Endpoint

```http
POST /verify
Content-Type: application/json

{
  "ndc": "0002-7510-01",
  "expiry": "2025-12-31"
}
```

**Response:**
```json
{
  "status": "verified|expired|fake",
  "message": "Human-readable explanation",
  "fda_data": {
    "brand_name": "Humulin R",
    "generic_name": "insulin human",
    "dosage_form": "INJECTION",
    "labeler_name": "Eli Lilly and Company",
    "marketing_status": "Prescription"
  }
}
```

### Other Endpoints

- `GET /health` - Health check
- `GET /test-data` - Available test NDC codes

## 🐳 Docker Commands

### Development Mode
```bash
# Start with hot reload
docker compose up --build

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Production Mode
```bash
# Start optimized build
docker compose -f docker-compose.prod.yml up --build

# Run in background
docker compose -f docker-compose.prod.yml up -d
```

## 🔧 Configuration

### Environment Variables

Create `.env` file in `backend/` directory:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

### Frontend Configuration

- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

## 🔍 How It Works

1. **User Input**: Enter NDC code and expiry date
2. **Smart Validation**: Checks FDA API with dummy data fallback
3. **Expiry Analysis**: Compares dates to detect expired medicines
4. **AI Enhancement**: Optional Gemini API for user-friendly messages
5. **Visual Results**: Clear status indicators with detailed information

## 🎨 Status Types

- ✅ **Verified**: Medicine is authentic and not expired
- ⚠️ **Expired**: Medicine is authentic but expired  
- ❌ **Not Found**: NDC not found (potentially counterfeit)

## 🧬 Technology Stack

- **Frontend**: Svelte, Vite, Modern CSS
- **Backend**: Node.js, Express, Axios
- **APIs**: FDA NDC API, Google Gemini API
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (production)

## 📱 Screenshots

<!-- Add screenshots here when available -->

![Screenshot 2025-07-29 231253](https://github.com/user-attachments/assets/c8f6c1ec-1252-43ea-bf74-5731017d5765)


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

### Local Docker
```bash
# Development
docker compose up --build

# Production
docker compose -f docker-compose.prod.yml up --build
```

### Cloud Deployment
The application is ready for deployment to:
- Google Cloud Run
- AWS ECS
- Azure Container Instances
- Any Docker-compatible platform

## 📚 Documentation

- [Testing Guide](TESTING.md) - Comprehensive testing instructions
- [Docker Setup](DOCKER_SETUP.md) - Docker deployment guide

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/MohanMahesh10/PharmaGuard/issues) page
2. Create a new issue with detailed information
3. Review the [Testing Guide](TESTING.md) for troubleshooting

## ⭐ Star This Repository

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ for medicine safety and authenticity verification** 
