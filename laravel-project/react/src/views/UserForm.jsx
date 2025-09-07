import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";

export default function UserForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data.data);
                })
                .catch(() => {})
                .finally(() => setLoading(false));
        }, [id]);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(user?.id);
        

        if (user?.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(({}) => {
                    // console.log(data);
                    alert("User updated successfully");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        // response.data.errors;
                        // console.log(response.data.errors);
                        setError(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(({}) => {
                    // console.log(data);
                    alert("User created successfully");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        // response.data.errors;
                        // console.log(response.data.errors);
                        setError(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
            {user.id ? (
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Update User:{" "}
                    <span className="text-indigo-600">{user?.name}</span>
                </h1>
            ) : (
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    New User
                </h1>
            )}

            {loading && (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-500 p-4 rounded mb-6">
                    {Object.keys(error).map((key) => (
                        <p key={key} className="text-white text-sm">
                            {error[key]}
                        </p>
                    ))}
                </div>
            )}

            {!loading && (
                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        value={user?.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                        placeholder="Name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        value={user?.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password_confirmation: e.target.value,
                            })
                        }
                        placeholder="Confirm Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Save
                    </button>
                </form>
            )}
        </div>
    );
}
