# ==========================================================
# 🌾 AgriGenAI Gemini AI Utility
# backend/utils/gemini.py
# ==========================================================

import os

import google.generativeai as genai

from dotenv import load_dotenv


# ==========================================================
# Load Environment Variables
# ==========================================================

load_dotenv()


# ==========================================================
# Configure Gemini API
# ==========================================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise Exception("❌ GEMINI_API_KEY not found in .env")


genai.configure(
    api_key=GEMINI_API_KEY
)


# ==========================================================
# Load Gemini Model
# ==========================================================

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

print("✅ Gemini AI Loaded Successfully")


# ==========================================================
# Ask Gemini
# ==========================================================

def ask_gemini(
    question: str,
    context: str = None
):

    try:

        # ==================================================
        # RAG + Gemini Prompt
        # ==================================================

        if context and context.strip():

            prompt = f"""
You are AgriGenAI.

You are an intelligent AI assistant for farmers.

Your first priority is to use the Agriculture Knowledge Base provided below.

--------------------------------------------------

AGRICULTURE KNOWLEDGE BASE

{context}

--------------------------------------------------

USER QUESTION

{question}

--------------------------------------------------

Instructions

1. Read the Agriculture Knowledge Base carefully.

2. If the answer exists in the Agriculture Knowledge Base, answer using that information.

3. If the Agriculture Knowledge Base does not contain enough information, answer using your own knowledge.

4. Clearly mention if part of your answer is based on your general knowledge.

5. Never refuse to answer only because the context is missing.

6. Use simple English.

7. Give practical and step-by-step guidance whenever possible.

8. For agriculture questions include useful tips whenever appropriate.

9. If the question is unrelated to agriculture (programming, AI, interviews, education, science, etc.), answer it normally.

10. Be accurate and helpful.

--------------------------------------------------

ANSWER

"""

        # ==================================================
        # General Chat
        # ==================================================

        else:

            prompt = f"""
You are AgriGenAI.

You are a helpful AI assistant.

You can answer:

• Agriculture
• Programming
• Artificial Intelligence
• Machine Learning
• Java
• Python
• JavaScript
• React
• Flask
• Interviews
• Education
• Weather
• General Knowledge

Always provide clear, accurate and easy-to-understand answers.

QUESTION

{question}

ANSWER

"""

        # ==================================================
        # Generate Response
        # ==================================================

        response = model.generate_content(prompt)

        if hasattr(response, "text") and response.text:
            return response.text.strip()

        return "Sorry, I couldn't generate a response."

    except Exception as error:

        print("Gemini Error:", error)

        return f"Gemini Error: {str(error)}"


# ==========================================================
# Testing
# ==========================================================

if __name__ == "__main__":

    print("\n====================================")
    print("🌾 AgriGenAI Gemini Test")
    print("====================================")

    while True:

        question = input("\nAsk Question : ")

        if question.lower() == "exit":
            break

        answer = ask_gemini(question)

        print("\n------------------------------------")
        print(answer)
        print("------------------------------------")