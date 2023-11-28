from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
import models
import calculate
import login
import register

app = FastAPI()

exercise_db = {"One arm pushups": 48, "Pushups": 8, "Planche": 68}

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def seed_exercises(db: Session):
    exercises = [
        {"name": "One arm pushups", "level": 48},
        {"name": "Pushups", "level": 8},
        {"name": "Planche", "level": 68}
    ]

    for exercise in exercises:
        existing_exercise = db.query(models.Exercises).filter_by(name=exercise["name"]).first()

        if existing_exercise:
            existing_exercise.level = exercise["level"]
            existing_exercise.name = exercise["name"]
        else:    
            db_exercise = models.Exercises(**exercise)
            db.add(db_exercise)

    db.commit()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)
seed_exercises(SessionLocal())

app.include_router(login.api_router, prefix="/login")
app.include_router(calculate.api_router, prefix="/calculate")
app.include_router(register.api_router, prefix="/register")