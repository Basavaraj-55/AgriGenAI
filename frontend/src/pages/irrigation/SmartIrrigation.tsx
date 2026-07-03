import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import IrrigationForm from "./IrrigationForm";
import IrrigationResult from "./IrrigationResult";

import { predictIrrigation } from "./irrigationApi";

function SmartIrrigation() {

  // ==========================================
  // Weather API Key
  // ==========================================

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // ==========================================
  // Location
  // ==========================================

  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bidar");

  // ==========================================
  // Weather
  // ==========================================

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [condition, setCondition] = useState("");

  // ==========================================
  // Farm
  // ==========================================

  const [crop, setCrop] = useState("");
  const [soilMoisture, setSoilMoisture] = useState(35);

  // ==========================================
  // AI Result
  // ==========================================

  const [irrigation, setIrrigation] = useState("");
  const [water, setWater] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [recommendation, setRecommendation] = useState("");

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] = useState(false);

  // ==========================================
  // States
  // ==========================================

  const states = [
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "Kerala",
    "Goa",
  ];

  // ==========================================
  // Districts
  // ==========================================

  const districtData: Record<string, string[]> = {

    Karnataka: [
      "Bidar",
      "Belagavi",
      "Bengaluru",
      "Kalaburagi",
      "Mysuru",
    ],

    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
    ],

    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem",
    ],

    Kerala: [
      "Kochi",
      "Kozhikode",
      "Kannur",
      "Thrissur",
    ],

    Goa: [
      "North Goa",
      "South Goa",
    ],

  };

  // ==========================================
  // Crops
  // ==========================================

  const crops = [
    "Rice",
    "Wheat",
    "Cotton",
    "Sugarcane",
    "Maize",
    "Potato",
    "Tomato",
    "Onion",
    "Banana",
  ];

  // ==========================================
  // Load Weather
  // ==========================================

  useEffect(() => {

    if (!district) return;

    async function loadWeather() {

      try {

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            district
          )},IN&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (Number(data.cod) !== 200) {
          console.error(data.message);
          return;
        }

        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setRainfall(data.rain?.["1h"] ?? 0);
        setCondition(data.weather[0].main);

      } catch (err) {

        console.error("Weather Error:", err);

      }

    }

    loadWeather();

  }, [district, API_KEY]);

  // ==========================================
  // Handlers
  // ==========================================

  const handleStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    const selected = e.target.value;

    setState(selected);

    const list = districtData[selected] || [];

    if (list.length > 0) {
      setDistrict(list[0]);
    } else {
      setDistrict("");
    }

  };

  const handleDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    setDistrict(e.target.value);

  };

  const handleCropChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    setCrop(e.target.value);

  };

  const handleMoistureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setSoilMoisture(Number(e.target.value));

  };
    // ==========================================
  // Analyze Irrigation
  // ==========================================

  const analyzeIrrigation = async () => {

    // Validate Crop

    if (!crop) {
      alert("Please select a crop.");
      return;
    }

    setLoading(true);

    try {

      const result = await predictIrrigation({

        crop,
        soilMoisture,
        temperature,
        humidity,
        rainfall,
        windSpeed,

      });

      console.log("Irrigation API Response:", result);

      // ==========================================
      // Backend Response
      // ==========================================

      setIrrigation(result.irrigation_status ?? "");
      setWater(result.water_amount ?? "");
      setRecommendation(result.recommendation ?? "");

      // Optional field
      setBestTime(result.best_time ?? "");

    } catch (error: any) {

      console.error("Prediction Error:", error);

      alert(
        error.message ||
        "Unable to generate irrigation recommendation."
      );

    } finally {

      setLoading(false);

    }

  };
    // ==========================================
  // UI
  // ==========================================

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-green-600 rounded-3xl shadow-xl p-8 text-white mb-8">

          <h1 className="text-4xl font-bold">
            💧 AI Smart Irrigation
          </h1>

          <p className="text-lg mt-3">
            Live Weather Based Irrigation Recommendation
          </p>

        </div>

        {/* Irrigation Form */}

        <IrrigationForm

          state={state}
          district={district}
          crop={crop}
          soilMoisture={soilMoisture}

          states={states}
          districts={districtData[state] ?? []}
          crops={crops}

          temperature={temperature}
          humidity={humidity}
          rainfall={rainfall}
          windSpeed={windSpeed}

          handleStateChange={handleStateChange}
          handleDistrictChange={handleDistrictChange}
          handleCropChange={handleCropChange}
          handleMoistureChange={handleMoistureChange}

          analyzeIrrigation={analyzeIrrigation}
          loading={loading}

        />

        {/* Weather Information */}

        <div className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-6">

          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            🌦 Current Weather
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

            <div className="bg-white rounded-xl shadow p-5 text-center">
              <div className="text-4xl">🌡</div>
              <p className="text-2xl font-bold mt-3">
                {temperature}°C
              </p>
              <p className="text-gray-500">
                Temperature
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5 text-center">
              <div className="text-4xl">💧</div>
              <p className="text-2xl font-bold mt-3">
                {humidity}%
              </p>
              <p className="text-gray-500">
                Humidity
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5 text-center">
              <div className="text-4xl">🌧</div>
              <p className="text-2xl font-bold mt-3">
                {rainfall} mm
              </p>
              <p className="text-gray-500">
                Rainfall
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5 text-center">
              <div className="text-4xl">🌬</div>
              <p className="text-2xl font-bold mt-3">
                {windSpeed} m/s
              </p>
              <p className="text-gray-500">
                Wind Speed
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5 text-center">
              <div className="text-4xl">☁</div>
              <p className="text-xl font-bold mt-3">
                {condition || "Unknown"}
              </p>
              <p className="text-gray-500">
                Condition
              </p>
            </div>

          </div>

        </div>

        {/* AI Result */}

        <IrrigationResult

          irrigation={irrigation}
          water={water}
          bestTime={bestTime}
          recommendation={recommendation}

          soilMoisture={soilMoisture}
          temperature={temperature}
          humidity={humidity}
          rainfall={rainfall}

        />

      </div>

    </MainLayout>

  );

}

export default SmartIrrigation;