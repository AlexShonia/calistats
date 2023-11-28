from fastapi import FastAPI, APIRouter, Depends
from pydantic import BaseModel
from typing import Annotated, List
from sqlalchemy.orm import Session
import models
from database import SessionLocal

api_router = APIRouter()

class ExerciseItem(BaseModel):
    exercise: str
    reps_seconds: int
    level: int

class ExerciseData(BaseModel):
    exerciseData: List[ExerciseItem]

class ExerciseResponse(BaseModel):
    total_level: float    
    ind_levels: list    

def get_exercise_levels(db: Session):
    exercises = db.query(models.Exercises).all()
    exercise_db = {exercise.name: exercise.level for exercise in exercises}
    return exercise_db

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@api_router.post("/", response_model=ExerciseResponse)
async def calculate(data : ExerciseData,
                    db: Session = Depends(get_db)):
    
    response = ExerciseResponse(total_level=0, ind_levels=[])

    sum = 0
    individual_levels = []

    for item in data.exerciseData:
        level = 0
        if item.reps_seconds == 0:
            pass
        elif item.reps_seconds >= 12:
            level = int(get_exercise_levels(db)[item.exercise]) + 12
            individual_levels.append({item.exercise:level})
        else:    
            level = int(get_exercise_levels(db)[item.exercise]) + item.reps_seconds
            individual_levels.append({item.exercise:level})

    for dict in individual_levels:
        sum+= next(iter(dict.values()))
        response.total_level = sum / len(individual_levels)
        response.ind_levels = individual_levels

    return response          

