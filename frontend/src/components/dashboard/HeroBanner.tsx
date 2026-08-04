import {
  CloudSun,
  Droplets,
  Wind,
  MapPin,
} from "lucide-react";

function HeroBanner() {
  return (

    <section className="mb-8 rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-green-600 shadow-xl">

      <div className="px-8 py-10">

        {/* Center */}

        <div className="text-center">

          <h2 className="text-4xl font-bold text-white">

            🌾 Welcome to AgriGenAI

          </h2>

          <p className="mt-3 text-lg text-sky-100">

            Welcome to AgriGenAI

          </p>

          <p className="mt-1 text-sky-200">

            AI Powered Smart Farming Platform

          </p>

        </div>

        {/* Weather */}

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <div className="flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-white backdrop-blur">

            <CloudSun size={22} />

            <span className="font-medium">
              28°C
            </span>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-white backdrop-blur">

            <Droplets size={22} />

            <span className="font-medium">
              72%
            </span>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-white backdrop-blur">

            <Wind size={22} />

            <span className="font-medium">
              12 km/h
            </span>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-white backdrop-blur">

            <MapPin size={22} />

            <span className="font-medium">
              Bengaluru
            </span>

          </div>

        </div>

      </div>

    </section>

  );
}

export default HeroBanner;