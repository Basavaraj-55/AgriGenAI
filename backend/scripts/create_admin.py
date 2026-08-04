# ==========================================================
# 🌾 AgriGenAI
# Create Initial Admin
# backend/scripts/create_admin.py
# ==========================================================

from datetime import datetime

from app import app
from models.User import User
from utils.bcrypt import hash_password


def create_admin():

    with app.app_context():

        email = "admin@agrigenai.com"

        existing_admin = User.find_by_email(email)

        if existing_admin:

            print("⚠️ Admin already exists.")
            return

        admin = {

            "name": "Super Admin",

            "email": email,

            "password": hash_password("Admin@123"),

            "role": "admin",

            "status": "active",

            "created_at": datetime.utcnow(),

            "updated_at": datetime.utcnow()

        }

        User.create_user(admin)

        print("✅ Admin created successfully.")
        print("Email    : admin@agrigenai.com")
        print("Password : Admin@123")


if __name__ == "__main__":
    create_admin()