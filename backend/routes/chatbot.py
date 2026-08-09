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
# Global RAG Instance (Lazy Loaded)
# ==========================================================

rag = None


def get_rag():
    """
    Load the RAG pipeline only once.
    It will be initialized when the first chat request arrives.
    """
    global rag

    if rag is None:
        print("\n====================================")
        print("🌾 Loading AgriGenAI RAG...")
        print("====================================")

        rag = RAGPipeline()

        print("✅ AgriGenAI RAG Loaded Successfully")
        print("====================================\n")

    return rag


# ==========================================================
# AI Farmer Chatbot
# ==========================================================

@chatbot_bp.route("/chat", methods=["POST"])
def chatbot():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is missing."
            }), 400

        message = data.get("message", "").strip()

        if not message:
            return jsonify({
                "success": False,
                "message": "Message is required."
            }), 400

        # ==========================================
        # Load RAG only when required
        # ==========================================

        rag_pipeline = get_rag()

        result = rag_pipeline.ask(message)

        return jsonify({
            "success": True,
            "reply": result.get("answer", ""),
            "documents_used": result.get("documents", [])
        }), 200

    except Exception as error:
        return jsonify({
            "success": False,
            "message": str(error)
        }), 500