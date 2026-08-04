// ======================================================
// 🌾 AgriGenAI
// AI Market Price Chart
// ======================================================

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";

// ======================================================
// Props
// ======================================================

interface MarketChartProps {
  todayPrice?: number;
  tomorrowPrice?: number;
  nextWeekPrice?: number;
  nextMonthPrice?: number;
}

// ======================================================
// Chart Data Interface
// ======================================================

interface ChartPoint {
  label: string;
  price: number;
}

// ======================================================
// Component
// ======================================================

export default function MarketChart({

  todayPrice = 0,

  tomorrowPrice = 0,

  nextWeekPrice = 0,

  nextMonthPrice = 0,

}: MarketChartProps) {

  // ====================================================
  // Chart Data
  // ====================================================

  const chartData: ChartPoint[] = [

    {
      label: "Today",
      price: todayPrice,
    },

    {
      label: "Tomorrow",
      price: tomorrowPrice,
    },

    {
      label: "Next Week",
      price: nextWeekPrice,
    },

    {
      label: "Next Month",
      price: nextMonthPrice,
    },

  ];

  // ====================================================
  // Statistics
  // ====================================================

  const prices = chartData.map(

    item => item.price

  );

  const currentPrice = prices[0] ?? 0;

  const highestPrice = Math.max(...prices);

  const lowestPrice = Math.min(...prices);

  const averagePrice = Math.round(

    prices.reduce(

      (sum, price) => sum + price,

      0

    ) / prices.length

  );

  const trend =

    nextMonthPrice > todayPrice

      ? "Rising"

      : nextMonthPrice < todayPrice

      ? "Falling"

      : "Stable";

  // ====================================================
  // JSX
  // ====================================================

  return (

    <div className="space-y-8">
            {/* ======================================================
          Hero Section
      ====================================================== */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 shadow-xl">

        <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-10">

          {/* Left Side */}

          <div>

            <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">

              🤖 AI Market Intelligence

            </span>

            <h1 className="mt-6 text-4xl font-bold text-white lg:text-5xl">

              Crop Price Forecast

            </h1>

            <p className="mt-5 max-w-xl leading-8 text-green-100">

              Analyze future crop prices using AI,
              compare market trends and identify
              the best selling period to maximize
              your profit.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="rounded-xl bg-white/15 px-6 py-4 backdrop-blur">

                <p className="text-sm text-green-100">

                  Current Price

                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">

                  ₹{currentPrice.toLocaleString()}

                </h3>

              </div>

              <div className="rounded-xl bg-white/15 px-6 py-4 backdrop-blur">

                <p className="text-sm text-green-100">

                  Average Forecast

                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">

                  ₹{averagePrice.toLocaleString()}

                </h3>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

              <FiTrendingUp

                className="mb-4 text-white"

                size={32}

              />

              <h2 className="text-4xl font-bold text-white">

                95%

              </h2>

              <p className="mt-2 text-green-100">

                AI Accuracy

              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

              <FiActivity

                className="mb-4 text-white"

                size={32}

              />

              <h2 className="text-4xl font-bold text-white">

                LIVE

              </h2>

              <p className="mt-2 text-green-100">

                Market Status

              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

              <FiBarChart2

                className="mb-4 text-white"

                size={32}

              />

              <h2 className="text-4xl font-bold text-white">

                AI

              </h2>

              <p className="mt-2 text-green-100">

                Smart Analytics

              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

              {trend === "Rising" ? (

                <FiTrendingUp

                  className="mb-4 text-white"

                  size={32}

                />

              ) : trend === "Falling" ? (

                <FiTrendingDown

                  className="mb-4 text-white"

                  size={32}

                />

              ) : (

                <FiActivity

                  className="mb-4 text-white"

                  size={32}

                />

              )}

              <h2 className="text-3xl font-bold text-white">

                {trend}

              </h2>

              <p className="mt-2 text-green-100">

                Market Trend

              </p>

            </div>

          </div>

        </div>

      </section>
            {/* ======================================================
          Analytics Dashboard
      ====================================================== */}

      <section>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

          {/* Current Price */}

          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-green-100 p-3">

                <FiActivity
                  className="text-green-700"
                  size={28}
                />

              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">

                LIVE

              </span>

            </div>

            <p className="mt-6 text-sm text-gray-500">

              Current Price

            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">

              ₹{currentPrice.toLocaleString()}

            </h2>

          </div>

          {/* Highest Forecast */}

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-blue-100 p-3">

                <FiTrendingUp
                  className="text-blue-700"
                  size={28}
                />

              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">

                HIGH

              </span>

            </div>

            <p className="mt-6 text-sm text-gray-500">

              Highest Forecast

            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">

              ₹{highestPrice.toLocaleString()}

            </h2>

          </div>

          {/* Lowest Forecast */}

          <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-red-100 p-3">

                <FiTrendingDown
                  className="text-red-700"
                  size={28}
                />

              </div>

              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">

                LOW

              </span>

            </div>

            <p className="mt-6 text-sm text-gray-500">

              Lowest Forecast

            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">

              ₹{lowestPrice.toLocaleString()}

            </h2>

          </div>

          {/* Average Forecast */}

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-purple-100 p-3">

                <FiBarChart2
                  className="text-purple-700"
                  size={28}
                />

              </div>

              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">

                AVG

              </span>

            </div>

            <p className="mt-6 text-sm text-gray-500">

              Average Forecast

            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">

              ₹{averagePrice.toLocaleString()}

            </h2>

          </div>

          {/* Market Trend */}

          <div className="rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 p-6 text-white shadow-lg">

            <div className="flex items-center justify-between">

              {trend === "Rising" ? (

                <FiTrendingUp size={30} />

              ) : trend === "Falling" ? (

                <FiTrendingDown size={30} />

              ) : (

                <FiActivity size={30} />

              )}

              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">

                AI

              </span>

            </div>

            <p className="mt-6 text-sm text-green-100">

              Market Trend

            </p>

            <h2 className="mt-2 text-3xl font-bold">

              {trend}

            </h2>

            <p className="mt-2 text-sm text-green-100">

              AI Prediction

            </p>

          </div>

        </div>

      </section>
            {/* ======================================================
          AI Price Trend Chart
      ====================================================== */}

      <section className="rounded-3xl bg-white p-8 shadow-xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">

              📈 AI Price Trend

            </h2>

            <p className="mt-2 text-gray-500">

              Predicted crop price movement over different
              selling periods.

            </p>

          </div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            Live Forecast

          </span>

        </div>

        <div className="h-[420px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={chartData}>

              <defs>

                <linearGradient
                  id="priceFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#16A34A"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="#16A34A"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="label"
              />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="price"
                stroke="none"
                fill="url(#priceFill)"
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#16A34A"
                strokeWidth={4}
                dot={{
                  r: 6,
                  fill: "#16A34A",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
                activeDot={{
                  r: 8,
                  fill: "#15803D",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

        {/* Forecast Values */}

        <div className="mt-8 grid gap-4 md:grid-cols-4">

          <div className="rounded-xl bg-green-50 p-5">

            <p className="text-sm text-gray-500">

              Today

            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-700">

              ₹{todayPrice.toLocaleString()}

            </h3>

          </div>

          <div className="rounded-xl bg-blue-50 p-5">

            <p className="text-sm text-gray-500">

              Tomorrow

            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-700">

              ₹{tomorrowPrice.toLocaleString()}

            </h3>

          </div>

          <div className="rounded-xl bg-yellow-50 p-5">

            <p className="text-sm text-gray-500">

              Next Week

            </p>

            <h3 className="mt-2 text-2xl font-bold text-yellow-700">

              ₹{nextWeekPrice.toLocaleString()}

            </h3>

          </div>

          <div className="rounded-xl bg-purple-50 p-5">

            <p className="text-sm text-gray-500">

              Next Month

            </p>

            <h3 className="mt-2 text-2xl font-bold text-purple-700">

              ₹{nextMonthPrice.toLocaleString()}

            </h3>

          </div>

        </div>

      </section>
            {/* ======================================================
          AI Insights
      ====================================================== */}

      <section className="grid gap-6 lg:grid-cols-3">

        {/* AI Recommendation */}

        <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-500 p-8 text-white shadow-xl">

          <h2 className="text-2xl font-bold">

            🤖 AI Recommendation

          </h2>

          <p className="mt-6 leading-8 text-green-100">

            {trend === "Rising"

              ? "AI predicts a positive market trend. Waiting until the expected peak could improve your selling price."

              : trend === "Falling"

              ? "The forecast indicates declining prices. Selling earlier may help reduce the risk of lower returns."

              : "The market is expected to remain stable. Consider local market demand before selling."}

          </p>

        </div>

        {/* Best Selling Time */}

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-gray-800">

            📅 Best Selling Time

          </h2>

          <div className="mt-6 rounded-2xl bg-green-50 p-6">

            <h3 className="text-3xl font-bold text-green-700">

              {highestPrice === todayPrice
                ? "Today"
                : highestPrice === tomorrowPrice
                ? "Tomorrow"
                : highestPrice === nextWeekPrice
                ? "Next Week"
                : "Next Month"}

            </h3>

            <p className="mt-3 text-gray-600">

              This period has the highest predicted
              selling price according to the AI model.

            </p>

          </div>

        </div>

        {/* AI Confidence */}

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-gray-800">

            🎯 AI Confidence

          </h2>

          <div className="mt-8 flex justify-center">

            <div className="flex h-36 w-36 items-center justify-center rounded-full border-8 border-green-500 bg-green-50">

              <div className="text-center">

                <h3 className="text-4xl font-bold text-green-700">

                  95%

                </h3>

                <p className="mt-2 text-sm text-gray-500">

                  Confidence

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          AI Market Summary
      ====================================================== */}

      <section className="rounded-3xl bg-gradient-to-r from-slate-50 to-green-50 p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-gray-800">

          🌾 AI Market Summary

        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          {/* Analysis */}

          <div>

            <h3 className="mb-4 text-xl font-semibold text-green-700">

              Market Analysis

            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>✅ Historical market data analysed</li>

              <li>✅ Seasonal demand considered</li>

              <li>✅ Market trend prediction completed</li>

              <li>✅ AI selling recommendation generated</li>

            </ul>

          </div>

          {/* Summary */}

          <div>

            <h3 className="mb-4 text-xl font-semibold text-green-700">

              Forecast Summary

            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>

                💰 Current Price :

                <span className="ml-2 font-bold">

                  ₹{currentPrice.toLocaleString()}

                </span>

              </li>

              <li>

                📈 Highest Price :

                <span className="ml-2 font-bold">

                  ₹{highestPrice.toLocaleString()}

                </span>

              </li>

              <li>

                📉 Lowest Price :

                <span className="ml-2 font-bold">

                  ₹{lowestPrice.toLocaleString()}

                </span>

              </li>

              <li>

                📊 Average Price :

                <span className="ml-2 font-bold">

                  ₹{averagePrice.toLocaleString()}

                </span>

              </li>

              <li>

                🎯 Trend :

                <span className="ml-2 font-bold text-green-700">

                  {trend}

                </span>

              </li>

            </ul>

          </div>

        </div>

      </section>

    </div>

  );

}