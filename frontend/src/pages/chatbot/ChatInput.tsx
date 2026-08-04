import { useState, useRef } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
}

function ChatInput({ onSend, loading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef<any>(null);

  // ======================================================
  // Send Message
  // ======================================================

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  // ======================================================
  // Enter Key
  // ======================================================

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // ======================================================
  // Voice Recognition
  // ======================================================

  const toggleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    setListening(true);

    recognition.start();

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;

      setMessage(text);

      onSend(text);

      setMessage("");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  return (
    <div className="bg-[#111827] rounded-3xl border border-gray-700 shadow-2xl p-4">

      <div className="flex items-center gap-3">

        {/* More */}

        <button
          className="w-12 h-12 rounded-2xl bg-[#1F2937] hover:bg-[#374151] transition text-green-400 text-xl"
        >
          ➕
        </button>

        {/* Upload Image */}

        <button
          className="w-12 h-12 rounded-2xl bg-[#1F2937] hover:bg-[#374151] transition text-green-400 text-xl"
        >
          🖼️
        </button>

        {/* Upload PDF */}

        <button
          className="w-12 h-12 rounded-2xl bg-[#1F2937] hover:bg-[#374151] transition text-green-400 text-xl"
        >
          📄
        </button>

        {/* Input */}

        <input
          type="text"
          placeholder="Ask anything about farming..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="
            flex-1
            bg-transparent
            text-white
            placeholder:text-gray-400
            outline-none
            text-lg
            px-2
          "
        />

        {/* Voice */}

        <button
          onClick={toggleVoice}
          disabled={loading}
          className={`w-12 h-12 rounded-full transition text-white ${
            listening
              ? "bg-red-500 animate-pulse"
              : "bg-[#1F2937] hover:bg-[#374151]"
          }`}
        >
          🎤
        </button>

        {/* Send */}

        <button
          onClick={handleSend}
          disabled={loading}
          className="
            w-14
            h-14
            rounded-full
            bg-gradient-to-r
            from-green-500
            to-emerald-400
            text-white
            text-xl
            shadow-lg
            hover:scale-105
            transition
            disabled:opacity-50
          "
        >
          ➤
        </button>

      </div>

      {/* Hint */}

      <div className="mt-3 text-center text-sm text-gray-400">
        🌾 Ask about crops, fertilizers, irrigation, weather, diseases, market prices, or general questions.
      </div>

    </div>
  );
}

export default ChatInput;