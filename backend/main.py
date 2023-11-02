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


database = {"name" : 'alex', "mail":'alex.shonia123@gmail.com', "password":'alexus'}

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

app.include_router(login.api_router, prefix="/login")
app.include_router(calculate.api_router, prefix="/calculate")
app.include_router(register.api_router, prefix="/register")