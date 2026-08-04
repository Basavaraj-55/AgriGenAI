import os

class Config:

    SECRET_KEY = os.getenv("SECRET_KEY")

    JWT_SECRET = os.getenv("JWT_SECRET")

    MONGO_URI = os.getenv("MONGO_URI")

    DEBUG = True