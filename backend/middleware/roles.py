# ==========================================================
# 🌾 AgriGenAI Role-Based Authorization Middleware
# File: backend/middleware/roles.py
# ==========================================================

from functools import wraps
from typing import Callable

from flask import (
    jsonify,
    g,
)


# ==========================================================
# Response Helper
# ==========================================================

def error_response(
    message: str,
    status_code: int,
    **extra,
):

    response = {

        "success": False,

        "message": message,

    }

    response.update(extra)

    return jsonify(response), status_code


# ==========================================================
# Current User Helpers
# ==========================================================

def get_current_user():
    """
    Returns the authenticated user stored
    inside Flask's g object.
    """

    return getattr(
        g,
        "current_user",
        None,
    )


def get_current_role():
    """
    Returns the current user's role.
    """

    user = get_current_user()

    if user is None:

        return None

    return user.get("role")


# ==========================================================
# Role Authorization Decorator
# ==========================================================

def roles_required(*allowed_roles):

    """
    Protect routes using role-based access.

    Example:

        @roles_required("admin")

        @roles_required("seller")

        @roles_required("admin", "seller")
    """

    def decorator(func: Callable):

        @wraps(func)
        def wrapper(*args, **kwargs):

            user = get_current_user()

            if user is None:

                return error_response(
                    "Authentication required.",
                    401,
                )

            role = get_current_role()

            if role is None:

                return error_response(
                    "User role not found.",
                    401,
                )

            if role not in allowed_roles:

                return error_response(

                    "Permission denied.",

                    403,

                    required_roles=list(allowed_roles),

                    your_role=role,

                )

            return func(*args, **kwargs)

        return wrapper

    return decorator
# ==========================================================
# Generic Role Helpers
# ==========================================================

def has_role(role: str) -> bool:
    """
    Check whether the authenticated user
    has the specified role.
    """

    return get_current_role() == role


def has_any_role(*roles) -> bool:
    """
    Check whether the authenticated user
    has any one of the specified roles.
    """

    return get_current_role() in roles


# ==========================================================
# Common Role Helpers
# ==========================================================

def is_admin() -> bool:

    return has_role("admin")


def is_seller() -> bool:

    return has_role("seller")


def is_user() -> bool:

    return has_role("user")


def is_farmer() -> bool:

    return has_role("farmer")


# ==========================================================
# Permission Helpers
# ==========================================================

def can_manage_products() -> bool:
    """
    Admins and sellers can manage products.
    """

    return has_any_role(
        "admin",
        "seller",
    )


def can_manage_orders() -> bool:
    """
    Admins and sellers can manage orders.
    """

    return has_any_role(
        "admin",
        "seller",
    )


def can_manage_users() -> bool:
    """
    Only administrators can manage users.
    """

    return is_admin()


def can_access_admin() -> bool:
    """
    Only administrators can access
    the admin dashboard.
    """

    return is_admin()


def can_place_orders() -> bool:
    """
    Users allowed to place marketplace orders.
    """

    return has_any_role(
        "admin",
        "seller",
        "user",
        "farmer",
    )


def can_review_products() -> bool:
    """
    Users allowed to review products.
    """

    return has_any_role(
        "user",
        "seller",
        "farmer",
    )


# ==========================================================
# End of Role Authorization Middleware
# ==========================================================