# ==========================================================
# 🌾 AgriGenAI JWT Utility
# backend/utils/jwt.py
# ==========================================================

import os
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv

# ==========================================================
# Load Environment Variables
# ==========================================================

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")

if not SECRET_KEY:
    raise ValueError("JWT_SECRET_KEY is missing in .env file")

# ==========================================================
# Generate JWT Token
# ==========================================================

def generate_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=7)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return token

# ==========================================================
# Verify JWT Token
# ==========================================================

def verify_token(token):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        return payload

    except jwt.ExpiredSignatureError:
        return None

    except jwt.InvalidTokenError:
        return None