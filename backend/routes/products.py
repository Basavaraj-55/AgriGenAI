# ==========================================================
# 🌾 AgriGenAI Marketplace
# File: backend/routes/products.py
# ==========================================================

from flask import (
    Blueprint,
    jsonify,
    request,
    g,
)

from models.Product import Product

from middleware.auth import token_required
from middleware.roles import roles_required


# ==========================================================
# Blueprint
# ==========================================================

products_bp = Blueprint(
    "products",
    __name__,
)


# ==========================================================
# Helper Responses
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


def success_response(
    message,
    data=None,
    status=200,
):

    return jsonify(
        {
            "success": True,
            "message": message,
            "data": data,
        }
    ), status


# ==========================================================
# Add Product
# POST /api/products
# Seller Only
# ==========================================================

@products_bp.route(
    "/products",
    methods=["POST"],
)
@token_required
@roles_required("seller")
def add_product():

    try:

        seller = g.current_user

        data = request.form.to_dict()

        if not data:

            return error_response(
                "No product data received."
            )

        # --------------------------------------------------
        # Required Fields
        # --------------------------------------------------

        required_fields = [

            "product_name",

            "category",

            "description",

            "price",

            "quantity",

            "unit",

            "location",

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

        # --------------------------------------------------
        # Validate Price & Quantity
        # --------------------------------------------------

        try:

            data["price"] = float(data["price"])

            data["quantity"] = float(data["quantity"])

        except ValueError:

            return error_response(
                "Price and quantity must be numeric values."
            )

        if data["price"] <= 0:

            return error_response(
                "Price must be greater than zero."
            )

        if data["quantity"] <= 0:

            return error_response(
                "Quantity must be greater than zero."
            )

        # --------------------------------------------------
        # Seller Details
        # --------------------------------------------------

        data["seller_id"] = seller["id"]

        data["seller_name"] = seller["email"]

        data["status"] = "active"

        # --------------------------------------------------
        # Product Image
        # --------------------------------------------------

        image = request.files.get("image")

        if image:

            # TODO:
            # Upload image to Cloudinary / AWS S3
            data["image_url"] = ""

        else:

            data["image_url"] = ""

        # --------------------------------------------------
        # Save Product
        # --------------------------------------------------

        result = Product.create_product(data)

        return jsonify(

            {
                "success": True,

                "message": "Product added successfully.",

                "product_id": str(result.inserted_id),

            }

        ), 201

    except Exception as error:

        print("ADD PRODUCT ERROR:", error)

        return error_response(
            "Internal server error.",
            500,
        )
    # ==========================================================
# Get All Products
# GET /api/products
# Public
# ==========================================================

@products_bp.route(
    "/products",
    methods=["GET"],
)
def get_products():

    try:

        products = Product.get_all_products()

        response = []

        for product in products:

            product["_id"] = str(product["_id"])

            response.append(product)

        return jsonify({

            "success": True,

            "count": len(response),

            "products": response,

        }), 200

    except Exception as error:

        print("GET PRODUCTS ERROR:", error)

        return error_response(
            "Unable to fetch products.",
            500,
        )


# ==========================================================
# Get Product By ID
# GET /api/products/<product_id>
# Public
# ==========================================================

@products_bp.route(
    "/products/<product_id>",
    methods=["GET"],
)
def get_product(product_id):

    try:

        product = Product.get_product_by_id(product_id)

        if not product:

            return error_response(
                "Product not found.",
                404,
            )

        product["_id"] = str(product["_id"])

        return jsonify({

            "success": True,

            "product": product,

        }), 200

    except Exception as error:

        print("GET PRODUCT ERROR:", error)

        return error_response(
            "Unable to fetch product.",
            500,
        )


# ==========================================================
# Search Products
# GET /api/products/search?q=<keyword>
# Public
# ==========================================================

@products_bp.route(
    "/products/search",
    methods=["GET"],
)
def search_products():

    try:

        keyword = request.args.get(
            "q",
            "",
        ).strip()

        products = Product.search_products(keyword)

        response = []

        for product in products:

            product["_id"] = str(product["_id"])

            response.append(product)

        return jsonify({

            "success": True,

            "count": len(response),

            "products": response,

        }), 200

    except Exception as error:

        print("SEARCH PRODUCTS ERROR:", error)

        return error_response(
            "Unable to search products.",
            500,
        )
    # ==========================================================
# Products By Category
# GET /api/products/category/<category>
# Public
# ==========================================================

@products_bp.route(
    "/products/category/<category>",
    methods=["GET"],
)
def category_products(category):

    try:

        products = Product.get_by_category(category)

        response = []

        for product in products:

            product["_id"] = str(product["_id"])

            response.append(product)

        return jsonify({

            "success": True,

            "count": len(response),

            "products": response,

        }), 200

    except Exception as error:

        print("CATEGORY PRODUCTS ERROR:", error)

        return error_response(
            "Unable to fetch category products.",
            500,
        )


# ==========================================================
# Update Product
# PUT /api/products/<product_id>
# Seller Only
# ==========================================================

@products_bp.route(
    "/products/<product_id>",
    methods=["PUT"],
)
@token_required
@roles_required("seller")
def update_product(product_id):

    try:

        current_user = g.current_user

        # --------------------------------------------------
        # Find Product
        # --------------------------------------------------

        product = Product.get_product_by_id(product_id)

        if not product:

            return error_response(
                "Product not found.",
                404,
            )

        # --------------------------------------------------
        # Verify Seller Ownership
        # --------------------------------------------------

        if product.get("seller_id") != current_user["id"]:

            return error_response(
                "You cannot update another seller's product.",
                403,
            )

        # --------------------------------------------------
        # Request Body
        # --------------------------------------------------

        data = request.get_json()

        if not data:

            return error_response(
                "Invalid request body."
            )

        # --------------------------------------------------
        # Prevent Owner Changes
        # --------------------------------------------------

        data.pop("seller_id", None)
        data.pop("seller_name", None)

        # --------------------------------------------------
        # Update Product
        # --------------------------------------------------

        Product.update_product(

            product_id,

            current_user["id"],

            data,

        )

        return jsonify({

            "success": True,

            "message": "Product updated successfully.",

        }), 200

    except Exception as error:

        print("UPDATE PRODUCT ERROR:", error)

        return error_response(
            "Unable to update product.",
            500,
        )
    # ==========================================================
# Delete Product
# DELETE /api/products/<product_id>
# Seller Only
# ==========================================================

@products_bp.route(
    "/products/<product_id>",
    methods=["DELETE"],
)
@token_required
@roles_required("seller")
def delete_product(product_id):

    try:

        current_user = g.current_user

        # --------------------------------------------------
        # Get Product
        # --------------------------------------------------

        product = Product.get_product_by_id(product_id)

        if not product:

            return error_response(
                "Product not found.",
                404,
            )

        # --------------------------------------------------
        # Verify Seller Ownership
        # --------------------------------------------------

        if product.get("seller_id") != current_user["id"]:

            return error_response(
                "You cannot delete another seller's product.",
                403,
            )

        # --------------------------------------------------
        # Delete Product
        # --------------------------------------------------

        result = Product.delete_product(
            product_id,
            current_user["id"],
        )

        if result.deleted_count == 0:

            return error_response(
                "Product deletion failed.",
                500,
            )

        return jsonify({

            "success": True,

            "message": "Product deleted successfully.",

        }), 200

    except Exception as error:

        print("DELETE PRODUCT ERROR:", error)

        return error_response(
            "Unable to delete product.",
            500,
        )


# ==========================================================
# Seller Products
# GET /api/products/seller
# Seller Only
# ==========================================================

@products_bp.route(
    "/products/seller",
    methods=["GET"],
)
@token_required
@roles_required("seller")
def my_products():

    try:

        current_user = g.current_user

        products = Product.get_by_seller(
            current_user["id"]
        )

        response = []

        for product in products:

            product["_id"] = str(product["_id"])

            response.append(product)

        return jsonify({

            "success": True,

            "count": len(response),

            "products": response,

        }), 200

    except Exception as error:

        print("SELLER PRODUCTS ERROR:", error)

        return error_response(
            "Unable to fetch seller products.",
            500,
        )
    # ==========================================================
# Seller Product Count
# GET /api/products/seller/count
# Seller Dashboard
# ==========================================================

@products_bp.route(
    "/products/seller/count",
    methods=["GET"],
)
@token_required
@roles_required("seller")
def seller_product_count():

    try:

        current_user = g.current_user

        products = Product.get_by_seller(
            current_user["id"]
        )

        return jsonify({

            "success": True,

            "count": len(products),

        }), 200

    except Exception as error:

        print("SELLER PRODUCT COUNT ERROR:", error)

        return error_response(
            "Unable to get product count.",
            500,
        )


# ==========================================================
# Product API Health Check
# GET /api/products/health
# Public
# ==========================================================

@products_bp.route(
    "/products/health",
    methods=["GET"],
)
def products_health():

    return jsonify({

        "success": True,

        "service": "Marketplace Product API",

        "authentication": "JWT Enabled",

        "status": "Running",

        "version": "1.0",

    }), 200
