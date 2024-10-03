import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://striform-backend-1.onrender.com/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000; 
        localStorage.setItem("tokenExpiration", expirationTime);

        navigate("/dashboard");
      } else {
        setErrorMessage(response.data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="striform Logo" className="h-12" />
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
            Sign in to your account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Or{" "}
            <Link to="/sign-up" className="text-black underline">
              create a new account
            </Link>
          </p>

          <div className="bg-white p-8 shadow-lg rounded-lg">
            <button className="w-full flex justify-center items-center p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition mb-6">
              <span className="text-bold text-2xl mr-2">G</span>
              Login with Google
            </button>
            <form onSubmit={handleLogin}>
              {errorMessage && (
                  <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
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
                <div className="flex justify-between items-center">
                  <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                  >
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
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
                  className="w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-900 transition"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
