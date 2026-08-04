# ==========================================================
# 🌾 AgriGenAI Marketplace
# File: backend/models/Order.py
# ==========================================================

from datetime import datetime

from bson import ObjectId

from utils.database import db


# ==========================================================
# Order Model
# ==========================================================

class Order:

    collection = db["orders"]

    # ======================================================
    # Validate ObjectId
    # ======================================================

    @staticmethod
    def valid_id(order_id):

        try:

            return ObjectId(order_id)

        except Exception:

            return None

    # ======================================================
    # Create Order
    # ======================================================

    @staticmethod
    def create_order(order_data):

        now = datetime.utcnow()

        order_data["status"] = "Processing"

        order_data["created_at"] = now
        order_data["updated_at"] = now

        order_data.setdefault(
            "payment_status",
            "Pending",
        )

        order_data.setdefault(
            "payment_method",
            "COD",
        )

        order_data.setdefault(
            "tracking_status",
            "Order placed",
        )

        return Order.collection.insert_one(
            order_data
        )

    # ======================================================
    # Get All Orders
    # ======================================================

    @staticmethod
    def get_all_orders():

        return list(

            Order.collection.find()

            .sort(
                "created_at",
                -1,
            )

        )
        # ======================================================
    # Get Order By ID
    # ======================================================

    @staticmethod
    def get_order(order_id):

        object_id = Order.valid_id(order_id)

        if not object_id:

            return None

        return Order.collection.find_one(

            {
                "_id": object_id
            }

        )

    # ======================================================
    # Get User Orders
    # ======================================================

    @staticmethod
    def get_user_orders(user_id):

        return list(

            Order.collection.find(

                {
                    "user_id": user_id
                }

            ).sort(

                "created_at",

                -1

            )

        )

    # ======================================================
    # Get Seller Orders
    # ======================================================

    @staticmethod
    def get_seller_orders(seller_id):

        return list(

            Order.collection.find(

                {
                    "seller_id": seller_id
                }

            ).sort(

                "created_at",

                -1

            )

        )
        # ======================================================
    # Update Order Status
    # ======================================================

    @staticmethod
    def update_status(
        order_id,
        status,
    ):

        object_id = Order.valid_id(order_id)

        if not object_id:

            return None

        allowed_status = [

            "Processing",

            "Packed",

            "Shipped",

            "Delivered",

            "Cancelled",

        ]

        if status not in allowed_status:

            return None

        return Order.collection.update_one(

            {
                "_id": object_id,
            },

            {
                "$set": {

                    "status": status,

                    "tracking_status": status,

                    "updated_at": datetime.utcnow(),

                }

            }

        )

    # ======================================================
    # Cancel Order
    # ======================================================

    @staticmethod
    def cancel_order(order_id):

        object_id = Order.valid_id(order_id)

        if not object_id:

            return None

        return Order.collection.update_one(

            {
                "_id": object_id,
            },

            {
                "$set": {

                    "status": "Cancelled",

                    "tracking_status": "Order cancelled",

                    "updated_at": datetime.utcnow(),

                }

            }

        )

    # ======================================================
    # Delete Order
    # ======================================================

    @staticmethod
    def delete_order(order_id):

        object_id = Order.valid_id(order_id)

        if not object_id:

            return None

        return Order.collection.delete_one(

            {
                "_id": object_id,
            }

        )
        # ======================================================
    # Total Orders
    # ======================================================

    @staticmethod
    def total_orders():

        return Order.collection.count_documents({})

    # ======================================================
    # Total Revenue
    # ======================================================

    @staticmethod
    def total_revenue():

        pipeline = [

            {
                "$group": {

                    "_id": None,

                    "total": {

                        "$sum": "$total_amount"

                    }

                }

            }

        ]

        result = list(

            Order.collection.aggregate(

                pipeline

            )

        )

        if result:

            return result[0].get(

                "total",

                0

            )

        return 0

    # ======================================================
    # Seller Revenue
    # ======================================================

    @staticmethod
    def seller_revenue(seller_id):

        pipeline = [

            {
                "$match": {

                    "seller_id": seller_id

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

        ]

        result = list(

            Order.collection.aggregate(

                pipeline

            )

        )

        if result:

            return result[0].get(

                "total",

                0

            )

        return 0

    # ======================================================
    # Order Count By Status
    # ======================================================

    @staticmethod
    def count_by_status(status):

        return Order.collection.count_documents(

            {

                "status": status

            }

        )

    # ======================================================
    # Recent Orders
    # ======================================================

    @staticmethod
    def recent_orders(limit=10):

        return list(

            Order.collection.find()

            .sort(

                "created_at",

                -1

            )

            .limit(limit)

        )