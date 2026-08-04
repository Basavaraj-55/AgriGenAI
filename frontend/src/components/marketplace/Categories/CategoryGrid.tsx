import {
  FaSeedling,
  FaAppleAlt,
  FaTractor,
  FaLeaf,
  FaTools,
} from "react-icons/fa";
import { GiWheat, GiWateringCan } from "react-icons/gi";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Seeds",
    description: "Certified and high-quality seeds for better yield.",
    icon: <FaSeedling className="text-3xl text-green-700" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Fruits",
    description: "Fresh fruits directly from trusted farmers.",
    icon: <FaAppleAlt className="text-3xl text-red-600" />,
    bgColor: "bg-red-100",
  },
  {
    title: "Grains",
    description: "Rice, wheat, maize and other food grains.",
    icon: <GiWheat className="text-3xl text-yellow-600" />,
    bgColor: "bg-yellow-100",
  },
  {
    title: "Fertilizers",
    description: "Organic and chemical fertilizers for all crops.",
    icon: <FaLeaf className="text-3xl text-emerald-600" />,
    bgColor: "bg-emerald-100",
  },
  {
    title: "Irrigation",
    description: "Drip irrigation and sprinkler systems.",
    icon: <GiWateringCan className="text-3xl text-blue-600" />,
    bgColor: "bg-blue-100",
  },
  {
    title: "Machinery",
    description: "Modern agricultural machinery and equipment.",
    icon: <FaTractor className="text-3xl text-orange-600" />,
    bgColor: "bg-orange-100",
  },
  {
    title: "Farm Tools",
    description: "Essential farming tools.",
    icon: <FaTools className="text-3xl text-purple-600" />,
    bgColor: "bg-purple-100",
  },
  {
    title: "Vegetables",
    description: "Fresh vegetables from local farmers.",
    icon: <FaLeaf className="text-3xl text-lime-600" />,
    bgColor: "bg-lime-100",
  },
];

function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Browse Categories
        </h2>

        <p className="mt-3 mx-auto max-w-2xl text-gray-500">
          Explore agricultural products, machinery, fertilizers, irrigation
          systems, and much more.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            description={category.description}
            icon={category.icon}
            bgColor={category.bgColor}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;