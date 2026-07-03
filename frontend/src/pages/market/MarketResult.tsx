interface MarketResultProps {
  result: {
    crop: string;

    todayPrice: number;
    predictedPrice: number;
    tomorrowPrice: number;
    nextWeekPrice: number;
    nextMonthPrice: number;

    trend: string;
    recommendation: string;

    extraProfit: number;
    totalProfit: number;

    confidence: string;

    reason: string[];
  };
}

function MarketResult({ result }: MarketResultProps) {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-green-700 mb-8">
        📈 AI Smart Market Report
      </h2>

      {/* Crop */}

      <div className="mb-8 bg-green-50 rounded-xl p-6">

        <h3 className="text-lg font-semibold text-gray-700">
          🌾 Crop
        </h3>

        <p className="text-3xl font-bold text-green-700 mt-3">
          {result.crop}
        </p>

      </div>

      {/* Price Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-semibold">💰 Today</h3>
          <p className="text-3xl font-bold mt-3">
            ₹ {result.todayPrice}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold">📅 Tomorrow</h3>
          <p className="text-3xl font-bold mt-3">
            ₹ {result.tomorrowPrice}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6">
          <h3 className="font-semibold">📆 Next Week</h3>
          <p className="text-3xl font-bold mt-3">
            ₹ {result.nextWeekPrice}
          </p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="font-semibold">🗓 Next Month</h3>
          <p className="text-3xl font-bold mt-3">
            ₹ {result.nextMonthPrice}
          </p>
        </div>

        <div className="bg-cyan-50 rounded-xl p-6">
          <h3 className="font-semibold">
            🤖 Predicted Price
          </h3>
          <p className="text-3xl font-bold mt-3">
            ₹ {result.predictedPrice}
          </p>
        </div>

      </div>

      {/* Trend */}

      <div className="mt-8 bg-gray-50 rounded-xl p-6">

        <h3 className="text-xl font-bold mb-3">
          📈 Market Trend
        </h3>

        <p className="text-2xl font-bold text-green-700">
          {result.trend}
        </p>

      </div>

      {/* Recommendation */}

      <div className="mt-8 bg-green-50 rounded-xl p-6">

        <h3 className="text-xl font-bold mb-3">
          🤖 AI Recommendation
        </h3>

        <p className="text-lg leading-8">
          {result.recommendation}
        </p>

      </div>

      {/* Profit */}

      <div className="mt-8 grid md:grid-cols-2 gap-6">

        <div className="bg-yellow-50 rounded-xl p-6">

          <h3 className="text-xl font-bold mb-3">
            💰 Extra Profit
          </h3>

          <p className="text-3xl font-bold text-green-700">
            ₹ {result.extraProfit}
          </p>

        </div>

        <div className="bg-orange-50 rounded-xl p-6">

          <h3 className="text-xl font-bold mb-3">
            🏆 Total Profit
          </h3>

          <p className="text-3xl font-bold text-orange-600">
            ₹ {result.totalProfit}
          </p>

        </div>

      </div>

      {/* Confidence */}

      <div className="mt-8 bg-purple-50 rounded-xl p-6">

        <h3 className="text-xl font-bold mb-3">
          📊 AI Confidence
        </h3>

        <p className="text-4xl font-bold text-purple-700">
          {result.confidence}
        </p>

      </div>

      {/* Reasons */}

      <div className="mt-8 bg-gray-50 rounded-xl p-6">

        <h3 className="text-xl font-bold mb-4">
          💡 Why AI Predicted This
        </h3>

        <ul className="space-y-3">

          {result.reason.map((item, index) => (

            <li
              key={index}
              className="flex gap-3"
            >
              <span className="text-green-600">
                ✔
              </span>

              <span>{item}</span>

            </li>

          ))}

        </ul>

      </div>

      {/* Download */}

      <div className="mt-8">

        <button
          className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-4 text-lg font-bold text-white hover:from-green-700 hover:to-emerald-600 transition"
        >
          📄 Download AI Market Report
        </button>

      </div>

    </div>
  );
}

export default MarketResult;