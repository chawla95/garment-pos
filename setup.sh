#!/bin/bash

# Garment POS Setup Script
echo "🚀 Setting up Garment POS System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL 14+ first."
    echo "   You can continue with the setup, but you'll need to install PostgreSQL later."
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. Docker is recommended for easy deployment."
fi

# Create environment files
echo "📝 Creating environment files..."

# Backend environment
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "ℹ️  backend/.env already exists"
fi

# Frontend environment
if [ ! -f "frontend/.env.local" ]; then
    cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000/api
EOF
    echo "✅ Created frontend/.env.local"
else
    echo "ℹ️  frontend/.env.local already exists"
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd backend
npx prisma generate
if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated"
else
    echo "❌ Failed to generate Prisma client"
    exit 1
fi
cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your database connection in backend/.env"
echo "2. Set up your JWT secret in backend/.env"
echo "3. Run database migrations: cd backend && npx prisma db push"
echo "4. Start the backend: cd backend && npm run dev"
echo "5. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   Health Check: http://localhost:8000/health"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - docs/system-architecture.md - Technical architecture"
echo "   - docs/project-structure.md - Project structure"
echo ""
echo "🐳 For Docker deployment:"
echo "   docker-compose up -d"
echo "" 