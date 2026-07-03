from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# MongoDB Connection String
MONGO_URI = os.getenv("MONGO_URI")

# Create MongoDB Client
client = MongoClient(MONGO_URI)

# Select Database
db = client["AgriGenAI"]

print("✅ MongoDB Connected Successfully")