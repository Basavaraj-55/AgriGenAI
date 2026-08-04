# ==========================================================
# 🌾 AgriGenAI - Admin Routes
# ==========================================================

import os
import re
import jwt
import bcrypt

from datetime import datetime, timedelta
from bson import ObjectId
from pymongo import DESCENDING

from flask import (
    Blueprint,
    jsonify,
    request,
)

from utils.database import db

from middleware.auth import token_required
from middleware.roles import roles_required

# ==========================================================
# Blueprint
# ==========================================================

admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/api/admin"
)

# ==========================================================
# Configuration
# ==========================================================

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "agrigenai-secret-key")
JWT_EXPIRATION_HOURS = 24

# ==========================================================
# Response Helpers
# ==========================================================

def success_response(message, data=None, status=200):
    return (
        jsonify({
            "success": True,
            "message": message,
            "data": data
        }),
        status,
    )


def error_response(message, status=400):
    return (
        jsonify({
            "success": False,
            "message": message
        }),
        status,
    )


# ==========================================================
# JWT Token Generator
# ==========================================================

def generate_admin_token(admin):

    payload = {
        "admin_id": str(admin["_id"]),
        "email": admin["email"],
        "role": admin["role"],
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
    }

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm="HS256",
    )


# ==========================================================
# Admin Serializer
# ==========================================================

def serialize_admin(admin):

    return {
        "_id": str(admin["_id"]),
        "name": admin.get("name"),
        "email": admin.get("email"),
        "role": admin.get("role"),
        "phone": admin.get("phone"),
        "status": admin.get("status", "active"),
        "created_at": admin.get("created_at"),
    }
# ==========================================================
# Authentication Routes
# ==========================================================



# ----------------------------------------------------------
# GET /api/admin/profile
# ----------------------------------------------------------

