from flask import Blueprint, jsonify
from utils.news_service import fetch_agriculture_news

# Create Blueprint
news_bp = Blueprint("news", __name__)

# ============================================================
# 🌾 Agriculture News API
# URL:
# http://localhost:5000/api/news
# ============================================================

@news_bp.route("/news", methods=["GET"])
def get_news():
    try:
        news = fetch_agriculture_news()

        return jsonify({
            "success": True,
            "total_news": len(news),
            "news": news
        })

    except Exception as error:
        return jsonify({
            "success": False,
            "message": str(error)
        }), 500