interface IrrigationFormProps {
  state: string;
  district: string;
  crop: string;
  soilMoisture: number;

  states: string[];
  districts: string[];
  crops: string[];

  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;

  handleStateChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  handleDistrictChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  handleCropChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  handleMoistureChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  analyzeIrrigation: () => void;

  loading: boolean;
}

function IrrigationForm({

  state,
  district,
  crop,
  soilMoisture,

  states,
  districts,
  crops,

  temperature,
  humidity,
  rainfall,
  windSpeed,

  handleStateChange,
  handleDistrictChange,
  handleCropChange,
  handleMoistureChange,

  analyzeIrrigation,
  loading,

}: IrrigationFormProps) {

  return (

    <div className="bg-white rounded-3xl shadow-xl border border-sky-100 p-8">

      <h1 className="text-4xl font-bold text-sky-700 mb-2">
        💧 Smart Irrigation AI
      </h1>

      <p className="text-gray-500 mb-8">
        AI Powered Water Management System
      </p>

      {/* LOCATION */}

      <h2 className="text-xl font-semibold text-sky-700 mb-4">
        📍 Farm Location
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <select
          value={state}
          onChange={handleStateChange}
          className="border rounded-xl p-3 focus:ring-2 focus:ring-sky-400"
        >
          <option>Select State</option>

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
          onChange={handleDistrictChange}
          className="border rounded-xl p-3 focus:ring-2 focus:ring-sky-400"
        >
          <option>Select District</option>

          {districts.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

      {/* WEATHER */}

      <h2 className="text-xl font-semibold text-sky-700 mt-10 mb-5">
        🌦 Live Weather
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        <div className="bg-sky-50 rounded-2xl p-5 text-center shadow">

          <div className="text-4xl">🌡</div>

          <div className="mt-2 text-2xl font-bold">

            {temperature}°C

          </div>

          <div className="text-gray-600">

            Temperature

          </div>

        </div>

        <div className="bg-sky-50 rounded-2xl p-5 text-center shadow">

          <div className="text-4xl">💧</div>

          <div className="mt-2 text-2xl font-bold">

            {humidity}%

          </div>

          <div className="text-gray-600">

            Humidity

          </div>

        </div>

        <div className="bg-sky-50 rounded-2xl p-5 text-center shadow">

          <div className="text-4xl">🌧</div>

          <div className="mt-2 text-2xl font-bold">

            {rainfall} mm

          </div>

          <div className="text-gray-600">

            Rainfall

          </div>

        </div>

        <div className="bg-sky-50 rounded-2xl p-5 text-center shadow">

          <div className="text-4xl">🌬</div>

          <div className="mt-2 text-2xl font-bold">

            {windSpeed} km/h

          </div>

          <div className="text-gray-600">

            Wind Speed

          </div>

        </div>

      </div>
            {/* FARM INFORMATION */}

      <h2 className="text-xl font-semibold text-sky-700 mt-10 mb-5">
        🌾 Farm Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Crop */}

        <div>

          <label className="block font-semibold mb-2">
            Crop
          </label>

          <select
            value={crop}
            onChange={handleCropChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-sky-400"
          >

            <option value="">
              Select Crop
            </option>

            {crops.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

        </div>

        {/* Soil Moisture */}

        <div>

          <label className="block font-semibold mb-2">
            🌱 Soil Moisture
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={soilMoisture}
            onChange={handleMoistureChange}
            className="w-full accent-sky-600"
          />

          <div className="flex justify-between mt-2">

            <span className="text-gray-500">
              Dry
            </span>

            <span className="font-bold text-sky-700 text-lg">
              {soilMoisture} %
            </span>

            <span className="text-gray-500">
              Wet
            </span>

          </div>

        </div>

      </div>

      {/* AI BUTTON */}

      <div className="mt-12 flex justify-center">

        <button
          onClick={analyzeIrrigation}
          disabled={loading}
          className="bg-gradient-to-r from-sky-600 to-green-500 hover:from-sky-700 hover:to-green-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-xl transition-all duration-300 disabled:opacity-50"
        >

          {loading
            ? "🤖 AI Analyzing..."
            : "💧 Analyze Irrigation"}

        </button>

      </div>

    </div>

  );

}

export default IrrigationForm;