from datetime import datetime
from bson import ObjectId
import bcrypt


class Admin:

    def __init__(
        self,
        db
    ):
        self.collection = db.admins

    # ==========================================
    # Create Admin
    # ==========================================

    def create_admin(
        self,
        name,
        email,
        password
    ):

        # Check if email already exists
        existing = self.collection.find_one(
            {
                "email": email.lower()
            }
        )

        if existing:
            return None

        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        admin = {

            "name": name,

            "email": email.lower(),

            "password": hashed_password,

            "role": "admin",

            "is_active": True,

            "created_at": datetime.utcnow(),

            "updated_at": datetime.utcnow()

        }

        result = self.collection.insert_one(admin)

        admin["_id"] = result.inserted_id

        return admin

    # ==========================================
    # Find By Email
    # ==========================================

    def get_by_email(
        self,
        email
    ):

        return self.collection.find_one(
            {
                "email": email.lower()
            }
        )

    # ==========================================
    # Find By Id
    # ==========================================

    def get_by_id(
        self,
        admin_id
    ):

        return self.collection.find_one(
            {
                "_id": ObjectId(admin_id)
            }
        )

    # ==========================================
    # Verify Password
    # ==========================================

    def verify_password(
        self,
        admin,
        password
    ):

        return bcrypt.checkpw(
            password.encode("utf-8"),
            admin["password"].encode("utf-8")
        )

    # ==========================================
    # Update Profile
    # ==========================================

    def update_profile(
        self,
        admin_id,
        data
    ):

        data["updated_at"] = datetime.utcnow()

        self.collection.update_one(
            {
                "_id": ObjectId(admin_id)
            },
            {
                "$set": data
            }
        )

        return self.get_by_id(admin_id)

    # ==========================================
    # Delete Admin
    # ==========================================

    def delete_admin(
        self,
        admin_id
    ):

        return self.collection.delete_one(
            {
                "_id": ObjectId(admin_id)
            }
        )

    # ==========================================
    # Count Admins
    # ==========================================

    def count_admins(self):

        return self.collection.count_documents({})