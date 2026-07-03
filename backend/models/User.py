from utils.database import db
from bson.objectid import ObjectId


class User:

    collection = db["users"]

    @staticmethod
    def create_user(user_data):
        return User.collection.insert_one(user_data)

    @staticmethod
    def find_by_email(email):
        return User.collection.find_one(
            {"email": email}
        )

    @staticmethod
    def find_by_id(user_id):
        return User.collection.find_one(
            {"_id": ObjectId(user_id)}
        )

    @staticmethod
    def update_user(user_id, data):
        return User.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": data}
        )

    @staticmethod
    def delete_user(user_id):
        return User.collection.delete_one(
            {"_id": ObjectId(user_id)}
        )