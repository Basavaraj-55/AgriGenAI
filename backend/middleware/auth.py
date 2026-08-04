# ==========================================================
# 🌾 AgriGenAI Authentication Middleware
# File: backend/middleware/auth.py
# ==========================================================

from functools import wraps
import traceback

from flask import (
    jsonify,
    request,
    g,
)

from flask_jwt_extended import (
    verify_jwt_in_request,
    get_jwt_identity,
    get_jwt,
)

from bson import ObjectId

from utils.database import db


# ==========================================================
# Response Helpers
# ==========================================================

def success_response(
    message,
    data=None,
    status=200,
):

    return (

        jsonify({

            "success": True,

            "message": message,

            "data": data,

        }),

        status,

    )


def error_response(
    message,
    status=401,
):

    return (

        jsonify({

            "success": False,

            "message": message,

        }),

        status,

    )


# ==========================================================
# Load Current User
# ==========================================================

def load_current_user(user_id):

    if not ObjectId.is_valid(user_id):

        return None

    return db.users.find_one(

        {

            "_id": ObjectId(user_id)

        }

    )


# ==========================================================
# Serialize User
# ==========================================================

def serialize_user(user):

    return {

        "id": str(user["_id"]),

        "name": user.get("name"),

        "email": user.get("email"),

        "role": user.get("role"),

        "status": user.get(
            "status",
            "active",
        ),

        "phone": user.get("phone"),

    }
# ==========================================================
# JWT Authentication Middleware
# ==========================================================

def token_required(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        try:

            # --------------------------------------------------
            # Verify JWT Token
            # --------------------------------------------------

            verify_jwt_in_request()

            # --------------------------------------------------
            # Read JWT Information
            # --------------------------------------------------

            user_id = get_jwt_identity()

            claims = get_jwt()

            if not user_id:

                return error_response(
                    "Authentication required.",
                    401,
                )

            # --------------------------------------------------
            # Load User From Database
            # --------------------------------------------------

            user = load_current_user(user_id)

            if not user:

                return error_response(
                    "User not found.",
                    404,
                )

            # --------------------------------------------------
            # Check Account Status
            # --------------------------------------------------

            status = user.get("status", "active")

            if status == "blocked":

                return error_response(
                    "Your account has been blocked.",
                    403,
                )

            if status == "inactive":

                return error_response(
                    "Your account is inactive.",
                    403,
                )

            # --------------------------------------------------
            # Build Current User Object
            # --------------------------------------------------

            current_user = serialize_user(user)

            current_user["claims"] = claims

            # --------------------------------------------------
            # Store User Globally
            # --------------------------------------------------

            g.current_user = current_user

            request.user = current_user

            # --------------------------------------------------
            # Debug Logs
            # --------------------------------------------------

            print("\n====================================")
            print("✅ JWT VERIFIED")
            print("====================================")
            print(f"User ID : {current_user['id']}")
            print(f"Name    : {current_user['name']}")
            print(f"Email   : {current_user['email']}")
            print(f"Role    : {current_user['role']}")
            print("====================================\n")

            return func(*args, **kwargs)

        except Exception as error:

            print("\n====================================")
            print("❌ AUTHENTICATION FAILED")
            print("====================================")
            print("Error :", error)
            traceback.print_exc()
            print("====================================\n")

            return error_response(
                "Invalid or expired token.",
                401,
            )

    return wrapper
# ==========================================================
# Current User Helper Functions
# ==========================================================

def get_current_user():
    """
    Returns the currently authenticated user.
    """

    return getattr(
        g,
        "current_user",
        None,
    )


# ==========================================================
# Authentication Status
# ==========================================================

def is_authenticated():
    """
    Returns True if a user is authenticated.
    """

    return get_current_user() is not None


# ==========================================================
# Current User ID
# ==========================================================

def get_current_user_id():

    user = get_current_user()

    if user is None:

        return None

    return user.get("id")


# ==========================================================
# Current User Name
# ==========================================================

def get_current_user_name():

    user = get_current_user()

    if user is None:

        return None

    return user.get("name")


# ==========================================================
# Current User Email
# ==========================================================

def get_current_user_email():

    user = get_current_user()

    if user is None:

        return None

    return user.get("email")


# ==========================================================
# Current User Role
# ==========================================================

def get_current_user_role():

    user = get_current_user()

    if user is None:

        return None

    return user.get("role")


# ==========================================================
# Current User Phone
# ==========================================================

def get_current_user_phone():

    user = get_current_user()

    if user is None:

        return None

    return user.get("phone")


# ==========================================================
# Current User Status
# ==========================================================

def get_current_user_status():

    user = get_current_user()

    if user is None:

        return None

    return user.get("status")
# ==========================================================
# Role Helper Functions
# ==========================================================

def has_role(role):
    """
    Check whether the authenticated user
    has the specified role.
    """

    return get_current_user_role() == role


# ==========================================================
# Admin Check
# ==========================================================

def is_admin():

    return has_role("admin")


# ==========================================================
# Seller Check
# ==========================================================

def is_seller():

    return has_role("seller")


# ==========================================================
# Farmer Check
# ==========================================================

def is_farmer():

    return has_role("farmer")


# ==========================================================
# User Check
# ==========================================================

def is_user():

    return has_role("user")


# ==========================================================
# Multiple Role Check
# ==========================================================

def has_any_role(*roles):
    """
    Example:
        has_any_role("admin", "seller")

    Returns:
        True if the authenticated user's
        role exists in the supplied roles.
    """

    current_role = get_current_user_role()

    return current_role in roles


# ==========================================================
# End of Authentication Middleware
# ==========================================================