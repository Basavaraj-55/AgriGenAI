function Stats() {
  const stats = [
    {
      number: "50K+",
      title: "Farmers",
      description: "Using AgriGenAI"
    },
    {
      number: "100+",
      title: "Crop Types",
      description: "Supported"
    },
    {
      number: "98%",
      title: "AI Accuracy",
      description: "Disease Detection"
    },
    {
      number: "24/7",
      title: "Monitoring",
      description: "Weather & Irrigation"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          Our Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition duration-300"
            >
              <h1 className="text-5xl font-bold text-green-700">
                {item.number}
              </h1>

              <h3 className="text-2xl font-semibold mt-4">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;