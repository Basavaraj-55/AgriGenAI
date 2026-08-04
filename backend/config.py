# ============================================================
# 🌾 AgriGenAI Configuration
# config.py
# ============================================================

import os
from datetime import timedelta
from dotenv import load_dotenv

# ============================================================
# Load Environment Variables
# ============================================================

load_dotenv()


# ============================================================
# Configuration Class
# ============================================================

class Config:

    # ========================================================
    # Flask Configuration
    # ========================================================

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "agrigenai-secret-key"
    )

    DEBUG = True

    # ========================================================
    # MongoDB Configuration
    # ========================================================

    MONGO_URI = os.getenv(
        "MONGO_URI"
    )

    # ========================================================
    # JWT Authentication
    # ========================================================

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY"
    )

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        hours=24
    )

    JWT_TOKEN_LOCATION = [
        "headers"
    ]

    JWT_HEADER_NAME = "Authorization"

    JWT_HEADER_TYPE = "Bearer"

    # ========================================================
    # Gemini AI
    # ========================================================

    GEMINI_API_KEY = os.getenv(
        "GEMINI_API_KEY"
    )

    # ========================================================
    # Email Configuration
    # ========================================================

    MAIL_EMAIL = os.getenv(
        "MAIL_EMAIL"
    )

    MAIL_PASSWORD = os.getenv(
        "MAIL_PASSWORD"
    )

    # ========================================================
    # File Upload Configuration
    # ========================================================

    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB

    UPLOAD_FOLDER = "uploads"

    # ========================================================
    # Allowed File Types
    # ========================================================

    ALLOWED_IMAGE_EXTENSIONS = {
        "jpg",
        "jpeg",
        "png"
    }

    ALLOWED_DOCUMENT_EXTENSIONS = {
        "pdf"
    }

    # ========================================================
    # AI Model Directory
    # ========================================================

    MODEL_FOLDER = "model"

    # ========================================================
    # API Information
    # ========================================================

    APP_NAME = "AgriGenAI"

    VERSION = "5.0"

    AUTHOR = "Basavaraj"