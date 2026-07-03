import {
  FaLeaf,
  FaSeedling,
  FaCloudSunRain,
  FaTint,
  FaChartLine,
  FaMicrophone,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaLeaf className="text-5xl text-green-600" />,
      title: "Plant Disease Detection",
      description:
        "Upload crop images and detect diseases using AI-powered computer vision.",
    },
    {
      icon: <FaSeedling className="text-5xl text-green-600" />,
      title: "Crop Recommendation",
      description:
        "Get the best crop suggestions based on soil, weather, and location.",
    },
    {
      icon: <FaCloudSunRain className="text-5xl text-green-600" />,
      title: "Weather Forecast",
      description:
        "Real-time weather predictions to help farmers make better decisions.",
    },
    {
      icon: <FaTint className="text-5xl text-green-600" />,
      title: "Smart Irrigation",
      description:
        "AI-based irrigation recommendations to save water and improve yield.",
    },
    {
      icon: <FaChartLine className="text-5xl text-green-600" />,
      title: "Market Price Prediction",
      description:
        "Predict crop prices using machine learning and market trends.",
    },
    {
      icon: <FaMicrophone className="text-5xl text-green-600" />,
      title: "Voice Assistant",
      description:
        "Speak in Kannada, Hindi, or English and get instant farming guidance.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          Our AI Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;