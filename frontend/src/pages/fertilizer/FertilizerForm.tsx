interface FertilizerFormProps {

  formData: {

    crop: string;

    symptom: string;

    stage: string;

    severity: string;

    irrigation: string;

  };

  handleChange: (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement
    >
  ) => void;

  predictFertilizer: () => void;

  loading: boolean;

}

function FertilizerForm({

  formData,

  handleChange,

  predictFertilizer,

  loading,

}: FertilizerFormProps) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h1 className="text-4xl font-bold text-green-700 mb-2">

        🌱 AI Fertilizer Recommendation

      </h1>

      <p className="text-gray-600 mb-8">

        Select your crop and crop condition. AI will recommend the most suitable fertilizer.

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Crop */}

        <div>

          <label className="font-semibold block mb-2">

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

            <option>Cotton</option>

            <option>Maize</option>

            <option>Sugarcane</option>

            <option>Potato</option>

            <option>Tomato</option>

            <option>Onion</option>

            <option>Banana</option>

          </select>

        </div>

        {/* Symptoms */}

        <div>

          <label className="font-semibold block mb-2">

            🍃 Leaf Symptoms

          </label>

          <select

            name="symptom"

            value={formData.symptom}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">Select Symptom</option>

            <option>Yellow Leaves</option>

            <option>Purple Leaves</option>

            <option>Brown Spots</option>

            <option>Dry Leaf Edges</option>

            <option>Slow Growth</option>

            <option>Wilting</option>

            <option>Pale Leaves</option>

            <option>Healthy</option>

          </select>

        </div>

        {/* Crop Stage */}

        <div>

          <label className="font-semibold block mb-2">

            🌱 Crop Growth Stage

          </label>

          <select

            name="stage"

            value={formData.stage}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">Select Stage</option>

            <option>Seedling</option>

            <option>Vegetative</option>

            <option>Flowering</option>

            <option>Fruiting</option>

            <option>Harvest</option>

          </select>

        </div>

        {/* Severity */}

        <div>

          <label className="font-semibold block mb-2">

            ⚠ Severity

          </label>

          <select

            name="severity"

            value={formData.severity}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">Select Severity</option>

            <option>Mild</option>

            <option>Moderate</option>

            <option>Severe</option>

          </select>

        </div>
                {/* Irrigation */}

        <div>

          <label className="font-semibold block mb-2">

            💧 Irrigation Available

          </label>

          <select

            name="irrigation"

            value={formData.irrigation}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">Select Option</option>

            <option>Yes</option>

            <option>No</option>

          </select>

        </div>

        {/* Upload Leaf Image */}

        <div>

          <label className="font-semibold block mb-2">

            📷 Upload Leaf Image (Optional)

          </label>

          <input

            type="file"

            accept=".jpg,.jpeg,.png"

            className="w-full border rounded-lg p-3"

          />

        </div>

      </div>

      {/* AI Information */}

      <div className="mt-8 bg-green-50 border-l-4 border-green-600 rounded-xl p-5">

        <h3 className="text-xl font-bold text-green-700 mb-3">

          🤖 AI Fertilizer Advisor

        </h3>

        <ul className="space-y-2 text-gray-700">

          <li>✔ Detects the most likely nutrient deficiency.</li>

          <li>✔ Suggests the best fertilizer for your crop.</li>

          <li>✔ Provides organic fertilizer alternatives.</li>

          <li>✔ Recommends quantity and application time.</li>

          <li>✔ Gives AI-based farming tips.</li>

        </ul>

      </div>

      {/* Analyze Button */}

      <div className="mt-8">

        <button

          onClick={predictFertilizer}

          disabled={loading}

          className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 rounded-xl text-lg font-bold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 disabled:opacity-60"

        >

          {loading

            ? "🤖 AI Analyzing..."

            : "🌱 Analyze Fertilizer"}

        </button>

      </div>

    </div>

  );

}

export default FertilizerForm;