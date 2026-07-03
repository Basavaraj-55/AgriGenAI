function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center px-8">
      <div className="text-center max-w-4xl">

        <h1 className="text-6xl font-extrabold text-green-800">
          🌾 AgriGenAI
        </h1>

        <p className="mt-6 text-2xl text-gray-700">
          AI Powered Precision Agriculture Platform
        </p>

        <p className="mt-4 text-lg text-gray-600">
          Helping farmers with Artificial Intelligence,
          Machine Learning, Computer Vision,
          Weather Intelligence and Smart Farming.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700">
            Get Started
          </button>

          <button className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-xl hover:bg-green-600 hover:text-white">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;