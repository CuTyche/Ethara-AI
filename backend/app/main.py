from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, project, task

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(project.router, prefix="/projects")
app.include_router(task.router, prefix="/tasks")

@app.get("/")
def root():
    return {"msg": "API Running"}