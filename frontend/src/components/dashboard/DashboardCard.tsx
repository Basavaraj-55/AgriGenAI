type DashboardCardProps = {
  title: string;
  description: string;
  icon: string;
};

function DashboardCard({
  title,
  description,
  icon,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-green-700">
        {title}
      </h2>

      <p className="mt-3 text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default DashboardCard;