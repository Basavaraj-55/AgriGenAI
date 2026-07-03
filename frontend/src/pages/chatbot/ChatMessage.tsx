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
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >

      <div
        className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-md ${
          isUser
            ? "bg-green-600 text-white rounded-br-md"
            : "bg-white border border-green-100 text-gray-800 rounded-bl-md"
        }`}
      >

        {/* Header */}

        <div className="flex items-center gap-2 mb-2">

          <span className="text-xl">

            {isUser ? "👨‍🌾" : "🤖"}

          </span>

          <span className="font-semibold">

            {isUser
              ? "Farmer"
              : "AgriGenAI Assistant"}

          </span>

        </div>

        {/* Message */}

        <p className="leading-7 whitespace-pre-wrap">

          {text}

        </p>

      </div>

    </div>

  );

}

export default ChatMessage;
