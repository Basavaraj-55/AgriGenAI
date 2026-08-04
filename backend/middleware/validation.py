# ==========================================================
# 🌾 AgriGenAI Request Validation Middleware
# backend/middleware/validation.py
# ==========================================================

from functools import wraps
from flask import request, jsonify


def validate_json(required_fields):
    """
    Validate JSON request body.

    Example:
        @validate_json(["name", "price"])
    """

    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):

            data = request.get_json()

            if not data:

                return jsonify({
                    "success": False,
                    "message": "Request body must be JSON."
                }), 400

            missing_fields = []

            for field in required_fields:

                value = data.get(field)

                if value is None or value == "":
                    missing_fields.append(field)

            if missing_fields:

                return jsonify({
                    "success": False,
                    "message": "Missing required fields.",
                    "missing_fields": missing_fields
                }), 400

            return func(*args, **kwargs)

        return wrapper

    return decorator