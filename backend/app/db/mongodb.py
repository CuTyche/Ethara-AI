from motor.motor_asyncio import AsyncIOMotorClient
import os

client = AsyncIOMotorClient(os.getenv("mongodb://localhost:27017/"))
db = client["project_manager"]