#!/bin/bash

# PharmaGuard Deployment Script for Google Cloud Run

set -e

# Configuration
PROJECT_ID=${1:-"your-project-id"}
REGION=${2:-"us-central1"}
SERVICE_NAME="pharmaguard-api"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🚀 Deploying PharmaGuard to Google Cloud Run..."
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo "Service: $SERVICE_NAME"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    exit 1
fi

# Navigate to backend directory
cd backend

# Build and submit to Cloud Build
echo "🔨 Building container image..."
gcloud builds submit --tag $IMAGE_NAME --project $PROJECT_ID

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --project $PROJECT_ID

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your API is now available at:"
gcloud run services describe $SERVICE_NAME --region $REGION --project $PROJECT_ID --format 'value(status.url)'

echo ""
echo "💡 To add environment variables (like GEMINI_API_KEY), run:"
echo "gcloud run services update $SERVICE_NAME --region $REGION --set-env-vars GEMINI_API_KEY=your_key_here --project $PROJECT_ID" 