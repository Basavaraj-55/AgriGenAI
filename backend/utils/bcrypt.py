# ==========================================================
# 🌾 AgriGenAI Password Security
# backend/utils/bcrypt.py
# ==========================================================

from flask_bcrypt import Bcrypt

# ==========================================================
# Initialize Bcrypt
# ==========================================================

bcrypt = Bcrypt()


# ==========================================================
# Initialize with Flask App
# ==========================================================

def init_bcrypt(app):
    """
    Initialize Flask-Bcrypt with the Flask application.
    """
    bcrypt.init_app(app)


# ==========================================================
# Hash Password
# ==========================================================

def hash_password(password: str) -> str:
    """
    Generate a hashed password.
    """
    return bcrypt.generate_password_hash(
        password
    ).decode("utf-8")


# ==========================================================
# Verify Password
# ==========================================================

def check_password(
    hashed_password: str,
    password: str
) -> bool:
    """
    Verify a plain password against a hashed password.
    """
    return bcrypt.check_password_hash(
        hashed_password,
        password
    )


# ==========================================================
# Password Strength Validation
# ==========================================================

def is_strong_password(password: str) -> bool:
    """
    Check whether the password meets minimum requirements.
    """

    if len(password) < 8:
        return False

    if not any(char.isupper() for char in password):
        return False

    if not any(char.islower() for char in password):
        return False

    if not any(char.isdigit() for char in password):
        return False

    return True