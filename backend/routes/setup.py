# ==========================================================
# 🌾 AgriGenAI Initial Setup
# File: backend/routes/setup.py
# ==========================================================

from datetime import datetime

from flask import (
    Blueprint,
    jsonify
)

from models.User import User

from utils.bcrypt import (
    hash_password
)

# ==========================================================
# Blueprint
# ==========================================================

setup_bp = Blueprint(
    "setup",
    __name__
)

# ==========================================================
# Create First Admin
# ==========================================================

@setup_bp.route(
    "/setup/admin",
    methods=["POST"]
)
def create_first_admin():

    try:

        # ==================================================
        # Default Admin Details
        # ==================================================

        admin_email = "admin@agrigenai.com"

        admin_password = "Admin@123"

        # ==================================================
        # Check Existing Admin
        # ==================================================

        existing_admin = User.find_by_email(
            admin_email
        )

        if existing_admin:

            return jsonify({

                "success": False,

                "message": "Admin account already exists."

            }), 409

        # ==================================================
        # Create Admin Object
        # ==================================================

        admin = {

            "name": "Super Admin",

            "email": admin_email,

            "password": hash_password(
                admin_password
            ),

            "role": "admin",

            "status": "active",

            "created_at": datetime.utcnow(),

            "updated_at": datetime.utcnow()

        }

        # ==================================================
        # Save Admin
        # ==================================================

        result = User.create_user(
            admin
        )

        # ==================================================
        # Success Response
        # ==================================================

        return jsonify({

            "success": True,

            "message": "Admin account created successfully.",

            "admin": {

                "id": str(result.inserted_id),

                "name": admin["name"],

                "email": admin["email"],

                "role": admin["role"],

                "status": admin["status"]

            }

        }), 201

    except Exception as error:

        print()

        print("======================================")
        print("❌ ADMIN SETUP FAILED")
        print("======================================")
        print("Error :", error)
        print("======================================")

        return jsonify({

            "success": False,

            "message": "Failed to create admin account.",

            "error": str(error)

        }), 500


# ==========================================================
# End of File
# ==========================================================