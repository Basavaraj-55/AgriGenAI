// ============================================================
// 🌾 AgriGenAI
// Forgot Password Page
// frontend/src/pages/auth/ForgotPassword.tsx
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");


  // ==========================================================
  // Send OTP
  // ==========================================================

  const handleSendOTP = async () => {
    // Clear old messages

    setMessage("");

    setError("");


    // Check Email

    if (!email.trim()) {
      setError("Please enter your registered email.");

      return;
    }


    try {
      setLoading(true);


      // Send Request to Flask Backend

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",

        {
          email: email.trim().toLowerCase(),
        },

        {
          headers: {
            "Content-Type": "application/json",
          },

          timeout: 10000,
        }
      );


      // Check Response

      if (response.data.success) {
        setMessage(
          "OTP generated successfully. Check the Flask backend terminal."
        );


        // Store Email for Verify OTP Page

        localStorage.setItem(
          "resetEmail",

          email.trim().toLowerCase()
        );


        // Move to Verify OTP Page

        setTimeout(() => {
          navigate("/verify-otp", {
            state: {
              email: email.trim().toLowerCase(),
            },
          });
        }, 1500);
      }
    } catch (error: unknown) {
      console.error(
        "Forgot Password Error:",

        error
      );


      // Axios Backend Error

      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          setError(
            "Backend request timed out. Please check whether Flask and MongoDB are running."
          );
        } else if (error.response) {
          setError(
            error.response.data?.message ||
              "Unable to generate OTP."
          );
        } else {
          setError(
            "Cannot connect to the backend. Start Flask using python app.py."
          );
        }
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      // Button Returns to Normal

      setLoading(false);
    }
  };


  // ==========================================================
  // Submit Using Enter Key
  // ==========================================================

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    handleSendOTP();
  };


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-sky-100 px-5">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2">

        {/* Left Section */}

        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-700 to-green-600 p-10 text-center text-white">

          <h1 className="text-5xl font-bold">

            🌾 AgriGenAI

          </h1>


          <h2 className="mt-7 text-3xl font-bold">

            Forgot Password?

          </h2>


          <p className="mt-6 text-lg">

            Don't worry.

          </p>


          <p className="mt-2 text-lg">

            Enter your registered email address.

          </p>


          <p className="mt-2 text-lg">

            Generate a secure 6-digit OTP

          </p>


          <p className="mt-2 text-lg">

            to reset your password.

          </p>

        </div>


        {/* Right Section */}

        <div className="p-10">

          <h2 className="text-3xl font-bold text-green-700">

            Reset Password

          </h2>


          <p className="mt-2 text-gray-500">

            Enter your registered email to generate an OTP.

          </p>


          {/* Success Message */}

          {message && (

            <div className="mt-5 rounded-lg border border-green-300 bg-green-100 p-3 text-green-700">

              {message}

            </div>

          )}


          {/* Error Message */}

          {error && (

            <div className="mt-5 rounded-lg border border-red-300 bg-red-100 p-3 text-red-700">

              {error}

            </div>

          )}


          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >

            <label className="mb-2 block font-semibold text-gray-700">

              Email Address

            </label>


            <input
              type="email"

              value={email}

              onChange={(event) =>
                setEmail(event.target.value)
              }

              placeholder="Enter your registered email"

              disabled={loading}

              required

              className="w-full rounded-lg border border-gray-300 bg-blue-50 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-70"
            />


            <button
              type="submit"

              disabled={loading}

              className="mt-5 w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-400"
            >

              {loading
                ? "Generating OTP..."
                : "Generate OTP"}

            </button>

          </form>


          <div className="mt-7 text-center">

            <p className="text-gray-600">

              Remember your password?

            </p>


            <Link
              to="/login"

              className="mt-3 inline-block font-semibold text-green-700 hover:text-green-900"
            >

              ← Back to Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;