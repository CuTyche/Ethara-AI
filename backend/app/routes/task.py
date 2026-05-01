from fastapi import APIRouter
from app.db.mongodb import db
from bson import ObjectId

router = APIRouter()

# CREATE
@router.post("/")
async def create_task(task: dict):
    result = await db.tasks.insert_one(task)
    return {"id": str(result.inserted_id)}

# READ
@router.get("/")
async def get_tasks():
    tasks = []
    async for t in db.tasks.find():
        t["_id"] = str(t["_id"])
        tasks.append(t)
    return tasks

# UPDATE STATUS
@router.put("/{task_id}")
async def update_task(task_id: str, data: dict):
    await db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": data}
    )
    return {"msg": "updated"}

# DELETE
@router.delete("/{task_id}")
async def delete_task(task_id: str):
    await db.tasks.delete_one({"_id": ObjectId(task_id)})
    return {"msg": "deleted"}