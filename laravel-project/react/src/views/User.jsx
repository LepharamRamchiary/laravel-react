import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";

export default function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        } else {
            axiosClient
                .delete(`/users/${u.id}`)
                .then(() => {
                    // setUsers(users.filter((u) => u.id !== u.id));
                    alert("User deleted sucessfully");
                    getUsers();
                })
                .catch(() => {});
        }
    };

    return (
        <div className="p-6">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                User Profile
            </h1>

            {/* Profile Card */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full border"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {user?.name || "Guest User"}
                        </h2>
                        <p className="text-gray-600">
                            {user?.email || "No email available"}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                            {user?.created_at
                                ? new Date(user.created_at).toLocaleString(
                                      "en-IN",
                                      {
                                          dateStyle: "medium",
                                          timeStyle: "short",
                                      }
                                  )
                                : "—"}
                        </p>
                    </div>
                </div>
            </div>

            {/* User List Table */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">
                        All Users
                    </h2>
                    <Link
                        className="bg-green-600 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-green-400 hover:text-gray-800"
                        to="/users/new"
                    >
                        Add New User
                    </Link>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : users?.data?.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.map((u) => (
                                <tr
                                    key={u.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{u.name}</td>
                                    <td className="p-3">{u.email}</td>
                                    <td className="p-3 flex justify-center items-center gap-3 ">
                                        <Link
                                            to={"/users/" + u.id}
                                            className="coursor-pointer bg-green-500 text-white hover:bg-green-400 px-2 py-0.5 rounded-lg"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="bg-red-500 text-white hover:bg-red-400 px-2 py-0.5 rounded-lg cursor-pointer "
                                            onClick={(e) => onDelete(u)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    // Empty State
                    <div className="text-center py-8 text-gray-500">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
}
