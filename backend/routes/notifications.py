# ==========================================================
# 🌾 AgriGenAI Secure Notification Routes
# backend/routes/notifications.py
# ==========================================================


from flask import (
    Blueprint,
    jsonify,
    request,
    g
)


from models.Notification import Notification


from middleware.auth import token_required


from middleware.roles import roles_required






notifications_bp = Blueprint(

    "notifications",

    __name__

)







# ==========================================================
# Helper
# ==========================================================


def error_response(message,status=400):

    return jsonify({

        "success":False,

        "message":message

    }),status







# ==========================================================
# Get My Notifications
# GET /api/notifications
# User Only
# ==========================================================


@notifications_bp.route(

    "/notifications",

    methods=["GET"]

)

@token_required

@roles_required("user")

def get_notifications():


    try:


        current_user = g.current_user





        notifications = Notification.get_user_notifications(

            current_user["id"]

        )






        for notification in notifications:


            notification["_id"] = str(

                notification["_id"]

            )







        return jsonify({

            "success":True,


            "count":
            len(notifications),


            "notifications":
            notifications


        }),200







    except Exception as error:


        print(

            "GET NOTIFICATIONS ERROR:",

            error

        )



        return error_response(

            "Unable to fetch notifications.",

            500

        )









# ==========================================================
# Create Notification
# Admin Only
# POST /api/notifications
# ==========================================================


@notifications_bp.route(

    "/notifications",

    methods=["POST"]

)

@token_required

@roles_required("admin")

def create_notification():


    try:


        data = request.get_json() or {}





        required = [

            "user_id",

            "title",

            "message"

        ]






        for field in required:


            if not data.get(field):


                return error_response(

                    f"{field} is required."

                )







        result = Notification.create_notification(

            data

        )







        return jsonify({

            "success":True,


            "message":
            "Notification created successfully.",



            "notification_id":
            str(result.inserted_id)


        }),201







    except Exception as error:


        print(

            "CREATE NOTIFICATION ERROR:",

            error

        )



        return error_response(

            "Unable to create notification.",

            500

        )
    # ==========================================================
# Mark Notification As Read
# PUT /api/notifications/read/<notification_id>
# User Only
# ==========================================================


@notifications_bp.route(

    "/notifications/read/<notification_id>",

    methods=["PUT"]

)

@token_required

@roles_required("user")

def mark_as_read(notification_id):


    try:


        current_user = g.current_user






        notification = Notification.get_notification(

            notification_id

        )







        if not notification:


            return error_response(

                "Notification not found.",

                404

            )








        # Ownership Check


        if notification.get(

            "user_id"

        ) != current_user["id"]:


            return error_response(

                "You cannot access this notification.",

                403

            )








        result = Notification.mark_as_read(

            notification_id

        )







        if not result or result.modified_count == 0:


            return error_response(

                "Unable to update notification.",

                404

            )








        return jsonify({

            "success":True,


            "message":
            "Notification marked as read."

        }),200







    except Exception as error:


        print(

            "MARK READ ERROR:",

            error

        )


        return error_response(

            "Unable to update notification.",

            500

        )









# ==========================================================
# Mark All Notifications As Read
# PUT /api/notifications/read-all
# User Only
# ==========================================================


@notifications_bp.route(

    "/notifications/read-all",

    methods=["PUT"]

)

@token_required

@roles_required("user")

def mark_all_read():


    try:


        current_user = g.current_user






        result = Notification.mark_all_as_read(

            current_user["id"]

        )







        return jsonify({

            "success":True,


            "message":
            "All notifications marked as read.",


            "updated":
            result.modified_count


        }),200







    except Exception as error:


        print(

            "MARK ALL READ ERROR:",

            error

        )


        return error_response(

            "Unable to update notifications.",

            500

        )
    # ==========================================================
# Delete Notification
# DELETE /api/notifications/<notification_id>
# User Only
# ==========================================================


@notifications_bp.route(

    "/notifications/<notification_id>",

    methods=["DELETE"]

)

@token_required

@roles_required("user")

def delete_notification(notification_id):


    try:


        current_user = g.current_user






        notification = Notification.get_notification(

            notification_id

        )






        if not notification:


            return error_response(

                "Notification not found.",

                404

            )







        # Ownership Check


        if notification.get(

            "user_id"

        ) != current_user["id"]:


            return error_response(

                "You cannot delete this notification.",

                403

            )







        result = Notification.delete_notification(

            notification_id

        )







        if not result or result.deleted_count == 0:


            return error_response(

                "Unable to delete notification.",

                404

            )







        return jsonify({

            "success": True,


            "message":
            "Notification deleted successfully."

        }),200







    except Exception as error:


        print(

            "DELETE NOTIFICATION ERROR:",

            error

        )



        return error_response(

            "Unable to delete notification.",

            500

        )









# ==========================================================
# Delete All User Notifications
# DELETE /api/notifications
# User Only
# ==========================================================


@notifications_bp.route(

    "/notifications",

    methods=["DELETE"]

)

@token_required

@roles_required("user")

def delete_all_notifications():


    try:


        current_user = g.current_user






        result = Notification.delete_all_notifications(

            current_user["id"]

        )







        return jsonify({

            "success": True,


            "message":
            "All notifications deleted.",



            "deleted":
            result.deleted_count


        }),200







    except Exception as error:


        print(

            "DELETE ALL NOTIFICATIONS ERROR:",

            error

        )



        return error_response(

            "Unable to delete notifications.",

            500

        )
    # ==========================================================
# Get Unread Notification Count
# GET /api/notifications/unread
# User Only
# ==========================================================


@notifications_bp.route(

    "/notifications/unread",

    methods=["GET"]

)

@token_required

@roles_required("user")

def unread_count():


    try:


        current_user = g.current_user






        count = Notification.unread_count(

            current_user["id"]

        )







        return jsonify({

            "success":True,


            "unread_count":
            count


        }),200







    except Exception as error:


        print(

            "UNREAD COUNT ERROR:",

            error

        )



        return error_response(

            "Unable to fetch unread count.",

            500

        )









# ==========================================================
# Admin Broadcast Notification
# POST /api/notifications/broadcast
# Admin Only
# ==========================================================


@notifications_bp.route(

    "/notifications/broadcast",

    methods=["POST"]

)

@token_required

@roles_required("admin")

def broadcast_notification():


    try:


        data = request.get_json() or {}






        required = [

            "title",

            "message"

        ]







        for field in required:


            if not data.get(field):


                return error_response(

                    f"{field} is required."

                )







        users = Notification.get_all_users()






        notifications = []







        for user in users:


            notifications.append({

                "user_id":

                str(user["_id"]),


                "title":

                data["title"],


                "message":

                data["message"],


                "read":

                False

            })








        if notifications:


            Notification.create_many(

                notifications

            )








        return jsonify({

            "success":True,


            "message":
            "Notification sent to all users.",


            "count":
            len(notifications)


        }),201







    except Exception as error:


        print(

            "BROADCAST ERROR:",

            error

        )



        return error_response(

            "Unable to send broadcast.",

            500

        )









# ==========================================================
# Notification Health Check
# GET /api/notifications/health
# ==========================================================


@notifications_bp.route(

    "/notifications/health",

    methods=["GET"]

)

def notification_health():


    return jsonify({

        "success":True,


        "service":
        "Marketplace Notification API",



        "authentication":
        "JWT Enabled",



        "status":
        "Running"


    }),200