"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  const [username, setUsername] = useState("User");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      const userData = res.data.data;
      setData(userData._id);
      setUsername(userData.username || "User");
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 dark:from-gray-800 dark:to-gray-900 px-4">
      {/* Logout Button (Top-right corner) */}
      <button
        onClick={logout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow"
      >
        Logout
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md text-center space-y-6">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&size=128`}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md"
        />

        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome, {username}!</p>

        <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-3 rounded-lg break-all">
          {data === "Nothing" ? (
            "Nothing"
          ) : (
            <Link
              href={`/profile/${data}`}
              className="underline text-white-600 hover:text-white-800"
            >
              {data}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
