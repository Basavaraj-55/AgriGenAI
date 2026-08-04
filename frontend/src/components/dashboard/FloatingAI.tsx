import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FloatingAI() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chatbot");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">

      <button
        onClick={handleClick}
        className="flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-600 to-green-600 px-6 py-4 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-green-300"
      >
        <Bot size={26} />

        <span className="font-semibold">
          Ask AI
        </span>

      </button>

    </div>
  );
}

export default FloatingAI;