"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: unknown) {
      setError(true);
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('An unknown error occurred during email verification.');
      }
    }
    
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Verify Your Email
        </h1>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Verifying your email...</p>
        ) : verified ? (
          <>
            <p className="text-green-600 dark:text-green-400 mb-4 text-lg font-medium">
              ✅ Your email has been verified successfully!
            </p>
            <Link
              href="/login"
              className="text-blue-500 hover:underline font-semibold text-lg mt-2"
            >
              Go to Login
            </Link>
          </>
        ) : error ? (
          <>
            <p className="text-red-600 dark:text-red-400 mb-4 text-lg font-medium">
              ❌ Invalid or expired verification link.
            </p>
            <Link
              href="/signup"
              className="text-blue-500 hover:underline font-semibold text-lg mt-2"
            >
              Try Signing Up Again
            </Link>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">No verification token found.</p>
        )}
      </div>
    </div>
  );
}
