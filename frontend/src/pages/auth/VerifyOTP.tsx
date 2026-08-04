// ============================================================
// 🌾 AgriGenAI
// Verify OTP Page
// ============================================================

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOTP() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================================================
  // Verify OTP
  // ==========================================================

  const handleVerifyOTP = async () => {

    if (!otp.trim()) {

      alert("Please enter OTP.");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(

        "http://localhost:5000/api/auth/verify-otp",

        {

          email,

          otp,

        }

      );

      alert(response.data.message);

      navigate("/reset-password", {

        state: {

          email,

        },

      });

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Invalid OTP."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-100 to-sky-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-10">

        <div className="text-center">

          <h1 className="text-5xl">
            🔐
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-green-700">

            Verify OTP

          </h2>

          <p className="mt-3 text-gray-500">

            Enter the 6-digit OTP sent to

          </p>

          <p className="font-semibold text-green-700">

            {email}

          </p>

        </div>

        <div className="mt-8">

          <label className="block mb-2 font-medium">

            OTP

          </label>

          <input

            type="text"

            maxLength={6}

            value={otp}

            onChange={(e) => setOtp(e.target.value)}

            placeholder="Enter 6-digit OTP"

            className="w-full rounded-lg border p-3 text-center text-2xl tracking-[10px] outline-none focus:border-green-600"

          />

        </div>

        <button

          onClick={handleVerifyOTP}

          disabled={loading}

          className="mt-8 w-full rounded-lg bg-green-700 py-3 text-white font-semibold hover:bg-green-800"

        >

          {

            loading

              ? "Verifying..."

              : "Verify OTP"

          }

        </button>

        <div className="mt-6 text-center">

          <button

            className="text-green-700 font-semibold hover:underline"

          >

            Resend OTP

          </button>

        </div>

        <div className="mt-8 text-center">

          <Link

            to="/login"

            className="text-gray-600 hover:text-green-700"

          >

            ← Back to Login

          </Link>

        </div>

      </div>

    </div>

  );

}

export default VerifyOTP;