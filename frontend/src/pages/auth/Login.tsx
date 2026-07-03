import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, saveToken } from "./authApi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser(email, password);

      if (result.success) {
        saveToken(result.token);

        alert("Login Successful!");

        navigate("/dashboard");
      } else {
        alert(result.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl grid md:grid-cols-2">

        {/* Left Side */}

        <div className="bg-green-700 text-white flex flex-col justify-center items-center p-10">

          <h1 className="text-5xl font-bold">
            🌾 AgriGenAI
          </h1>

          <p className="mt-6 text-xl text-center">
            Welcome Back Farmer
          </p>

          <p className="mt-4 text-center text-green-100 leading-7">
            Login to access Crop Recommendation,
            Disease Detection,
            Weather Forecast,
            Market Prediction,
            AI Farmer Assistant,
            and much more.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10">

          <h2 className="text-3xl font-bold text-green-700">
            Login
          </h2>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

          <div className="mt-8 space-y-5">

            {/* Email */}

            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border p-3 focus:border-green-600 focus:outline-none"
            />

            {/* Password */}

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border p-3 focus:border-green-600 focus:outline-none"
            />

            {/* Show Password */}

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                checked={showPassword}
                onChange={() =>
                  setShowPassword(!showPassword)
                }
              />

              Show Password

            </label>

            {/* Forgot Password */}

            <div className="text-right">

              <Link
                to="/forgot-password"
                className="text-green-700 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-lg bg-green-700 py-3 text-white hover:bg-green-800"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {/* Register */}

            <p className="text-center text-gray-600">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 font-semibold text-green-700"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;