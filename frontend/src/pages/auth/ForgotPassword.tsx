import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      // Backend API will be connected later
      alert(
        "Password reset link will be sent to your email (Backend Integration Pending)."
      );

      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">

        {/* Left Side */}
        <div className="bg-green-700 text-white flex flex-col justify-center items-center p-10">

          <h1 className="text-5xl font-bold">
            🌾 AgriGenAI
          </h1>

          <p className="mt-6 text-xl text-center">
            Forgot Your Password?
          </p>

          <p className="mt-4 text-center text-green-100">
            Enter your registered email address to receive a password reset link.
          </p>

        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-green-700">
            Reset Password
          </h2>

          <p className="text-gray-500 mt-2">
            We'll send a reset link to your email.
          </p>

          <div className="mt-8 space-y-4">

            <input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-gray-600">
              Remember your password?

              <Link
                to="/login"
                className="ml-2 text-green-700 font-semibold"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;