# ==========================================================
# 🌾 AgriGenAI JWT Utility
# backend/utils/jwt.py
# Secure JWT Token Management
# ==========================================================


from flask_jwt_extended import (
    create_access_token,
    decode_token
)





# ==========================================================
# Generate JWT Token
# ==========================================================


def generate_token(user):


    token = create_access_token(

        identity={

            "id":
            str(user["_id"]),


            "email":
            user.get(
                "email",
                ""
            ),


            "role":
            user.get(
                "role",
                "user"
            )

        }

    )


    return token







# ==========================================================
# Verify JWT Token
# ==========================================================


def verify_token(token):


    try:


        decoded = decode_token(

            token

        )


        return decoded





    except Exception:


        return None