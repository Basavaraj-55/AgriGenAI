# ==========================================================
# 🌾 AgriGenAI Authentication Routes
# File: backend/routes/auth.py
# ==========================================================

from datetime import datetime, timedelta

from flask import (
    Blueprint,
    request,
    jsonify,
)

from flask_jwt_extended import (
    create_access_token,
)

from utils.database import db

from utils.bcrypt import (
    hash_password,
)

from models.User import User


# ==========================================================
# Blueprint
# ==========================================================

auth_bp = Blueprint(

    "auth",

    __name__,

)


# ==========================================================
# Password Validation
# ==========================================================

def validate_password(password):

    # Minimum 8 characters
    if len(password) < 8:

        return False

    # At least one uppercase letter
    if not any(

        char.isupper()

        for char in password

    ):

        return False

    # At least one digit
    if not any(

        char.isdigit()

        for char in password

    ):

        return False

    return True


# ==========================================================
# Create JWT Token
# ==========================================================

def create_token(user):

    additional_claims = {

        "email": user["email"],

        "role": user["role"],

    }

    return create_access_token(

        identity=str(user["_id"]),

        additional_claims=additional_claims,

    )
# ==========================================================
# User Registration
# POST /api/register
# ==========================================================

@auth_bp.route(
    "/register",
    methods=["POST"],
)
def register():

    try:

        data = request.get_json() or {}

        # --------------------------------------------------
        # Read Request Data
        # --------------------------------------------------

        name = data.get(
            "name",
            "",
        ).strip()

        email = data.get(
            "email",
            "",
        ).lower().strip()

        password = data.get(
            "password",
            "",
        ).strip()

        # --------------------------------------------------
        # Validate Required Fields
        # --------------------------------------------------

        if not name or not email or not password:

            return jsonify({

                "success": False,

                "message": "All fields are required",

            }), 400

        # --------------------------------------------------
        # Validate Password
        # --------------------------------------------------

        if not validate_password(password):

            return jsonify({

                "success": False,

                "message": (
                    "Password must contain "
                    "8 characters, one uppercase "
                    "and one number"
                ),

            }), 400

        # --------------------------------------------------
        # Check Existing User
        # --------------------------------------------------

        existing_user = User.find_by_email(email)

        if existing_user:

            return jsonify({

                "success": False,

                "message": "Email already registered",

            }), 409

        # --------------------------------------------------
        # Create User
        # --------------------------------------------------

        user = {

            "name": name,

            "email": email,

            "password": hash_password(password),

            "role": "user",

            "status": "active",

            "created_at": datetime.utcnow(),

        }

        result = User.create_user(user)

        # --------------------------------------------------
        # Success Response
        # --------------------------------------------------

        return jsonify({

            "success": True,

            "message": "Registration successful",

            "user_id": str(result.inserted_id),

        }), 201

    except Exception as error:

        print("REGISTER ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Server error",

        }), 500
    # ==========================================================
# Seller Registration
# POST /api/seller/register
# ==========================================================

@auth_bp.route(
    "/seller/register",
    methods=["POST"],
)
def seller_register():

    try:

        data = request.get_json() or {}

        # --------------------------------------------------
        # Read Request Data
        # --------------------------------------------------

        name = data.get(
            "name",
            "",
        ).strip()

        shop_name = data.get(
            "shop_name",
            "",
        ).strip()

        email = data.get(
            "email",
            "",
        ).lower().strip()

        phone = data.get(
            "phone",
            "",
        ).strip()

        location = data.get(
            "location",
            "",
        ).strip()

        password = data.get(
            "password",
            "",
        ).strip()

        # --------------------------------------------------
        # Validate Required Fields
        # --------------------------------------------------

        if not name or not shop_name or not email or not password:

            return jsonify({

                "success": False,

                "message": (
                    "Name, shop name, email and "
                    "password are required"
                ),

            }), 400

        # --------------------------------------------------
        # Validate Password
        # --------------------------------------------------

        if not validate_password(password):

            return jsonify({

                "success": False,

                "message": (
                    "Password must contain "
                    "8 characters, uppercase "
                    "letter and number"
                ),

            }), 400

        # --------------------------------------------------
        # Check Existing Seller
        # --------------------------------------------------

        existing_seller = User.find_by_email(email)

        if existing_seller:

            return jsonify({

                "success": False,

                "message": "Email already exists",

            }), 409

        # --------------------------------------------------
        # Create Seller Account
        # --------------------------------------------------

        seller = {

            "name": name,

            "shop_name": shop_name,

            "email": email,

            "phone": phone,

            "address": location,

            "password": hash_password(password),

            "role": "seller",

            "status": "pending",

            "created_at": datetime.utcnow(),

        }

        result = User.create_user(seller)

        # --------------------------------------------------
        # Success Response
        # --------------------------------------------------

        return jsonify({

            "success": True,

            "message": (
                "Seller account created. "
                "Waiting for admin approval"
            ),

            "seller_id": str(result.inserted_id),

        }), 201

    except Exception as error:

        print("SELLER REGISTER ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Server error",

        }), 500
    # ==========================================================
