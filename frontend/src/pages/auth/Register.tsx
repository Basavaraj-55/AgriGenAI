import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./authApi";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const result = await registerUser(
        name,
        email,
        password
      );

      if (result.success) {
        alert("Registration Successful!");

        navigate("/login");
      } else {
        alert(result.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
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
            Join the Future of Smart Agriculture
          </p>

          <p className="mt-4 text-center text-green-100">
            Create your account to access AI-powered farming tools.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10">

          <h2 className="text-3xl font-bold text-green-700">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Register to continue
          </p>

          <div className="mt-8 space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="text-center text-gray-600">

              Already have an account?

              <Link
                to="/login"
                className="text-green-700 font-semibold ml-2"
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

export default Register;