# ==========================================================
# 🌾 AgriGenAI Authentication Routes
# backend/routes/auth.py
# ==========================================================

from flask import Blueprint, request, jsonify
from models.User import User
from utils.jwt import generate_token

import bcrypt

# ==========================================================
# Blueprint
# ==========================================================

auth_bp = Blueprint("auth", __name__)

# ==========================================================
# Register User
# ==========================================================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check Required Fields

    if not name or not email or not password:

        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    # Check Existing User

    existing_user = User.find_by_email(email)

    if existing_user:

        return jsonify({
            "success": False,
            "message": "Email already registered."
        }), 409

    # Encrypt Password

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    # User Data

    user = {
        "name": name,
        "email": email,
        "password": hashed_password
    }

    # Save User

    result = User.create_user(user)

    return jsonify({
        "success": True,
        "message": "Registration Successful",
        "user_id": str(result.inserted_id)
    }), 201


# ==========================================================
# Login User
# ==========================================================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    # Check Required Fields

    if not email or not password:

        return jsonify({
            "success": False,
            "message": "Email and Password are required."
        }), 400

    # Find User

    user = User.find_by_email(email)

    if not user:

        return jsonify({
            "success": False,
            "message": "Invalid Email or Password."
        }), 401

    # Verify Password

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):

        return jsonify({
            "success": False,
            "message": "Invalid Email or Password."
        }), 401

    # Generate JWT Token

    token = generate_token(str(user["_id"]))

    return jsonify({
        "success": True,
        "message": "Login Successful",
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    }), 200