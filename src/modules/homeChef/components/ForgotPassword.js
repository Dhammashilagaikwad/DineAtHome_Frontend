import React from "react";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setError("Please enter your email address");
    } else {
      setError("");
      // Replace this with your actual password reset logic
      setMessage(
        "If an account with that email exists, a password reset link will be sent."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-sm">
        <h1 className="text-3xl font-medium mb-6 text-gray-800">
          Forgot Password
        </h1>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="input input-bordered w-full "
              required
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-error text-white text-lg font-normal"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
