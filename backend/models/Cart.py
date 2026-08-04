# ==========================================================
# 🌾 AgriGenAI Marketplace
# File: backend/models/Cart.py
# ==========================================================

from datetime import datetime

from bson import ObjectId

from utils.database import db


# ==========================================================
# Cart Model
# ==========================================================

class Cart:

    collection = db["cart"]

    # ======================================================
    # Validate ObjectId
    # ======================================================

    @staticmethod
    def valid_id(cart_id):

        try:

            return ObjectId(cart_id)

        except Exception:

            return None

    # ======================================================
    # Add Item To Cart
    # ======================================================

    @staticmethod
    def add_to_cart(cart_data):

        now = datetime.utcnow()

        cart_data.setdefault("quantity", 1)

        cart_data["created_at"] = now
        cart_data["updated_at"] = now

        return Cart.collection.insert_one(cart_data)

    # ======================================================
    # Get User Cart
    # ======================================================

    @staticmethod
    def get_user_cart(user_id):

        return list(

            Cart.collection.find(

                {
                    "user_id": user_id
                }

            ).sort(

                "created_at",

                -1

            )

        )
        # ======================================================
    # Get Cart Item By ID
    # ======================================================

    @staticmethod
    def get_item_by_id(cart_id):

        object_id = Cart.valid_id(cart_id)

        if not object_id:

            return None

        return Cart.collection.find_one(

            {
                "_id": object_id
            }

        )

    # ======================================================
    # Check Existing Product In Cart
    # ======================================================

    @staticmethod
    def get_existing_item(
        user_id,
        product_id,
    ):

        return Cart.collection.find_one(

            {
                "user_id": user_id,
                "product_id": product_id,
            }

        )

    # ======================================================
    # Update Quantity
    # ======================================================

    @staticmethod
    def update_quantity(
        cart_id,
        quantity,
    ):

        object_id = Cart.valid_id(cart_id)

        if not object_id:

            return None

        quantity = int(quantity)

        if quantity <= 0:

            return None

        return Cart.collection.update_one(

            {
                "_id": object_id
            },

            {
                "$set": {

                    "quantity": quantity,

                    "updated_at": datetime.utcnow(),

                }

            }

        )
        # ======================================================
    # Increase Quantity
    # ======================================================

    @staticmethod
    def increase_quantity(cart_id):

        object_id = Cart.valid_id(cart_id)

        if not object_id:

            return None

        return Cart.collection.update_one(

            {
                "_id": object_id
            },

            {
                "$inc": {
                    "quantity": 1
                },

                "$set": {
                    "updated_at": datetime.utcnow()
                }

            }

        )

    # ======================================================
    # Decrease Quantity
    # ======================================================

    @staticmethod
    def decrease_quantity(cart_id):

        object_id = Cart.valid_id(cart_id)

        if not object_id:

            return None

        return Cart.collection.update_one(

            {
                "_id": object_id,

                "quantity": {
                    "$gt": 1
                }

            },

            {
                "$inc": {
                    "quantity": -1
                },

                "$set": {
                    "updated_at": datetime.utcnow()
                }

            }

        )

    # ======================================================
    # Remove Cart Item
    # ======================================================

    @staticmethod
    def remove_item(cart_id):

        object_id = Cart.valid_id(cart_id)

        if not object_id:

            return None

        return Cart.collection.delete_one(

            {
                "_id": object_id
            }

        )

    # ======================================================
    # Clear User Cart
    # ======================================================

    @staticmethod
    def clear_cart(user_id):

        return Cart.collection.delete_many(

            {
                "user_id": user_id
            }

        )
        # ======================================================
    # Calculate Cart Total
    # ======================================================

    @staticmethod
    def calculate_total(user_id):

        cart_items = Cart.get_user_cart(user_id)

        total = 0

        for item in cart_items:

            price = float(item.get("price", 0))

            quantity = int(item.get("quantity", 0))

            total += price * quantity

        return total

    # ======================================================
    # Get Cart Count
    # ======================================================

    @staticmethod
    def cart_count(user_id):

        return Cart.collection.count_documents(

            {
                "user_id": user_id
            }

        )

    # ======================================================
    # Remove User Cart Item
    # ======================================================

    @staticmethod
    def remove_user_item(
        cart_id,
        user_id,
    ):

        object_id = Cart.valid_id(cart_id)

        if not object_id:

            return None

        return Cart.collection.delete_one(

            {
                "_id": object_id,
                "user_id": user_id,
            }

        )