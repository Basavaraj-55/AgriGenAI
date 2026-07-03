import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import DashboardCard from "./DashboardCard";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DashboardCard
          icon="🌱"
          title="Crop Recommendation"
          description="AI recommends the best crops based on soil nutrients, temperature, humidity, pH, and rainfall."
          onClick={() => navigate("/crop")}
        />

        <DashboardCard
          icon="🍃"
          title="Disease Detection"
          description="Upload a crop image and detect plant diseases using Artificial Intelligence."
          onClick={() => navigate("/disease")}
        />

        <DashboardCard
          icon="🌦️"
          title="Weather Forecast"
          description="Get live weather updates and forecasts to plan your farming activities."
          onClick={() => navigate("/weather")}
        />

        <DashboardCard
          icon="💧"
          title="Smart Irrigation"
          description="Receive AI-powered irrigation recommendations to optimize water usage."
          onClick={() => navigate("/irrigation")}
        />

        <DashboardCard
          icon="🌿"
          title="Fertilizer Recommendation"
          description="Get fertilizer suggestions based on soil nutrients and crop requirements."
          onClick={() => navigate("/fertilizer")}
        />

        <DashboardCard
          icon="📈"
          title="Market Price Prediction"
          description="Predict future crop market prices using Machine Learning."
          onClick={() => navigate("/market")}
        />

        <DashboardCard
          icon="🤖"
          title="AI Farmer Assistant"
          description="Chat with an AI assistant for farming guidance, crop care, and best practices."
          onClick={() => navigate("/chatbot")}
        />

      </div>
    </MainLayout>
  );
}

export default Dashboard;