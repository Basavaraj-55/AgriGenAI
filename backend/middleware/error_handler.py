# ==========================================================
# 🌾 AgriGenAI Global Error Handler
# backend/middleware/error_handler.py
# ==========================================================

from flask import jsonify
from werkzeug.exceptions import HTTPException


def register_error_handlers(app):

    # Handle HTTP Exceptions (404, 405, etc.)
    @app.errorhandler(HTTPException)
    def handle_http_exception(error):

        return jsonify({
            "success": False,
            "error": error.name,
            "message": error.description
        }), error.code

    # Handle unexpected exceptions
    @app.errorhandler(Exception)
    def handle_exception(error):

        print("Unhandled Exception:", error)

        return jsonify({
            "success": False,
            "error": "Internal Server Error",
            "message": "Something went wrong. Please try again later."
        }), 500

    return app