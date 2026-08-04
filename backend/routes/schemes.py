from flask import Blueprint, jsonify
from utils.scheme_service import fetch_government_schemes

# ============================================================
# 🌾 Government Schemes Blueprint
# ============================================================

schemes_bp = Blueprint("schemes", __name__)

# ============================================================
# 🌾 Government Schemes API
# URL:
# http://localhost:5000/api/schemes
# ============================================================

@schemes_bp.route("/schemes", methods=["GET"])
def get_schemes():

    try:

        schemes = fetch_government_schemes()

        return jsonify({

            "success": True,

            "total_schemes": len(schemes),

            "schemes": schemes

        })

    except Exception as error:

        return jsonify({

            "success": False,

            "message": str(error)

        }), 500