# User Login
# POST /api/login
# ==========================================================

@auth_bp.route(
    "/login",
    methods=["POST"],
)
def login():

    try:

        data = request.get_json() or {}

        # --------------------------------------------------
        # Read Request Data
        # --------------------------------------------------

        email = data.get(
            "email",
            "",
        ).lower().strip()

        password = data.get(
            "password",
            "",
        ).strip()

        # --------------------------------------------------
        # Validate Required Fields
        # --------------------------------------------------

        if not email or not password:

            return jsonify({

                "success": False,

                "message": "Email and password required",

            }), 400

        # --------------------------------------------------
        # Find User
        # --------------------------------------------------

        user = User.find_by_email(email)

        if not user:

            return jsonify({

                "success": False,

                "message": "Invalid credentials",

            }), 401

        # --------------------------------------------------
        # Verify Password
        # --------------------------------------------------

        from utils.bcrypt import check_password

        password_ok = check_password(

            user["password"],

            password,

        )

        if not password_ok:

            return jsonify({

                "success": False,

                "message": "Invalid credentials",

            }), 401

        # --------------------------------------------------
        # Generate JWT Token
        # --------------------------------------------------

        token = create_token(user)

        # --------------------------------------------------
        # Success Response
        # --------------------------------------------------

        return jsonify({

            "success": True,

            "message": "Login successful",

            "token": token,

            "user": {

                "id": str(user["_id"]),

                "name": user.get(
                    "name",
                    "",
                ),

                "email": user.get(
                    "email",
                    "",
                ),

                "role": user.get(
                    "role",
                    "user",
                ),

            }

        }), 200

    except Exception as error:

        print("LOGIN ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Server error",

        }), 500
    # ==========================================================
# Seller Login
# POST /api/seller/login
# ==========================================================

@auth_bp.route(
    "/seller/login",
    methods=["POST"],
)
def seller_login():

    try:

        data = request.get_json() or {}

        # --------------------------------------------------
        # Read Request Data
        # --------------------------------------------------

        email = data.get(
            "email",
            "",
        ).lower().strip()

        password = data.get(
            "password",
            "",
        ).strip()

        # --------------------------------------------------
        # Validate Required Fields
        # --------------------------------------------------

        if not email or not password:

            return jsonify({

                "success": False,

                "message": "Email and password required",

            }), 400

        # --------------------------------------------------
        # Find Seller
        # --------------------------------------------------

        seller = User.find_by_email(email)

        if not seller:

            return jsonify({

                "success": False,

                "message": "Seller account not found",

            }), 404

        # --------------------------------------------------
        # Verify Seller Role
        # --------------------------------------------------

        if seller.get("role") != "seller":

            return jsonify({

                "success": False,

                "message": "This account is not a seller",

            }), 403

        # --------------------------------------------------
        # Check Seller Approval
        # --------------------------------------------------

        if seller.get("status") != "approved":

            return jsonify({

                "success": False,

                "message": "Seller account waiting for admin approval",

            }), 403

        # --------------------------------------------------
        # Verify Password
        # --------------------------------------------------

        from utils.bcrypt import check_password

        password_ok = check_password(

            seller["password"],

            password,

        )

        if not password_ok:

            return jsonify({

                "success": False,

                "message": "Invalid password",

            }), 401

        # --------------------------------------------------
        # Generate JWT Token
        # --------------------------------------------------

        token = create_token(seller)

        # --------------------------------------------------
        # Success Response
        # --------------------------------------------------

        return jsonify({

            "success": True,

            "message": "Seller login successful",

            "token": token,

            "seller": {

                "id": str(seller["_id"]),

                "name": seller.get(
                    "name",
                    "",
                ),

                "email": seller.get(
                    "email",
                    "",
                ),

                "role": "seller",

                "status": seller.get(
                    "status",
                ),

            }

        }), 200

    except Exception as error:

        print("SELLER LOGIN ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Server error",

        }), 500
    # ==========================================================
