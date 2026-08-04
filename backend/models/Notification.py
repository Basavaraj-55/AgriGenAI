# ==========================================================
# 🌾 AgriGenAI Secure Notification Model
# backend/models/Notification.py
# ==========================================================


from datetime import datetime


from bson import ObjectId


from utils.database import db






class Notification:


    collection = db["notifications"]







    # ======================================================
    # Validate ObjectId
    # ======================================================


    @staticmethod
    def valid_id(notification_id):


        try:

            return ObjectId(notification_id)


        except Exception:


            return None







    # ======================================================
    # Create Notification
    # ======================================================


    @staticmethod
    def create_notification(data):


        now = datetime.utcnow()



        data["is_read"] = False


        data["created_at"] = now


        data["updated_at"] = now






        return Notification.collection.insert_one(

            data

        )








    # ======================================================
    # Create Many Notifications
    # Broadcast
    # ======================================================


    @staticmethod
    def create_many(notifications):


        now = datetime.utcnow()



        for notification in notifications:


            notification["is_read"] = False


            notification["created_at"] = now


            notification["updated_at"] = now






        return Notification.collection.insert_many(

            notifications

        )








    # ======================================================
    # Get User Notifications
    # ======================================================


    @staticmethod
    def get_user_notifications(user_id):


        return list(

            Notification.collection.find(

                {

                    "user_id":

                    user_id

                }

            )

            .sort(

                "created_at",

                -1

            )

        )
    # ======================================================
# Get Notification By ID
# ======================================================


    @staticmethod
    def get_notification(notification_id):


        object_id = Notification.valid_id(

            notification_id

        )



        if not object_id:


            return None






        return Notification.collection.find_one(

            {

                "_id":

                object_id

            }

        )









    # ======================================================
    # Mark Notification As Read
    # ======================================================


    @staticmethod
    def mark_as_read(notification_id):


        object_id = Notification.valid_id(

            notification_id

        )



        if not object_id:


            return None






        return Notification.collection.update_one(

            {

                "_id":

                object_id

            },


            {

                "$set":

                {

                    "is_read":

                    True,


                    "updated_at":

                    datetime.utcnow()

                }

            }

        )









    # ======================================================
    # Mark All Notifications As Read
    # ======================================================


    @staticmethod
    def mark_all_as_read(user_id):


        return Notification.collection.update_many(

            {

                "user_id":

                user_id,


                "is_read":

                False

            },


            {

                "$set":

                {

                    "is_read":

                    True,


                    "updated_at":

                    datetime.utcnow()

                }

            }

        )









    # ======================================================
    # Delete Notification
    # ======================================================


    @staticmethod
    def delete_notification(notification_id):


        object_id = Notification.valid_id(

            notification_id

        )



        if not object_id:


            return None






        return Notification.collection.delete_one(

            {

                "_id":

                object_id

            }

        )









    # ======================================================
    # Delete All User Notifications
    # ======================================================


    @staticmethod
    def delete_all_notifications(user_id):


        return Notification.collection.delete_many(

            {

                "user_id":

                user_id

            }

        )
        # ======================================================
    # Get Unread Count
    # ======================================================


    @staticmethod
    def unread_count(user_id):


        return Notification.collection.count_documents(

            {

                "user_id":

                user_id,


                "is_read":

                False

            }

        )









    # ======================================================
    # Get All Users
    # Used For Broadcast Notification
    # ======================================================


    @staticmethod
    def get_all_users():


        return list(

            db["users"].find(

                {},

                {

                    "_id":1

                }

            )

        )









    # ======================================================
    # Count Total Notifications
    # ======================================================


    @staticmethod
    def total_notifications():


        return Notification.collection.count_documents(

            {}

        )









    # ======================================================
    # Count Read Notifications
    # ======================================================


    @staticmethod
    def read_notifications():


        return Notification.collection.count_documents(

            {

                "is_read":

                True

            }

        )









    # ======================================================
    # Count Unread Notifications
    # ======================================================


    @staticmethod
    def unread_notifications():


        return Notification.collection.count_documents(

            {

                "is_read":

                False

            }

        )