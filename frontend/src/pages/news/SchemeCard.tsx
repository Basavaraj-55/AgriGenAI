import React from "react";

interface SchemeCardProps {
  name: string;
  status: string;
  benefit: string;
  category: string;
  state: string;
  last_date: string;
  description: string;
  apply_link: string;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  name,
  status,
  benefit,
  category,
  state,
  last_date,
  description,
  apply_link,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-bold text-green-800">
          🏛 {name}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>

      </div>

      {/* Description */}

      <p className="text-gray-600 leading-6">
        {description}
      </p>

      {/* Information */}

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div>

          <h4 className="font-semibold text-green-700">
            💰 Benefit
          </h4>

          <p>{benefit}</p>

        </div>

        <div>

          <h4 className="font-semibold text-green-700">
            📂 Category
          </h4>

          <p>{category}</p>

        </div>

        <div>

          <h4 className="font-semibold text-green-700">
            📍 State
          </h4>

          <p>{state}</p>

        </div>

        <div>

          <h4 className="font-semibold text-green-700">
            📅 Last Date
          </h4>

          <p>{last_date}</p>

        </div>

      </div>

      {/* Button */}

      <a
        href={apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block w-full text-center bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
      >
        Apply Now →
      </a>

    </div>
  );
};

export default SchemeCard;