# Admin Login
# POST /api/admin/login
# ==========================================================

@auth_bp.route(
    "/admin/login",
    methods=["POST"],
)
def admin_login():

    try:

        data = request.get_json() or {}

        # --------------------------------------------------
        # Read Request Data
        # --------------------------------------------------

        email = data.get(
            "email",
            "",
        ).lower().strip()

        password = data.get(
            "password",
            "",
        ).strip()

        # --------------------------------------------------
        # Validate Required Fields
        # --------------------------------------------------

        if not email or not password:

            return jsonify({

                "success": False,

                "message": "Email and password required",

            }), 400

        # --------------------------------------------------
        # Find Admin
        # --------------------------------------------------

        admin = User.find_by_email(email)

        if not admin:

            return jsonify({

                "success": False,

                "message": "Admin not found",

            }), 404

        # --------------------------------------------------
        # Verify Admin Role
        # --------------------------------------------------

        if admin.get("role") != "admin":

            return jsonify({

                "success": False,

                "message": "Unauthorized account",

            }), 403

        # --------------------------------------------------
        # Verify Password
        # --------------------------------------------------

        from utils.bcrypt import check_password

        password_ok = check_password(

            admin["password"],

            password,

        )

        # --------------------------------------------------
        # Debug Log
        # --------------------------------------------------

        print("\n==============================")
        print("ADMIN LOGIN")
        print("==============================")
        print("Email           :", email)
        print("Password Match  :", password_ok)
        print("==============================\n")

        if not password_ok:

            return jsonify({

                "success": False,

                "message": "Invalid password",

            }), 401

        # --------------------------------------------------
        # Generate JWT Token
        # --------------------------------------------------

        token = create_token(admin)

        # --------------------------------------------------
        # Success Response
        # --------------------------------------------------

        return jsonify({

            "success": True,

            "message": "Admin login successful",

            "token": token,

            "admin": {

                "id": str(admin["_id"]),

                "name": admin.get(
                    "name",
                    "",
                ),

                "email": admin.get(
                    "email",
                    "",
                ),

                "role": "admin",

            }

        }), 200

    except Exception as error:

        print("ADMIN LOGIN ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Server error",

        }), 500
    # ==========================================================
# Forgot Password
# POST /api/forgot-password
# ==========================================================

from utils.otp_generator import generate_otp


@auth_bp.route(
    "/forgot-password",
    methods=["POST"],
)
def forgot_password():

    try:

        data = request.get_json() or {}

        email = data.get(
            "email",
            "",
        ).lower().strip()

        if not email:

            return jsonify({

                "success": False,

                "message": "Email is required",

            }), 400

        # --------------------------------------------------
        # Check User
        # --------------------------------------------------

        user = User.find_by_email(email)

        if not user:

            return jsonify({

                "success": False,

                "message": "Email not registered",

            }), 404

        # --------------------------------------------------
        # Generate OTP
        # --------------------------------------------------

        otp = generate_otp()

        expiry = datetime.utcnow() + timedelta(minutes=5)

        result = User.save_otp(

            email,

            otp,

            expiry,

        )

        if result.matched_count == 0:

            return jsonify({

                "success": False,

                "message": "Unable to generate OTP",

            }), 500

        # --------------------------------------------------
        # Development Log
        # --------------------------------------------------

        print("\n==============================")
        print("🌾 AgriGenAI OTP")
        print("==============================")
        print("Email :", email)
        print("OTP   :", otp)
        print("Expiry: 5 minutes")
        print("==============================\n")

        return jsonify({

            "success": True,

            "message": "OTP sent successfully",

        }), 200

    except Exception as error:

        print("FORGOT PASSWORD ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Server error",

        }), 500


