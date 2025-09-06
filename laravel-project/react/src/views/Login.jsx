import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const { setToken, setUser } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setError(null);

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    // response.data.errors;
                    // console.log(response.data.errors);
                    if (response.data.errors) {
                        setError(response.data.errors);
                    } else {
                        setError({ email: [response.data.message] });
                    }
                }
            });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Login
            </h2>
            {error && (
                <div className="bg-red-500 p-4 rounded mb-6">
                    {Object.keys(error).map((key) => (
                        <p key={key} className="text-white">
                            {error[key]}
                        </p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        ref={emailRef}
                        className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        // required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        ref={passwordRef}
                        className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        // required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>
            </form>
            <p className="text-center text-gray-500 text-sm mt-4">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
    );
}
