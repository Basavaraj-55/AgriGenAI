# ==========================================================
# 🌾 AgriGenAI Marketplace
# File: backend/routes/cart.py
# ==========================================================

from flask import (
    Blueprint,
    request,
    jsonify,
    g,
)

from middleware.auth import token_required
from middleware.roles import roles_required

from models.Cart import Cart

# ==========================================================
# Blueprint
# ==========================================================

cart_bp = Blueprint(
    "cart",
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
# Add To Cart
# POST /api/cart
# ==========================================================

@cart_bp.route(
    "/cart",
    methods=["POST"],
)
@token_required
@roles_required("user")
def add_to_cart():

    try:

        current_user = g.current_user

        data = request.get_json() or {}

        # ------------------------------------------
        # Required Fields
        # ------------------------------------------

        required_fields = [

            "product_id",

            "product_name",

            "price",

            "quantity",

            "image",

            "seller_id",

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

        # ------------------------------------------
        # Attach Logged In User
        # ------------------------------------------

        data["user_id"] = current_user["id"]

        # ------------------------------------------
        # Check Existing Cart Item
        # ------------------------------------------

        existing_item = Cart.get_existing_item(

            data["user_id"],

            data["product_id"],

        )

        if existing_item:

            Cart.update_quantity(

                str(existing_item["_id"]),

                existing_item["quantity"] + int(data["quantity"]),

            )

            return jsonify(

                {
                    "success": True,
                    "message": "Cart updated successfully.",
                }

            ), 200

        # ------------------------------------------
        # Create New Cart Item
        # ------------------------------------------

        result = Cart.add_to_cart(data)

        return jsonify(

            {
                "success": True,
                "message": "Product added to cart.",
                "cart_id": str(result.inserted_id),
            }

        ), 201

    except Exception as error:

        print("ADD CART ERROR:", error)

        return error_response(

            "Unable to add product.",

            500,

        )
    # ==========================================================
# Get My Cart
# GET /api/cart
# ==========================================================

@cart_bp.route(
    "/cart",
    methods=["GET"],
)
@token_required
@roles_required("user")
def get_cart():

    try:

        current_user = g.current_user

        cart_items = Cart.get_user_cart(
            current_user["id"]
        )

        total = 0

        for item in cart_items:

            item["_id"] = str(item["_id"])

            total += (
                float(item.get("price", 0))
                * int(item.get("quantity", 0))
            )

        return jsonify({

            "success": True,

            "count": len(cart_items),

            "total": total,

            "cart": cart_items,

        }), 200

    except Exception as error:

        print("GET CART ERROR:", error)

        return error_response(
            "Unable to fetch cart.",
            500,
        )


# ==========================================================
# Update Cart Quantity
# PUT /api/cart/<cart_id>
# ==========================================================

@cart_bp.route(
    "/cart/<cart_id>",
    methods=["PUT"],
)
@token_required
@roles_required("user")
def update_cart(cart_id):

    try:

        data = request.get_json() or {}

        quantity = data.get("quantity")

        if quantity is None:

            return error_response(
                "Quantity is required."
            )

        if int(quantity) <= 0:

            return error_response(
                "Quantity must be greater than zero."
            )

        result = Cart.update_quantity(
            cart_id,
            int(quantity),
        )

        if result.matched_count == 0:

            return error_response(
                "Cart item not found.",
                404,
            )

        return jsonify({

            "success": True,

            "message": "Quantity updated."

        }), 200

    except Exception as error:

        print("UPDATE CART ERROR:", error)

        return error_response(
            "Unable to update cart.",
            500,
        )


# ==========================================================
# Increase Quantity
# PUT /api/cart/increase/<cart_id>
# ==========================================================

@cart_bp.route(
    "/cart/increase/<cart_id>",
    methods=["PUT"],
)
@token_required
@roles_required("user")
def increase_quantity(cart_id):

    try:

        Cart.increase_quantity(cart_id)

        return jsonify({

            "success": True,

            "message": "Quantity increased."

        }), 200

    except Exception as error:

        print("INCREASE CART ERROR:", error)

        return error_response(
            "Unable to increase quantity.",
            500,
        )


# ==========================================================
# Decrease Quantity
# PUT /api/cart/decrease/<cart_id>
# ==========================================================

@cart_bp.route(
    "/cart/decrease/<cart_id>",
    methods=["PUT"],
)
@token_required
@roles_required("user")
def decrease_quantity(cart_id):

    try:

        Cart.decrease_quantity(cart_id)

        return jsonify({

            "success": True,

            "message": "Quantity decreased."

        }), 200

    except Exception as error:

        print("DECREASE CART ERROR:", error)

        return error_response(
            "Unable to decrease quantity.",
            500,
        )
    # ==========================================================
# Remove Cart Item
# DELETE /api/cart/<cart_id>
# ==========================================================

@cart_bp.route(
    "/cart/<cart_id>",
    methods=["DELETE"],
)
@token_required
@roles_required("user")
def remove_cart_item(cart_id):

    try:

        current_user = g.current_user

        # ----------------------------------------------
        # Get Cart Item
        # ----------------------------------------------

        cart_item = Cart.get_item_by_id(cart_id)

        if not cart_item:

            return error_response(
                "Cart item not found.",
                404,
            )

        # ----------------------------------------------
        # Verify Ownership
        # ----------------------------------------------

        if cart_item.get("user_id") != current_user["id"]:

            return error_response(
                "You are not authorized to remove this item.",
                403,
            )

        # ----------------------------------------------
        # Delete Item
        # ----------------------------------------------

        result = Cart.remove_item(cart_id)

        if result.deleted_count == 0:

            return error_response(
                "Unable to remove cart item.",
                500,
            )

        return jsonify({

            "success": True,

            "message": "Item removed successfully."

        }), 200

    except Exception as error:

        print("REMOVE CART ERROR:", error)

        return error_response(
            "Unable to remove cart item.",
            500,
        )


# ==========================================================
# Clear Cart
# DELETE /api/cart/clear
# ==========================================================

@cart_bp.route(
    "/cart/clear",
    methods=["DELETE"],
)
@token_required
@roles_required("user")
def clear_cart():

    try:

        current_user = g.current_user

        Cart.clear_cart(
            current_user["id"]
        )

        return jsonify({

            "success": True,

            "message": "Cart cleared successfully."

        }), 200

    except Exception as error:

        print("CLEAR CART ERROR:", error)

        return error_response(
            "Unable to clear cart.",
            500,
        )
    # ==========================================================
# Cart Total
# GET /api/cart/total
# ==========================================================

@cart_bp.route(
    "/cart/total",
    methods=["GET"],
)
@token_required
@roles_required("user")
def cart_total():

    try:

        current_user = g.current_user

        total = Cart.calculate_total(
            current_user["id"]
        )

        return jsonify({

            "success": True,

            "total": total,

        }), 200

    except Exception as error:

        print("CART TOTAL ERROR:", error)

        return error_response(
            "Unable to calculate cart total.",
            500,
        )


# ==========================================================
# Cart Count
# GET /api/cart/count
# ==========================================================

@cart_bp.route(
    "/cart/count",
    methods=["GET"],
)
@token_required
@roles_required("user")
def cart_count():

    try:

        current_user = g.current_user

        cart_items = Cart.get_user_cart(
            current_user["id"]
        )

        return jsonify({

            "success": True,

            "count": len(cart_items),

        }), 200

    except Exception as error:

        print("CART COUNT ERROR:", error)

        return error_response(
            "Unable to get cart count.",
            500,
        )


# ==========================================================
# Cart Health Check
# GET /api/cart/health
# ==========================================================

@cart_bp.route(
    "/cart/health",
    methods=["GET"],
)
def cart_health():

    return jsonify({

        "success": True,

        "service": "Marketplace Cart API",

        "authentication": "JWT Enabled",

        "status": "Running",

        "version": "1.0",

    }), 200