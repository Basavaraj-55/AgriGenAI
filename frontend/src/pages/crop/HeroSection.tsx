import cropBanner from "../../assets/crop-banner.jpg";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaRobot,
} from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-xl">

      {/* Background Image */}
      <img
        src={cropBanner}
        alt="AI Crop Recommendation"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 via-green-900/60 to-green-700/30" />

      {/* Content */}
      <div className="relative grid min-h-[280px] items-center gap-8 px-8 py-8 lg:grid-cols-2">

        {/* Left Content */}
        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md">
            <FaRobot />
            AI Powered Agriculture
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white lg:text-5xl">
            AI Crop
            <br />
            Recommendation
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-green-100">
            Get accurate crop recommendations using AI based on soil nutrients,
            weather, rainfall, humidity, and environmental conditions.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <button className="flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600">
              Start Prediction
              <FaArrowRight />
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
              <FaCloudUploadAlt />
              Upload Soil Report
            </button>

          </div>

        </div>

        {/* Right Status Card */}
        <div className="hidden justify-end lg:flex">

          <div className="w-72 rounded-2xl bg-white/20 p-6 backdrop-blur-xl">

            <h2 className="text-2xl font-bold text-white">
              AI Model Status
            </h2>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-3 w-3 animate-pulse rounded-full bg-green-400" />
              <span className="font-medium text-white">Online</span>
            </div>

            <div className="mt-6 space-y-4 text-white">

              <div className="flex justify-between">
                <span>Model</span>
                <span>Random Forest</span>
              </div>

              <div className="flex justify-between">
                <span>Accuracy</span>
                <span>98%</span>
              </div>

              <div className="flex justify-between">
                <span>Response Time</span>
                <span>0.4 sec</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span className="flex items-center gap-2 text-green-300">
                  <FaCheckCircle />
                  Ready
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}