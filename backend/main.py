from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
import models
import calculate
import login
import register
import exercises
import loadChoices

app = FastAPI()

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)
exercises.seed_exercises(SessionLocal())

app.include_router(login.api_router, prefix="/login")
app.include_router(calculate.api_router, prefix="/calculate")
app.include_router(register.api_router, prefix="/register")
app.include_router(loadChoices.api_router, prefix="/loadExercises")