interface QuickQuestionsProps {
  onSelect: (question: string) => void;
}

function QuickQuestions({
  onSelect,
}: QuickQuestionsProps) {

  const questions = [
    {
      icon: "🌾",
      title: "Best Crop",
      question: "Which crop is best for my farm?",
    },
    {
      icon: "💧",
      title: "Irrigation",
      question: "Should I irrigate today?",
    },
    {
      icon: "🌿",
      title: "Fertilizer",
      question: "Which fertilizer should I use?",
    },
    {
      icon: "🐛",
      title: "Disease",
      question: "My crop has a disease. What should I do?",
    },
    {
      icon: "🌦",
      title: "Weather",
      question: "How is today's weather for farming?",
    },
    {
      icon: "📈",
      title: "Market",
      question: "Should I sell my crop now?",
    },
    {
      icon: "🌱",
      title: "Soil",
      question: "How can I improve soil fertility?",
    },
    {
      icon: "🚜",
      title: "Modern Farming",
      question: "Give me modern farming tips.",
    },
  ];

  return (
    <div className="bg-[#0F172A] px-6 py-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-xl font-bold text-white">
            ⚡ Quick Questions
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Ask common farming questions instantly.
          </p>

        </div>

      </div>

      {/* Question Chips */}

      <div className="flex flex-wrap gap-4">

        {questions.map((item, index) => (

          <button
            key={index}
            onClick={() => onSelect(item.question)}
            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[#334155]
              bg-[#1E293B]
              px-5
              py-3
              transition-all
              duration-300
              hover:border-green-500
              hover:bg-green-600
              hover:scale-105
              hover:shadow-lg
              hover:shadow-green-500/30
            "
          >

            <span className="text-2xl">
              {item.icon}
            </span>

            <div className="text-left">

              <p className="font-semibold text-white text-sm">
                {item.title}
              </p>

              <p className="text-xs text-gray-400 group-hover:text-white">
                Click to ask
              </p>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}

export default QuickQuestions;