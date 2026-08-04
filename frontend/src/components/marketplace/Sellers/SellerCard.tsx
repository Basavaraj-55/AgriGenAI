import { FaStore, FaStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

interface SellerCardProps {
  name: string;
  location: string;
  rating: number;
  totalProducts: number;
}

function SellerCard({
  name,
  location,
  rating,
  totalProducts,
}: SellerCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Seller Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <FaStore className="text-3xl text-green-700" />
      </div>

      {/* Seller Name */}
      <h3 className="mt-5 text-xl font-semibold text-gray-800">
        {name}
      </h3>

      {/* Location */}
      <div className="mt-3 flex items-center gap-2 text-gray-500">
        <FiMapPin />
        <span>{location}</span>
      </div>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-2">
        <FaStar className="text-yellow-500" />
        <span className="font-medium">{rating}</span>
      </div>

      {/* Products */}
      <p className="mt-3 text-gray-500">
        Products:{" "}
        <span className="font-semibold text-gray-800">
          {totalProducts}
        </span>
      </p>

      {/* Button */}
      <button className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">
        View Seller
      </button>

    </div>
  );
}

export default SellerCard;