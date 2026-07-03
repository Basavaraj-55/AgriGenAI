interface IrrigationResultProps {
  irrigation: string;
  water: string;
  bestTime: string;
  recommendation: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  loading?: boolean;
}

function IrrigationResult({
  irrigation,
  water,
  bestTime,
  recommendation,
  soilMoisture,
  temperature,
  humidity,
  rainfall,
}: IrrigationResultProps) {

  if (!irrigation) return null;

  const statusColor =
    irrigation === "YES"
      ? "text-green-600"
      : irrigation === "MODERATE"
      ? "text-yellow-500"
      : "text-red-500";

  return (

    <div className="mt-10 bg-white rounded-3xl shadow-xl border border-sky-100 p-8">

      <h2 className="text-3xl font-bold text-sky-700 mb-8">
        🤖 Smart Irrigation Report
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-green-50 rounded-2xl p-5 shadow">

          <h3 className="text-lg font-semibold text-gray-700">
            🚿 Irrigation Status
          </h3>

          <p className={`text-3xl font-bold mt-3 ${statusColor}`}>
            {irrigation}
          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-5 shadow">

          <h3 className="text-lg font-semibold text-gray-700">
            💧 Water Required
          </h3>

          <p className="text-3xl font-bold mt-3 text-sky-700">
            {water}
          </p>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-5 shadow">

          <h3 className="text-lg font-semibold text-gray-700">
            ⏰ Best Time
          </h3>

          <p className="text-2xl font-bold mt-3 text-yellow-600">
            {bestTime}
          </p>

        </div>

        <div className="bg-purple-50 rounded-2xl p-5 shadow">

          <h3 className="text-lg font-semibold text-gray-700">
            🌱 Soil Moisture
          </h3>

          <p className="text-3xl font-bold mt-3 text-purple-700">
            {soilMoisture}%
          </p>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-3 gap-5">

        <div className="bg-sky-50 rounded-xl p-4 text-center">

          <div className="text-4xl">🌡</div>

          <div className="font-bold text-xl mt-2">
            {temperature}°C
          </div>

          <div className="text-gray-500">
            Temperature
          </div>

        </div>

        <div className="bg-sky-50 rounded-xl p-4 text-center">

          <div className="text-4xl">💧</div>

          <div className="font-bold text-xl mt-2">
            {humidity}%
          </div>

          <div className="text-gray-500">
            Humidity
          </div>

        </div>

        <div className="bg-sky-50 rounded-xl p-4 text-center">

          <div className="text-4xl">🌧</div>

          <div className="font-bold text-xl mt-2">
            {rainfall} mm
          </div>

          <div className="text-gray-500">
            Rainfall
          </div>

        </div>

      </div>

      <div className="mt-8 bg-gradient-to-r from-sky-500 to-green-500 rounded-2xl p-6 text-white">

        <h3 className="text-2xl font-bold">
          🌾 AI Recommendation
        </h3>

        <p className="mt-4 text-lg leading-8">
          {recommendation}
        </p>

      </div>

    </div>

  );

}

export default IrrigationResult;