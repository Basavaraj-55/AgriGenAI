interface CropFormProps {

  formData: {

    nitrogen: string;

    phosphorus: string;

    potassium: string;

    temperature: string;

    humidity: string;

    ph: string;

    rainfall: string;

  };

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  predictCrop: () => void;

  loading: boolean;

}

function CropForm({

  formData,

  handleChange,

  predictCrop,

  loading,

}: CropFormProps) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold text-green-700 mb-2">

        🌾 Crop Details

      </h2>

      <p className="text-gray-500 mb-8">

        Enter soil parameters manually or verify the values extracted from the Soil Health Card.

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Nitrogen */}

        <div>

          <label className="block font-semibold mb-2">

            Nitrogen (N)

          </label>

          <input

            type="number"

            name="nitrogen"

            value={formData.nitrogen}

            onChange={handleChange}

            placeholder="Enter Nitrogen"

            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"

          />

        </div>

        {/* Phosphorus */}

        <div>

          <label className="block font-semibold mb-2">

            Phosphorus (P)

          </label>

          <input

            type="number"

            name="phosphorus"

            value={formData.phosphorus}

            onChange={handleChange}

            placeholder="Enter Phosphorus"

            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"

          />

        </div>

        {/* Potassium */}

        <div>

          <label className="block font-semibold mb-2">

            Potassium (K)

          </label>

          <input

            type="number"

            name="potassium"

            value={formData.potassium}

            onChange={handleChange}

            placeholder="Enter Potassium"

            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"

          />

        </div>

        {/* Temperature */}

        <div>

          <label className="block font-semibold mb-2">

            Temperature (°C)

          </label>

          <input

            type="number"

            name="temperature"

            value={formData.temperature}

            onChange={handleChange}

            placeholder="Enter Temperature"

            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"

          />

        </div>
                {/* Humidity */}

        <div>

          <label className="block font-semibold mb-2">

            Humidity (%)

          </label>

          <input

            type="number"

            name="humidity"

            value={formData.humidity}

            onChange={handleChange}

            placeholder="Enter Humidity"

            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"

          />

        </div>

        {/* pH */}

        <div>

          <label className="block font-semibold mb-2">

            pH Value

          </label>

          <input

            type="number"

            step="0.1"

            name="ph"

            value={formData.ph}

            onChange={handleChange}

            placeholder="Enter pH Value"

            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"

          />

        </div>

        {/* Rainfall */}

        <div>

          <label className="block font-semibold mb-2">

            Rainfall (mm)

          </label>

          <input

            type="number"

            name="rainfall"

            value={formData.rainfall}

            onChange={handleChange}

            placeholder="Enter Rainfall"

            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"

          />

        </div>

      </div>

      {/* Information Box */}

      <div className="mt-8 bg-green-50 border-l-4 border-green-600 p-5 rounded-lg">

        <h3 className="font-bold text-green-700 mb-2">

          💡 Tip

        </h3>

        <p className="text-gray-700">

          If you don't know your soil values, go back and choose
          <strong> "Upload Soil Health Card"</strong>.
          AI will automatically extract the values and fill this form.

        </p>

      </div>

      {/* Predict Button */}

      <div className="mt-8">

        <button

          onClick={predictCrop}

          disabled={loading}

          className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 disabled:opacity-60"

        >

          {loading

            ? "🤖 Predicting..."

            : "🌾 Predict Crop"}

        </button>

      </div>

    </div>

  );

}

export default CropForm;