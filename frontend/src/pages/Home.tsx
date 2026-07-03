import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* ================= HERO SECTION ================= */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <h1 className="text-6xl font-extrabold text-green-700">
            🌾 AgriGenAI
          </h1>

          <p className="mt-6 text-2xl font-semibold text-gray-700">
            AI Powered Smart Farming Platform
          </p>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-lg leading-8">
            AgriGenAI helps farmers make intelligent farming decisions using
            Artificial Intelligence and Machine Learning.
            Predict crops, detect diseases, recommend fertilizers,
            forecast weather, market prices and irrigation —
            all from one smart platform.
          </p>

          {/* Buttons */}

          <div className="mt-12 flex justify-center gap-5 flex-wrap">

            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition"
            >
              🔐 Login
            </Link>

            <Link
              to="/register"
              className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl font-bold transition"
            >
              📝 Register
            </Link>

          </div>

          {/* Existing User */}

          <p className="mt-6 text-gray-600">
            Already registered?

            <Link
              to="/login"
              className="ml-2 font-semibold text-green-700 hover:underline"
            >
              Login Here
            </Link>
          </p>

        </div>

      </section>

      {/* ================= AI SERVICES ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
          Our AI Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Crop */}

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-5xl">🌱</div>

            <h3 className="text-2xl font-bold mt-4 text-green-700">
              Crop Recommendation
            </h3>

            <p className="mt-3 text-gray-600">
              AI recommends the best crop based on soil nutrients,
              temperature, humidity, pH and rainfall.
            </p>
          </div>

          {/* Disease */}

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-5xl">🍃</div>

            <h3 className="text-2xl font-bold mt-4 text-green-700">
              Disease Detection
            </h3>

            <p className="mt-3 text-gray-600">
              Upload crop images and detect diseases using Deep Learning.
            </p>
          </div>

          {/* Fertilizer */}

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-5xl">🌿</div>

            <h3 className="text-2xl font-bold mt-4 text-green-700">
              Fertilizer Recommendation
            </h3>

            <p className="mt-3 text-gray-600">
              Get fertilizer suggestions using AI and soil analysis.
            </p>
          </div>

          {/* Weather */}

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-5xl">🌦️</div>

            <h3 className="text-2xl font-bold mt-4 text-green-700">
              Weather Forecast
            </h3>

            <p className="mt-3 text-gray-600">
              Live weather forecasts for smarter farming decisions.
            </p>
          </div>

          {/* Market */}

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-5xl">📈</div>

            <h3 className="text-2xl font-bold mt-4 text-green-700">
              Market Price Prediction
            </h3>

            <p className="mt-3 text-gray-600">
              Predict future crop prices using Machine Learning.
            </p>
          </div>

          {/* Irrigation */}

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-5xl">💧</div>

            <h3 className="text-2xl font-bold mt-4 text-green-700">
              Smart Irrigation
            </h3>

            <p className="mt-3 text-gray-600">
              Save water using AI-powered irrigation recommendations.
            </p>
          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-green-700 text-white py-10">

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-3xl font-bold">
            🌾 AgriGenAI
          </h2>

          <p className="mt-4 text-green-100">
            Empowering Farmers with Artificial Intelligence
          </p>

          <p className="mt-2 text-green-200 text-sm">
            Final Year Engineering Project • React • Flask • Machine Learning • Deep Learning • Gemini AI
          </p>

          <div className="mt-8">

            <Link
              to="/login"
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-green-100"
            >
              Get Started →
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;