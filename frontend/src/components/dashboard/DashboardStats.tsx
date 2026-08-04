import {
  Sprout,
  CloudSun,
  TrendingUp,
  Bot,
} from "lucide-react";

function DashboardStats() {
  const stats = [
    {
      title: "AI Services",
      value: "9",
      icon: <Sprout size={24} />,
      color: "bg-green-500",
    },
    {
      title: "Weather",
      value: "28°C",
      icon: <CloudSun size={24} />,
      color: "bg-sky-500",
    },
    {
      title: "Market",
      value: "Live",
      icon: <TrendingUp size={24} />,
      color: "bg-orange-500",
    },
    {
      title: "AI Assistant",
      value: "24/7",
      icon: <Bot size={24} />,
      color: "bg-emerald-500",
    },
  ];

  return (
    <section className="mb-8">

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

        {stats.map((item, index) => (

          <div
            key={index}
            className="rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} text-white`}
            >
              {item.icon}
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {item.value}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {item.title}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default DashboardStats;