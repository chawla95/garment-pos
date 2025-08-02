'use client';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">🚀 GARMENT POS</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Point of Sale System</h2>
          <p className="text-gray-600">Complete retail management for garment stores</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => {
              localStorage.setItem('token', 'demo-token');
              localStorage.setItem('user', JSON.stringify({
                id: 1,
                name: 'Demo User',
                email: 'demo@garmentpos.com',
                role: 'admin'
              }));
              window.location.reload();
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-lg font-semibold shadow-lg"
          >
            🎯 Try Demo Mode
          </button>
          
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="w-full bg-gray-100 text-gray-800 py-4 px-6 rounded-lg hover:bg-gray-200 transition-colors text-lg font-semibold border border-gray-300"
          >
            🔐 Login
          </button>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>✅ Fully functional POS system</p>
          <p>📊 Analytics, Inventory, Sales Management</p>
        </div>
      </div>
    </div>
  );
}
