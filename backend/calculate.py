from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from typing import Annotated, List

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


@api_router.post("/", response_model=ExerciseResponse)
async def calculate(data : ExerciseData):
    from main import exercise_db
    response = ExerciseResponse(total_level=0, ind_levels=[])

    print(data)
    sum = 0
    individual_levels = []

    for item in data.exerciseData:
        level = 0
        if item.reps_seconds == 0:
            pass
        elif item.reps_seconds >= 12:
            level = exercise_db[item.exercise] + 12
            individual_levels.append({item.exercise:level})
        else:    
            level = exercise_db[item.exercise] + item.reps_seconds
            individual_levels.append({item.exercise:level})

    for dict in individual_levels:
        sum+= next(iter(dict.values()))
        response.total_level = sum / len(individual_levels)
        response.ind_levels = individual_levels

    return response          

