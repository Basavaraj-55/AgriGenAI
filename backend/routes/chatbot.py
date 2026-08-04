# ==========================================================
# 🌾 AgriGenAI Chatbot Routes
# backend/routes/chatbot.py
# ==========================================================

from flask import Blueprint, request, jsonify

from rag.pipeline.rag_pipeline import RAGPipeline

# ==========================================================
# Blueprint
# ==========================================================

chatbot_bp = Blueprint(
    "chatbot",
    __name__
)

# ==========================================================
# Load RAG Once
# ==========================================================

print("\n====================================")
print("🌾 Loading AgriGenAI RAG...")
print("====================================")

rag = RAGPipeline()

print("✅ RAG Loaded Successfully\n")

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

        # ============================================
        # Ask RAG
        # ============================================

        result = rag.ask(message)

        return jsonify({

            "success": True,

            "reply": result["answer"],

            "documents_used": result["documents"]

        }), 200

    except Exception as error:

        return jsonify({

            "success": False,

            "message": str(error)

        }), 500