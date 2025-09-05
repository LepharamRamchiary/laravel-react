import React from "react";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* This is where child routes (Login / Signup) will render */}
        <Outlet />
      </div>
    </div>
  );
}
