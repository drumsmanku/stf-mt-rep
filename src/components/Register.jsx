import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://striform-backend-1.onrender.com/api/auth/register", {
                username,
                email,
                password
            });

            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            } else {
                setErrorMessage(response.data.message || "Registration failed. Email already in use !.");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="striform Logo" className="h-12"/>
                </div>
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
                    Create a new account
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Or{" "}
                    <Link to={"/log-in"} className="text-black underline">
                        sign in to your account
                    </Link>
                </p>

                <div className="bg-white p-8 rounded-lg">
                    <button
                        className="w-full flex justify-center items-center p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition mb-6 shadow-lg">
                        <span className="text-bold text-2xl mr-2">G</span>
                        Sign up with Google
                    </button>
                    <form onSubmit={handleRegister}>
                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                        )}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-900 transition shadow-lg"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
