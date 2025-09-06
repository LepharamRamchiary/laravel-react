import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

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

    // useEffect(() => {
    //   if(!token) return;
    //     axiosClient.get("/user").then(({ data }) => {
    //         setUser(data);
    //     });
    // }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("USER", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER");
        }
    }, [user]);

    useEffect(() => {
        if (token && !user) {
            axiosClient
                .get("/user")
                .then(({ data }) => setUser(data))
                .catch(() => {
                    setToken(null); // token invalid
                    setUser(null);
                });
        }
    }, [token]);

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
                    <div className="text-xl font-semibold text-gray-800">
                        Header
                    </div>
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
        </div>
    );
}
