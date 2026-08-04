# ==========================================================
# 🌾 AgriGenAI Secure Review Routes
# backend/routes/reviews.py
# ==========================================================


from flask import (
    Blueprint,
    jsonify,
    request,
    g
)


from models.Review import Review


from middleware.auth import (
    token_required
)


from middleware.roles import (
    roles_required
)






reviews_bp = Blueprint(

    "reviews",

    __name__

)







# ==========================================================
# Helper
# ==========================================================


def error_response(

    message,

    status=400

):

    return jsonify({

        "success":False,

        "message":message

    }),status







# ==========================================================
# Add Review
# POST /api/reviews
# User Only
# ==========================================================


@reviews_bp.route(

    "/reviews",

    methods=["POST"]

)

@token_required

@roles_required("user")

def add_review():


    try:


        data = request.get_json() or {}



        required_fields = [

            "product_id",

            "rating",

            "review"

        ]





        missing = [

            field

            for field in required_fields

            if not data.get(field)

        ]






        if missing:


            return error_response(

                f"Missing fields: {', '.join(missing)}"

            )







        rating = float(

            data["rating"]

        )






        if rating < 1 or rating > 5:


            return error_response(

                "Rating must be between 1 and 5."

            )








        current_user = g.current_user






        existing = Review.already_reviewed(

            current_user["id"],

            data["product_id"]

        )







        if existing:


            return error_response(

                "You already reviewed this product.",

                409

            )







        data["user_id"] = current_user["id"]


        data["customer_name"] = current_user["email"]






        result = Review.create_review(

            data

        )






        return jsonify({

            "success":True,


            "message":
            "Review added successfully.",


            "review_id":
            str(result.inserted_id)


        }),201







    except Exception as error:


        print(

            "ADD REVIEW ERROR:",

            error

        )


        return error_response(

            "Failed to add review.",

            500

        )









# ==========================================================
# Get Product Reviews
# GET /api/reviews/<product_id>
# Public
# ==========================================================


@reviews_bp.route(

    "/reviews/<product_id>",

    methods=["GET"]

)

def get_reviews(product_id):


    try:


        reviews = Review.get_product_reviews(

            product_id

        )






        for review in reviews:


            review["_id"] = str(

                review["_id"]

            )







        return jsonify({

            "success":True,


            "count":
            len(reviews),



            "reviews":
            reviews


        }),200







    except Exception as error:


        print(

            "GET REVIEWS ERROR:",

            error

        )


        return error_response(

            "Unable to fetch reviews.",

            500

        )
    # ==========================================================
# Update Review
# PUT /api/reviews/<review_id>
# User Only
# ==========================================================


@reviews_bp.route(

    "/reviews/<review_id>",

    methods=["PUT"]

)

@token_required

@roles_required("user")

def update_review(review_id):


    try:


        current_user = g.current_user



        data = request.get_json() or {}







        review = Review.get_review(

            review_id

        )






        if not review:


            return error_response(

                "Review not found.",

                404

            )







        # Ownership check


        if review.get(

            "user_id"

        ) != current_user["id"]:


            return error_response(

                "You cannot update another user's review.",

                403

            )








        rating = data.get(

            "rating"

        )






        if rating is not None:


            rating = float(rating)



            if rating < 1 or rating > 5:


                return error_response(

                    "Rating must be between 1 and 5."

                )







        result = Review.update_review(

            review_id,

            current_user["id"],

            data

        )







        if not result or result.matched_count == 0:


            return error_response(

                "Unable to update review.",

                404

            )








        return jsonify({

            "success":True,


            "message":
            "Review updated successfully."

        }),200







    except Exception as error:


        print(

            "UPDATE REVIEW ERROR:",

            error

        )


        return error_response(

            "Unable to update review.",

            500

        )









# ==========================================================
# Delete Review
# DELETE /api/reviews/<review_id>
# User Only
# ==========================================================


@reviews_bp.route(

    "/reviews/<review_id>",

    methods=["DELETE"]

)

@token_required

