import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menus = [
    { title: "🏠 Dashboard", path: "/dashboard" },
    { title: "🌱 Crop Recommendation", path: "/crop" },
    { title: "🍃 Disease Detection", path: "/disease" },
    { title: "🌦 Weather Forecast", path: "/weather" },
    { title: "💧 Smart Irrigation", path: "/irrigation" },
    { title: "🌿 Fertilizer", path: "/fertilizer" },
    { title: "📈 Market Prices", path: "/market" },
    { title: "🤖 AI Chatbot", path: "/chatbot" },
    { title: "🎤 Voice Assistant", path: "/voice" },
    { title: "👤 Profile", path: "/profile" },
    { title: "⚙ Settings", path: "/settings" },
  ];

  return (
    <aside className="w-72 min-h-screen bg-green-800 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        🌾 AgriGenAI
      </h1>

      <nav className="space-y-3">

        {menus.map((menu) => (

          <button
            key={menu.title}
            onClick={() => navigate(menu.path)}
            className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-green-700"
          >
            {menu.title}
          </button>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;