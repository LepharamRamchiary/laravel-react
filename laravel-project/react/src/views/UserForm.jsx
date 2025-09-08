// import React, { useEffect, useState } from "react";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import axiosClient from "../axios-client.js";

// export default function UserForm() {
//     const { id } = useParams();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const [user, setUser] = useState({
//         id: null,
//         name: "",
//         email: "",
//         password: "",
//         password_confirmation: "",
//     });

//     if (id) {
//         useEffect(() => {
//             setLoading(true);
//             axiosClient
//                 .get(`/users/${id}`)
//                 .then(({ data }) => {
//                     setLoading(false);
//                     setUser(data.data);
//                 })
//                 .catch(() => {})
//                 .finally(() => setLoading(false));
//         }, [id]);
//     }

//     const onSubmit = (e) => {
//         e.preventDefault();

//         console.log(user?.id);

//         let userData = { ...user };

//         // For updates, remove password fields if they're empty
//         if (user?.id && (!user.password || user.password === "")) {
//             delete userData.password;
//             delete userData.password_confirmation;
//         }

//         if (user?.id) {
//             axiosClient
//                 .put(`/users/${user.id}`, userData)
//                 .then(({}) => {
//                     alert("User updated successfully");
//                     navigate("/users");
//                 })
//                 .catch((err) => {
//                     const response = err.response;
//                     if (response && response.status === 422) {
//                         setError(response.data.errors);
//                     }
//                 });
//         } else {
//             axiosClient
//                 .post("/users", userData)
//                 .then(({}) => {
//                     alert("User created successfully");
//                     navigate("/users");
//                 })
//                 .catch((err) => {
//                     const response = err.response;
//                     if (response && response.status === 422) {
//                         setError(response.data.errors);
//                     }
//                 });
//         }

//         // if (user?.id) {
//         //     axiosClient
//         //         .put(`/users/${user.id}`, user)
//         //         .then(({}) => {
//         //             // console.log(data);
//         //             alert("User updated successfully");
//         //             navigate("/users");
//         //         })
//         //         .catch((err) => {
//         //             const response = err.response;
//         //             if (response && response.status === 422) {
//         //                 // response.data.errors;
//         //                 // console.log(response.data.errors);
//         //                 setError(response.data.errors);
//         //             }
//         //         });
//         // } else {
//         //     axiosClient
//         //         .post("/users", user)
//         //         .then(({}) => {
//         //             // console.log(data);
//         //             alert("User created successfully");
//         //             navigate("/users");
//         //         })
//         //         .catch((err) => {
//         //             const response = err.response;
//         //             if (response && response.status === 422) {
//         //                 // response.data.errors;
//         //                 // console.log(response.data.errors);
//         //                 setError(response.data.errors);
//         //             }
//         //         });
//         // }
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
//             {user.id ? (
//                 <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//                     Update User:{" "}
//                     <span className="text-indigo-600">{user?.name}</span>
//                 </h1>
//             ) : (
//                 <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//                     New User
//                 </h1>
//             )}

//             {loading && (
//                 <div className="flex justify-center items-center py-10">
//                     <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
//                 </div>
//             )}

//             {error && (
//                 <div className="bg-red-500 p-4 rounded mb-6">
//                     {Object.keys(error).map((key) => (
//                         <p key={key} className="text-white text-sm">
//                             {error[key]}
//                         </p>
//                     ))}
//                 </div>
//             )}

//             {!loading && (
//                 <form onSubmit={onSubmit} className="space-y-4">
//                     <input
//                         value={user?.name}
//                         onChange={(e) =>
//                             setUser({ ...user, name: e.target.value })
//                         }
//                         placeholder="Name"
//                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                     <input
//                         value={user?.email}
//                         onChange={(e) =>
//                             setUser({ ...user, email: e.target.value })
//                         }
//                         placeholder="Email"
//                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                     <input
//                         type="password"
//                         onChange={(e) =>
//                             setUser({ ...user, password: e.target.value })
//                         }
//                         placeholder="Password"
//                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                     <input
//                         type="password"
//                         onChange={(e) =>
//                             setUser({
//                                 ...user,
//                                 password_confirmation: e.target.value,
//                             })
//                         }
//                         placeholder="Confirm Password"
//                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                     <button
//                         type="submit"
//                         className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//                     >
//                         Save
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// }


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

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser({
                        ...data.data,
                        password: "",
                        password_confirmation: ""
                    });
                })
                .catch((err) => {
                    setLoading(false);
                    console.error("Error fetching user:", err);
                });
        }
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Prepare data for submission
        let submitData = {
            name: user.name,
            email: user.email
        };

        // Only include password if it's provided
        if (user.password && user.password.trim() !== '') {
            submitData.password = user.password;
            submitData.password_confirmation = user.password_confirmation;
        }

        console.log('Submitting data:', submitData);

        if (user?.id) {
            // Update existing user
            axiosClient
                .put(`/users/${user.id}`, submitData)
                .then((response) => {
                    console.log('Update response:', response);
                    alert("User updated successfully");
                    navigate("/");
                })
                .catch((err) => {
                    console.error("Update error:", err);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setError(response.data.errors);
                    } else {
                        setError({ general: ['An error occurred while updating the user'] });
                    }
                });
        } else {
            // Create new user
            axiosClient
                .post("/users", submitData)
                .then((response) => {
                    console.log('Create response:', response);
                    alert("User created successfully");
                    navigate("/");
                })
                .catch((err) => {
                    console.error("Create error:", err);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setError(response.data.errors);
                    } else {
                        setError({ general: ['An error occurred while creating the user'] });
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
                            {Array.isArray(error[key]) ? error[key][0] : error[key]}
                        </p>
                    ))}
                </div>
            )}

            {!loading && (
                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        value={user?.name || ''}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                        placeholder="Name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        value={user?.email || ''}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        placeholder="Email"
                        type="email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="password"
                        value={user?.password || ''}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        placeholder={user.id ? "New Password (leave blank to keep current)" : "Password"}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required={!user.id}
                    />
                    <input
                        type="password"
                        value={user?.password_confirmation || ''}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password_confirmation: e.target.value,
                            })
                        }
                        placeholder={user.id ? "Confirm New Password" : "Confirm Password"}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required={!user.id}
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