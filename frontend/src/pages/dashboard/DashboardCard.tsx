interface DashboardCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

function DashboardCard({
  icon,
  title,
  description,
  onClick,
}: DashboardCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-xl active:scale-95"
    >
      <div className="mb-4 text-5xl">{icon}</div>

      <h2 className="mb-3 text-2xl font-bold text-green-700">
        {title}
      </h2>

      <p className="leading-7 text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default DashboardCard;