function About() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
          About AgriGenAI
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800"
              alt="Agriculture"
              className="rounded-2xl shadow-xl"
            />
          </div>

          <div>

            <h3 className="text-3xl font-bold mb-6 text-green-700">
              Smart Farming Powered by Artificial Intelligence
            </h3>

            <p className="text-lg text-gray-700 leading-8">
              AgriGenAI helps farmers improve productivity using
              Artificial Intelligence, Machine Learning and Computer Vision.
              Our platform provides crop recommendations, disease detection,
              weather forecasting, irrigation management and market price prediction.
            </p>

            <button className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700">
              Read More
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;