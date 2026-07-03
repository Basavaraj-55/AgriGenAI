import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home
import Home from "../pages/Home";

// Authentication
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// AI Modules
import CropRecommendation from "../pages/crop/CropRecommendation";
import DiseaseDetection from "../pages/disease/DiseaseDetection";
import WeatherForecast from "../pages/weather/WeatherForecast";
import SmartIrrigation from "../pages/irrigation/SmartIrrigation";
import FertilizerRecommendation from "../pages/fertilizer/FertilizerRecommendation";
import MarketPrediction from "../pages/market/MarketPrediction";

// AI Chatbot
import FarmerAssistant from "../pages/chatbot/FarmerAssistant";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* AI Modules */}
        <Route path="/crop" element={<CropRecommendation />} />
        <Route path="/fertilizer" element={<FertilizerRecommendation />} />
        <Route path="/weather" element={<WeatherForecast />} />
        <Route path="/irrigation" element={<SmartIrrigation />} />
        <Route path="/disease" element={<DiseaseDetection />} />
        <Route path="/market" element={<MarketPrediction />} />

        {/* AI Farmer Assistant */}
        <Route path="/chatbot" element={<FarmerAssistant />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center bg-gray-100">
              <h1 className="text-4xl font-bold text-red-600">
                404 - Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;