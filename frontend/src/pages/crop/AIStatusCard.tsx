import {
  FaBrain,
  FaLeaf,
  FaCloudSun,
  FaTint,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf className="text-3xl text-green-600" />,
    title: "Soil Analysis",
    description: "Analyzes N, P, K values and soil pH.",
  },
  {
    icon: <FaCloudSun className="text-3xl text-yellow-500" />,
    title: "Weather Analysis",
    description: "Considers temperature, humidity and rainfall.",
  },
  {
    icon: <FaTint className="text-3xl text-blue-600" />,
    title: "Water Requirement",
    description: "Suggests irrigation needs for the recommended crop.",
  },
  {
    icon: <FaChartLine className="text-3xl text-purple-600" />,
    title: "Yield Optimization",
    description: "Recommends crops for maximum productivity.",
  },
];

export default function AIStatusCard() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <FaBrain className="text-4xl text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800">
          AI Crop Recommendation Engine
        </h2>

        <p className="mt-3 text-gray-600">
          Our machine learning model analyzes soil nutrients,
          weather conditions and environmental factors to recommend
          the best crop with high accuracy.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {feature.icon}

            <h3 className="mt-5 text-lg font-bold text-gray-800">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-2xl" />

          <h3 className="text-xl font-bold">
            AI Prediction Ready
          </h3>
        </div>

        <p className="mt-3 text-green-100">
          The AI engine is ready to analyze your soil information and
          generate accurate crop recommendations to help improve
          agricultural productivity.
        </p>
      </div>
    </section>
  );
}