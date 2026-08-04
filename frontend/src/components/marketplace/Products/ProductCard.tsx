import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  price: number;
  location: string;
  seller: string;
  rating: number;
}

function ProductCard({
  image,
  name,
  category,
  price,
  location,
  seller,
  rating,
}: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Product Image */}
      <div className="h-56 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {category}
        </span>

        <h3 className="mt-3 text-xl font-semibold text-gray-800">
          {name}
        </h3>

        <p className="mt-2 text-2xl font-bold text-green-600">
          ₹{price}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="text-gray-700">{rating}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <FiMapPin />
            <span>{location}</span>
          </div>

        </div>

        <p className="mt-3 text-sm text-gray-500">
          Seller : <span className="font-medium">{seller}</span>
        </p>

        <button className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">
          View Details
        </button>

      </div>

    </div>
  );
}

export default ProductCard;