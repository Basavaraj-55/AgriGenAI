// ======================================================
// 🌾 AgriGenAI
// AI Market Analysis Form
// ======================================================

import {

  FiMapPin,

  FiCalendar,

  FiPackage,

  FiTrendingUp,

  FiActivity,

  FiBarChart2,

} from "react-icons/fi";

import { GiWheat } from "react-icons/gi";

// ======================================================
// Props
// ======================================================

interface MarketFormProps {

  formData: {

    crop: string;

    state: string;

    district: string;

    quantity: string;

    sellingTime: string;

  };

  states: string[];

  districts: string[];

  handleChange: (

    e: React.ChangeEvent<

      HTMLInputElement |

      HTMLSelectElement

    >

  ) => void;

  analyzeMarket: () => void;

  loading: boolean;

}

// ======================================================
// Component
// ======================================================

export default function MarketForm({

  formData,

  states,

  districts,

  handleChange,

  analyzeMarket,

  loading,

}: MarketFormProps) {

  return (

    <div className="space-y-8">

      {/* =======================================
          AI Hero
      ======================================= */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 text-white shadow-2xl">

        <div className="grid grid-cols-1 gap-8 p-10 lg:grid-cols-2">

          <div>

            <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

              🤖 AI Powered Prediction

            </span>

            <h1 className="mt-6 text-4xl font-extrabold">

              AI Market Intelligence

            </h1>

            <p className="mt-4 max-w-xl text-green-100 leading-7">

              Predict future crop prices using
              Artificial Intelligence, historical
              market trends and regional demand.

            </p>

          </div>

          <div className="grid grid-cols-3 gap-4">

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

              <FiTrendingUp

                size={34}

                className="mb-3"

              />

              <h2 className="text-3xl font-bold">

                95%

              </h2>

              <p className="text-sm text-green-100">

                Accuracy

              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

              <FiBarChart2

                size={34}

                className="mb-3"

              />

              <h2 className="text-3xl font-bold">

                Live

              </h2>

              <p className="text-sm text-green-100">

                Market Data

              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

              <FiActivity

                size={34}

                className="mb-3"

              />

              <h2 className="text-3xl font-bold">

                AI

              </h2>

              <p className="text-sm text-green-100">

                Insights

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =======================================
          Prediction Form
      ======================================= */}

      <div className="rounded-3xl bg-white p-8 shadow-xl">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-800">

            🌾 Crop Market Analysis

          </h2>

          <p className="mt-2 text-gray-500">

            Enter your crop information to receive
            AI-powered market predictions and
            selling recommendations.

          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* =======================================
              Crop
          ======================================= */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-gray-700">

              <GiWheat className="text-green-600" />

              Crop

            </label>

            <select

              name="crop"

              value={formData.crop}

              onChange={handleChange}

              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"

            >

              <option value="">

                Select Crop

              </option>

              <option value="Rice">

                🌾 Rice

              </option>

              <option value="Wheat">

                🌾 Wheat

              </option>

              <option value="Maize">

                🌽 Maize

              </option>

              <option value="Cotton">

                ☁ Cotton

              </option>

              <option value="Sugarcane">

                🎋 Sugarcane

              </option>

              <option value="Tomato">

                🍅 Tomato

              </option>

              <option value="Potato">

                🥔 Potato

              </option>

              <option value="Onion">

                🧅 Onion

              </option>

              <option value="Banana">

                🍌 Banana

              </option>

            </select>

          </div>

          {/* =======================================
              State
          ======================================= */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-gray-700">

              <FiMapPin className="text-green-600" />

              State

            </label>

            <select

              name="state"

              value={formData.state}

              onChange={handleChange}

              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"

            >

              <option value="">

                Select State

              </option>

              {states.map((state) => (

                <option

                  key={state}

                  value={state}

                >

                  {state}

                </option>

              ))}

            </select>

          </div>

          {/* =======================================
              District
          ======================================= */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-gray-700">

              <FiMapPin className="text-green-600" />

              District

            </label>

            <select

              name="district"

              value={formData.district}

              onChange={handleChange}

              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"

            >

              <option value="">

                Select District

              </option>

              {districts.map((district) => (

                <option

                  key={district}

                  value={district}

                >

                  {district}

                </option>

              ))}

            </select>

          </div>

          {/* =======================================
              Quantity
          ======================================= */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-gray-700">

              <FiPackage className="text-green-600" />

              Quantity (Quintals)

            </label>

            <input

              type="number"

              min="1"

              name="quantity"

              value={formData.quantity}

              onChange={handleChange}

              placeholder="Example: 50"

              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"

            />

          </div>
                    {/* =======================================
              Selling Time
          ======================================= */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-gray-700">

              <FiCalendar className="text-green-600" />

              Expected Selling Time

            </label>

            <select

              name="sellingTime"

              value={formData.sellingTime}

              onChange={handleChange}

              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"

            >

              <option value="">

                Select Selling Time

              </option>

              <option value="Today">

                📅 Today

              </option>

              <option value="Tomorrow">

                🌤 Tomorrow

              </option>

              <option value="Next Week">

                📆 Next Week

              </option>

              <option value="Next Month">

                🗓 Next Month

              </option>

            </select>

          </div>

        </div>

        {/* =======================================
            AI Intelligence
        ======================================= */}

        <div className="mt-10">

          <h3 className="mb-6 text-2xl font-bold text-gray-800">

            🤖 AI Smart Market Intelligence

          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            <div className="rounded-2xl border border-green-100 bg-green-50 p-5 shadow-sm transition hover:shadow-lg">

              <div className="mb-3 text-4xl">

                📈

              </div>

              <h4 className="font-bold text-green-700">

                Price Prediction

              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                Predicts future crop prices using
                historical market trends and AI.

              </p>

            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm transition hover:shadow-lg">

              <div className="mb-3 text-4xl">

                💰

              </div>

              <h4 className="font-bold text-blue-700">

                Profit Forecast

              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                Estimates expected profit before
                selling your crops.

              </p>

            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 shadow-sm transition hover:shadow-lg">

              <div className="mb-3 text-4xl">

                📊

              </div>

              <h4 className="font-bold text-purple-700">

                Market Trend

              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                Understand whether prices are
                increasing or decreasing.

              </p>

            </div>

            <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5 shadow-sm transition hover:shadow-lg">

              <div className="mb-3 text-4xl">

                🌦

              </div>

              <h4 className="font-bold text-yellow-700">

                Weather Impact

              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                Weather conditions affecting crop
                prices and demand.

              </p>

            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm transition hover:shadow-lg">

              <div className="mb-3 text-4xl">

                🎯

              </div>

              <h4 className="font-bold text-red-700">

                AI Recommendation

              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                AI recommends whether you should
                Sell Now or Wait.

              </p>

            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm transition hover:shadow-lg">

              <div className="mb-3 text-4xl">

                ⚡

              </div>

              <h4 className="font-bold text-emerald-700">

                Confidence Score

              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                Displays AI confidence based on
                available market data.

              </p>

            </div>

          </div>

        </div>

        {/* =======================================
            AI Tips
        ======================================= */}

        <div className="mt-10 rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-3xl text-white">

              💡

            </div>

            <div>

              <h3 className="text-2xl font-bold text-green-700">

                AI Market Tips

              </h3>

              <p className="mt-3 leading-7 text-gray-700">

                AI recommendations are generated
                using historical market prices,
                seasonal demand, weather patterns,
                regional production, transportation
                costs and supply chain analysis.

              </p>

            </div>

          </div>

        </div>
                {/* =======================================
            AI Prediction Button
        ======================================= */}

        <div className="mt-10">

          <button

            type="button"

            onClick={analyzeMarket}

            disabled={loading}

            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"

          >

            <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative flex items-center justify-center gap-3">

              {loading ? (

                <>

                  <svg

                    className="h-6 w-6 animate-spin"

                    xmlns="http://www.w3.org/2000/svg"

                    fill="none"

                    viewBox="0 0 24 24"

                  >

                    <circle

                      className="opacity-25"

                      cx="12"

                      cy="12"

                      r="10"

                      stroke="currentColor"

                      strokeWidth="4"

                    />

                    <path

                      className="opacity-75"

                      fill="currentColor"

                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"

                    />

                  </svg>

                  AI is analyzing the market...

                </>

              ) : (

                <>

                  🚀 Generate AI Prediction

                </>

              )}

            </span>

          </button>

        </div>

        {/* =======================================
            AI Notice
        ======================================= */}

        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

          <div className="flex items-start gap-4">

            <div className="text-3xl">

              🤖

            </div>

            <div>

              <h3 className="text-xl font-bold text-green-700">

                AI Prediction Notice

              </h3>

              <p className="mt-2 leading-7 text-gray-700">

                Predictions are generated using machine learning,

                historical mandi prices, seasonal demand,

                weather conditions and regional market trends.

                The recommendation is intended to support

                your decision and should be combined with

                current local market conditions.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}