@admin_bp.route(
    "/profile",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def admin_profile():

    try:

        admin = request.user

        return success_response(

            "Profile fetched successfully.",

            serialize_admin(admin),

        )

    except Exception as error:

        print("ADMIN PROFILE ERROR:", error)

        return error_response(

            "Unable to fetch profile.",

            500,

        )
    # ==========================================================
# Dashboard Routes
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/dashboard
# ----------------------------------------------------------

@admin_bp.route(
    "/dashboard",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def admin_dashboard():

    try:

        # ==================================================
        # User Statistics
        # ==================================================

        total_users = db.users.count_documents({})

        total_sellers = db.users.count_documents({
            "role": "seller"
        })

        approved_sellers = db.users.count_documents({
            "role": "seller",
            "status": "approved"
        })

        pending_sellers = db.users.count_documents({
            "role": "seller",
            "status": "pending"
        })

        rejected_sellers = db.users.count_documents({
            "role": "seller",
            "status": "rejected"
        })

        # ==================================================
        # Marketplace Statistics
        # ==================================================

        total_products = db.products.count_documents({})

        total_orders = db.orders.count_documents({})

        completed_orders = db.orders.count_documents({
            "status": "completed"
        })

        pending_orders = db.orders.count_documents({
            "status": "pending"
        })

        cancelled_orders = db.orders.count_documents({
            "status": "cancelled"
        })

        # ==================================================
        # Revenue
        # ==================================================

        revenue = 0

        revenue_result = list(

            db.orders.aggregate([

                {
                    "$match": {
                        "status": "completed"
                    }
                },

                {
                    "$group": {
                        "_id": None,
                        "total": {
                            "$sum": "$total_amount"
                        }
                    }
                }

            ])

        )

        if revenue_result:

            revenue = revenue_result[0]["total"]

        # ==================================================
        # Recent Orders
        # ==================================================

        recent_orders = []

        orders = db.orders.find()\
            .sort("created_at", DESCENDING)\
            .limit(5)

        for order in orders:

            recent_orders.append({

                "_id": str(order["_id"]),

                "customer_name": order.get("customer_name"),

                "total_amount": order.get("total_amount"),

                "payment_status": order.get("payment_status"),

                "status": order.get("status"),

                "created_at": order.get("created_at"),

            })

        # ==================================================
        # Dashboard Response
        # ==================================================

        dashboard = {

            "statistics": {

                "users": total_users,

                "sellers": total_sellers,

                "approved_sellers": approved_sellers,

                "pending_sellers": pending_sellers,

                "rejected_sellers": rejected_sellers,

                "products": total_products,

                "orders": total_orders,

                "completed_orders": completed_orders,

                "pending_orders": pending_orders,

                "cancelled_orders": cancelled_orders,

                "revenue": revenue,

            },

            "recent_orders": recent_orders,

        }

        return success_response(

            "Dashboard loaded successfully.",

            dashboard,

        )

    except Exception as error:

        print("ADMIN DASHBOARD ERROR:", error)

        return error_response(

            "Unable to load dashboard.",

            500,

        )
    # ==========================================================
# User Management Routes
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/users
# ----------------------------------------------------------

@admin_bp.route(
    "/users",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_users():

    try:

        page = max(int(request.args.get("page", 1)), 1)
        limit = max(int(request.args.get("limit", 10)), 1)

        search = request.args.get("search", "").strip()

        role = request.args.get("role", "").strip()

        status = request.args.get("status", "").strip()

        skip = (page - 1) * limit

        query = {}

        if search:

            regex = re.compile(search, re.IGNORECASE)

            query["$or"] = [

                {"name": regex},

                {"email": regex},

            ]

        if role:

            query["role"] = role

        if status:

            query["status"] = status

        total_users = db.users.count_documents(query)

        users = list(

            db.users.find(

                query,

                {

                    "password": 0,

                    "otp": 0,

                    "otp_expiry": 0,

                }

            )

            .sort("created_at", DESCENDING)

            .skip(skip)

            .limit(limit)

        )

        formatted_users = []

        for user in users:

            formatted_users.append({

                "_id": str(user["_id"]),

                "name": user.get("name"),

                "email": user.get("email"),

                "role": user.get("role"),

                "phone": user.get("phone"),

                "status": user.get("status", "active"),

                "created_at": user.get("created_at"),

            })

        return success_response(

            "Users fetched successfully.",

            {

                "users": formatted_users,

                "pagination": {

                    "page": page,

                    "limit": limit,

                    "total": total_users,

                    "pages": (total_users + limit - 1) // limit,

                }

            }

        )

    except Exception as error:

        print("GET USERS ERROR:", error)

        return error_response(

            "Unable to fetch users.",

            500,

        )


# ----------------------------------------------------------
# GET /api/admin/user/<user_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/user/<user_id>",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_user(user_id):

    try:

        if not ObjectId.is_valid(user_id):

            return error_response(

                "Invalid user id.",

                400,

            )

        user = db.users.find_one(

            {

                "_id": ObjectId(user_id)

            },

            {

                "password": 0,

                "otp": 0,

                "otp_expiry": 0,

            }

        )

        if not user:

            return error_response(

                "User not found.",

                404,

            )

        user["_id"] = str(user["_id"])

        return success_response(

            "User fetched successfully.",

            user,

        )

    except Exception as error:

        print("GET USER ERROR:", error)

        return error_response(

            "Unable to fetch user.",

            500,

        )


# ----------------------------------------------------------
# PUT /api/admin/user/<user_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/user/<user_id>",
    methods=["PUT"],
)
@token_required
@roles_required("admin")
def update_user(user_id):

    try:

        if not ObjectId.is_valid(user_id):

            return error_response(

                "Invalid user id.",

                400,

            )

        data = request.get_json()

        if not data:

            return error_response(

                "Request body is required.",

                400,

            )

        update_data = {}

        allowed_fields = [

            "name",

            "phone",

            "status",

            "role",

        ]

        for field in allowed_fields:

            if field in data:

                update_data[field] = data[field]

        update_data["updated_at"] = datetime.utcnow()

        db.users.update_one(

            {

                "_id": ObjectId(user_id)

            },

            {

                "$set": update_data

            }

        )

        updated_user = db.users.find_one(

            {

                "_id": ObjectId(user_id)

            },

            {

                "password": 0,

                "otp": 0,

                "otp_expiry": 0,

            }

        )

        updated_user["_id"] = str(updated_user["_id"])

        return success_response(

            "User updated successfully.",

            updated_user,

        )

    except Exception as error:

        print("UPDATE USER ERROR:", error)

        return error_response(

            "Unable to update user.",

            500,

        )


# ----------------------------------------------------------
# DELETE /api/admin/user/<user_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/user/<user_id>",
    methods=["DELETE"],
)
@token_required
@roles_required("admin")
def delete_user(user_id):

    try:

        if not ObjectId.is_valid(user_id):

            return error_response(

                "Invalid user id.",

                400,

            )

        result = db.users.delete_one(

            {

                "_id": ObjectId(user_id)

            }

        )

        if result.deleted_count == 0:

            return error_response(

                "User not found.",

                404,

            )

        return success_response(

            "User deleted successfully."

        )

    except Exception as error:

        print("DELETE USER ERROR:", error)

        return error_response(

            "Unable to delete user.",

            500,

        )
    # ==========================================================
# Seller Management Routes
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/sellers
# ----------------------------------------------------------

@admin_bp.route(
    "/sellers",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_sellers():

    try:

        page = max(int(request.args.get("page", 1)), 1)
        limit = max(int(request.args.get("limit", 10)), 1)

        search = request.args.get("search", "").strip()
        status = request.args.get("status", "").strip()

        skip = (page - 1) * limit

        query = {
            "role": "seller"
        }

        if search:

            regex = re.compile(search, re.IGNORECASE)

            query["$or"] = [

                {"name": regex},

                {"email": regex},

            ]

        if status:

            query["status"] = status

        total = db.users.count_documents(query)

        sellers = list(

            db.users.find(

                query,

                {

                    "password": 0,

                    "otp": 0,

                    "otp_expiry": 0,

                }

            )

            .sort("created_at", DESCENDING)

            .skip(skip)

            .limit(limit)

        )

        formatted = []

        for seller in sellers:

            formatted.append({

                "_id": str(seller["_id"]),

                "name": seller.get("name"),

                "email": seller.get("email"),

                "phone": seller.get("phone"),

                "status": seller.get("status", "pending"),

                "created_at": seller.get("created_at"),

            })

        return success_response(

            "Sellers fetched successfully.",

            {

                "sellers": formatted,

                "pagination": {

                    "page": page,

                    "limit": limit,

                    "total": total,

                    "pages": (total + limit - 1) // limit,

                }

            }

        )

    except Exception as error:

        print("GET SELLERS ERROR:", error)

        return error_response(

            "Unable to fetch sellers.",

            500,

        )


# ----------------------------------------------------------
# GET /api/admin/seller/<seller_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/seller/<seller_id>",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_seller(seller_id):

    try:

        if not ObjectId.is_valid(seller_id):

            return error_response(

                "Invalid seller id.",

                400,

            )

        seller = db.users.find_one(

            {

                "_id": ObjectId(seller_id),

                "role": "seller",

            },

            {

                "password": 0,

                "otp": 0,

                "otp_expiry": 0,

            }

        )

        if not seller:

            return error_response(

                "Seller not found.",

                404,

            )

        seller["_id"] = str(seller["_id"])

        return success_response(

            "Seller fetched successfully.",

            seller,

        )

    except Exception as error:

        print("GET SELLER ERROR:", error)

        return error_response(

            "Unable to fetch seller.",

            500,

        )


# ----------------------------------------------------------
# PUT /api/admin/seller/approve/<seller_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/seller/approve/<seller_id>",
    methods=["PUT"],
)
@token_required
@roles_required("admin")
def approve_seller(seller_id):

    try:

        if not ObjectId.is_valid(seller_id):

            return error_response(

                "Invalid seller id.",

                400,

            )

        result = db.users.update_one(

            {

                "_id": ObjectId(seller_id),

                "role": "seller",

            },

            {

                "$set": {

                    "status": "approved",

                    "updated_at": datetime.utcnow(),

                }

            }

        )

        if result.modified_count == 0:

            return error_response(

                "Seller not found.",

                404,

            )

        return success_response(

            "Seller approved successfully."

        )

    except Exception as error:

        print("APPROVE SELLER ERROR:", error)

        return error_response(

            "Unable to approve seller.",

            500,

        )


# ----------------------------------------------------------
# PUT /api/admin/seller/reject/<seller_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/seller/reject/<seller_id>",
    methods=["PUT"],
)
@token_required
@roles_required("admin")
def reject_seller(seller_id):

    try:

        if not ObjectId.is_valid(seller_id):

            return error_response(

                "Invalid seller id.",

                400,

            )

        result = db.users.update_one(

            {

                "_id": ObjectId(seller_id),

                "role": "seller",

            },

            {

                "$set": {

                    "status": "rejected",

                    "updated_at": datetime.utcnow(),

                }

            }

        )

        if result.modified_count == 0:

            return error_response(

                "Seller not found.",

                404,

            )

        return success_response(

            "Seller rejected successfully."

        )

    except Exception as error:

        print("REJECT SELLER ERROR:", error)

        return error_response(

            "Unable to reject seller.",

            500,

        )


