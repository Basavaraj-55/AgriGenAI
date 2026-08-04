// ============================================================
// 🌾 AgriGenAI
// Reset Password Page
// ============================================================

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // ==========================================================
  // Reset Password
  // ==========================================================

  const handleResetPassword = async () => {

    if (!password || !confirmPassword) {

      alert("Please fill all fields.");

      return;

    }

    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;

    }

    if (password.length < 6) {

      alert("Password must be at least 6 characters.");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(

        "http://localhost:5000/api/auth/reset-password",

        {

          email,

          password,

        }

      );

      alert(response.data.message);

      navigate("/login");

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to reset password."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-sky-100 px-6">

      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl">

        <div className="text-center">

          <h1 className="text-5xl">
            🔒
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-green-700">

            Create New Password

          </h2>

          <p className="mt-2 text-gray-500">

            Enter a strong password for

          </p>

          <p className="font-semibold text-green-700">

            {email}

          </p>

        </div>

        {/* New Password */}

        <div className="mt-8">

          <label className="mb-2 block font-medium">

            New Password

          </label>

          <div className="relative">

            <input

              type={showPassword ? "text" : "password"}

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              className="w-full rounded-lg border p-3 pr-12 outline-none focus:border-green-600"

              placeholder="Enter New Password"

            />

            <button

              type="button"

              onClick={() => setShowPassword(!showPassword)}

              className="absolute right-3 top-3"

            >

              {

                showPassword

                  ? <EyeOff size={20} />

                  : <Eye size={20} />

              }

            </button>

          </div>

        </div>

        {/* Confirm Password */}

        <div className="mt-6">

          <label className="mb-2 block font-medium">

            Confirm Password

          </label>

          <div className="relative">

            <input

              type={showConfirmPassword ? "text" : "password"}

              value={confirmPassword}

              onChange={(e) => setConfirmPassword(e.target.value)}

              className="w-full rounded-lg border p-3 pr-12 outline-none focus:border-green-600"

              placeholder="Confirm Password"

            />

            <button

              type="button"

              onClick={() =>

                setShowConfirmPassword(

                  !showConfirmPassword

                )

              }

              className="absolute right-3 top-3"

            >

              {

                showConfirmPassword

                  ? <EyeOff size={20} />

                  : <Eye size={20} />

              }

            </button>

          </div>

        </div>

        <button

          onClick={handleResetPassword}

          disabled={loading}

          className="mt-8 w-full rounded-lg bg-green-700 py-3 font-semibold text-white hover:bg-green-800"

        >

          {

            loading

              ? "Updating..."

              : "Reset Password"

          }

        </button>

        <div className="mt-8 text-center">

          <Link

            to="/login"

            className="font-semibold text-green-700 hover:underline"

          >

            ← Back to Login

          </Link>

        </div>

      </div>

    </div>

  );

}

export default ResetPassword;