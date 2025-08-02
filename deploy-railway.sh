#!/bin/bash

echo "🚀 Deploying Garment POS to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Deploy backend
echo "📤 Deploying Backend..."
cd backend
railway init --yes
railway up

# Get the backend URL
BACKEND_URL=$(railway status --json | jq -r '.url')
echo "✅ Backend deployed to: $BACKEND_URL"

# Deploy frontend
echo "📤 Deploying Frontend..."
cd ../frontend

# Update the API URL in the frontend
echo "NEXT_PUBLIC_API_URL=$BACKEND_URL/api" > .env.local

# Deploy to Vercel (easier for Next.js)
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔐 Logging into Vercel..."
vercel login

echo "📤 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "🌐 Backend: $BACKEND_URL"
echo "🌐 Frontend: Check Vercel dashboard for URL"
echo "🔗 Health Check: $BACKEND_URL/health"
