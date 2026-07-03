# ==========================================================
# 🌾 AgriGenAI Chatbot Routes
# backend/routes/chatbot.py
# ==========================================================

from flask import Blueprint, request, jsonify
from utils.gemini import ask_gemini

# ==========================================================
# Blueprint
# ==========================================================

chatbot_bp = Blueprint(
    "chatbot",
    __name__
)

# ==========================================================
# AI Farmer Chatbot
# ==========================================================

@chatbot_bp.route("/chat", methods=["POST"])
def chatbot():

    try:

        data = request.get_json()

        message = data.get("message", "").strip()

        if not message:

            return jsonify({
                "success": False,
                "message": "Message is required."
            }), 400

        reply = ask_gemini(message)

        return jsonify({
            "success": True,
            "reply": reply
        }), 200

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500