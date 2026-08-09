# ==========================================================
# 🌾 AgriGenAI - Gemini AI Utility
# File: backend/utils/gemini.py
# ==========================================================

import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI


# ==========================================================
# Load Environment Variables
# ==========================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "❌ GEMINI_API_KEY not found in .env"
    )


# ==========================================================
# Initialize Gemini Model
# ==========================================================

model = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    google_api_key=GEMINI_API_KEY,
)

print("✅ Gemini AI Loaded Successfully")


# ==========================================================
# Ask Gemini
# ==========================================================

def ask_gemini(
    question: str,
    context: str | None = None
) -> str:

    try:

        # ==================================================
        # RAG Prompt
        # ==================================================

        if context and context.strip():

            prompt = f"""
You are AgriGenAI, an intelligent AI assistant for farmers.

Use the Agriculture Knowledge Base below as your first source
of information.

---------------- Agriculture Knowledge Base ----------------

{context}

---------------- User Question ----------------

{question}

Instructions:

1. Carefully read the Agriculture Knowledge Base.

2. If the answer is available in the Knowledge Base,
   use that information.

3. If the Knowledge Base does not contain enough information,
   you may use your general knowledge.

4. Clearly mention when important information comes
   from general knowledge.

5. Use simple and easy-to-understand English.

6. Give practical and step-by-step guidance whenever possible.

7. For agriculture questions, provide useful farming tips
   when appropriate.

8. If the question is unrelated to agriculture,
   answer it normally.

9. Be accurate, helpful, and concise.
"""

        # ==================================================
        # General Chat Prompt
        # ==================================================

        else:

            prompt = f"""
You are AgriGenAI, a helpful and intelligent AI assistant.

You can answer questions about:

- Agriculture
- Programming
- Artificial Intelligence
- Machine Learning
- Python
- Java
- JavaScript
- React
- Flask
- Interviews
- Education
- Weather
- General Knowledge

Always provide clear, accurate, and easy-to-understand answers.

User Question:

{question}
"""


        # ==================================================
        # Generate Response
        # ==================================================

        response = model.invoke(prompt)


        # ==================================================
        # Extract Response
        # ==================================================

        if response and hasattr(response, "content"):

            content = response.content

            if isinstance(content, str):
                return content.strip()

            if isinstance(content, list):

                text_parts = []

                for item in content:

                    if isinstance(item, dict):

                        text = item.get("text")

                        if text:
                            text_parts.append(text)

                if text_parts:
                    return "\n".join(text_parts).strip()


        return "Sorry, I couldn't generate a response."


    # ======================================================
    # Error Handling
    # ======================================================

    except Exception as error:

        print(f"❌ Gemini Error: {error}")

        return f"Gemini Error: {str(error)}"


# ==========================================================
# Testing
# ==========================================================

if __name__ == "__main__":

    print("\n====================================")
    print("🌾 AgriGenAI Gemini Test")
    print("====================================")

    while True:

        question = input(
            "\nAsk Question (type 'exit' to quit): "
        )

        if question.lower() == "exit":
            break

        answer = ask_gemini(question)

        print("\n------------------------------------")
        print(answer)
        print("------------------------------------")