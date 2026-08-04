# ==========================================================
# 🌾 AgriGenAI Secure Review Model
# backend/models/Review.py
# ==========================================================


from datetime import datetime


from bson import ObjectId


from utils.database import db






class Review:


    collection = db["reviews"]







    # ======================================================
    # Validate ObjectId
    # ======================================================


    @staticmethod
    def valid_id(review_id):


        try:

            return ObjectId(review_id)


        except Exception:


            return None







    # ======================================================
    # Create Review
    # ======================================================


    @staticmethod
    def create_review(review_data):


        now = datetime.utcnow()



        review_data["helpful"] = 0



        review_data["status"] = "active"



        review_data["created_at"] = now



        review_data["updated_at"] = now






        return Review.collection.insert_one(

            review_data

        )









    # ======================================================
    # Get Product Reviews
    # ======================================================


    @staticmethod
    def get_product_reviews(product_id):


        return list(

            Review.collection.find(

                {

                    "product_id":

                    product_id,


                    "status":

                    "active"

                }

            )

            .sort(

                "created_at",

                -1

            )

        )









    # ======================================================
    # Get Review By ID
    # ======================================================


    @staticmethod
    def get_review(review_id):


        object_id = Review.valid_id(

            review_id

        )



        if not object_id:


            return None





        return Review.collection.find_one(

            {

                "_id":

                object_id

            }

        )
        # ======================================================
    # Check Existing Review
    # ======================================================


    @staticmethod
    def already_reviewed(

        user_id,

        product_id

    ):


        return Review.collection.find_one(

            {

                "user_id":

                user_id,


                "product_id":

                product_id

            }

        )









    # ======================================================
    # Update Review
    # User Ownership Checked
    # ======================================================


    @staticmethod
    def update_review(

        review_id,

        user_id,

        review_data

    ):


        object_id = Review.valid_id(

            review_id

        )



        if not object_id:


            return None






        # Remove protected fields


        review_data.pop(

            "_id",

            None

        )


        review_data.pop(

            "user_id",

            None

        )


        review_data.pop(

            "product_id",

            None

        )


        review_data.pop(

            "created_at",

            None

        )







        # Rating validation


        if "rating" in review_data:


            rating = float(

                review_data["rating"]

            )



            if rating < 1 or rating > 5:


                return None







        review_data["updated_at"] = datetime.utcnow()








        return Review.collection.update_one(

            {

                "_id":

                object_id,


                "user_id":

                user_id

            },


            {

                "$set":

                review_data

            }

        )









    # ======================================================
    # Delete Review
    # User Ownership Checked
    # ======================================================


    @staticmethod
    def delete_review(

        review_id,

        user_id

    ):


        object_id = Review.valid_id(

            review_id

        )



        if not object_id:


            return None







        return Review.collection.delete_one(

            {

                "_id":

                object_id,


                "user_id":

                user_id

            }

        )
        # ======================================================
    # Mark Review Helpful
    # ======================================================


    @staticmethod
    def mark_helpful(review_id):


        object_id = Review.valid_id(

            review_id

        )



        if not object_id:


            return None







        return Review.collection.update_one(

            {

                "_id":

                object_id

            },


            {

                "$inc":

                {

                    "helpful":

                    1

                },


                "$set":

                {

                    "updated_at":

                    datetime.utcnow()

                }

            }

        )









    # ======================================================
    # Total Reviews For Product
    # ======================================================


    @staticmethod
    def total_reviews(product_id):


        return Review.collection.count_documents(

            {

                "product_id":

                product_id,


                "status":

                "active"

            }

        )









    # ======================================================
    # Average Rating
    # ======================================================


    @staticmethod
    def average_rating(product_id):


        pipeline = [


            {

                "$match":

                {

                    "product_id":

                    product_id,


                    "status":

                    "active"

                }

            },


            {

                "$group":

                {

                    "_id":

                    None,


                    "average":

                    {

                        "$avg":

                        "$rating"

                    }

                }

            }


        ]







        result = list(

            Review.collection.aggregate(

                pipeline

            )

        )







        if result:


            return round(

                result[0].get(

                    "average",

                    0

                ),

                1

            )






        return 0







    # ======================================================
    # Rating Summary
    # ======================================================


    @staticmethod
    def rating_summary(product_id):


        pipeline = [


            {

                "$match":

                {

                    "product_id":

                    product_id,


                    "status":

                    "active"

                }

            },


            {

                "$group":

                {

                    "_id":

                    "$rating",


                    "count":

                    {

                        "$sum":

                        1

                    }

                }

            }


        ]






        return list(

            Review.collection.aggregate(

                pipeline

            )

        )