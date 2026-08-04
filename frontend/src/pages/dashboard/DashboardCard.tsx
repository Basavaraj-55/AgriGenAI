import { ArrowRight } from "lucide-react";

type DashboardCardProps = {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
};

function DashboardCard({
  icon,
  title,
  description,
  onClick,
}: DashboardCardProps) {
  return (

    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >

      {/* Top Border */}

      <div className="h-1 rounded-full bg-gradient-to-r from-sky-500 to-green-500"></div>

      {/* Icon */}

      <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-green-100 text-4xl transition-all duration-300 group-hover:scale-110">

        {icon}

      </div>

      {/* Title */}

      <h2 className="mt-5 text-xl font-bold text-gray-800">

        {title}

      </h2>

      {/* Description */}

      <p className="mt-3 text-sm leading-6 text-gray-500">

        {description}

      </p>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <span className="font-medium text-sky-600">

          Open Module

        </span>

        <div className="rounded-full bg-gradient-to-r from-sky-500 to-green-500 p-2 text-white transition-all duration-300 group-hover:translate-x-2">

          <ArrowRight size={18} />

        </div>

      </div>

    </div>

  );
}

export default DashboardCard;