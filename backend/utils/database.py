# ==========================================================
# 🌾 AgriGenAI Database Configuration
# File: backend/utils/database.py
# ==========================================================

import os
from typing import Optional

from dotenv import load_dotenv

from pymongo import MongoClient
from pymongo.database import Database as MongoDatabase
from pymongo.collection import Collection
from pymongo.errors import (
    ConnectionFailure,
    ServerSelectionTimeoutError,
)

# ==========================================================
# Load Environment Variables
# ==========================================================

load_dotenv()

# ==========================================================
# MongoDB Configuration
# ==========================================================

MONGO_URI = os.getenv("MONGO_URI")

DATABASE_NAME = os.getenv(
    "DATABASE_NAME",
    "AgriGenAI",
)

if not MONGO_URI:

    raise ValueError(
        "❌ MONGO_URI is missing in the .env file."
    )

# ==========================================================
# Database Manager
# ==========================================================

class DatabaseManager:
    """
    MongoDB Database Manager

    Responsibilities:
        • Establish database connection
        • Return database instance
        • Return collections
        • Check database health
    """

    def __init__(self):

        self.client: Optional[MongoClient] = None

        self.db: Optional[MongoDatabase] = None

        self.connect()

    # ======================================================
    # Connect MongoDB
    # ======================================================

    def connect(self):

        try:

            self.client = MongoClient(

                MONGO_URI,

                serverSelectionTimeoutMS=5000,

                connect=True,

            )

            # Verify connection

            self.client.admin.command("ping")

            self.db = self.client[DATABASE_NAME]

            print("\n===================================")
            print("✅ MongoDB Connected Successfully")
            print(f"📦 Database : {DATABASE_NAME}")
            print("===================================\n")

        except (
            ConnectionFailure,
            ServerSelectionTimeoutError,
        ) as error:

            print("\n===================================")
            print("❌ MongoDB Connection Failed")
            print(error)
            print("===================================\n")

            raise
            # ======================================================
    # Get Database
    # ======================================================

    def get_database(self) -> MongoDatabase:
        """
        Return MongoDB database instance.
        """

        return self.db

    # ======================================================
    # Get Collection
    # ======================================================

    def get_collection(
        self,
        collection_name: str,
    ) -> Collection:
        """
        Return a MongoDB collection.
        """

        return self.db[collection_name]

    # ======================================================
    # Database Health Check
    # ======================================================

    def health_check(self) -> bool:
        """
        Check whether MongoDB connection is alive.
        """

        try:

            self.client.admin.command("ping")

            return True

        except Exception:

            return False

    # ======================================================
    # Close Connection
    # ======================================================

    def close_connection(self):
        """
        Close MongoDB connection.
        """

        if self.client:

            self.client.close()

            print("\n===================================")
            print("🔒 MongoDB Connection Closed")
            print("===================================\n")


# ==========================================================
# Singleton Database Instance
# ==========================================================

database = DatabaseManager()

db = database.get_database()


# ==========================================================
# Collection Helpers
# ==========================================================

users_collection = database.get_collection("users")

products_collection = database.get_collection("products")

orders_collection = database.get_collection("orders")

reviews_collection = database.get_collection("reviews")

cart_collection = database.get_collection("cart")

notifications_collection = database.get_collection("notifications")

otp_collection = database.get_collection("otp")


# ==========================================================
# End of File
# ==========================================================