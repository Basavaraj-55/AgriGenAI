# ==========================================================
# 🌾 AgriGenAI Marketplace
# File: backend/routes/orders.py
# ==========================================================

from flask import (
    Blueprint,
    jsonify,
    request,
    g,
)

from middleware.auth import token_required
from middleware.roles import roles_required

from models.Order import Order


# ==========================================================
# Blueprint
# ==========================================================

orders_bp = Blueprint(
    "orders",
    __name__,
)


# ==========================================================
# Helper Response
# ==========================================================

def error_response(
    message,
    status=400,
):

    return jsonify(
        {
            "success": False,
            "message": message,
        }
    ), status


# ==========================================================
# Place Order
# POST /api/orders
# Buyer Only
# ==========================================================

@orders_bp.route(
    "/orders",
    methods=["POST"],
)
@token_required
@roles_required("user")
def place_order():

    try:

        current_user = g.current_user

        data = request.get_json() or {}

        # ----------------------------------------------
        # Required Fields
        # ----------------------------------------------

        required_fields = [

            "product_id",

            "product_name",

            "quantity",

            "price",

            "total_amount",

            "address",

            "payment_method",

        ]

        missing_fields = [

            field

            for field in required_fields

            if not data.get(field)

        ]

        if missing_fields:

            return error_response(

                f"Missing fields: {', '.join(missing_fields)}"

            )

        # ----------------------------------------------
        # Buyer Information
        # ----------------------------------------------

        data["user_id"] = current_user["id"]

        data["buyer_email"] = current_user["email"]

        data["status"] = "Processing"

        # ----------------------------------------------
        # Create Order
        # ----------------------------------------------

        result = Order.create_order(data)

        return jsonify(

            {
                "success": True,

                "message": "Order placed successfully.",

                "order_id": str(result.inserted_id),
            }

        ), 201

    except Exception as error:

        print("PLACE ORDER ERROR:", error)

        return error_response(

            "Unable to place order.",

            500,

        )
    # ==========================================================
# Get My Orders
# GET /api/orders/my-orders
# Buyer Only
# ==========================================================

@orders_bp.route(
    "/orders/my-orders",
    methods=["GET"],
)
@token_required
@roles_required("user")
def my_orders():

    try:

        current_user = g.current_user

        orders = Order.get_user_orders(
            current_user["id"]
        )

        for order in orders:

            order["_id"] = str(order["_id"])

        return jsonify({

            "success": True,

            "count": len(orders),

            "orders": orders,

        }), 200

    except Exception as error:

        print("MY ORDERS ERROR:", error)

        return error_response(
            "Unable to fetch orders.",
            500,
        )


# ==========================================================
# Get Order By ID
# GET /api/orders/<order_id>
# Buyer / Seller / Admin
# ==========================================================

@orders_bp.route(
    "/orders/<order_id>",
    methods=["GET"],
)
@token_required
def get_order(order_id):

    try:

        current_user = g.current_user

        order = Order.get_order(order_id)

        if not order:

            return error_response(
                "Order not found.",
                404,
            )

        role = current_user.get("role")

        # ------------------------------------------
        # Buyer Access
        # ------------------------------------------

        if role == "user":

            if order.get("user_id") != current_user["id"]:

                return error_response(
                    "You cannot access this order.",
                    403,
                )

        # ------------------------------------------
        # Seller Access
        # ------------------------------------------

        elif role == "seller":

            if order.get("seller_id") != current_user["id"]:

                return error_response(
                    "You cannot access this order.",
                    403,
                )

        order["_id"] = str(order["_id"])

        return jsonify({

            "success": True,

            "order": order,

        }), 200

    except Exception as error:

        print("GET ORDER ERROR:", error)

        return error_response(
            "Unable to fetch order.",
            500,
        )


# ==========================================================
# Seller Orders
# GET /api/orders/seller-orders
# Seller Only
# ==========================================================

@orders_bp.route(
    "/orders/seller-orders",
    methods=["GET"],
)
@token_required
@roles_required("user", "seller")
def seller_orders():

    try:

        current_user = g.current_user

        orders = Order.get_seller_orders(
            current_user["id"]
        )

        for order in orders:

            order["_id"] = str(order["_id"])

        return jsonify({

            "success": True,

            "count": len(orders),

            "orders": orders,

        }), 200

    except Exception as error:

        print("SELLER ORDERS ERROR:", error)

        return error_response(
            "Unable to fetch seller orders.",
            500,
        )
    # ==========================================================
# Update Order Status
# PUT /api/orders/status/<order_id>
# Seller / Admin Only
# ==========================================================

