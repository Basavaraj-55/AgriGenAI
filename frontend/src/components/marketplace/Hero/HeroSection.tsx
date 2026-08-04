import { FaLeaf, FaStore } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-500">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              🌾 Welcome to AgriMart
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Buy & Sell
              <br />
              Agricultural Products
            </h1>

            <p className="mt-6 text-lg text-green-100 leading-8 max-w-xl">
              Connect farmers, buyers, and agricultural businesses on one
              trusted marketplace. Discover quality products and grow your
              farming business with confidence.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <button className="flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition">
                Explore Products
                <FiArrowRight />
              </button>

              <button className="flex items-center gap-2 border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition">
                <FaStore />
                Become a Seller
              </button>

            </div>

          </div>

          {/* Right Side */}
          <div className="flex justify-center">

            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <FaLeaf className="text-5xl text-green-600" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-800">
                Fresh. Trusted. Local.
              </h2>

              <p className="text-center text-gray-500 mt-4">
                A modern marketplace for farmers, buyers, and agricultural
                businesses.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">100+</h3>
                  <p className="text-sm text-gray-500">Products</p>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">50+</h3>
                  <p className="text-sm text-gray-500">Sellers</p>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">24/7</h3>
                  <p className="text-sm text-gray-500">Support</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;