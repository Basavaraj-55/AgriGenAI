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
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;

  analyzeMarket: () => void;

  loading: boolean;

}

function MarketForm({

  formData,

  states,

  districts,

  handleChange,

  analyzeMarket,

  loading,

}: MarketFormProps) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold text-green-700 mb-2">

        📈 AI Market Analysis

      </h2>

      <p className="text-gray-600 mb-8">

        Select crop details to receive an AI-powered market forecast.

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Crop */}

        <div>

          <label className="block font-semibold mb-2">

            🌾 Crop

          </label>

          <select

            name="crop"

            value={formData.crop}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">Select Crop</option>

            <option>Rice</option>

            <option>Wheat</option>

            <option>Maize</option>

            <option>Cotton</option>

            <option>Sugarcane</option>

            <option>Tomato</option>

            <option>Potato</option>

            <option>Onion</option>

            <option>Banana</option>

          </select>

        </div>

        {/* State */}

        <div>

          <label className="block font-semibold mb-2">

            📍 State

          </label>

          <select

            name="state"

            value={formData.state}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">Select State</option>

            {states.map((state) => (

              <option key={state} value={state}>

                {state}

              </option>

            ))}

          </select>

        </div>

        {/* District */}

        <div>

          <label className="block font-semibold mb-2">

            🏙 District

          </label>

          <select

            name="district"

            value={formData.district}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">Select District</option>

            {districts.map((district) => (

              <option key={district} value={district}>

                {district}

              </option>

            ))}

          </select>

        </div>

        {/* Quantity */}

        <div>

          <label className="block font-semibold mb-2">

            ⚖ Quantity (Quintals)

          </label>

          <input

            type="number"

            name="quantity"

            value={formData.quantity}

            onChange={handleChange}

            placeholder="Enter Quantity"

            className="w-full border rounded-lg p-3"

          />

        </div>
                {/* Selling Time */}

        <div>

          <label className="block font-semibold mb-2">

            📅 Expected Selling Time

          </label>

          <select

            name="sellingTime"

            value={formData.sellingTime}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">Select Selling Time</option>

            <option>Today</option>

            <option>Tomorrow</option>

            <option>Next Week</option>

            <option>Next Month</option>

          </select>

        </div>

      </div>

      {/* AI Information */}

      <div className="mt-8 rounded-xl bg-green-50 border-l-4 border-green-600 p-6">

        <h3 className="text-xl font-bold text-green-700 mb-4">

          🤖 AI Smart Market Intelligence

        </h3>

        <ul className="space-y-2 text-gray-700">

          <li>✔ Predicts future crop prices.</li>

          <li>✔ Recommends whether to Sell Now or Wait.</li>

          <li>✔ Estimates expected extra profit.</li>

          <li>✔ Analyzes weather impact on prices.</li>

          <li>✔ Calculates AI confidence score.</li>

          <li>✔ Provides reasons behind the recommendation.</li>

        </ul>

      </div>

      {/* Analyze Button */}

      <div className="mt-8">

        <button

          onClick={analyzeMarket}

          disabled={loading}

          className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-4 text-lg font-bold text-white transition hover:from-green-700 hover:to-emerald-600 disabled:opacity-60"

        >

          {

            loading

            ?

            "🤖 AI Analyzing Market..."

            :

            "📈 Analyze Market"

          }

        </button>

      </div>

    </div>

  );

}

export default MarketForm;