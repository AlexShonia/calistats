from fastapi import FastAPI, APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@api_router.get("/", response_model=ExerciseData)
async def calculate(db: Session = Depends(get_db)):

    
    retrieved_instance = db.query(models.SavedWindow).order_by(desc(models.SavedWindow.id)).first()

    if retrieved_instance is not None and retrieved_instance.exerciseData:
        retrieved_list = json.loads(retrieved_instance.exerciseData)
        response = retrieved_list
    else:
        response = {"exerciseData": []}
        
    return response
    




