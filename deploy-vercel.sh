#!/bin/bash

echo "🚀 Deploying Frontend to Vercel..."

cd frontend

# Create a temporary vercel.json with the correct settings
cat > vercel.json << 'EOF2'
{
  "name": "garment-pos-frontend",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://your-backend-url.com/api"
  }
}
EOF2

echo "📤 Deploying to Vercel..."
echo "Use these exact settings when prompted:"
echo ""
echo "1. Set up and deploy? → Y (Yes)"
echo "2. Which scope? → abhishek's projects"
echo "3. Link to existing project? → N (No)"
echo "4. Project name? → garment-pos-frontend"
echo "5. Directory? → ./ (just press Enter)"
echo "6. Modify settings? → N (No)"
echo "7. Deployment protection? → Y (Yes)"
echo ""

vercel --prod

echo "🎉 Frontend deployed to Vercel!"
echo "🌐 Check your Vercel dashboard for the URL"
