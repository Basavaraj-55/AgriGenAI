# ==========================================================
# 🌾 AgriGenAI User Model
# backend/models/User.py
# Part 1/2
# ==========================================================

from datetime import datetime
from bson import ObjectId

from utils.database import users_collection


class User:
    """
    User Model

    Handles:
    - User Registration
    - Seller Registration
    - Authentication
    - User Queries
    - Seller Management
    - OTP Management
    """

    # ======================================================
    # Mongo Collection
    # ======================================================

    collection = users_collection

    # ======================================================
    # Helper Methods
    # ======================================================

    @staticmethod
    def normalize_email(email):
        """
        Normalize email address.
        """

        if not email:
            return ""

        return email.strip().lower()

    # ======================================================
    # Create User
    # ======================================================

    @classmethod
    def create(cls, user_data):
        """
        Insert a new user.
        """

        return cls.collection.insert_one(user_data)

    # ======================================================
    # Compatibility Method
    # Required by auth.py
    # ======================================================

    @classmethod
    def create_user(cls, user_data):
        """
        Wrapper for compatibility with older code.
        """

        return cls.create(user_data)

    # ======================================================
    # Find User By Email
    # ======================================================

    @classmethod
    def find_by_email(cls, email):
        """
        Find user using email.
        """

        return cls.collection.find_one({
            "email": cls.normalize_email(email)
        })

    # ======================================================
    # Find User By ID
    # ======================================================

    @classmethod
    def find_by_id(cls, user_id):
        """
        Find user using Mongo ObjectId.
        """

        try:

            return cls.collection.find_one({
                "_id": ObjectId(user_id)
            })

        except Exception:

            return None

    # ======================================================
    # Check Email Exists
    # ======================================================

    @classmethod
    def email_exists(cls, email):
        """
        Returns True if email already exists.
        """

        return cls.find_by_email(email) is not None

    # ======================================================
    # Get All Users
    # ======================================================

    @classmethod
    def get_all(cls):
        """
        Return all users except sensitive fields.
        """

        return list(

            cls.collection.find(

                {},

                {
                    "password": 0,
                    "otp": 0,
                    "otp_expiry": 0,
                    "otp_verified": 0
                }

            )

        )

    # ======================================================
    # Get Users By Role
    # ======================================================

    @classmethod
    def find_by_role(cls, role):
        """
        Return users by role.
        """

        return list(

            cls.collection.find(

                {
                    "role": role
                },

                {
                    "password": 0
                }

            )

        )

    # ======================================================
    # Seller Queries
    # ======================================================

    @classmethod
    def get_sellers(cls):
        """
        Return all sellers.
        """

        return cls.find_by_role("seller")

    @classmethod
    def get_sellers_by_status(cls, status):
        """
        Return sellers by approval status.
        """

        return list(

            cls.collection.find(

                {
                    "role": "seller",
                    "status": status
                },

                {
                    "password": 0
                }

            )

        )

    # ======================================================
    # Update User
    # ======================================================

    @classmethod
    def update(cls, user_id, data):
        """
        Update user fields.
        """

        try:

            return cls.collection.update_one(

                {
                    "_id": ObjectId(user_id)
                },

                {
                    "$set": data
                }

            )

        except Exception:

            return None

    # ======================================================
    # Update Role
    # ======================================================

    @classmethod
    def update_role(cls, user_id, role):
        """
        Change user role.
        """

        return cls.update(

            user_id,

            {
                "role": role
            }

        )

    # ======================================================
    # Seller Approval / Rejection
    # ======================================================

    @classmethod
    def update_seller_status(cls, seller_id, status):
        """
        Approve or reject seller.
        """

        try:

            return cls.collection.update_one(

                {
                    "_id": ObjectId(seller_id),
                    "role": "seller"
                },

                {
                    "$set": {
                        "status": status
                    }
                }

            )

        except Exception:

            return None
            # ======================================================
    # Update Password
    # ======================================================

    @classmethod
    def update_password(cls, email, hashed_password):
        """
        Update user password.
        """

        return cls.collection.update_one(

            {
                "email": cls.normalize_email(email)
            },

            {
                "$set": {
                    "password": hashed_password
                }
            }

        )

    # ======================================================
    # Update Last Login
    # ======================================================

    @classmethod
    def update_last_login(cls, user_id):
        """
        Store user's last login time.
        """

        try:

            return cls.collection.update_one(

                {
                    "_id": ObjectId(user_id)
                },

                {
                    "$set": {
                        "last_login": datetime.utcnow()
                    }
                }

            )

        except Exception:

            return None

    # ======================================================
    # Save OTP
    # ======================================================

    @classmethod
    def save_otp(cls, email, otp, expiry):
        """
        Save OTP for password reset.
        """

        return cls.collection.update_one(

            {
                "email": cls.normalize_email(email)
            },

            {
                "$set": {
                    "otp": str(otp),
                    "otp_expiry": expiry,
                    "otp_verified": False
                }
            }

        )

    # ======================================================
    # Mark OTP Verified
    # ======================================================

    @classmethod
    def mark_otp_verified(cls, email):
        """
        Mark OTP as verified.
        """

        return cls.collection.update_one(

            {
                "email": cls.normalize_email(email)
            },

            {
                "$set": {
                    "otp_verified": True
                }
            }

        )

    # ======================================================
    # Check OTP Verification
    # ======================================================

    @classmethod
    def is_otp_verified(cls, email):
        """
        Check whether OTP is verified.
        """

        user = cls.find_by_email(email)

        if not user:
            return False

        return user.get("otp_verified", False)

    # ======================================================
    # Clear OTP Data
    # ======================================================

    @classmethod
    def clear_otp(cls, email):
        """
        Remove OTP fields after password reset.
        """

        return cls.collection.update_one(

            {
                "email": cls.normalize_email(email)
            },

            {
                "$unset": {
                    "otp": "",
                    "otp_expiry": "",
                    "otp_verified": ""
                }
            }

        )

    # ======================================================
    # Delete User
    # ======================================================

    @classmethod
    def delete(cls, user_id):
        """
        Delete a user permanently.
        """

        try:

            return cls.collection.delete_one(

                {
                    "_id": ObjectId(user_id)
                }

            )

        except Exception:

            return None

    # ======================================================
    # Get User Count
    # ======================================================

    @classmethod
    def count_users(cls):
        """
        Return total number of users.
        """

        return cls.collection.count_documents({})

    # ======================================================
    # Get Seller Count
    # ======================================================

    @classmethod
    def count_sellers(cls):
        """
        Return total number of sellers.
        """

        return cls.collection.count_documents(
            {
                "role": "seller"
            }
        )

    # ======================================================
    # Get Pending Seller Count
    # ======================================================

    @classmethod
    def count_pending_sellers(cls):
        """
        Return total pending seller requests.
        """

        return cls.collection.count_documents(
            {
                "role": "seller",
                "status": "pending"
            }
        )

    # ======================================================
    # Approve Seller
    # ======================================================

    @classmethod
    def approve_seller(cls, seller_id):
        """
        Approve seller account.
        """

        return cls.update_seller_status(
            seller_id,
            "approved"
        )

    # ======================================================
    # Reject Seller
    # ======================================================

    @classmethod
    def reject_seller(cls, seller_id):
        """
        Reject seller account.
        """

        return cls.update_seller_status(
            seller_id,
            "rejected"
        )

    # ======================================================
    # Block User
    # ======================================================

    @classmethod
    def block_user(cls, user_id):
        """
        Block a user.
        """

        return cls.update(
            user_id,
            {
                "status": "blocked"
            }
        )

    # ======================================================
    # Activate User
    # ======================================================

    @classmethod
    def activate_user(cls, user_id):
        """
        Activate a blocked user.
        """

        return cls.update(
            user_id,
            {
                "status": "active"
            }
        )

    # ======================================================
    # End of User Model
    # ======================================================