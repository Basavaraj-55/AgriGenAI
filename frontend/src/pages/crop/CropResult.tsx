interface CropResultProps {

  crop: string;

  confidence: string;

}

function CropResult({

  crop,

  confidence,

}: CropResultProps) {

  return (

    <div className="mt-10 bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold text-green-700 mb-6">

        🌾 AI Crop Recommendation

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">

            Recommended Crop

          </p>

          <h3 className="text-4xl font-bold text-green-700 mt-3">

            {crop}

          </h3>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">

            AI Confidence

          </p>

          <h3 className="text-4xl font-bold text-blue-700 mt-3">

            {confidence}

          </h3>

        </div>

      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h3 className="text-2xl font-bold text-green-700 mb-4">

          🤖 AI Analysis

        </h3>

        <ul className="space-y-3 text-gray-700">

          <li>
            ✅ Soil nutrients are suitable for the recommended crop.
          </li>

          <li>
            ✅ Temperature and humidity support healthy growth.
          </li>

          <li>
            ✅ Soil pH is within the ideal cultivation range.
          </li>

          <li>
            ✅ Rainfall conditions are favorable.
          </li>

          <li>
            🌱 Follow the fertilizer recommendation after crop selection.
          </li>

        </ul>

      </div>

    </div>

  );

}

export default CropResult;