@roles_required("user")

def delete_review(review_id):


    try:


        current_user = g.current_user





        review = Review.get_review(

            review_id

        )






        if not review:


            return error_response(

                "Review not found.",

                404

            )







        # Ownership check


        if review.get(

            "user_id"

        ) != current_user["id"]:


            return error_response(

                "You cannot delete another user's review.",

                403

            )








        result = Review.delete_review(

            review_id,

            current_user["id"]

        )







        if not result or result.deleted_count == 0:


            return error_response(

                "Unable to delete review.",

                404

            )







        return jsonify({

            "success":True,


            "message":
            "Review deleted successfully."

        }),200







    except Exception as error:


        print(

            "DELETE REVIEW ERROR:",

            error

        )


        return error_response(

            "Unable to delete review.",

            500

        )
    # ==========================================================
# Mark Helpful
# PUT /api/reviews/helpful/<review_id>
# Logged User
# ==========================================================


@reviews_bp.route(

    "/reviews/helpful/<review_id>",

    methods=["PUT"]

)

@token_required

@roles_required("user")

def helpful_review(review_id):


    try:


        review = Review.get_review(

            review_id

        )





        if not review:


            return error_response(

                "Review not found.",

                404

            )







        result = Review.mark_helpful(

            review_id

        )






        if not result or result.matched_count == 0:


            return error_response(

                "Unable to update helpful count.",

                404

            )








        return jsonify({

            "success":True,


            "message":
            "Marked as helpful."

        }),200







    except Exception as error:


        print(

            "HELPFUL REVIEW ERROR:",

            error

        )


        return error_response(

            "Unable to update helpful count.",

            500

        )









# ==========================================================
# Review Statistics
# GET /api/reviews/stats/<product_id>
# Public
# ==========================================================


@reviews_bp.route(

    "/reviews/stats/<product_id>",

    methods=["GET"]

)

def review_stats(product_id):


    try:


        total = Review.total_reviews(

            product_id

        )



        average = Review.average_rating(

            product_id

        )







        return jsonify({

            "success":True,


            "product_id":
            product_id,


            "total_reviews":
            total,


            "average_rating":
            average


        }),200







    except Exception as error:


        print(

            "REVIEW STATS ERROR:",

            error

        )


        return error_response(

            "Unable to fetch review statistics.",

            500

        )
    # ==========================================================
# Rating Summary
# GET /api/reviews/summary/<product_id>
# Public
# ==========================================================


@reviews_bp.route(

    "/reviews/summary/<product_id>",

    methods=["GET"]

)

def rating_summary(product_id):


    try:


        summary = Review.rating_summary(

            product_id

        )





        return jsonify({

            "success":True,


            "rating_summary":
            summary


        }),200







    except Exception as error:


        print(

            "RATING SUMMARY ERROR:",

            error

        )



        return error_response(

            "Unable to fetch rating summary.",

            500

        )









# ==========================================================
# Admin Delete Review
# DELETE /api/reviews/admin/<review_id>
# Admin Only
# ==========================================================


@reviews_bp.route(

    "/reviews/admin/<review_id>",

    methods=["DELETE"]

)

@token_required

@roles_required("admin")

def admin_delete_review(review_id):


    try:


        result = Review.delete_review(

            review_id,

            None

        )






        if not result or result.deleted_count == 0:


            return error_response(

                "Review not found.",

                404

            )







        return jsonify({

            "success":True,


            "message":
            "Review removed by admin."

        }),200







    except Exception as error:


        print(

            "ADMIN DELETE REVIEW ERROR:",

            error

        )



        return error_response(

            "Unable to delete review.",

            500

        )









# ==========================================================
# Review Health Check
# GET /api/reviews/health
# ==========================================================


@reviews_bp.route(

    "/reviews/health",

    methods=["GET"]

)

def reviews_health():


    return jsonify({

        "success":True,


        "service":
        "Marketplace Review API",



        "authentication":
        "JWT Enabled",



        "status":
        "Running"


    }),200