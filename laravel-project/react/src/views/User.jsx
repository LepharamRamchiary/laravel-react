import React from "react";

export default function User() {
  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/80"
            alt="User Avatar"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-gray-600">johndoe@example.com</p>
            <p className="text-gray-500 text-sm mt-1">Joined: Jan 2024</p>
          </div>
        </div>
      </div>

      {/* User List Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Users</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">Alice Smith</td>
              <td className="p-3">alice@example.com</td>
              <td className="p-3">Admin</td>
              <td className="p-3 text-green-600">Active</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">Bob Johnson</td>
              <td className="p-3">bob@example.com</td>
              <td className="p-3">User</td>
              <td className="p-3 text-red-600">Inactive</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">Charlie Lee</td>
              <td className="p-3">charlie@example.com</td>
              <td className="p-3">User</td>
              <td className="p-3 text-green-600">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
