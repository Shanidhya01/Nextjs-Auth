"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success:", response.data);

      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password, username } = user;
    setButtonDisabled(!(email && password && username));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full sm:w-96 transform transition-all duration-500 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 mb-6">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr className="mb-6 border-gray-300 dark:border-gray-600" />

        <label htmlFor="username" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Username
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out hover:shadow-md"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />

        <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out hover:shadow-md"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        <label htmlFor="password" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out hover:shadow-md"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className="w-full p-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-semibold mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 ease-in-out disabled:bg-gray-400"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <div className="text-center text-white dark:text-gray-300">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
