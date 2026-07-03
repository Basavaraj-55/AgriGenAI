interface QuickQuestionsProps {

  onSelect: (question: string) => void;

}

function QuickQuestions({

  onSelect,

}: QuickQuestionsProps) {

  const questions = [

    "🌾 Which crop is best for my farm?",

    "💧 Should I irrigate today?",

    "🌿 Which fertilizer should I use?",

    "🐛 My crop has a disease. What should I do?",

    "🌦 How is today's weather for farming?",

    "📈 Should I sell my crop now?",

    "🌱 How can I improve soil fertility?",

    "🚜 Give me modern farming tips."

  ];

  return (

    <div className="border-b bg-green-50 p-5">

      <h3 className="mb-4 text-lg font-bold text-green-700">

        ⚡ Quick Questions

      </h3>

      <div className="flex flex-wrap gap-3">

        {questions.map((question, index) => (

          <button

            key={index}

            onClick={() => onSelect(question)}

            className="rounded-full border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-600 hover:text-white"

          >

            {question}

          </button>

        ))}

      </div>

    </div>

  );

}

export default QuickQuestions;