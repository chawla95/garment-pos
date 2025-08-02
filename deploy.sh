#!/bin/bash

echo "🚀 Deploying Garment POS System..."

# Check if services are running
echo "📊 Checking services..."

# Check PostgreSQL
if brew services list | grep -q "postgresql@14.*started"; then
    echo "✅ PostgreSQL is running"
else
    echo "❌ PostgreSQL is not running. Starting..."
    brew services start postgresql@14
fi

# Check Redis
if brew services list | grep -q "redis.*started"; then
    echo "✅ Redis is running"
else
    echo "❌ Redis is not running. Starting..."
    brew services start redis
fi

# Create database if it doesn't exist
echo "🗄️ Setting up database..."
createdb garment_pos 2>/dev/null || echo "Database already exists"

# Backend setup
echo "🔧 Setting up backend..."
cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "🗄️ Setting up database schema..."
npx prisma db push

# Start backend in background
echo "🚀 Starting backend server..."
npx ts-node src/index.ts &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Check if backend is running
if curl -f http://localhost:8000/health >/dev/null 2>&1; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "❌ Backend failed to start"
    exit 1
fi

# Frontend setup
echo "🎨 Setting up frontend..."
cd ../frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 10

# Check if frontend is running
if curl -f http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend failed to start"
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   Health Check: http://localhost:8000/health"
echo ""
echo "📋 To stop the servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - docs/system-architecture.md - Technical architecture"
echo "" 