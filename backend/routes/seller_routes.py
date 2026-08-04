from flask import Blueprint, request, jsonify
from utils.database import db
from bson import ObjectId



seller_bp = Blueprint(
    "seller",
    __name__
)



# ==================================================
# GET SELLER PROFILE
# ==================================================

@seller_bp.route(
    "/seller/<seller_id>",
    methods=["GET"]
)
def get_seller(seller_id):

    try:

        if ObjectId.is_valid(seller_id):

            query = {
                "_id": ObjectId(seller_id),
                "role": "seller"
            }

        else:

            query = {
                "_id": seller_id,
                "role": "seller"
            }



        seller = db.users.find_one(query)



        if not seller:

            return jsonify({

                "success": False,

                "message": "Seller not found"

            }),404




        seller["_id"] = str(
            seller["_id"]
        )


        seller.pop(
            "password",
            None
        )



        return jsonify({

            "success": True,

            "seller": seller

        }),200



    except Exception as e:


        print(
            "GET SELLER ERROR:",
            e
        )


        return jsonify({

            "success": False,

            "message": str(e)

        }),500







# ==================================================
# UPDATE SELLER PROFILE
# ==================================================

@seller_bp.route(
    "/seller/<seller_id>",
    methods=["PUT"]
)
def update_seller(seller_id):

    try:

        data = request.json



        update_data = {

            "name":
            data.get("name"),


            "email":
            data.get("email"),


            "phone":
            data.get("phone"),


            "address":
            data.get("address"),


            "city":
            data.get("city"),


            "state":
            data.get("state"),


            "pincode":
            data.get("pincode")

        }



        if ObjectId.is_valid(seller_id):

            query = {

                "_id": ObjectId(seller_id),

                "role": "seller"

            }


        else:

            query = {

                "_id": seller_id,

                "role": "seller"

            }





        result = db.users.update_one(

            query,

            {
                "$set": update_data
            }

        )





        if result.matched_count == 0:

            return jsonify({

                "success": False,

                "message": "Seller not found"

            }),404






        return jsonify({

            "success": True,

            "message": "Profile updated successfully"

        }),200





    except Exception as e:


        print(
            "UPDATE SELLER ERROR:",
            e
        )


        return jsonify({

            "success": False,

            "message": str(e)

        }),500