@orders_bp.route(
    "/orders/status/<order_id>",
    methods=["PUT"],
)
@token_required
def update_status(order_id):

    try:

        current_user = g.current_user

        role = current_user.get("role")

        # --------------------------------------------------
        # Allow Only Seller & Admin
        # --------------------------------------------------

        if role not in ["seller", "admin"]:

            return error_response(
                "Only seller or admin can update order status.",
                403,
            )

        # --------------------------------------------------
        # Get Order
        # --------------------------------------------------

        order = Order.get_order(order_id)

        if not order:

            return error_response(
                "Order not found.",
                404,
            )

        # --------------------------------------------------
        # Seller Ownership Check
        # --------------------------------------------------

        if role == "seller":

            if order.get("seller_id") != current_user["id"]:

                return error_response(
                    "You cannot update another seller's order.",
                    403,
                )

        # --------------------------------------------------
        # Request Data
        # --------------------------------------------------

        data = request.get_json() or {}

        status = data.get("status")

        # --------------------------------------------------
        # Allowed Status
        # --------------------------------------------------

        allowed_status = [

            "Processing",

            "Packed",

            "Shipped",

            "Delivered",

            "Cancelled",

        ]

        if status not in allowed_status:

            return error_response(
                "Invalid order status.",
                400,
            )

        # --------------------------------------------------
        # Update Status
        # --------------------------------------------------

        result = Order.update_status(
            order_id,
            status,
        )

        if result.matched_count == 0:

            return error_response(
                "Order update failed.",
                500,
            )

        return jsonify({

            "success": True,

            "message": "Order status updated successfully.",

            "status": status,

        }), 200

    except Exception as error:

        print("UPDATE STATUS ERROR:", error)

        return error_response(
            "Unable to update order status.",
            500,
        )
    # ==========================================================
# Cancel Order
# PUT /api/orders/cancel/<order_id>
# Buyer / Admin Only
# ==========================================================

@orders_bp.route(
    "/orders/cancel/<order_id>",
    methods=["PUT"],
)
@token_required
def cancel_order(order_id):

    try:

        current_user = g.current_user

        role = current_user.get("role")

        # --------------------------------------------------
        # Get Order
        # --------------------------------------------------

        order = Order.get_order(order_id)

        if not order:

            return error_response(
                "Order not found.",
                404,
            )

        # --------------------------------------------------
        # Buyer Permission
        # --------------------------------------------------

        if role == "user":

            if order.get("user_id") != current_user["id"]:

                return error_response(
                    "You cannot cancel this order.",
                    403,
                )

        # --------------------------------------------------
        # Seller Not Allowed
        # --------------------------------------------------

        elif role == "seller":

            return error_response(
                "Seller cannot cancel orders.",
                403,
            )

        # --------------------------------------------------
        # Invalid Role
        # --------------------------------------------------

        elif role not in ["admin", "user"]:

            return error_response(
                "Permission denied.",
                403,
            )

        # --------------------------------------------------
        # Cancel Order
        # --------------------------------------------------

        result = Order.cancel_order(order_id)

        if result.matched_count == 0:

            return error_response(
                "Unable to cancel order.",
                500,
            )

        return jsonify({

            "success": True,

            "message": "Order cancelled successfully.",

        }), 200

    except Exception as error:

        print("CANCEL ORDER ERROR:", error)

        return error_response(
            "Unable to cancel order.",
            500,
        )
    # ==========================================================
# Delete Order
# DELETE /api/orders/<order_id>
# Admin Only
# ==========================================================

@orders_bp.route(
    "/orders/<order_id>",
    methods=["DELETE"],
)
@token_required
@roles_required("admin")
def delete_order(order_id):

    try:

        result = Order.delete_order(order_id)

        if result.deleted_count == 0:

            return error_response(
                "Order not found.",
                404,
            )

        return jsonify({

            "success": True,

            "message": "Order deleted successfully.",

        }), 200

    except Exception as error:

        print("DELETE ORDER ERROR:", error)

        return error_response(
            "Unable to delete order.",
            500,
        )


# ==========================================================
# Dashboard Statistics
# GET /api/orders/dashboard
# Admin Only
# ==========================================================

@orders_bp.route(
    "/orders/dashboard",
    methods=["GET"],
)
@token_required
@roles_required("admin")
def dashboard():

    try:

        total_orders = Order.total_orders()

        total_revenue = Order.total_revenue()

        return jsonify({

            "success": True,

            "total_orders": total_orders,

            "total_revenue": total_revenue,

        }), 200

    except Exception as error:

        print("DASHBOARD ERROR:", error)

        return error_response(
            "Unable to fetch dashboard data.",
            500,
        )


# ==========================================================
# Order Health Check
# GET /api/orders/health
# ==========================================================

@orders_bp.route(
    "/orders/health",
    methods=["GET"],
)
def orders_health():

    return jsonify({

        "success": True,

        "service": "Marketplace Order API",

        "authentication": "JWT Enabled",

        "status": "Running",

        "version": "1.0",

    }), 200
