import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import IrrigationForm from "./IrrigationForm";
import IrrigationResult from "./IrrigationResult";
import { predictIrrigation } from "./irrigationApi";

export default function SmartIrrigation() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  /* ===========================
      Location
  =========================== */

  const states = [
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "Kerala",
    "Goa",
  ];

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

  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bidar");

  /* ===========================
      Weather
  =========================== */

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [condition, setCondition] = useState("");

  /* ===========================
      Farm
  =========================== */

  const [crop, setCrop] = useState("");
  const [soilMoisture, setSoilMoisture] = useState(35);

  /* ===========================
      Prediction
  =========================== */

  const [irrigation, setIrrigation] = useState("");
  const [water, setWater] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const [loading, setLoading] = useState(false);

  /* ===========================
      Load Weather
  =========================== */

  useEffect(() => {
    if (!district) return;

    const loadWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            district
          )},IN&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (Number(data.cod) !== 200) return;

        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setRainfall(data.rain?.["1h"] ?? 0);
        setCondition(data.weather[0].main);
      } catch (error) {
        console.error(error);
      }
    };

    loadWeather();
  }, [district, API_KEY]);

  /* ===========================
      Handlers
  =========================== */

  const handleStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = e.target.value;

    setState(selected);
    setDistrict(districtData[selected][0]);
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

  /* ===========================
      Analyze Irrigation
  =========================== */

  const analyzeIrrigation = async () => {
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

      setIrrigation(result.irrigation_status ?? "");
      setWater(result.water_amount ?? "");
      setBestTime(result.best_time ?? "");
      setRecommendation(result.recommendation ?? "");
    } catch (error: any) {
      alert(
        error.message ??
          "Unable to generate irrigation recommendation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="w-full space-y-8">

        {/* Hero Section */}
        <section className="rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-green-600 p-8 text-white shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-5xl font-bold">
                💧 AI Smart Irrigation
              </h1>

              <p className="mt-3 text-lg text-cyan-100">
                Live Weather Based Irrigation Recommendation
              </p>

            </div>

            <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-md">

              <h3 className="text-xl font-semibold">
                AI Status
              </h3>

              <div className="mt-3 flex items-center gap-2">

                <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></span>

                <span>Prediction Online</span>

              </div>

            </div>

          </div>

        </section>

        {/* Remaining UI continues in Part 2 */}
                {/* Irrigation Form */}
        <section className="w-full rounded-3xl bg-white p-8 shadow-xl">

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

        </section>

        {/* Weather Information */}
        <section className="w-full rounded-3xl border border-blue-100 bg-white p-8 shadow-xl">

          <h2 className="mb-6 text-3xl font-bold text-sky-700">
            🌦 Live Weather
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

            <div className="rounded-2xl bg-sky-50 p-6 text-center shadow">
              <div className="text-5xl">🌡</div>
              <h3 className="mt-4 text-3xl font-bold">
                {temperature}°C
              </h3>
              <p className="mt-2 text-gray-500">
                Temperature
              </p>
            </div>

            <div className="rounded-2xl bg-sky-50 p-6 text-center shadow">
              <div className="text-5xl">💧</div>
              <h3 className="mt-4 text-3xl font-bold">
                {humidity}%
              </h3>
              <p className="mt-2 text-gray-500">
                Humidity
              </p>
            </div>

            <div className="rounded-2xl bg-sky-50 p-6 text-center shadow">
              <div className="text-5xl">🌧</div>
              <h3 className="mt-4 text-3xl font-bold">
                {rainfall} mm
              </h3>
              <p className="mt-2 text-gray-500">
                Rainfall
              </p>
            </div>

            <div className="rounded-2xl bg-sky-50 p-6 text-center shadow">
              <div className="text-5xl">🌬</div>
              <h3 className="mt-4 text-3xl font-bold">
                {windSpeed} m/s
              </h3>
              <p className="mt-2 text-gray-500">
                Wind Speed
              </p>
            </div>

            <div className="rounded-2xl bg-sky-50 p-6 text-center shadow">
              <div className="text-5xl">☁</div>
              <h3 className="mt-4 text-2xl font-bold">
                {condition || "Unknown"}
              </h3>
              <p className="mt-2 text-gray-500">
                Condition
              </p>
            </div>

          </div>

        </section>

        {/* AI Recommendation */}
        {(irrigation || recommendation) && (
          <section className="w-full rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="mb-6 text-3xl font-bold text-green-700">
              🤖 AI Irrigation Recommendation
            </h2>

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

          </section>
        )}

      </div>
    </MainLayout>
  );
}