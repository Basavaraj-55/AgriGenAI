# ==========================================================
# 🌾 AgriGenAI Marketplace
# File: backend/models/Product.py
# ==========================================================

from datetime import datetime

from bson import ObjectId

from utils.database import db


# ==========================================================
# Product Model
# ==========================================================

class Product:

    collection = db["products"]

    # ======================================================
    # Validate ObjectId
    # ======================================================

    @staticmethod
    def valid_id(product_id):

        try:

            return ObjectId(product_id)

        except Exception:

            return None

    # ======================================================
    # Create Product
    # ======================================================

    @staticmethod
    def create_product(product_data):

        now = datetime.utcnow()

        product_data["created_at"] = now
        product_data["updated_at"] = now

        # --------------------------------------------------
        # Default Values
        # --------------------------------------------------

        product_data.setdefault(
            "status",
            "active",
        )

        product_data.setdefault(
            "rating",
            0,
        )

        product_data.setdefault(
            "total_reviews",
            0,
        )

        product_data.setdefault(
            "stock",
            product_data.get(
                "quantity",
                0,
            ),
        )

        product_data.setdefault(
            "organic",
            False,
        )

        return Product.collection.insert_one(
            product_data
        )

    # ======================================================
    # Get All Products
    # ======================================================

    @staticmethod
    def get_all_products():

        return list(

            Product.collection.find(

                {
                    "status": "active"
                }

            ).sort(

                "created_at",

                -1,

            )

        )
        # ======================================================
    # Get Product By ID
    # ======================================================

    @staticmethod
    def get_product_by_id(product_id):

        object_id = Product.valid_id(product_id)

        if not object_id:

            return None

        return Product.collection.find_one(

            {
                "_id": object_id
            }

        )

    # ======================================================
    # Update Product
    # Seller Ownership Verified
    # ======================================================

    @staticmethod
    def update_product(
        product_id,
        seller_id,
        updated_data,
    ):

        object_id = Product.valid_id(product_id)

        if not object_id:

            return None

        # --------------------------------------------------
        # Protected Fields
        # --------------------------------------------------

        updated_data.pop("_id", None)
        updated_data.pop("seller_id", None)
        updated_data.pop("seller_name", None)
        updated_data.pop("created_at", None)

        updated_data["updated_at"] = datetime.utcnow()

        return Product.collection.update_one(

            {
                "_id": object_id,
                "seller_id": seller_id,
            },

            {
                "$set": updated_data,
            }

        )

    # ======================================================
    # Delete Product
    # Seller Ownership Verified
    # ======================================================

    @staticmethod
    def delete_product(
        product_id,
        seller_id,
    ):

        object_id = Product.valid_id(product_id)

        if not object_id:

            return None

        return Product.collection.delete_one(

            {
                "_id": object_id,
                "seller_id": seller_id,
            }

        )
        # ======================================================
    # Search Products
    # ======================================================

    @staticmethod
    def search_products(keyword):

        if not keyword:

            return []

        return list(

            Product.collection.find(

                {

                    "status": "active",

                    "$or": [

                        {
                            "product_name": {
                                "$regex": keyword,
                                "$options": "i",
                            }
                        },

                        {
                            "category": {
                                "$regex": keyword,
                                "$options": "i",
                            }
                        },

                        {
                            "seller_name": {
                                "$regex": keyword,
                                "$options": "i",
                            }
                        },

                    ],

                }

            )

        )

    # ======================================================
    # Get Products By Category
    # ======================================================

    @staticmethod
    def get_by_category(category):

        return list(

            Product.collection.find(

                {

                    "category": category,

                    "status": "active",

                }

            ).sort(

                "created_at",

                -1,

            )

        )

    # ======================================================
    # Get Products By Seller
    # ======================================================

    @staticmethod
    def get_by_seller(seller_id):

        return list(

            Product.collection.find(

                {

                    "seller_id": seller_id,

                }

            ).sort(

                "created_at",

                -1,

            )

        )

    # ======================================================
    # Filter Products By Price
    # ======================================================

    @staticmethod
    def filter_by_price(
        min_price,
        max_price,
    ):

        try:

            return list(

                Product.collection.find(

                    {

                        "price": {

                            "$gte": float(min_price),

                            "$lte": float(max_price),

                        },

                        "status": "active",

                    }

                )

            )

        except Exception:

            return []
            # ======================================================
    # Update Product Stock
    # ======================================================

    @staticmethod
    def update_stock(
        product_id,
        quantity,
    ):

        object_id = Product.valid_id(product_id)

        if not object_id:

            return None

        if quantity < 0:

            return None

        return Product.collection.update_one(

            {
                "_id": object_id,
            },

            {
                "$set": {

                    "stock": quantity,

                    "updated_at": datetime.utcnow(),

                }

            }

        )

    # ======================================================
    # Update Product Rating
    # ======================================================

    @staticmethod
    def update_rating(
        product_id,
        rating,
        total_reviews,
    ):

        object_id = Product.valid_id(product_id)

        if not object_id:

            return None

        if rating < 0 or rating > 5:

            return None

        return Product.collection.update_one(

            {
                "_id": object_id,
            },

            {
                "$set": {

                    "rating": rating,

                    "total_reviews": total_reviews,

                    "updated_at": datetime.utcnow(),

                }

            }

        )

    # ======================================================
    # Total Active Products
    # ======================================================

    @staticmethod
    def total_products():

        return Product.collection.count_documents(

            {
                "status": "active",
            }

        )

    # ======================================================
    # Update Product Status
    # ======================================================

    @staticmethod
    def update_status(
        product_id,
        status,
    ):

        object_id = Product.valid_id(product_id)

        if not object_id:

            return None

        allowed_status = [

            "active",

            "inactive",

            "out_of_stock",

        ]

        if status not in allowed_status:

            return None

        return Product.collection.update_one(

            {
                "_id": object_id,
            },

            {
                "$set": {

                    "status": status,

                    "updated_at": datetime.utcnow(),

                }

            }

        )
    