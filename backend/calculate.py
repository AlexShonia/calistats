from fastapi import FastAPI, APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated, List
from sqlalchemy.orm import Session
import models
from database import SessionLocal
import json

api_router = APIRouter()

class ExerciseItem(BaseModel):
    exercise: str
    reps_seconds: int
    type: str

class ExerciseData(BaseModel):
    exerciseData: List[ExerciseItem]
    isLoggedIn: bool
    email: str
class ExerciseResponse(BaseModel):
    total_level: float    
    ind_levels: list    

def get_exercise_levels(db: Session):
    exercises = db.query(models.Exercise).all()
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
    print(data)
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if data.isLoggedIn:
        if user:
            json_data = data.model_dump()
            print(data.model_dump())
            saved_window_instance = db.query(models.SavedChoice).filter(models.SavedChoice.user == user).first()
            print(saved_window_instance)
            if saved_window_instance:
                saved_window_instance.exerciseData = json_data
            else:    
                saved_window_instance = models.SavedChoice(exerciseData=json_data, user=user)
                db.add(saved_window_instance)

            db.commit()
        else:
            raise HTTPException(status_code=404, detail="User not found")

    response = ExerciseResponse(total_level=0, ind_levels=[])

    sum = 0
    individual_levels = []
    for item in data.exerciseData:
        level = 0
        if item.reps_seconds == 0:
            pass
        elif item.reps_seconds >= 12:
            level = int(get_exercise_levels(db)[item.exercise]) + 12
            individual_levels.append({item.exercise:level, "type":item.type})
        else:    
            level = int(get_exercise_levels(db)[item.exercise]) + item.reps_seconds
            individual_levels.append({item.exercise:level, "type":item.type})
    
    # [{'Pushups': 7, 'type': 'Pushups'}, {'Ring PU': 26, 'type': 'Pushups'}, {'Pushups': 7, 'type': 'Pull'}]
    # {'Pushups': [{'': 13, 'type': 'Pushups'}, {'Pushups': 14, 'type': 'Pushups'}]}
    separated_by_type = {}
    for individual in individual_levels:
        if individual["type"] not in separated_by_type:
            separated_by_type[individual["type"]] = [individual]
        else:    
            separated_by_type[individual["type"]].append(individual)

    sum = 0

    for key in separated_by_type:
        value = 0

        for i in range(len(separated_by_type[key])):
            ind_exercise = separated_by_type[key][i]

            if ind_exercise[next(iter(ind_exercise))] < value:
                pass
            else:
                value = ind_exercise[next(iter(ind_exercise))]

        sum += value

    response.ind_levels = individual_levels    
    response.total_level = sum / len(separated_by_type) 

    return response          

