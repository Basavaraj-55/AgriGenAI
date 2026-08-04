# ============================================================
# 🌾 AgriGenAI - Voice Assistant API
# ============================================================

from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

# ============================================================
# Load Environment Variables
# ============================================================

load_dotenv()

# ============================================================
# Blueprint
# ============================================================

voice_bp = Blueprint("voice", __name__)

# ============================================================
# Gemini Configuration
# ============================================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

# ============================================================
# Voice Assistant API
# ============================================================

@voice_bp.route("/voice", methods=["POST"])
def voice_chat():
    """
    POST /api/voice

    Request:
    {
        "message": "Hello"
    }

    Response:
    {
        "success": true,
        "reply": "Hello! How can I help you?"
    }
    """

    try:

        # Read JSON Data
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No JSON data received."
            }), 400

        # Read User Message
        message = data.get("message", "").strip()

        if message == "":
            return jsonify({
                "success": False,
                "message": "Message is required."
            }), 400

        # Generate AI Response
        response = model.generate_content(message)

        reply = response.text if response.text else "No response generated."

        # Return Success
        return jsonify({
            "success": True,
            "reply": reply
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500