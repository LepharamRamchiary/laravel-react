import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);

  const {setUser,setToken} = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    }
    // console.log(payload);

    axiosClient.post("/signup", payload).then(({ data }) => {
      setUser(data.user);
      setToken(data.token);
    }).catch((err) => {
      const response = err.response;
      if (response && response.status === 422) {
        // response.data.errors;
        // console.log(response.data.errors);
        setError(response.data.errors);
      }
    })
    
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>
      {error && <div className="bg-red-500 p-4 rounded mb-6">
        {Object.keys(error).map(key => (
          <p key={key} className="text-white">{error[key]}</p>
        ))}
      </div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            // value={name}
            ref={nameRef}
            className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            type="password"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            ref={confirmPasswordRef}
            className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Re-enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-500 text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
