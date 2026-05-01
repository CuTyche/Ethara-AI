from fastapi import APIRouter, HTTPException
from app.db.mongodb import db
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
async def register(user: dict):
    existing = await db.users.find_one({"email": user["email"]})
    if existing:
        raise HTTPException(400, "User exists")

    user["password"] = hash_password(user["password"])
    await db.users.insert_one(user)

    return {"msg": "User created"}

@router.post("/login")
async def login(user: dict):
    db_user = await db.users.find_one({"email": user["email"]})
    if not db_user or not verify_password(user["password"], db_user["password"]):
        raise HTTPException(400, "Invalid credentials")

    token = create_access_token({"sub": db_user["email"], "role": db_user["role"]})
    return {"access_token": token}