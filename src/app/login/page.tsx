"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { HiMail, HiLockClosed } from "react-icons/hi"; // Adding icons for inputs
import Link from "next/link"; // Import Link

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full sm:w-96 transform transition-all duration-500 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-semibold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-6 border-gray-300 dark:border-gray-600" />

        <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <div className="relative">
          <HiMail className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
          <input
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out hover:shadow-md"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        <label htmlFor="password" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
        <div className="relative">
          <HiLockClosed className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
          <input
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out hover:shadow-md"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className="w-full p-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-semibold mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 ease-in-out disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Forgot your password? 
            <Link href="/forgotpassword" className="text-blue-500 hover:underline">
              Reset it here
            </Link>
          </p>
        </div>

        <div className="text-center text-white dark:text-gray-300 mt-4">
          <p>Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
}
