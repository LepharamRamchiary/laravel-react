import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-600">Users</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">120</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-600">Orders</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">75</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-600">Revenue</h2>
          <p className="text-2xl font-bold text-purple-600 mt-2">$12,300</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-600">Pending</h2>
          <p className="text-2xl font-bold text-red-600 mt-2">5</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-gray-600">
          <li>✅ User John signed up</li>
          <li>📦 Order #1023 placed</li>
          <li>💳 Payment of $250 received</li>
          <li>⚠️ Order #1020 pending confirmation</li>
        </ul>
      </div>
    </div>
  );
}
