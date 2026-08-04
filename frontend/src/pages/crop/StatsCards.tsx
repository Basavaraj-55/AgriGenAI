import {
  FaChartLine,
  FaRobot,
  FaUsers,
  FaBolt,
} from "react-icons/fa";

const stats = [
  {
    title: "Predictions",
    value: "15,248",
    description: "Crop recommendations generated",
    icon: FaChartLine,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "AI Accuracy",
    value: "98%",
    description: "Random Forest Model",
    icon: FaRobot,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Farmers",
    value: "12,540",
    description: "Active users",
    icon: FaUsers,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Response",
    value: "0.4s",
    description: "Average prediction time",
    icon: FaBolt,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
];

export default function StatsCards() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
            >
              <Icon className={`text-2xl ${card.color}`} />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              {card.value}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {card.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}