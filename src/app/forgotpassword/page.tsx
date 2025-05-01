"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      setMessage(response.data.message);
      setEmail("");
      toast.success("Password reset link sent to your email");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Forgot Password</h1>
        <form className="flex flex-col space-y-5" onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Submit
          </button>
        </form>
        {message && <p className="text-green-400 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
