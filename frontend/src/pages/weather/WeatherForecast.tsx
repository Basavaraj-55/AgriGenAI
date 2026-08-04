// ======================================================
// 🌦 AgriGenAI Weather Forecast
// File : WeatherForecast.tsx
// Part 1
// ======================================================

import { useState } from "react";

import MainLayout from "../../components/layout/MainLayout";

// ======================================================
// Weather Interface
// ======================================================

interface WeatherData {

    name: string;

    main: {

        temp: number;

        feels_like: number;

        humidity: number;

        pressure: number;

    };

    wind: {

        speed: number;

    };

    visibility: number;

    weather: {

        main: string;

        description: string;

        icon: string;

    }[];

}

// ======================================================
// Component
// ======================================================

export default function WeatherForecast() {

    // ==================================================
    // API
    // ==================================================

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    // ==================================================
    // State List
    // ==================================================

    const states = [

        "Karnataka",

        "Maharashtra",

        "Tamil Nadu",

        "Kerala",

        "Goa",

    ];

    // ==================================================
    // District List
    // ==================================================

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

    // ==================================================
    // React States
    // ==================================================

    const [selectedState, setSelectedState] =

        useState("Karnataka");

    const [selectedDistrict, setSelectedDistrict] =

        useState("Bidar");

    const [weather, setWeather] =

        useState<WeatherData | null>(null);

    const [loading, setLoading] =

        useState(false);

    const [error, setError] =

        useState("");

    const [usingCurrentLocation, setUsingCurrentLocation] =

        useState(false);

    const [locationName, setLocationName] =

        useState("");

    // ==================================================
    // Get Weather By District
    // ==================================================

    const getWeather = async () => {

        if (!selectedDistrict) return;

        setLoading(true);

        setError("");

        try {

            const response = await fetch(

                `https://api.openweathermap.org/data/2.5/weather?q=${selectedDistrict}&appid=${API_KEY}&units=metric`

            );

            const data = await response.json();

            if (data.cod !== 200) {

                setError(data.message);

                setWeather(null);

            }

            else {

                setWeather(data);

                setUsingCurrentLocation(false);

            }

        }

        catch {

            setError(

                "Unable to fetch weather."

            );

        }

        finally {

            setLoading(false);

        }

    };

    // ==================================================
    // Get Weather By Current Location
    // ==================================================

    const getCurrentLocation = () => {

        if (!navigator.geolocation) {

            alert(

                "Geolocation is not supported."

            );

            return;

        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude =

                    position.coords.latitude;

                const longitude =

                    position.coords.longitude;

                try {

                    const response = await fetch(

                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`

                    );

                    const data = await response.json();

                    setWeather(data);

                    setLocationName(

                        data.name

                    );

                    setUsingCurrentLocation(true);

                    setError("");

                }

                catch {

                    setError(

                        "Unable to fetch current location weather."

                    );

                }

                finally {

                    setLoading(false);

                }

            },

            () => {

                setLoading(false);

                alert(

                    "Please allow location access."

                );

            }

        );

    };
        // ======================================================
    // JSX
    // ======================================================

    return (

        <MainLayout>

            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-green-50 py-10">

                <div className="mx-auto max-w-7xl px-6">

                    {/* ==================================================
                        Header
                    ================================================== */}

                    <div className="rounded-[35px] bg-gradient-to-r from-sky-600 via-cyan-500 to-green-500 p-10 text-white shadow-2xl">

                        <h1 className="text-5xl font-extrabold">

                            🌦 Weather Forecast

                        </h1>

                        <p className="mt-4 max-w-3xl text-lg text-sky-100">

                            Monitor live weather conditions,
                            forecast temperature,
                            humidity,
                            wind speed,
                            and receive intelligent farming
                            recommendations powered by AgriGenAI.

                        </p>

                    </div>

                    {/* ==================================================
                        Location Selection
                    ================================================== */}

                    <div className="mt-10 rounded-[30px] bg-white p-8 shadow-xl">

                        <h2 className="text-3xl font-bold text-sky-700">

                            📍 Select Weather Location

                        </h2>

                        <p className="mt-3 text-gray-500">

                            Choose your farm location or use your
                            current location.

                        </p>

                        {/* Current Location */}

                        <div className="mt-8">

                            <button
                                onClick={getCurrentLocation}
                                className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-green-700"
                            >

                                📍 Use Current Location

                            </button>

                        </div>

                        {/* Divider */}

                        <div className="my-10 flex items-center">

                            <div className="h-px flex-1 bg-gray-300"></div>

                            <span className="mx-5 font-semibold text-gray-500">

                                OR

                            </span>

                            <div className="h-px flex-1 bg-gray-300"></div>

                        </div>

                        {/* Dropdowns */}

                        <div className="grid gap-6 lg:grid-cols-2">

                            {/* State */}

                            <div>

                                <label className="mb-3 block font-semibold text-gray-700">

                                    State

                                </label>

                                <select
                                    value={selectedState}
                                    onChange={(e) => {

                                        setSelectedState(
                                            e.target.value
                                        );

                                        setSelectedDistrict(
                                            districtData[e.target.value][0]
                                        );

                                    }}
                                    className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-sky-500"
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

                            </div>

                            {/* District */}

                            <div>

                                <label className="mb-3 block font-semibold text-gray-700">

                                    District

                                </label>

                                <select
                                    value={selectedDistrict}
                                    onChange={(e) =>
                                        setSelectedDistrict(
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-sky-500"
                                >

                                    {districtData[selectedState].map(

                                        (district) => (

                                            <option
                                                key={district}
                                                value={district}
                                            >

                                                {district}

                                            </option>

                                        )

                                    )}

                                </select>

                            </div>

                        </div>

                        {/* Button */}

                        <div className="mt-10 flex justify-center">

                            <button
                                onClick={getWeather}
                                disabled={loading}
                                className="rounded-xl bg-gradient-to-r from-sky-600 to-green-500 px-12 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105"
                            >

                                {

                                    loading

                                        ? "Loading..."

                                        : "🌤 Get Weather"

                                }

                            </button>

                        </div>

                        {/* Error */}

                        {

                            error && (

                                <div className="mt-8 rounded-xl bg-red-100 p-5 text-red-700">

                                    {error}

                                </div>

                            )

                        }

                    </div>
                                        {/* ==================================================
                        Weather Dashboard
                    ================================================== */}

                    {weather && (

                        <div className="mt-12">

                            {/* Location */}

                            <div className="mb-8 text-center">

                                <h2 className="text-4xl font-bold text-sky-700">

                                    📍 {usingCurrentLocation ? locationName : weather.name}

                                </h2>

                                <p className="mt-2 text-lg capitalize text-gray-500">

                                    {weather.weather[0].description}

                                </p>

                            </div>

                            {/* Weather Cards */}

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                {/* Temperature */}

                                <div className="rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 p-6 text-center text-white shadow-xl">

                                    <div className="text-5xl">

                                        🌡

                                    </div>

                                    <h3 className="mt-4 text-4xl font-bold">

                                        {weather.main.temp}°C

                                    </h3>

                                    <p className="mt-2">

                                        Temperature

                                    </p>

                                </div>

                                {/* Feels Like */}

                                <div className="rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-400 p-6 text-center text-white shadow-xl">

                                    <div className="text-5xl">

                                        ☀

                                    </div>

                                    <h3 className="mt-4 text-4xl font-bold">

                                        {weather.main.feels_like}°C

                                    </h3>

                                    <p className="mt-2">

                                        Feels Like

                                    </p>

                                </div>

                                {/* Humidity */}

                                <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 p-6 text-center text-white shadow-xl">

                                    <div className="text-5xl">

                                        💧

                                    </div>

                                    <h3 className="mt-4 text-4xl font-bold">

                                        {weather.main.humidity}%

                                    </h3>

                                    <p className="mt-2">

                                        Humidity

                                    </p>

                                </div>

                                {/* Wind */}

                                <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 p-6 text-center text-white shadow-xl">

                                    <div className="text-5xl">

                                        🌬

                                    </div>

                                    <h3 className="mt-4 text-4xl font-bold">

                                        {weather.wind.speed}

                                    </h3>

                                    <p className="mt-2">

                                        m/s Wind Speed

                                    </p>

                                </div>

                                {/* Pressure */}

                                <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-center text-white shadow-xl">

                                    <div className="text-5xl">

                                        🌍

                                    </div>

                                    <h3 className="mt-4 text-4xl font-bold">

                                        {weather.main.pressure}

                                    </h3>

                                    <p className="mt-2">

                                        hPa Pressure

                                    </p>

                                </div>

                                {/* Visibility */}

                                <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-fuchsia-500 p-6 text-center text-white shadow-xl">

                                    <div className="text-5xl">

                                        👀

                                    </div>

                                    <h3 className="mt-4 text-4xl font-bold">

                                        {(weather.visibility / 1000).toFixed(1)}

                                    </h3>

                                    <p className="mt-2">

                                        KM Visibility

                                    </p>

                                </div>

                                {/* Condition */}

                                <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-600 p-6 text-center text-white shadow-xl">

                                    <div className="text-5xl">

                                        ☁

                                    </div>

                                    <h3 className="mt-4 text-2xl font-bold">

                                        {weather.weather[0].main}

                                    </h3>

                                    <p className="mt-2">

                                        Weather Condition

                                    </p>

                                </div>

                                {/* AI Status */}

                                <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-500 p-6 text-center text-white shadow-xl">

                                    <div className="text-5xl">

                                        🤖

                                    </div>

                                    <h3 className="mt-4 text-2xl font-bold">

                                        AI Ready

                                    </h3>

                                    <p className="mt-2">

                                        Farming Analysis

                                    </p>

                                </div>

                            </div>
                                                {/* ==================================================
                        AI Farming Recommendation
                    ================================================== */}

                    <div className="mt-10 rounded-[30px] bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 p-10 text-white shadow-2xl">

                        <h2 className="text-3xl font-bold">

                            🌾 AI Farming Recommendation

                        </h2>

                        <p className="mt-4 text-lg leading-8">

                            {

                                weather.main.temp > 35

                                    ?

                                    "⚠ High temperature detected. Increase irrigation frequency and avoid fertilizer application during afternoon hours."

                                    :

                                    weather.main.humidity > 80

                                    ?

                                    "🌧 High humidity detected. Monitor crops regularly for fungal diseases and ensure proper field drainage."

                                    :

                                    weather.wind.speed > 8

                                    ?

                                    "💨 Strong winds expected. Secure young plants and postpone pesticide spraying."

                                    :

                                    "✅ Weather conditions are favorable for farming. Continue normal agricultural activities."

                            }

                        </p>

                    </div>

                    {/* ==================================================
                        Smart Advisory
                    ================================================== */}

                    <div className="mt-10 grid gap-6 md:grid-cols-3">

                        {/* Irrigation */}

                        <div className="rounded-3xl bg-white p-6 shadow-xl">

                            <h3 className="text-2xl font-bold text-green-700">

                                💧 Irrigation

                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">

                                {

                                    weather.main.temp > 32

                                        ?

                                        "Increase irrigation frequency to maintain soil moisture."

                                        :

                                        "Current temperature is suitable for normal irrigation."

                                }

                            </p>

                        </div>

                        {/* Disease */}

                        <div className="rounded-3xl bg-white p-6 shadow-xl">

                            <h3 className="text-2xl font-bold text-red-600">

                                🌱 Crop Health

                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">

                                {

                                    weather.main.humidity > 80

                                        ?

                                        "High humidity may increase fungal disease risk. Monitor crop leaves."

                                        :

                                        "Disease risk is currently low."

                                }

                            </p>

                        </div>

                        {/* Weather */}

                        <div className="rounded-3xl bg-white p-6 shadow-xl">

                            <h3 className="text-2xl font-bold text-sky-600">

                                🌤 Weather Alert

                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">

                                {

                                    weather.weather[0].main === "Rain"

                                        ?

                                        "Rain expected. Delay harvesting and protect stored crops."

                                        :

                                        "No severe weather alerts at this time."

                                }

                            </p>

                        </div>

                    </div>

                </div>

            )}

        </div>

    </div>

</MainLayout>

);

}
