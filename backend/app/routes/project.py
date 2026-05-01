from fastapi import APIRouter, Depends
from app.db.mongodb import db

router = APIRouter()

@router.post("/")
async def create_project(project: dict):
    result = await db.projects.insert_one(project)
    return {"id": str(result.inserted_id)}

@router.get("/")
async def get_projects():
    projects = []
    async for p in db.projects.find():
        p["_id"] = str(p["_id"])
        projects.append(p)
    return projects