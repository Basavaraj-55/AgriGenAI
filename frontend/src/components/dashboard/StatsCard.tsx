type StatsCardProps = {
  title: string;
  value: string;
  icon: string;
};

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-gray-500 text-lg font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold text-green-700 mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;