# ==========================================================
# Verify OTP
# POST /api/verify-otp
# ==========================================================

@auth_bp.route(
    "/verify-otp",
    methods=["POST"],
)
def verify_otp():

    try:

        data = request.get_json() or {}

        email = data.get(
            "email",
            "",
        ).lower().strip()

        otp = str(
            data.get(
                "otp",
                "",
            )
        ).strip()

        if not email or not otp:

            return jsonify({

                "success": False,

                "message": "Email and OTP required",

            }), 400

        # --------------------------------------------------
        # Find User
        # --------------------------------------------------

        user = User.find_by_email(email)

        if not user:

            return jsonify({

                "success": False,

                "message": "User not found",

            }), 404

        saved_otp = user.get("otp")

        expiry = user.get("otp_expiry")

        if not saved_otp or not expiry:

            return jsonify({

                "success": False,

                "message": "OTP expired",

            }), 400

        if str(saved_otp) != otp:

            return jsonify({

                "success": False,

                "message": "Invalid OTP",

            }), 400

        if datetime.utcnow() > expiry:

            return jsonify({

                "success": False,

                "message": "OTP expired",

            }), 400

        # --------------------------------------------------
        # Mark OTP Verified
        # --------------------------------------------------

        User.mark_otp_verified(email)

        return jsonify({

            "success": True,

            "message": "OTP verified successfully",

        }), 200

    except Exception as error:

        print("VERIFY OTP ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Server error",

        }), 500
    # ==========================================================
# Reset Password
# POST /api/reset-password
# ==========================================================

@auth_bp.route(
    "/reset-password",
    methods=["POST"],
)
def reset_password():

    try:

        data = request.get_json() or {}

        # --------------------------------------------------
        # Read Request Data
        # --------------------------------------------------

        email = data.get(
            "email",
            "",
        ).lower().strip()

        new_password = data.get(
            "password",
            "",
        ).strip()

        # --------------------------------------------------
        # Validate Required Fields
        # --------------------------------------------------

        if not email or not new_password:

            return jsonify({

                "success": False,

                "message": "Email and password required",

            }), 400

        # --------------------------------------------------
        # Validate Password
        # --------------------------------------------------

        if not validate_password(new_password):

            return jsonify({

                "success": False,

                "message": (
                    "Password must contain "
                    "8 characters, uppercase "
                    "letter and number"
                ),

            }), 400

        # --------------------------------------------------
        # Find User
        # --------------------------------------------------

        user = User.find_by_email(email)

        if not user:

            return jsonify({

                "success": False,

                "message": "User not found",

            }), 404

        # --------------------------------------------------
        # Check OTP Verification
        # --------------------------------------------------

        if not user.get("otp_verified", False):

            return jsonify({

                "success": False,

                "message": "Verify OTP first",

            }), 400

        # --------------------------------------------------
        # Hash New Password
        # --------------------------------------------------

        hashed_password = hash_password(
            new_password
        )

        # --------------------------------------------------
        # Update Password
        # --------------------------------------------------

        result = User.update_password(

            email,

            hashed_password,

        )

        if result.modified_count == 0:

            return jsonify({

                "success": False,

                "message": "Password update failed",

            }), 500

        # --------------------------------------------------
        # Clear OTP Information
        # --------------------------------------------------

        User.clear_otp(email)

        # --------------------------------------------------
        # Success Response
        # --------------------------------------------------

        return jsonify({

            "success": True,

            "message": "Password reset successful",

        }), 200

    except Exception as error:

        print("RESET PASSWORD ERROR:", error)

        return jsonify({

            "success": False,

            "message": "Server error",

        }), 500


# ==========================================================
# End of Authentication Routes
# ==========================================================