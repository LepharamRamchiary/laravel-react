import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification, setNotification } =
    useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setToken(null);
      setUser({});
    });
  };

  // Auto-hide notification after 4s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  return (
    <div id="defaultLayout" className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Menu</h2>
        <Link
          to="/"
          className="px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
        >
          User
        </Link>
        <Link
          to="/dashboard"
          className="px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
        >
          Dashboard
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">Header</div>
          <div className="text-gray-600 flex gap-2 items-center">
            {user?.name}
            <button
              onClick={onLogout}
              className="bg-gray-300 px-4 py-1 rounded-lg cursor-pointer hover:bg-gray-400 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-5 right-10 sm:w-[400px] bg-green-600 text-white text-sm rounded-lg shadow-lg p-4 animate-slide-up">
          ✅ {notification}
        </div>
      )}
    </div>
  );
}
