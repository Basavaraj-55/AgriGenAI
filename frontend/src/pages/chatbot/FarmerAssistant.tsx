import { useState, useRef, useEffect } from "react";

import MainLayout from "../../components/layout/MainLayout";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import QuickQuestions from "./QuickQuestions";

import { sendMessage as sendChatMessage } from "./chatbotApi";

interface Message {
  sender: "user" | "bot";
  text: string;
}

function FarmerAssistant() {

  // ==========================================================
  // State
  // ==========================================================

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "👋 Welcome to AgriGenAI! I am your AI Farming Assistant. Ask me anything about crops, diseases, fertilizers, irrigation, weather, government schemes, or market prices.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ==========================================================
  // Auto Scroll
  // ==========================================================

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ==========================================================
  // Send Message
  // ==========================================================

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
    ]);

    setLoading(true);

    try {
      const data = await sendChatMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "❌ Sorry! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Quick Questions
  // ==========================================================

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <MainLayout>

      <div className="min-h-screen bg-[#030712]">

        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* ================= Header ================= */}

          <div className="rounded-3xl border border-green-500/20 bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#1E293B] shadow-2xl p-8 mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <h1 className="text-4xl font-bold text-white">
                  🌾 AgriGenAI Assistant
                </h1>

                <p className="mt-3 text-gray-300 text-lg">
                  Your Smart Agriculture Companion powered by AI.
                </p>

              </div>

              <div className="flex gap-3">

                <div className="px-5 py-3 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold">
                  AI Online
                </div>

              </div>

            </div>

          </div>

          {/* ================= Chat Box ================= */}

          <div className="rounded-3xl overflow-hidden border border-[#1F2937] bg-[#0F172A] shadow-2xl">

            {/* Quick Questions */}

            <div className="border-b border-[#1F2937] bg-[#111827] p-5">

              <QuickQuestions
                onSelect={handleQuickQuestion}
              />

            </div>

            {/* Chat Messages */}

            <div
              ref={chatContainerRef}
              className="h-[70vh] overflow-y-auto bg-[#111827] p-8 space-y-6"
            >
                            {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  sender={message.sender}
                  text={message.text}
                />
              ))}

              {/* AI Typing */}

              {loading && (
                <div className="flex justify-start">

                  <div className="max-w-md rounded-3xl bg-[#1F2937] border border-green-500/20 shadow-lg px-6 py-5">

                    <div className="flex items-center gap-3 mb-3">

                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-lg">
                        🌾
                      </div>

                      <div>

                        <h3 className="font-semibold text-white">
                          AgriGenAI
                        </h3>

                        <p className="text-xs text-gray-400">
                          Thinking...
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-2">

                      <span className="w-3 h-3 rounded-full bg-green-400 animate-bounce"></span>

                      <span
                        className="w-3 h-3 rounded-full bg-green-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>

                      <span
                        className="w-3 h-3 rounded-full bg-green-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></span>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* Input Section */}

            <div className="border-t border-[#1F2937] bg-[#0B1120] p-6">

              <ChatInput
                onSend={sendMessage}
                loading={loading}
              />

            </div>

          </div>

          {/* Footer */}

          <div className="mt-8 text-center">

            <p className="text-gray-500 text-sm">
              🌾 AgriGenAI • AI Powered Smart Agriculture Platform
            </p>

            <p className="text-gray-600 text-xs mt-2">
              Crop Recommendation • Disease Detection • Weather • Smart Irrigation • Fertilizer • Market Prediction • AI Assistant
            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default FarmerAssistant;