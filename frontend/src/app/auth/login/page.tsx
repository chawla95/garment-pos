'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const demoCredentials = {
    admin: { email: 'admin@garmentpos.com', password: 'admin123', role: 'admin', name: 'Admin User' },
    cashier: { email: 'cashier@garmentpos.com', password: 'cashier123', role: 'cashier', name: 'Cashier User' },
    manager: { email: 'manager@garmentpos.com', password: 'manager123', role: 'manager', name: 'Manager User' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check demo credentials
    const user = Object.values(demoCredentials).find(
      cred => cred.email === email && cred.password === password
    );

    if (user) {
      // Store user data
      localStorage.setItem('token', `demo-token-${user.role}`);
      localStorage.setItem('user', JSON.stringify({
        id: Math.floor(Math.random() * 1000),
        name: user.name,
        email: user.email,
        role: user.role
      }));
      
      // Navigate to dashboard
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (role: string) => {
    const user = demoCredentials[role as keyof typeof demoCredentials];
    setEmail(user.email);
    setPassword(user.password);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">🚀 GARMENT POS</h1>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Login</h2>
          <p className="text-gray-600">Access your POS system</p>
        </div>

        {/* Demo Credentials */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 mb-3">Demo Credentials:</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleDemoLogin('admin')}
              className="w-full text-left p-2 bg-blue-100 hover:bg-blue-200 rounded text-sm"
            >
              👑 Admin: admin@garmentpos.com / admin123
            </button>
            <button
              onClick={() => handleDemoLogin('manager')}
              className="w-full text-left p-2 bg-green-100 hover:bg-green-200 rounded text-sm"
            >
              📊 Manager: manager@garmentpos.com / manager123
            </button>
            <button
              onClick={() => handleDemoLogin('cashier')}
              className="w-full text-left p-2 bg-purple-100 hover:bg-purple-200 rounded text-sm"
            >
              💰 Cashier: cashier@garmentpos.com / cashier123
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleBackToHome}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