# ----------------------------------------------------------
# DELETE /api/admin/seller/<seller_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/seller/<seller_id>",
    methods=["DELETE"],
)
@token_required
@roles_required("admin")
def delete_seller(seller_id):

    try:

        if not ObjectId.is_valid(seller_id):

            return error_response(

                "Invalid seller id.",

                400,

            )

        result = db.users.delete_one(

            {

                "_id": ObjectId(seller_id),

                "role": "seller",

            }

        )

        if result.deleted_count == 0:

            return error_response(

                "Seller not found.",

                404,

            )

        return success_response(

            "Seller deleted successfully."

        )

    except Exception as error:

        print("DELETE SELLER ERROR:", error)

        return error_response(

            "Unable to delete seller.",

            500,

        )
    # ==========================================================
# Product Management Routes
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/products
# ----------------------------------------------------------

@admin_bp.route(
    "/products",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_products():

    try:

        page = max(int(request.args.get("page", 1)), 1)
        limit = max(int(request.args.get("limit", 10)), 1)

        search = request.args.get("search", "").strip()

        skip = (page - 1) * limit

        query = {}

        if search:

            regex = re.compile(search, re.IGNORECASE)

            query["$or"] = [

                {"name": regex},

                {"category": regex},

                {"seller_name": regex},

            ]

        total = db.products.count_documents(query)

        products = list(

            db.products.find(query)

            .sort("created_at", DESCENDING)

            .skip(skip)

            .limit(limit)

        )

        formatted = []

        for product in products:

            formatted.append({

                "_id": str(product["_id"]),

                "name": product.get("name"),

                "category": product.get("category"),

                "price": product.get("price"),

                "stock": product.get("stock"),

                "seller_name": product.get("seller_name"),

                "status": product.get("status", "active"),

                "created_at": product.get("created_at"),

            })

        return success_response(

            "Products fetched successfully.",

            {

                "products": formatted,

                "pagination": {

                    "page": page,

                    "limit": limit,

                    "total": total,

                    "pages": (total + limit - 1) // limit,

                }

            }

        )

    except Exception as error:

        print("GET PRODUCTS ERROR:", error)

        return error_response(

            "Unable to fetch products.",

            500,

        )


# ----------------------------------------------------------
# DELETE /api/admin/product/<product_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/product/<product_id>",
    methods=["DELETE"],
)
@token_required
@roles_required("admin")
def delete_product(product_id):

    try:

        if not ObjectId.is_valid(product_id):

            return error_response(
                "Invalid product id.",
                400,
            )

        result = db.products.delete_one({

            "_id": ObjectId(product_id)

        })

        if result.deleted_count == 0:

            return error_response(
                "Product not found.",
                404,
            )

        return success_response(
            "Product deleted successfully."
        )

    except Exception as error:

        print("DELETE PRODUCT ERROR:", error)

        return error_response(
            "Unable to delete product.",
            500,
        )


