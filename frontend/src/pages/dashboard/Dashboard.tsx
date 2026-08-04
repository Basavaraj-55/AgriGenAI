import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";

import Navbar from "../../components/dashboard/Navbar";
import HeroBanner from "../../components/dashboard/HeroBanner";
import DashboardStats from "../../components/dashboard/DashboardStats";
import TipCard from "../../components/dashboard/TipCard";
import FloatingAI from "../../components/dashboard/FloatingAI";

import DashboardCard from "./DashboardCard";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* ================= Navbar ================= */}
      <Navbar />

      {/* ================= Hero Banner ================= */}
      <HeroBanner />

      {/* ================= Dashboard Statistics ================= */}
      <DashboardStats />

      {/* ================= Feature Cards ================= */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {/* Crop Recommendation */}
        <DashboardCard
          icon="🌱"
          title="Crop Recommendation"
          description="Recommend the best crop based on soil nutrients and weather conditions."
          onClick={() => navigate("/crop")}
        />

        {/* Disease Detection */}
        <DashboardCard
          icon="🍃"
          title="Disease Detection"
          description="Detect crop diseases instantly using Artificial Intelligence."
          onClick={() => navigate("/disease")}
        />

        {/* Weather Forecast */}
        <DashboardCard
          icon="🌦️"
          title="Weather Forecast"
          description="Get accurate live weather updates and forecasts."
          onClick={() => navigate("/weather")}
        />

        {/* Smart Irrigation */}
        <DashboardCard
          icon="💧"
          title="Smart Irrigation"
          description="Optimize irrigation with AI-powered water management."
          onClick={() => navigate("/irrigation")}
        />

        {/* Fertilizer Recommendation */}
        <DashboardCard
          icon="🌿"
          title="Fertilizer Recommendation"
          description="Receive the best fertilizer suggestions for healthier crops."
          onClick={() => navigate("/fertilizer")}
        />

        {/* Market Prediction */}
        <DashboardCard
          icon="📈"
          title="Market Prediction"
          description="Predict crop prices and identify the best selling time."
          onClick={() => navigate("/market")}
        />

        {/* AI Chatbot */}
        <DashboardCard
          icon="🤖"
          title="AI Assistant"
          description="Chat with AI and get instant farming guidance anytime."
          onClick={() => navigate("/chatbot")}
        />

        {/* Farmer Marketplace */}
        <DashboardCard
          icon="🛒"
          title="Farmer Marketplace"
          description="Buy and sell fresh agricultural products directly from farmers."
          onClick={() => navigate("/marketplace")}
        />

        {/* News & Government Schemes */}
        <DashboardCard
          icon="📰"
          title="News & Government Schemes"
          description="Stay updated with the latest agriculture news and government schemes."
          onClick={() => navigate("/news")}
        />

      </section>

      {/* ================= Daily Farming Tip ================= */}
      <TipCard />

      {/* ================= Floating AI Assistant ================= */}
      <FloatingAI />
    </MainLayout>
  );
}

export default Dashboard;