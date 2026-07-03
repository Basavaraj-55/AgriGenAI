import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function WeatherForecast() {

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [states] = useState([
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "Kerala",
    "Goa",
  ]);

  const districtData: Record<string, string[]> = {
    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Belagavi",
      "Bidar",
      "Kalaburagi",
    ],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
    ],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
    ],
    Kerala: [
      "Kochi",
      "Kozhikode",
      "Thiruvananthapuram",
    ],
    Goa: [
      "North Goa",
      "South Goa",
    ],
  };

  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bidar");

  const [weather, setWeather] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const getWeather = async () => {

    if (!district) return;

    setLoading(true);

    try {

      const response = await fetch(

        `https://api.openweathermap.org/data/2.5/weather?q=${district}&appid=${API_KEY}&units=metric`

      );

      const data = await response.json();

      if (data.cod != 200) {

        setError(data.message);
        setWeather(null);

      } else {

        setWeather(data);
        setError("");

      }

    } catch {

      setError("Unable to fetch weather.");

    }

    setLoading(false);

  };
    return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl border border-sky-100 p-8">

          <h1 className="text-4xl font-bold text-sky-700 mb-2">
            🌦 Weather Forecast
          </h1>

          <p className="text-gray-500 mb-8">
            Live Weather Monitoring for Smart Farming
          </p>

          {/* LOCATION */}

          <h2 className="text-xl font-semibold text-sky-700 mb-4">
            📍 Select Farm Location
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);

                setDistrict(
                  districtData[e.target.value][0]
                );
              }}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-sky-400"
            >

              {states.map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>

            <select
              value={district}
              onChange={(e) =>
                setDistrict(e.target.value)
              }
              className="border rounded-xl p-3 focus:ring-2 focus:ring-sky-400"
            >

              {districtData[state].map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>

          </div>

          <div className="flex justify-center mt-8">

            <button
              onClick={getWeather}
              disabled={loading}
              className="bg-gradient-to-r from-sky-600 to-green-500 hover:from-sky-700 hover:to-green-600 text-white px-10 py-4 rounded-2xl shadow-lg font-semibold transition-all"
            >

              {loading
                ? "Loading..."
                : "🌦 Get Live Weather"}

            </button>

          </div>

          {error && (

            <div className="mt-8 bg-red-100 text-red-700 rounded-xl p-4">

              {error}

            </div>

          )}

          {weather && (

            <div className="mt-10">

              <h2 className="text-2xl font-bold text-sky-700 mb-6">

                🌍 {weather.name}

              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div className="bg-sky-50 rounded-2xl p-6 shadow text-center">

                  <div className="text-4xl">🌡</div>

                  <div className="text-3xl font-bold mt-3">

                    {weather.main.temp}°C

                  </div>

                  <div className="text-gray-500">

                    Temperature

                  </div>

                </div>

                <div className="bg-sky-50 rounded-2xl p-6 shadow text-center">

                  <div className="text-4xl">💧</div>

                  <div className="text-3xl font-bold mt-3">

                    {weather.main.humidity}%

                  </div>

                  <div className="text-gray-500">

                    Humidity

                  </div>

                </div>

                <div className="bg-sky-50 rounded-2xl p-6 shadow text-center">

                  <div className="text-4xl">🌬</div>

                  <div className="text-3xl font-bold mt-3">

                    {weather.wind.speed} m/s

                  </div>

                  <div className="text-gray-500">

                    Wind Speed

                  </div>

                </div>

                <div className="bg-sky-50 rounded-2xl p-6 shadow text-center">

                  <div className="text-4xl">☁</div>

                  <div className="text-xl font-bold mt-3">

                    {weather.weather[0].main}

                  </div>

                  <div className="text-gray-500">

                    Condition

                  </div>

                </div>

              </div>

              <div className="mt-8 bg-gradient-to-r from-sky-500 to-green-500 rounded-2xl p-6 text-white">

                <h3 className="text-2xl font-bold">

                  🌾 Farming Recommendation

                </h3>

                <p className="mt-4 text-lg">

                  {weather.main.temp > 35
                    ? "⚠ High temperature detected. Increase irrigation frequency."
                    : weather.main.humidity > 80
                    ? "🌧 High humidity detected. Monitor crops for fungal diseases."
                    : "✅ Weather conditions are favorable for normal farming activities."}

                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </MainLayout>

  );

}

export default WeatherForecast;