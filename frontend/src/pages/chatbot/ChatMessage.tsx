interface ChatMessageProps {
  sender: "user" | "bot";
  text: string;
}

function ChatMessage({
  sender,
  text,
}: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-3xl border shadow-2xl transition-all duration-300 hover:scale-[1.01] ${
          isUser
            ? "bg-gradient-to-r from-green-600 to-emerald-500 border-green-500 text-white rounded-br-lg"
            : "bg-[#0F172A] border-[#1F2937] text-gray-100 rounded-bl-lg"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between px-5 pt-5">

          <div className="flex items-center gap-3">

            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${
                isUser
                  ? "bg-white/20"
                  : "bg-green-600 shadow-lg"
              }`}
            >
              {isUser ? "👨‍🌾" : "🌾"}
            </div>

            <div>

              <h3 className="font-semibold text-lg">
                {isUser ? "Farmer" : "AgriGenAI"}
              </h3>

              <p className="text-xs text-gray-400">
                Just now
              </p>

            </div>

          </div>

          {!isUser && (
            <button
              title="Copy"
              className="text-gray-400 hover:text-green-400 text-xl transition"
            >
              📋
            </button>
          )}

        </div>

        {/* Message */}

        <div className="px-5 py-5">

          <p className="whitespace-pre-wrap leading-8 text-[16px]">
            {text}
          </p>

        </div>

        {/* Footer */}

        {!isUser && (

          <div className="flex items-center gap-5 px-5 pb-5 text-xl border-t border-[#1F2937] pt-4">

            <button
              className="hover:scale-125 transition"
              title="Like"
            >
              👍
            </button>

            <button
              className="hover:scale-125 transition"
              title="Dislike"
            >
              👎
            </button>

            <button
              className="hover:scale-125 transition"
              title="Regenerate"
            >
              🔄
            </button>

          </div>

        )}

      </div>
    </div>
  );
}

export default ChatMessage;