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

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# ==========================================================
# Load Gemini Model
# ==========================================================

model = genai.GenerativeModel("gemini-2.5-flash")

# ==========================================================
# Ask Gemini
# ==========================================================

def ask_gemini(question: str):

    try:

        prompt = f"""
You are AgriGenAI, an AI assistant for farmers.

Your job is to provide accurate, practical, and easy-to-understand farming advice.

Answer only agriculture-related questions.

Farmer Question:
{question}
"""

        response = model.generate_content(prompt)

        if response.text:
            return response.text

        return "Sorry, I couldn't generate a response."

    except Exception as error:

        return f"Gemini Error: {str(error)}"