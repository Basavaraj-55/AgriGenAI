import { FiSearch, FiMapPin } from "react-icons/fi";
import { FaSeedling } from "react-icons/fa";

function SearchBar() {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 -mt-12 relative z-20 max-w-6xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Search Product */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <FaSeedling className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <select
            className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Seeds</option>
            <option>Fertilizers</option>
            <option>Machinery</option>
            <option>Irrigation</option>
          </select>
        </div>

        {/* Location */}
        <div className="relative">
          <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Enter location"
            className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Search Button */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-300"
        >
          Search
        </button>

      </div>

    </section>
  );
}

export default SearchBar;