import React, { useState } from "react";
import toastService from "../../../utils/toastService";
import axiosInstance from "../../../utils/axiosService";
import tokenService from "../../../utils/tokenService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toastService.warn("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/chefs/login", {
        email,
        password,
      });
      tokenService.setToken(response?.data?.token);
      toastService.success(response?.data?.message ?? "Login Sucessful !");
      navigate("/home-shefs/dashboard");
    } catch (error) {
      toastService.error(
        `Login failed: ${error.response.data.message ?? error.message}`
      );
      console.error("Login Error:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-medium mb-6 text-gray-800 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 text-lg border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 text-lg border rounded-md"
              required
            />
            <div className="text-right">
              <a
                href="/forgot-password"
                className="underline text-red-500 text-sm cursor-pointer"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-500 p-3 text-white text-lg font-semibold rounded-md hover:bg-red-400 transition-colors flex justify-center items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-t-4 border-t-white border-red-500 rounded-full animate-spin ml-2"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
