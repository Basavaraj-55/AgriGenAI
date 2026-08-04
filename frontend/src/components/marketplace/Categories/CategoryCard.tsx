import React from "react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor?: string;
}

function CategoryCard({
  title,
  description,
  icon,
  bgColor = "bg-green-100",
}: CategoryCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Icon */}
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${bgColor}`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-5 text-xl font-semibold text-gray-800">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

      {/* Button */}
      <button className="mt-5 font-medium text-green-600 transition-colors hover:text-green-700">
        Explore →
      </button>
    </div>
  );
}

export default CategoryCard;