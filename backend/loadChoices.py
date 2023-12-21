from fastapi import FastAPI, APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
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
async def calculate(email: str = None, db: Session = Depends(get_db)):

    params = {"email": email}
    query = text("SELECT * FROM users WHERE email=:email")
    row = db.execute(query, params).fetchone()
    query1 = text("SELECT * FROM savedchoices WHERE user_id=:id" )
    params1 = {"id": row.id}
    savedRow = db.execute(query1, params1).fetchone()
    # yes = db.query(models.SavedChoice).order_by(desc(models.SavedChoice.id)).first()
    # print(json.loads(savedRow.exerciseData))

    if savedRow is not None and savedRow.exerciseData:
        retrieved_data = json.loads(savedRow.exerciseData)
        print(retrieved_data)
        response = {"exerciseData": retrieved_data["exerciseData"]}
        # ragac = {"exerciseData": [{"exercise": "Pushups", "reps_seconds": 30, "type": "Pushups"}], "isLoggedIn": True, "email": "yle"}
    else:
        response = {"exerciseData": []}
        
    return response
    