# ==========================================================
# Order Management Routes
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/orders
# ----------------------------------------------------------

@admin_bp.route(
    "/orders",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_orders():

    try:

        page = max(int(request.args.get("page", 1)), 1)
        limit = max(int(request.args.get("limit", 10)), 1)

        status = request.args.get("status", "").strip()

        skip = (page - 1) * limit

        query = {}

        if status:

            query["status"] = status

        total = db.orders.count_documents(query)

        orders = list(

            db.orders.find(query)

            .sort("created_at", DESCENDING)

            .skip(skip)

            .limit(limit)

        )

        formatted = []

        for order in orders:

            formatted.append({

                "_id": str(order["_id"]),

                "customer_name": order.get("customer_name"),

                "customer_email": order.get("customer_email"),

                "total_amount": order.get("total_amount"),

                "payment_status": order.get("payment_status"),

                "status": order.get("status"),

                "created_at": order.get("created_at"),

            })

        return success_response(

            "Orders fetched successfully.",

            {

                "orders": formatted,

                "pagination": {

                    "page": page,

                    "limit": limit,

                    "total": total,

                    "pages": (total + limit - 1) // limit,

                }

            }

        )

    except Exception as error:

        print("GET ORDERS ERROR:", error)

        return error_response(

            "Unable to fetch orders.",

            500,

        )


# ----------------------------------------------------------
# PUT /api/admin/order/<order_id>/status
# ----------------------------------------------------------

@admin_bp.route(
    "/order/<order_id>/status",
    methods=["PUT"],
)
@token_required
@roles_required("admin")
def update_order_status(order_id):

    try:

        if not ObjectId.is_valid(order_id):

            return error_response(
                "Invalid order id.",
                400,
            )

        data = request.get_json()

        status = data.get("status")

        db.orders.update_one(

            {

                "_id": ObjectId(order_id)

            },

            {

                "$set": {

                    "status": status,

                    "updated_at": datetime.utcnow(),

                }

            }

        )

        return success_response(
            "Order status updated successfully."
        )

    except Exception as error:

        print("UPDATE ORDER ERROR:", error)

        return error_response(
            "Unable to update order.",
            500,
        )


# ----------------------------------------------------------
# DELETE /api/admin/order/<order_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/order/<order_id>",
    methods=["DELETE"],
)
@token_required
@roles_required("admin")
def delete_order(order_id):

    try:

        if not ObjectId.is_valid(order_id):

            return error_response(
                "Invalid order id.",
                400,
            )

        result = db.orders.delete_one({

            "_id": ObjectId(order_id)

        })

        if result.deleted_count == 0:

            return error_response(
                "Order not found.",
                404,
            )

        return success_response(
            "Order deleted successfully."
        )

    except Exception as error:

        print("DELETE ORDER ERROR:", error)

        return error_response(
            "Unable to delete order.",
            500,
        )
    # ==========================================================
