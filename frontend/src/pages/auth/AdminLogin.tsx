// ==========================================================
// 🌾 AgriGenAI Admin Login
// File: src/pages/auth/AdminLogin.tsx
// Part 1/5
// ==========================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiLogIn,
  FiMail,
  FiShield,
} from "react-icons/fi";

import { adminLogin } from "../../services/adminApi";

// ==========================================================
// Interfaces
// ==========================================================

interface Admin {
  id: string;
  name: string;
  email?: string;
  role: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  admin: Admin;
}

// ==========================================================
// Component
// ==========================================================

export default function AdminLogin() {

  const navigate = useNavigate();

  // ========================================================
  // States
  // ========================================================

  const [form, setForm] = useState({

    email: "",

    password: ""

  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ========================================================
  // Handle Input Change
  // ========================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value

    }));

  };

  // ========================================================
  // Handle Login
  // ========================================================

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");
        try {

      const response = await adminLogin(

        form.email.trim().toLowerCase(),

        form.password

      );

      const result: LoginResponse = response.data;

      // ====================================================
      // Login Failed
      // ====================================================

      if (!result.success) {

        throw new Error(result.message);

      }

      // ====================================================
      // Save Token
      // ====================================================

      const storage = rememberMe

        ? localStorage

        : sessionStorage;

      storage.setItem(

        "token",

        result.token

      );

      storage.setItem(

        "admin",

        JSON.stringify(result.admin)

      );

      // ====================================================
      // Redirect
      // ====================================================

      navigate(

        "/marketplace/admin/dashboard",

        {

          replace: true

        }

      );

    } catch (error: any) {

      console.error(

        "Admin Login Error:",

        error

      );

      setError(

        error.response?.data?.message ||

        error.message ||

        "Login failed. Please try again."

      );

    } finally {

      setLoading(false);

    }

  };

  // ========================================================
  // UI
  // ========================================================

  return (

    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 px-6">
            {/* ====================================================== */}
      {/* Animated Background */}
      {/* ====================================================== */}

      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute left-10 top-10 h-56 w-56 rounded-full bg-green-300/20 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"
      />

      {/* ====================================================== */}
      {/* Login Card */}
      {/* ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >

        {/* Logo */}

        <div className="mb-6 flex justify-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">

            <FiShield
              size={45}
              className="text-white"
            />

          </div>

        </div>

        <h1 className="text-center text-3xl font-bold text-gray-800">

          Admin Login

        </h1>

        <p className="mt-2 text-center text-gray-500">

          Sign in to access the AgriGenAI Admin Dashboard

        </p>

        {/* ====================================================== */}
        {/* Login Form */}
        {/* ====================================================== */}

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          {/* Email */}

          <div>

            <label className="mb-2 block font-medium text-gray-700">

              Email Address

            </label>

            <div className="flex items-center rounded-xl border bg-gray-50 px-4">

              <FiMail className="text-green-600" />

              <input
                type="email"
                name="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent px-3 py-4 outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block font-medium text-gray-700">

              Password

            </label>

            <div className="flex items-center rounded-xl border bg-gray-50 px-4">

              <FiLock className="text-green-600" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent px-3 py-4 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {
                  showPassword
                    ? <FiEyeOff size={20} />
                    : <FiEye size={20} />
                }

              </button>

            </div>

          </div>
                    {/* Remember Me */}

          <label className="flex items-center gap-2 text-sm text-gray-600">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
            />

            Remember Me

          </label>

          {/* Error Message */}

          {error && (

            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-red-600">

              {error}

            </div>

          )}

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >

            {loading ? (

              <>

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                Signing In...

              </>

            ) : (

              <>

                <FiLogIn size={20} />

                Login

              </>

            )}

          </button>

        </form>

        {/* Divider */}

        <div className="my-6 border-t" />

        {/* Back Button */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >

          <FiArrowLeft />

          Back to Home

        </button>

        {/* Admin Info */}

        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">

          <h3 className="text-center text-lg font-semibold text-green-700">

            Admin Portal

          </h3>

          <p className="mt-2 text-center text-sm text-gray-600">

            Use your administrator credentials to access
            the AgriGenAI Marketplace Dashboard.

          </p>

        </div>

        {/* Footer */}

        <div className="mt-8 border-t pt-5 text-center text-sm text-gray-500">

          <p>

            © {new Date().getFullYear()} AgriGenAI

          </p>

          <p className="mt-1">

            Secure Admin Management System

          </p>

        </div>

      </motion.div>
          </div>

  );

}