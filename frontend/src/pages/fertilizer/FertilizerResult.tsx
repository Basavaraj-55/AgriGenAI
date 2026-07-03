interface FertilizerResultProps {

  result: {

    deficiency: string;

    fertilizer: string;

    alternative: string;

    organic: string;

    quantity: string;

    time: string;

    recovery: string;

    confidence: string;

    tips: string;

  };

}

function FertilizerResult({

  result,

}: FertilizerResultProps) {

  return (

    <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-green-700 mb-8">

        🌱 AI Fertilizer Report

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Deficiency */}

        <div className="bg-red-50 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-700">

            🧪 Detected Problem

          </h3>

          <p className="text-2xl font-bold text-red-600 mt-3">

            {result.deficiency}

          </p>

        </div>

        {/* Confidence */}

        <div className="bg-blue-50 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-700">

            📊 AI Confidence

          </h3>

          <p className="text-3xl font-bold text-blue-600 mt-3">

            {result.confidence}

          </p>

        </div>

        {/* Fertilizer */}

        <div className="bg-green-50 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-700">

            🌱 Recommended Fertilizer

          </h3>

          <p className="text-2xl font-bold text-green-700 mt-3">

            {result.fertilizer}

          </p>

        </div>

        {/* Quantity */}

        <div className="bg-yellow-50 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-700">

            📦 Quantity

          </h3>

          <p className="text-2xl font-bold text-yellow-700 mt-3">

            {result.quantity}

          </p>

        </div>
                {/* Alternative Fertilizer */}

        <div className="bg-purple-50 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-700">

            🌿 Alternative Fertilizer

          </h3>

          <p className="text-2xl font-bold text-purple-700 mt-3">

            {result.alternative}

          </p>

        </div>

        {/* Organic Alternative */}

        <div className="bg-emerald-50 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-700">

            🍀 Organic Alternative

          </h3>

          <p className="text-2xl font-bold text-emerald-700 mt-3">

            {result.organic}

          </p>

        </div>

        {/* Best Time */}

        <div className="bg-cyan-50 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-700">

            ⏰ Best Application Time

          </h3>

          <p className="text-2xl font-bold text-cyan-700 mt-3">

            {result.time}

          </p>

        </div>

        {/* Recovery */}

        <div className="bg-orange-50 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-700">

            📅 Expected Recovery

          </h3>

          <p className="text-2xl font-bold text-orange-600 mt-3">

            {result.recovery}

          </p>

        </div>

      </div>

      {/* AI Tips */}

      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-6">

        <h3 className="text-2xl font-bold text-green-700 mb-4">

          🤖 AI Farming Advice

        </h3>

        <p className="text-gray-700 leading-8">

          {result.tips}

        </p>

      </div>

      {/* Important Notes */}

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-5">

        <h3 className="font-bold text-yellow-700 mb-3">

          ⚠ Important Notes

        </h3>

        <ul className="list-disc list-inside text-gray-700 space-y-2">

          <li>Apply fertilizer according to the recommended quantity.</li>

          <li>Avoid fertilizer application before heavy rainfall.</li>

          <li>Irrigate the field after fertilizer application if required.</li>

          <li>Monitor crop growth for the next 7–10 days.</li>

          <li>If symptoms persist, consult a local agriculture expert.</li>

        </ul>

      </div>

    </div>

  );

}

export default FertilizerResult;