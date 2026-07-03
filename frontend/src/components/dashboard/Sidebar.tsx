import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../pages/auth/authApi";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-green-700 text-white p-6 flex flex-col justify-between">

      <div>

        <h1 className="text-3xl font-bold mb-10">
          🌾 AgriGenAI
        </h1>

        <nav className="space-y-5">

          <Link
            to="/dashboard"
            className="block hover:text-green-200"
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/crop"
            className="block hover:text-green-200"
          >
            🌱 Crop Recommendation
          </Link>

          <Link
            to="/disease"
            className="block hover:text-green-200"
          >
            🍃 Disease Detection
          </Link>

          <Link
            to="/weather"
            className="block hover:text-green-200"
          >
            🌦 Weather Forecast
          </Link>

          <Link
            to="/irrigation"
            className="block hover:text-green-200"
          >
            💧 Smart Irrigation
          </Link>

          <Link
            to="/fertilizer"
            className="block hover:text-green-200"
          >
            🌿 Fertilizer
          </Link>

          <Link
            to="/market"
            className="block hover:text-green-200"
          >
            📈 Market Price
          </Link>

          <Link
            to="/chatbot"
            className="block hover:text-green-200"
          >
            🤖 AI Chatbot
          </Link>

          <Link
            to="/voice"
            className="block hover:text-green-200"
          >
            🎤 Voice Assistant
          </Link>

        </nav>

      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
      >
        🚪 Logout
      </button>

    </div>
  );
}

export default Sidebar;