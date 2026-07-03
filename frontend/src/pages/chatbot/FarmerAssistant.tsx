import { useState } from "react";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "👋 Hello Farmer! I am AgriGenAI Farmer Assistant. Ask me anything about farming, crops, fertilizers, irrigation, weather, diseases, or market prices.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // ======================================================
  // Send Message
  // ======================================================

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add Farmer Message
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
          text: "❌ Sorry! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Quick Questions
  // ======================================================

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-xl text-white p-8 mb-8">
          <h1 className="text-4xl font-bold">
            🌾 AgriGenAI Farmer Assistant
          </h1>

          <p className="mt-3 text-lg">
            Ask any agriculture-related question and get AI-powered guidance.
          </p>
        </div>

        {/* Chat */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">

          <QuickQuestions
            onSelect={handleQuickQuestion}
          />

          <div className="h-[500px] overflow-y-auto p-6 space-y-5 bg-gray-50">

            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                sender={message.sender}
                text={message.text}
              />
            ))}

            {loading && (
              <div className="flex">
                <div className="bg-green-100 rounded-2xl px-5 py-3">
                  🤖 AI is typing...
                </div>
              </div>
            )}

          </div>

          <div className="border-t p-5">

            <ChatInput
              onSend={sendMessage}
              loading={loading}
            />

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default FarmerAssistant;