# Category Management Routes
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/categories
# ----------------------------------------------------------

@admin_bp.route(
    "/categories",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_categories():

    try:

        categories = list(

            db.categories.find().sort(
                "created_at",
                DESCENDING,
            )

        )

        formatted = []

        for category in categories:

            formatted.append({

                "_id": str(category["_id"]),

                "name": category.get("name"),

                "description": category.get("description"),

                "status": category.get("status", "active"),

                "created_at": category.get("created_at"),

            })

        return success_response(

            "Categories fetched successfully.",

            formatted,

        )

    except Exception as error:

        print("GET CATEGORIES ERROR:", error)

        return error_response(

            "Unable to fetch categories.",

            500,

        )


# ----------------------------------------------------------
# POST /api/admin/category
# ----------------------------------------------------------

@admin_bp.route(
    "/category",
    methods=["POST"],
)
@token_required
@roles_required("admin")
def create_category():

    try:

        data = request.get_json()

        if not data:

            return error_response(

                "Request body is required.",

                400,

            )

        name = data.get("name", "").strip()

        description = data.get("description", "").strip()

        if not name:

            return error_response(

                "Category name is required.",

                400,

            )

        exists = db.categories.find_one({

            "name": {

                "$regex": f"^{re.escape(name)}$",

                "$options": "i",

            }

        })

        if exists:

            return error_response(

                "Category already exists.",

                409,

            )

        category = {

            "name": name,

            "description": description,

            "status": "active",

            "created_at": datetime.utcnow(),

            "updated_at": datetime.utcnow(),

        }

        result = db.categories.insert_one(category)

        category["_id"] = str(result.inserted_id)

        return success_response(

            "Category created successfully.",

            category,

            201,

        )

    except Exception as error:

        print("CREATE CATEGORY ERROR:", error)

        return error_response(

            "Unable to create category.",

            500,

        )


# ----------------------------------------------------------
# DELETE /api/admin/category/<category_id>
# ----------------------------------------------------------

@admin_bp.route(
    "/category/<category_id>",
    methods=["DELETE"],
)
@token_required
@roles_required("admin")
def delete_category(category_id):

    try:

        if not ObjectId.is_valid(category_id):

            return error_response(

                "Invalid category id.",

                400,

            )

        result = db.categories.delete_one({

            "_id": ObjectId(category_id)

        })

        if result.deleted_count == 0:

            return error_response(

                "Category not found.",

                404,

            )

        return success_response(

            "Category deleted successfully."

        )

    except Exception as error:

        print("DELETE CATEGORY ERROR:", error)

        return error_response(

            "Unable to delete category.",

            500,

        )


# ==========================================================
# Reports Routes
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/reports
# ----------------------------------------------------------

@admin_bp.route(
    "/reports",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_reports():

    try:

        report = {

            "users": db.users.count_documents({}),

            "sellers": db.users.count_documents({

                "role": "seller"

            }),

            "products": db.products.count_documents({}),

            "orders": db.orders.count_documents({}),

            "completed_orders": db.orders.count_documents({

                "status": "completed"

            }),

            "pending_orders": db.orders.count_documents({

                "status": "pending"

            }),

        }

        return success_response(

            "Reports generated successfully.",

            report,

        )

    except Exception as error:

        print("REPORT ERROR:", error)

        return error_response(

            "Unable to generate reports.",

            500,

        )


# ==========================================================
# Marketplace Settings
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/settings
# ----------------------------------------------------------

@admin_bp.route(
    "/settings",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def get_settings():

    try:

        settings = db.settings.find_one()

        if not settings:

            settings = {

                "marketplace_name": "AgriGenAI Marketplace",

                "currency": "INR",

                "delivery_charge": 0,

                "support_email": "",

                "contact_number": "",

                "theme": "green",

            }

        else:

            settings["_id"] = str(settings["_id"])

        return success_response(

            "Settings fetched successfully.",

            settings,

        )

    except Exception as error:

        print("GET SETTINGS ERROR:", error)

        return error_response(

            "Unable to fetch settings.",

            500,

        )


# ----------------------------------------------------------
# PUT /api/admin/settings
# ----------------------------------------------------------

@admin_bp.route(
    "/settings",
    methods=["PUT"],
)
@token_required
@roles_required("admin")
def update_settings():

    try:

        data = request.get_json()

        if not data:

            return error_response(

                "Request body is required.",

                400,

            )

        data["updated_at"] = datetime.utcnow()

        db.settings.update_one(

            {},

            {

                "$set": data,

            },

            upsert=True,

        )

        settings = db.settings.find_one()

        settings["_id"] = str(settings["_id"])

        return success_response(

            "Settings updated successfully.",

            settings,

        )

    except Exception as error:

        print("UPDATE SETTINGS ERROR:", error)

        return error_response(

            "Unable to update settings.",

            500,

        )
    # ==========================================================
# Health & System Routes
# ==========================================================

# ----------------------------------------------------------
# GET /api/admin/health
# ----------------------------------------------------------

@admin_bp.route(
    "/health",
    methods=["GET"],
)
def health_check():

    try:

        mongodb = True

        try:
            db.command("ping")
        except Exception:
            mongodb = False

        return success_response(

            "Admin service is running.",

            {

                "service": "AgriGenAI Admin API",

                "version": "2.0.0",

                "environment": os.getenv(
                    "FLASK_ENV",
                    "production",
                ),

                "authentication": "JWT",

                "database": "MongoDB",

                "database_status": (
                    "Connected"
                    if mongodb
                    else "Disconnected"
                ),

                "server_time": datetime.utcnow(),

            },

        )

    except Exception as error:

        print("HEALTH CHECK ERROR:", error)

        return error_response(

            "Unable to fetch health status.",

            500,

        )


# ----------------------------------------------------------
# GET /api/admin/system
# ----------------------------------------------------------

@admin_bp.route(
    "/system",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def system_information():

    try:

        information = {

            "application": "AgriGenAI Marketplace",

            "version": "2.0.0",

            "python_version": os.sys.version,

            "environment": os.getenv(
                "FLASK_ENV",
                "production",
            ),

            "jwt_expiration_hours": JWT_EXPIRATION_HOURS,

            "server_time": datetime.utcnow(),

            "collections": {

                "users": db.users.count_documents({}),

                "products": db.products.count_documents({}),

                "orders": db.orders.count_documents({}),

                "categories": db.categories.count_documents({}),

                "settings": db.settings.count_documents({}),

            },

        }

        return success_response(

            "System information fetched successfully.",

            information,

        )

    except Exception as error:

        print("SYSTEM INFO ERROR:", error)

        return error_response(

            "Unable to fetch system information.",

            500,

        )


# ==========================================================
# End of File
# ==========================================================