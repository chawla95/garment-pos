'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Sale {
  items: any[];
  subtotal: number;
  gst: number;
  total: number;
  timestamp: string;
  cashier: string;
}

export default function ReportsPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState('sales');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load sales data from localStorage
    const salesData = JSON.parse(localStorage.getItem('sales') || '[]');
    setSales(salesData);
  }, []);

  const getTotalSales = () => {
    return sales.reduce((total, sale) => total + sale.total, 0);
  };

  const getTotalItems = () => {
    return sales.reduce((total, sale) => {
      return total + sale.items.reduce((itemTotal: number, item: any) => itemTotal + item.quantity, 0);
    }, 0);
  };

  const getTopProducts = () => {
    const productCounts: { [key: string]: number } = {};
    sales.forEach(sale => {
      sale.items.forEach((item: any) => {
        const productName = item.product.name;
        productCounts[productName] = (productCounts[productName] || 0) + item.quantity;
      });
    });
    return Object.entries(productCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const getDailySales = () => {
    const dailyData: { [key: string]: number } = {};
    sales.forEach(sale => {
      const date = new Date(sale.timestamp).toLocaleDateString();
      dailyData[date] = (dailyData[date] || 0) + sale.total;
    });
    return Object.entries(dailyData);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please login to access reports</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600">View your business insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Type Selector */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedReport('sales')}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedReport === 'sales' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sales Report
            </button>
            <button
              onClick={() => setSelectedReport('products')}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedReport === 'products' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Product Analytics
            </button>
            <button
              onClick={() => setSelectedReport('daily')}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedReport === 'daily' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Daily Trends
            </button>
          </div>
        </div>

        {/* Sales Report */}
        {selectedReport === 'sales' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Sales</h3>
                <p className="text-3xl font-bold text-green-600">₹{getTotalSales().toFixed(2)}</p>
                <p className="text-sm text-gray-500">{sales.length} transactions</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Items Sold</h3>
                <p className="text-3xl font-bold text-blue-600">{getTotalItems()}</p>
                <p className="text-sm text-gray-500">Total units</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Sale</h3>
                <p className="text-3xl font-bold text-purple-600">
                  ₹{sales.length > 0 ? (getTotalSales() / sales.length).toFixed(2) : '0.00'}
                </p>
                <p className="text-sm text-gray-500">Per transaction</p>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cashier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sales.slice(-10).reverse().map((sale, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(sale.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {sale.cashier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {sale.items.reduce((total: number, item: any) => total + item.quantity, 0)} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ₹{sale.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Product Analytics */}
        {selectedReport === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
              <div className="space-y-4">
                {getTopProducts().map(([product, quantity], index) => (
                  <div key={product} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-blue-600 mr-3">#{index + 1}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{product}</h4>
                        <p className="text-sm text-gray-500">{quantity} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Rank</p>
                      <p className="font-bold text-green-600">{index + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Daily Trends */}
        {selectedReport === 'daily' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales Trend</h3>
              <div className="space-y-4">
                {getDailySales().map(([date, total]) => (
                  <div key={date} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{date}</h4>
                      <p className="text-sm text-gray-500">Daily total</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
