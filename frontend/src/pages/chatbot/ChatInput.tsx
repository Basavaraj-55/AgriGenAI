import { useState } from "react";

interface ChatInputProps {

  onSend: (message: string) => void;

  loading: boolean;

}

function ChatInput({

  onSend,

  loading,

}: ChatInputProps) {

  const [message, setMessage] = useState("");

  const handleSend = () => {

    if (!message.trim()) return;

    onSend(message);

    setMessage("");

  };

  const handleKeyDown = (

    e: React.KeyboardEvent<HTMLInputElement>

  ) => {

    if (e.key === "Enter") {

      handleSend();

    }

  };

  return (

    <div className="flex items-center gap-4">

      <input

        type="text"

        placeholder="Ask anything about farming..."

        value={message}

        onChange={(e) => setMessage(e.target.value)}

        onKeyDown={handleKeyDown}

        className="flex-1 rounded-2xl border border-green-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"

        disabled={loading}

      />

      <button

        onClick={handleSend}

        disabled={loading}

        className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 font-semibold text-white transition hover:from-green-700 hover:to-emerald-600 disabled:opacity-50"

      >

        {loading ? "..." : "➤ Send"}

      </button>

    </div>

  );

}

export default ChatInput;