'use client';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">🎉 GARMENT POS REDEPLOYED!</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Garment POS</h2>
          <p className="text-gray-600">Point of Sale System for Garment Retail</p>
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
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            🚀 Try Demo Mode
          </button>
          
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="w-full bg-gray-200 text-gray-800 py-4 px-6 rounded-lg hover:bg-gray-300 transition-colors text-lg font-semibold"
          >
            🔐 Login
          </button>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>✅ Custom page is working!</p>
          <p>Demo mode will show you the full dashboard with sample data</p>
        </div>
      </div>
    </div>
  );
}
